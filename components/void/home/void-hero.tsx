import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";
import { Constellation } from "@/components/void/constellation";
import { WordSplit } from "@/components/ui/word-split";

export function VoidHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center pb-24 pt-[120px]">
      <div className="void-container grid items-center gap-12 md:grid-cols-2 md:gap-6">
        <div className="relative z-10">
          <p className="eyebrow word-reveal mb-8">
            {profile.role} · {profile.education.school}
          </p>
          <h1 className="word-reveal text-heading-lg font-normal text-white">
            <WordSplit text="Complete systems, shipped end to end." />
          </h1>
          <p
            data-rev
            style={{ "--d": "260ms" } as React.CSSProperties}
            className="body-light mt-8 max-w-[480px] text-white"
          >
            {profile.tagline}
          </p>
          <div
            data-rev
            style={{ "--d": "360ms" } as React.CSSProperties}
            className="mt-12 flex flex-wrap items-center gap-8"
          >
            <Link href="#work" className="btn-iris">
              View selected work
            </Link>
            <Link href="/resume" className="btn-ghost">
              Résumé <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <div className="relative aspect-square w-full md:-mr-[8%] md:w-[112%]">
          <Constellation shape="brain" count={2400} seed={7} interactive />
        </div>
      </div>
    </section>
  );
}
