import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";
import { GithubIcon } from "@/components/site/brand-icons";
import { Reveal } from "@/components/site/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { HeroBackground } from "@/components/hero/hero-background";
import { getFeaturedProjects } from "@/lib/projects";
import { JsonLd } from "@/components/seo/json-ld";
import { personSchema, websiteSchema } from "@/lib/structured-data";
import { Magnetic } from "@/components/site/magnetic";

export default function HomePage() {
  const featured = getFeaturedProjects();
  return (
    <>
    <JsonLd data={[personSchema(), websiteSchema()]} />
    <section className="relative overflow-hidden">
      <HeroBackground />

      <div className="mx-auto flex min-h-[92vh] w-full max-w-6xl flex-col justify-center px-6 pt-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-brand-2" />
            {profile.education.degree.split(",")[0]} · {profile.education.school} ·{" "}
            {"Class of " + profile.education.graduationYear}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-tight">
            {profile.name}
            <span className="block text-brand-gradient">{profile.role}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted-foreground">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
              >
                View Projects
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
              >
                Get in touch
              </Link>
            </Magnetic>
            <a
              href="https://github.com/Dhananjay-alt"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-4" /> GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
              Featured work
            </p>
            <h2 className="mt-3 text-[length:var(--text-h2)] font-semibold tracking-tight">
              Selected projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="group hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            All projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
    </>
  );
}
