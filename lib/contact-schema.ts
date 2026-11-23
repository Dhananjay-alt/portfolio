import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(100),
  email: z.string().email("Please enter a valid email."),
  message: z
    .string()
    .min(10, "A little more detail, please (10+ characters).")
    .max(4000, "That's a bit long — keep it under 4000 characters."),
  // Honeypot: real users leave this empty.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string>>;
  /** What the visitor typed, echoed back on error so the form keeps it. */
  values?: { name: string; email: string; message: string };
};
