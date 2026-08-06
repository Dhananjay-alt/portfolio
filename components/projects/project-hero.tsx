import Image from "next/image";
import { ArrowUpRight, ExternalLink, PlayCircle, Trophy } from "lucide-react";
import type { Project } from "@/types/project";
import { GithubIcon } from "@/components/site/brand-icons";
import { ShareButton } from "@/components/site/share-button";

export function ProjectHero({ project }: { project: Project }) {
  const accent = project.accent ?? "var(--brand)";
  const { liveDemo, github, caseStudy } = project.links;

  return (
    <header className="mx-auto w-full max-w-5xl px-6 pt-36 md:pt-44">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
          {project.category}
        </span>
        <span className="text-muted-foreground/40">·</span>
        <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        <span
          className="ml-1 rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
        >
          {project.status}
        </span>
      </div>

      <h1 className="mt-5 text-[length:var(--text-h1)] font-semibold leading-[1.02] tracking-tight">
        {project.title}
      </h1>
      <p className="mt-4 max-w-2xl text-[length:var(--text-lead)] text-muted-foreground">
        {project.tagline}
      </p>

      {project.award && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-sm font-medium text-brand">
          <Trophy className="size-4" />
          {project.award.replace(/^🏆\s*/, "")}
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        {liveDemo ? (
          <a
            href={liveDemo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Live demo <ExternalLink className="size-4" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm text-muted-foreground">
            Demo coming soon
          </span>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            <GithubIcon className="size-4" /> Source
          </a>
        )}
        {caseStudy && (
          <a
            href={caseStudy}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            <PlayCircle className="size-4" /> Watch demo
          </a>
        )}
        <ShareButton title={`${project.title} — ${project.tagline}`} />
      </div>

      {/* Hero media — real image when available, styled placeholder otherwise */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-border">
        {project.media.hero ? (
          <Image
            src={project.media.hero}
            alt={`${project.title} preview`}
            width={1600}
            height={900}
            priority
            className="w-full"
          />
        ) : (
          <div
            className="relative aspect-[16/9] w-full"
            style={{
              background: `radial-gradient(120% 120% at 20% 0%, color-mix(in oklch, ${accent} 30%, transparent), transparent 60%), var(--card)`,
            }}
          >
            <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <p className="text-6xl font-bold tracking-tight opacity-90">
                  {project.title}
                </p>
                <p className="mt-2 flex items-center justify-center gap-1 font-mono text-xs text-muted-foreground">
                  preview coming soon <ArrowUpRight className="size-3" />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
