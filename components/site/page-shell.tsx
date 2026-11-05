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
    <div className="void-container pb-24 pt-40 md:pt-48">
      <header className="max-w-4xl">
        {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
        <h1 className="text-heading-lg font-normal text-white">{title}</h1>
        {description && (
          <p className="body-light mt-8 max-w-[560px] text-[#bdbdbd]">{description}</p>
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
