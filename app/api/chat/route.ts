import { NextRequest } from "next/server";
import { z } from "zod";
import { buildContext } from "@/lib/ai/retrieve";
import { profile } from "@/content/profile";

export const runtime = "nodejs";
export const maxDuration = 30;

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      }),
    )
    .min(1)
    .max(20),
});

const MODEL = "llama-3.3-70b-versatile";

function systemPrompt(context: string): string {
  return `You are the portfolio assistant for ${profile.name}, a ${profile.role}.
Answer questions about Dhananjay's projects, skills, experience, and background using ONLY the context below.
Rules:
- Refer to the subject as "Dhananjay" (avoid gendered pronouns; use "they" if needed).
- If the answer is not in the context, say you can only help with questions about Dhananjay's work, projects, skills, and background — do not invent facts.
- Be concise and friendly: 2–4 sentences. Use plain text, no markdown headers.

Context:
${context || "(no specific context matched)"}`;
}

function textStream(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function POST(req: NextRequest) {
  let parsed;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return new Response("Invalid request.", { status: 400 });
  }

  const messages = parsed.messages;
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const context = buildContext(lastUser?.content ?? "");

  const apiKey = process.env.GROQ_API_KEY;

  // Graceful degradation — still useful without a live model.
  if (!apiKey) {
    const fallback = context
      ? `The live AI assistant isn't configured in this environment, but here's the most relevant info I have:\n\n${context.slice(0, 700)}`
      : `The live AI assistant isn't configured here yet. You can ask about Dhananjay's projects (SyncSpace, Paygent, LuxAuth, Repo Analyzer), skills, or background — or reach out via the Contact page.`;
    return textStream(fallback);
  }

  try {
    const { default: Groq } = await import("groq-sdk");
    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: MODEL,
      temperature: 0.3,
      max_tokens: 400,
      stream: true,
      messages: [
        { role: "system", content: systemPrompt(context) },
        ...messages,
      ],
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const part of completion) {
            const delta = part.choices[0]?.delta?.content ?? "";
            if (delta) controller.enqueue(encoder.encode(delta));
          }
        } catch (err) {
          console.error("[chat] stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("[chat] error:", err);
    return textStream("Something went wrong reaching the assistant. Try again, or use the Contact page.");
  }
}
