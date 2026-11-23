"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitContact } from "@/app/(site)/contact/actions";
import type { ContactState } from "@/lib/contact-schema";

const initialState: ContactState = { status: "idle" };
const FIELDS = ["name", "email", "message"] as const;

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLHeadingElement>(null);

  // Move focus to where the visitor needs to look next: the first field to
  // fix after a failed send, the confirmation after a successful one.
  useEffect(() => {
    if (state.status === "success") {
      sentRef.current?.focus();
    } else if (state.status === "error") {
      const first = FIELDS.find((f) => state.fieldErrors?.[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="rule border-b border-line py-10">
        <p className="label">Sent</p>
        <h2 ref={sentRef} tabIndex={-1} className="text-h3 mt-4 outline-none">
          Message sent.
        </h2>
        <p className="mt-2 text-mute">Thanks for reaching out — I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  const v = state.values;

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-6">
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
        defaultValue={v?.name}
        error={state.fieldErrors?.name}
        autoComplete="name"
      />
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="you@company.com"
        defaultValue={v?.email}
        error={state.fieldErrors?.email}
        autoComplete="email"
      />
      <Field
        label="Message"
        name="message"
        multiline
        placeholder="Tell me about the role, project, or idea…"
        defaultValue={v?.message}
        error={state.fieldErrors?.message}
      />

      {state.status === "error" && state.message && (
        <p className="text-[length:var(--text-small)] text-destructive" role="alert">
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

const fieldClass =
  "w-full rounded-md border border-field bg-transparent px-4 py-3 text-base placeholder:text-mute focus-visible:border-accent aria-[invalid=true]:border-destructive";

function Field({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  error,
  autoComplete,
  multiline = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  defaultValue?: string;
  error?: string;
  autoComplete?: string;
  multiline?: boolean;
}) {
  const errorId = `${name}-error`;
  const shared = {
    id: name,
    name,
    placeholder,
    defaultValue,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    className: fieldClass,
  };
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[length:var(--text-small)] font-medium">
        {label}
      </label>
      {multiline ? (
        <textarea rows={5} {...shared} className={`${fieldClass} resize-y`} />
      ) : (
        <input type={type} autoComplete={autoComplete} {...shared} />
      )}
      {error && (
        <p id={errorId} className="mt-2 text-[length:var(--text-small)] text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
