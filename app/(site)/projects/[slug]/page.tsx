import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Lightbulb } from "lucide-react";
import { getAdjacentProject, getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectSection } from "@/components/projects/project-section";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { TechBadge } from "@/components/projects/tech-badge";
import { JsonLd } from "@/components/seo/json-ld";
import { projectSchema, breadcrumbSchema } from "@/lib/structured-data";
import { FlagshipScroll } from "@/components/projects/flagship-scroll";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — ${project.tagline}`,
      description: project.problem,
    },
  };
}

const techGroupLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  web3: "Web3",
  infra: "Infra",
  ai: "AI",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);

  return (
    <article className="pb-24">
      <JsonLd
        data={[
          projectSchema(project),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
      <ProjectHero project={project} />

      <div className="mx-auto mt-4 w-full max-w-5xl px-6">
        <p className="max-w-2xl border-l-2 border-brand/40 pl-4 text-muted-foreground">
          {project.context}
        </p>

        {/* Meta strip */}
        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border/60 py-6 sm:grid-cols-4">
          <Meta term="Role" value={project.role} />
          <Meta term="Timeline" value={project.timeline} />
          <Meta term="Category" value={project.category} />
          <Meta term="Status" value={project.status} />
        </dl>

        {/* Tech stack, grouped */}
        <div className="mt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Tech stack
          </p>
          <div className="mt-4 space-y-3">
            {Object.entries(project.techStack).map(([group, items]) =>
              items && items.length ? (
                <div key={group} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <span className="w-20 shrink-0 font-mono text-xs text-brand">
                    {techGroupLabels[group] ?? group}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((t) => (
                      <TechBadge key={t}>{t}</TechBadge>
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </div>

        <ProjectSection index="01" title="The problem">
          <p className="text-lg leading-relaxed text-foreground/90">{project.problem}</p>
        </ProjectSection>

        {project.slug === "syncspace" ? (
          <FlagshipScroll project={project} />
        ) : (
          <ProjectSection index="02" title="Approach & architecture">
            <p className="text-lg leading-relaxed text-foreground/90">{project.approach}</p>
            <div className="mt-8">
              <ArchitectureDiagram steps={project.architecture} accent={project.accent} />
            </div>
          </ProjectSection>
        )}

        <ProjectSection index="03" title="Key features">
          <ul className="space-y-5">
            {project.features.map((f) => (
              <li key={f.title} className="rounded-xl border border-border bg-card p-5">
                <p className="font-medium">{f.title}</p>
                <p className="mt-1.5 text-muted-foreground">{f.description}</p>
              </li>
            ))}
          </ul>
        </ProjectSection>

        <ProjectSection index="04" title="Challenges">
          <ul className="space-y-6">
            {project.challenges.map((c) => (
              <li key={c.title}>
                <p className="font-medium">{c.title}</p>
                <p className="mt-1.5 text-muted-foreground">{c.description}</p>
              </li>
            ))}
          </ul>
        </ProjectSection>

        <ProjectSection index="05" title="Engineering decisions">
          <ul className="space-y-6">
            {project.decisions.map((d) => (
              <li key={d.title} className="rounded-xl border border-border bg-card p-5">
                <p className="font-medium">{d.title}</p>
                <p className="mt-2 text-sm font-medium text-brand">{d.choice}</p>
                <p className="mt-1.5 text-muted-foreground">{d.rationale}</p>
              </li>
            ))}
          </ul>
        </ProjectSection>

        <ProjectSection index="06" title="Lessons">
          <ul className="space-y-4">
            {project.lessons.map((l) => (
              <li key={l} className="flex gap-3">
                <Lightbulb className="mt-1 size-4 shrink-0 text-brand" />
                <span className="text-foreground/90">{l}</span>
              </li>
            ))}
          </ul>
        </ProjectSection>

        {project.metrics && project.metrics.length > 0 && (
          <ProjectSection index="07" title="At a glance">
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-2">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-card p-5">
                  <dd className="text-2xl font-semibold tracking-tight">{m.value}</dd>
                  <dt className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {m.label}
                  </dt>
                </div>
              ))}
            </dl>
          </ProjectSection>
        )}

        {/* Next project */}
        <div className="mt-16">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/40"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Next project
              </p>
              <p className="mt-1 text-xl font-semibold">{next.title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{next.tagline}</p>
            </div>
            <ArrowRight className="size-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Meta({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {term}
      </dt>
      <dd className="mt-1.5 text-sm font-medium">{value}</dd>
    </div>
  );
}
