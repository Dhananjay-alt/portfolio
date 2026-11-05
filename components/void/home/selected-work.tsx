import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/content/projects";
import { Constellation, type ConstellationShape } from "@/components/void/constellation";
import { WordSplit } from "@/components/ui/word-split";
import { cn } from "@/lib/utils";

const SHAPES: Record<string, ConstellationShape> = {
  syncspace: "orbit",
  paygent: "seal",
  luxauth: "lattice",
  "repo-analyzer": "tree",
};

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-24 py-[120px]">
      <div className="void-container">
        <div className="grid gap-10 md:grid-cols-2">
          <h2 className="word-reveal text-heading-lg font-normal">
            <WordSplit text="Selected work" />
          </h2>
          <div data-rev className="md:pt-4">
            <p className="eyebrow mb-4">Four builds</p>
            <p className="body-light max-w-[520px] text-[#bdbdbd]">
              Realtime collaboration, on-chain protocols and AI tooling — each shipped
              from data model to interface.
            </p>
          </div>
        </div>

        <div className="mt-[120px] flex flex-col gap-[120px]">
          {projects.map((project, idx) => {
            const reversed = idx % 2 === 1;
            const tech = (project.allTech ?? []).slice(0, 5).join(" · ");
            return (
              <article
                key={project.slug}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-20"
              >
                <div
                  className={cn(
                    "relative aspect-[4/3] w-full",
                    reversed && "md:order-2",
                  )}
                >
                  <Constellation
                    shape={SHAPES[project.slug] ?? "orbit"}
                    count={900}
                    seed={idx * 13 + 3}
                  />
                </div>

                <div data-rev className={cn(reversed && "md:order-1")}>
                  <p className="text-[12px] font-normal uppercase leading-[1.5] tracking-[0.025em] text-[#8052ff]">
                    {String(idx + 1).padStart(2, "0")} — {project.category} · {project.year}
                  </p>
                  <h3 className="mt-4 text-heading font-normal text-white">
                    {project.title}
                  </h3>
                  <p className="body-light mt-6 max-w-[480px] text-white">
                    {project.tagline}
                  </p>
                  {project.award && (
                    <p className="mt-4 text-[15px] font-normal text-[#ffb829]">
                      {project.award}
                    </p>
                  )}
                  {tech && (
                    <p className="mt-6 text-[12px] leading-[1.5] text-[#9a9a9a]">{tech}</p>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="btn-ghost mt-8"
                    aria-label={`Read the ${project.title} case study`}
                  >
                    Case study <ArrowRight className="size-4" strokeWidth={1.75} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-[96px]">
          <Link href="/projects" className="btn-ghost">
            All projects <ArrowRight className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
