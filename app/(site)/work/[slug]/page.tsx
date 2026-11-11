import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { getAdjacentProject, getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { toPreview } from "@/lib/work";
import { JsonLd } from "@/components/seo/json-ld";
import { projectSchema, breadcrumbSchema } from "@/lib/structured-data";
import { PageTransition, SharedElement } from "@/components/motion/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { CaseSection } from "@/components/work/case-section";
import { CodeSample } from "@/components/work/code-sample";
import { ProjectPreview } from "@/components/work/project-preview";

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
    alternates: { canonical: `/work/${project.slug}` },
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

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * Case-study template: problem → architecture → key decisions → result.
 * Every section renders from the project's content file, so adding a project
 * means adding one file under content/projects (see README).
 */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);
  const { liveDemo, github, caseStudy } = project.links;
  const links = [
    liveDemo && { label: "Live demo", href: liveDemo },
    github && { label: "Source", href: github },
    caseStudy && { label: "Watch the demo", href: caseStudy },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <PageTransition>
      <article>
        <JsonLd
          data={[
            projectSchema(project),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
              { name: project.title, path: `/work/${project.slug}` },
            ]),
          ]}
        />

        <header className="container-page pt-[clamp(40px,7vw,96px)]">
          <Link href="/work" className="group label inline-flex items-center gap-2 hover:text-ink">
            <span aria-hidden="true" className="arrow arrow-back">
              ←
            </span>
            All work
          </Link>

          <p data-intro="fade" style={i(0)} className="label mt-[clamp(40px,7vw,96px)]">
            Case study <span aria-hidden="true">·</span> {project.category}{" "}
            <span aria-hidden="true">·</span> <span className="tabular">{project.year}</span>
          </p>

          <h1 className="text-display mt-5">
            <span className="line-mask" data-intro="line" style={i(0)}>
              <span>
                <SharedElement name={`work-title-${project.slug}`}>
                  <span className="inline-block">{project.title}</span>
                </SharedElement>
              </span>
            </span>
          </h1>

          <p data-intro="fade" style={i(1)} className="text-lead mt-6 max-w-[46ch] text-mute">
            {project.tagline}
          </p>

          {project.badge && (
            <p data-intro="fade" style={i(2)} className="tag mt-6 gap-2 !text-ink">
              <span aria-hidden="true" className="size-[6px] rounded-full bg-accent" />
              {project.badge}
            </p>
          )}

          <dl
            data-intro="fade"
            style={i(3)}
            className="rule mt-12 grid grid-cols-2 gap-x-6 gap-y-6 pt-6 md:grid-cols-4"
          >
            <Meta term="Role" value={project.role} />
            <Meta term="Timeline" value={project.timeline} />
            <Meta term="Status" value={project.status} />
            <div>
              <dt className="label">Links</dt>
              <dd className="mt-2 flex flex-col items-start gap-1 text-[0.9375rem]">
                {links.length > 0 ? (
                  links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer noopener" className="link">
                      {link.label}{" "}
                      <span aria-hidden="true" className="arrow arrow-up">
                        ↗
                      </span>
                    </a>
                  ))
                ) : (
                  <span className="text-mute">On request</span>
                )}
              </dd>
            </div>
          </dl>
        </header>

        <div className="container-page mt-12 pb-[clamp(56px,8vw,112px)]">
          <div
            style={
              {
                viewTransitionName: `work-preview-${project.slug}`,
                viewTransitionClass: "morph",
              } as CSSProperties
            }
          >
            <ProjectPreview project={toPreview(project)} size="lg" priority />
          </div>
        </div>

        <CaseSection index="01" label="Problem" title="The problem">
          <Reveal as="p" className="text-lead">
            {project.problem}
          </Reveal>
          <Reveal as="p" index={1} className="mt-6 text-mute">
            {project.context}
          </Reveal>
        </CaseSection>

        <CaseSection index="02" label="Architecture" title="How it's built">
          <Reveal as="p" className="text-lead">
            {project.approach}
          </Reveal>

          <ol className="mt-12 border-b border-line">
            {project.architecture.map((step, idx) => (
              <Reveal
                as="li"
                key={step.layer}
                index={idx}
                className="grid grid-cols-[3ch_minmax(0,1fr)] gap-x-5 border-t border-line py-5 md:grid-cols-[3ch_minmax(0,1fr)_minmax(0,2fr)]"
              >
                <span className="label tabular pt-1">{String(idx + 1).padStart(2, "0")}</span>
                <h3 className="text-h3">{step.layer}</h3>
                <p className="col-start-2 mt-2 text-mute md:col-start-3 md:mt-0">{step.detail}</p>
              </Reveal>
            ))}
          </ol>

          {project.code && (
            <Reveal className="mt-12">
              <CodeSample {...project.code} />
            </Reveal>
          )}

          <Reveal className="mt-12">
            <h3 className="label">Stack</h3>
            <dl className="mt-4 space-y-3">
              {Object.entries(project.techStack).map(([group, items]) =>
                items && items.length ? (
                  <div key={group} className="grid grid-cols-[9ch_minmax(0,1fr)] gap-x-5">
                    <dt className="label pt-1">{techGroupLabels[group] ?? group}</dt>
                    <dd className="flex flex-wrap gap-2">
                      {items.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                ) : null,
              )}
            </dl>
          </Reveal>
        </CaseSection>

        <CaseSection index="03" label="Key decisions" title="Decisions that shaped it">
          <ul className="border-b border-line">
            {project.decisions.map((d, idx) => (
              <Reveal as="li" key={d.title} index={idx} className="border-t border-line py-7">
                <h3 className="text-h3">{d.title}</h3>
                <p className="mt-3 font-medium">{d.choice}</p>
                <p className="mt-2 text-mute">{d.rationale}</p>
              </Reveal>
            ))}
          </ul>

          <h3 className="label mt-14">Hard parts</h3>
          <ul className="mt-5 space-y-7">
            {project.challenges.map((c, idx) => (
              <Reveal as="li" key={c.title} index={idx}>
                <p className="font-medium">{c.title}</p>
                <p className="mt-2 text-mute">{c.description}</p>
              </Reveal>
            ))}
          </ul>
        </CaseSection>

        <CaseSection index="04" label="Result" title="What shipped">
          {project.metrics && project.metrics.length > 0 && (
            <dl className="grid gap-x-6 gap-y-8 border-b border-line pb-10 sm:grid-cols-3">
              {project.metrics.map((metric, idx) => (
                <Reveal key={metric.label} index={idx} className="flex flex-col-reverse justify-end gap-2">
                  <dt className="label">{metric.label}</dt>
                  <dd className="font-display text-[1.75rem] leading-[1.1]">{metric.value}</dd>
                </Reveal>
              ))}
            </dl>
          )}

          <ul className="mt-10 space-y-7">
            {project.features.map((f, idx) => (
              <Reveal as="li" key={f.title} index={idx}>
                <p className="font-medium">{f.title}</p>
                <p className="mt-2 text-mute">{f.description}</p>
              </Reveal>
            ))}
          </ul>

          <h3 className="label mt-14">Lessons</h3>
          <ol className="mt-5 border-b border-line">
            {project.lessons.map((lesson, idx) => (
              <Reveal
                as="li"
                key={lesson}
                index={idx}
                className="grid grid-cols-[3ch_minmax(0,1fr)] gap-x-5 border-t border-line py-4"
              >
                <span className="label tabular pt-1">{String(idx + 1).padStart(2, "0")}</span>
                <span>{lesson}</span>
              </Reveal>
            ))}
          </ol>
        </CaseSection>

        <nav aria-label="Next project" className="rule">
          <Link
            href={`/work/${next.slug}`}
            className="work-row group container-page flex items-end justify-between gap-6 py-[clamp(48px,7vw,96px)]"
          >
            <span>
              <span className="label block">Next project</span>
              <span className="work-title text-h1 mt-4 block font-display">
                <SharedElement name={`work-title-${next.slug}`}>
                  <span className="inline-block">{next.title}</span>
                </SharedElement>
              </span>
              <span className="mt-3 block text-mute">{next.outcome}</span>
            </span>
            <span aria-hidden="true" className="work-arrow text-[1.5rem] leading-none">
              ↗
            </span>
          </Link>
        </nav>
      </article>
    </PageTransition>
  );
}

function Meta({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="label">{term}</dt>
      <dd className="mt-2 text-[0.9375rem]">{value}</dd>
    </div>
  );
}
