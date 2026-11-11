import Link from "next/link";
import { getWorkItems } from "@/lib/work";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { SectionLabel } from "@/components/site/section-label";
import { WorkList } from "@/components/work/work-list";

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="section-y">
      <div className="container-page">
        <SectionLabel index="01">Work</SectionLabel>
        <div className="grid-12 mt-8 items-end gap-y-6">
          <SplitHeading id="work-heading" className="text-h1 md:col-span-6">
            Selected work
          </SplitHeading>
          <Reveal as="p" className="text-lead text-mute md:col-span-5 md:col-start-8">
            Realtime collaboration, on-chain protocols and AI tooling — each shipped from data model
            to interface.
          </Reveal>
        </div>

        <div className="mt-[clamp(40px,6vw,80px)]">
          <WorkList items={getWorkItems()} />
        </div>

        <Reveal className="mt-8 flex justify-end">
          <Link href="/work" className="link">
            All work{" "}
            <span aria-hidden="true" className="arrow">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
