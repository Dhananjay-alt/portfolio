import type { CSSProperties, ReactNode } from "react";
import { PageTransition } from "@/components/motion/page-transition";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * Standard heading block for interior pages, wrapped in the route transition.
 * On a hard load the title rises out of a line mask (CSS, from first paint);
 * on client navigation the route transition carries the whole page instead.
 */
export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <PageTransition>
      <div className="container-page pb-[var(--section-y)] pt-[clamp(48px,8vw,112px)]">
        <header className="max-w-4xl">
          {eyebrow && (
            <p data-intro="fade" style={i(0)} className="label mb-6">
              {eyebrow}
            </p>
          )}
          <h1 className="text-h1">
            <span className="line-mask" data-intro="line" style={i(0)}>
              <span>{title}</span>
            </span>
          </h1>
          {description && (
            <p data-intro="fade" style={i(1)} className="text-lead mt-6 max-w-[56ch] text-mute">
              {description}
            </p>
          )}
        </header>
        {children}
      </div>
    </PageTransition>
  );
}

/** Placeholder marker for sections that have no content yet. */
export function ComingSoon({ phase }: { phase: string }) {
  return <p className="label mt-12">Building in {phase}</p>;
}
