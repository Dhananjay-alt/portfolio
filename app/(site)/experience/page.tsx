import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { experience } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "A timeline of Dhananjay's hackathons, projects, community roles, and education.",
};

const kindColor: Record<string, string> = {
  Hackathon: "var(--brand-2)",
  Project: "var(--brand)",
  Community: "oklch(0.78 0.15 155)",
  Education: "oklch(0.8 0.15 85)",
};

export default function ExperiencePage() {
  return (
    <PageShell
      eyebrow="Experience"
      title="Hackathons, builds, and communities."
      description="How the work has unfolded — ETHGlobal builds, shipped products, and community roles at IIT Roorkee."
    >
      <div className="mt-12 max-w-3xl">
        <ol className="relative border-l border-border">
          {experience.map((entry, i) => (
            <Reveal key={`${entry.title}-${i}`}>
              <li className="relative ml-6 pb-10">
                <span
                  className="absolute -left-[1.6rem] top-1.5 grid size-3 place-items-center rounded-full ring-4 ring-background"
                  style={{ background: kindColor[entry.kind] ?? "var(--brand)" }}
                  aria-hidden
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono text-xs text-muted-foreground">
                    {entry.period}
                  </span>
                  <span
                    className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {entry.kind}
                  </span>
                </div>

                <h2 className="mt-2 text-lg font-semibold tracking-tight">
                  {entry.href ? (
                    <Link
                      href={entry.href}
                      className="group inline-flex items-center gap-1.5 hover:text-brand"
                    >
                      {entry.title}
                      <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  ) : (
                    entry.title
                  )}
                </h2>
                <p className="text-sm text-muted-foreground">{entry.org}</p>
                <p className="mt-2 text-foreground/90">{entry.description}</p>

                {entry.highlights && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {entry.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </PageShell>
  );
}
