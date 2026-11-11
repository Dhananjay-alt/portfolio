"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact } from "@/app/(site)/contact/actions";
import type { ContactState } from "@/lib/contact-schema";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="rule border-b border-line py-10">
        <p className="label">Sent</p>
        <h2 className="text-h3 mt-4">Message sent.</h2>
        <p className="mt-2 text-mute">Thanks for reaching out — I&apos;ll get back to you soon.</p>
      </div>
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
          className="w-full resize-y rounded-md border border-line bg-transparent px-4 py-3 text-[0.9375rem] placeholder:text-mute focus-visible:border-accent aria-[invalid=true]:border-destructive"
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
    <button type="submit" disabled={pending} className="btn btn-fill disabled:cursor-not-allowed disabled:opacity-60">
      {pending ? "Sending…" : "Send message"}
      <span aria-hidden="true" className="arrow">
        →
      </span>
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
        className="w-full rounded-md border border-line bg-transparent px-4 py-3 text-[0.9375rem] placeholder:text-mute focus-visible:border-accent aria-[invalid=true]:border-destructive"
      />
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}
