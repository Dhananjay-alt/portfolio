import { projects } from "@/content/projects";
import { WordSplit } from "@/components/ui/word-split";
import { WorkSuiteTabs, type SuiteProject } from "@/components/home/work-suite-tabs";

/** Server wrapper: trims project data to what the tab strip renders. */
export function WorkSuite() {
  const items: SuiteProject[] = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
    category: p.category,
    year: p.year,
    status: p.status,
    timeline: p.timeline,
    context: p.context,
    award: p.award?.replace(/^\p{Extended_Pictographic}\s*/u, ""),
    tech: (p.allTech ?? []).slice(0, 6),
    architecture: p.architecture.slice(0, 4),
  }));

  return (
    <section id="work" className="section-y scroll-mt-[calc(var(--header-height)+16px)]">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="word-reveal text-heading-lg font-normal">
            <WordSplit text="Selected work" />
          </h2>
          <p data-rev className="max-w-[460px] text-[18px] leading-[1.5] text-stone-gray md:justify-self-end">
            Realtime collaboration, on-chain protocols and AI tooling — each shipped from data
            model to interface.
          </p>
        </div>

        <div data-rev className="mt-10">
          <WorkSuiteTabs items={items} />
        </div>
      </div>
    </section>
  );
}
