"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Send } from "lucide-react";
import { submitContact } from "@/app/(site)/contact/actions";
import type { ContactState } from "@/lib/contact-schema";
import { fireConfetti } from "@/lib/confetti";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);

  useEffect(() => {
    if (state.status === "success") fireConfetti();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-brand/30 bg-brand/5 p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
          className="mx-auto grid size-14 place-items-center rounded-full bg-brand text-brand-foreground"
        >
          <Check className="size-7" />
        </motion.div>
        <h2 className="mt-5 text-xl font-semibold">Message sent</h2>
        <p className="mt-2 text-muted-foreground">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" autoComplete="off" tabIndex={-1} />
      </div>

      <Field
        label="Name"
        name="name"
        type="text"
        placeholder="Ada Lovelace"
        error={state.fieldErrors?.name}
        autoComplete="name"
      />
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="you@company.com"
        error={state.fieldErrors?.email}
        autoComplete="email"
      />

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me about the role, project, or idea…"
          aria-invalid={Boolean(state.fieldErrors?.message)}
          className="w-full resize-y rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-brand/50 focus-visible:ring-2 focus-visible:ring-ring/40 aria-[invalid=true]:border-destructive"
        />
        {state.fieldErrors?.message && (
          <p className="mt-1.5 text-sm text-destructive">{state.fieldErrors.message}</p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <AnimatePresence mode="wait" initial={false}>
        {pending ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2"
          >
            <Loader2 className="size-4 animate-spin" /> Sending…
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2"
          >
            Send message <Send className="size-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-brand/50 focus-visible:ring-2 focus-visible:ring-ring/40 aria-[invalid=true]:border-destructive"
      />
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}
