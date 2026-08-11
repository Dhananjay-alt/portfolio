import Link from "next/link";
import { ArrowUpRight, Trophy } from "lucide-react";
import type { Project } from "@/types/project";
import { getFeaturedProjects } from "@/lib/projects";
import { Reveal } from "@/components/site/reveal";
import { Magnetic } from "@/components/site/magnetic";
import { TechBadge } from "@/components/projects/tech-badge";
import { cn } from "@/lib/utils";

export function FeaturedShowcase() {
  const projects = getFeaturedProjects();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-brand" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
            Selected work
          </p>
        </div>
        <h2 className="max-w-2xl text-[length:var(--text-h2)] font-semibold tracking-tight">
          Four products, shipped end to end.
        </h2>
      </Reveal>

      <div className="mt-16 space-y-24 md:mt-24 md:space-y-40">
        {projects.map((project, i) => (
          <ShowcaseItem key={project.slug} project={project} index={i} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ShowcaseItem({
  project,
  index,
  flip,
}: {
  project: Project;
  index: number;
  flip: boolean;
}) {
  const accent = project.accent ?? "var(--brand)";

  return (
    <div className="grid items-start gap-8 md:grid-cols-2 md:gap-16">
      {/* Sticky media panel */}
      <div className={cn("md:sticky md:top-24", flip && "md:order-2")}>
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border"
          style={{
            background: `radial-gradient(130% 120% at 15% 0%, color-mix(in oklch, ${accent} 34%, transparent), transparent 55%), var(--card)`,
          }}
        >
          <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          {/* faux window chrome */}
          <div className="absolute left-5 top-5 flex gap-1.5">
            <span className="size-2.5 rounded-full bg-foreground/20" />
            <span className="size-2.5 rounded-full bg-foreground/20" />
            <span className="size-2.5 rounded-full bg-foreground/20" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")} — {project.category}
            </span>
            <p className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              {project.title}
            </p>
          </div>
        </div>
      </div>

      {/* Scrolling narrative */}
      <div className={cn("flex flex-col justify-center", flip && "md:order-1")}>
        <Reveal>
          {project.award && (
            <div className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
              <Trophy className="size-3" />
              {project.award.replace(/^🏆\s*/, "")}
            </div>
          )}
          <h3 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="mt-3 text-[length:var(--text-lead)] text-muted-foreground">
            {project.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="mt-8 space-y-3">
            {project.features.slice(0, 3).map((f) => (
              <li key={f.title} className="flex gap-3">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full"
                  style={{ background: accent }}
                />
                <span className="text-foreground/90">
                  <span className="font-medium">{f.title}.</span>{" "}
                  <span className="text-muted-foreground">{f.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-1.5">
            {(project.allTech ?? []).slice(0, 5).map((t) => (
              <TechBadge key={t}>{t}</TechBadge>
            ))}
          </div>
          <div className="mt-8">
            <Magnetic>
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:bg-accent"
              >
                Read the case study
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
