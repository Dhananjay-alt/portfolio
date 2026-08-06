import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

/** Standard heading block for interior pages. */
export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-36 md:pt-44">
      <header className="max-w-3xl">
        {eyebrow && (
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brand">
            {eyebrow}
          </p>
        )}
        <h1 className="text-balance text-[length:var(--text-h1)] font-semibold leading-[1.05]">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </header>
      {children}
    </div>
  );
}

/** Placeholder marker for pages built in later phases. */
export function ComingSoon({ phase }: { phase: string }) {
  return (
    <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-mono text-xs text-muted-foreground">
      <span className="size-1.5 animate-pulse rounded-full bg-brand" />
      Building in {phase}
    </div>
  );
}
