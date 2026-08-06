import type { ReactNode } from "react";
import { Reveal } from "@/components/site/reveal";

export function ProjectSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-border/60 py-14 md:py-20">
      <Reveal>
        <div className="grid gap-8 md:grid-cols-[200px_1fr]">
          <div className="md:sticky md:top-28 md:h-fit">
            <p className="font-mono text-xs text-brand">{index}</p>
            <h2 className="mt-2 text-[length:var(--text-h3)] font-semibold tracking-tight">
              {title}
            </h2>
          </div>
          <div className="max-w-2xl">{children}</div>
        </div>
      </Reveal>
    </section>
  );
}
