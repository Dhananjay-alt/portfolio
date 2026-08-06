"use server";

import { contactSchema, type ContactState } from "@/lib/contact-schema";
import { profile } from "@/content/profile";

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof fieldErrors;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  // Honeypot tripped — pretend success, drop silently.
  if (parsed.data.company) return { status: "success" };

  const { name, email, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  // Graceful degradation: without a key, log server-side and still succeed
  // so the UX is testable before email is wired up in production.
  if (!apiKey) {
    console.info("[contact] (no RESEND_API_KEY) submission:", { name, email, message });
    return { status: "success" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // TODO: replace with a verified sending domain in Resend.
      from: "Portfolio <onboarding@resend.dev>",
      to: profile.email,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[contact] resend error:", error);
      return { status: "error", message: "Something went wrong sending your message. Try email instead." };
    }
    return { status: "success" };
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return { status: "error", message: "Something went wrong. Try email instead." };
  }
}
