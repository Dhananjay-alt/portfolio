import Link from "next/link";
import { ArrowRight, GitCommitHorizontal, Trophy } from "lucide-react";
import { profile } from "@/content/profile";
import { WordSplit } from "@/components/ui/word-split";
import { GoldenHourBackdrop } from "@/components/home/golden-hour-backdrop";

/**
 * Full-bleed golden-hour scene with a centred light-cut headline, a single
 * wine CTA, and translucent product cards composited over the image.
 */
export function Hero() {
  return (
    <section className="relative isolate -mt-[var(--header-height)] overflow-hidden">
      <GoldenHourBackdrop />

      <div className="container-page relative flex min-h-[min(860px,96svh)] flex-col pb-10 pt-[calc(var(--header-height)+72px)] md:pt-[calc(var(--header-height)+96px)]">
        <div className="mx-auto flex max-w-[820px] flex-col items-center text-center">
          <p data-rev className="eyebrow mb-6 bg-white/70">
            {profile.role} · {profile.education.school}
          </p>
          <h1 className="word-reveal text-display font-normal text-ink-charcoal">
            <WordSplit text="Complete systems, shipped end to end." />
          </h1>
          <p
            data-rev
            style={{ "--d": "240ms" } as React.CSSProperties}
            className="mt-6 max-w-[560px] text-[18px] leading-[1.5] text-ink-charcoal/80"
          >
            {profile.tagline}
          </p>
          <div
            data-rev
            style={{ "--d": "340ms" } as React.CSSProperties}
            className="mt-8 flex flex-wrap items-center justify-center gap-6"
          >
            <Link href="#work" className="btn-primary">
              View selected work <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
            <Link href="/resume" className="btn-ghost">
              Read the résumé
            </Link>
          </div>
        </div>

        {/* Floating product cards */}
        <div className="relative mt-14 grid flex-1 items-end gap-4 sm:grid-cols-2 md:mt-10">
          <div data-rev style={{ "--d": "460ms" } as React.CSSProperties} className="md:mb-6">
          <Link
            href="/projects/syncspace"
            style={{ "--float-d": "0s" } as React.CSSProperties}
            className="card-glass float-soft group block w-full max-w-[360px] p-4 text-left md:-rotate-[1.5deg]"
          >
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-full bg-lilac-mist text-[12px] font-bold text-ink-charcoal">
                DH
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-emphasis leading-tight">Dhananjay</p>
                <p className="text-[12px] text-stone-gray">syncspace · main</p>
              </div>
              <GitCommitHorizontal aria-hidden="true" className="size-4 text-stone-gray" strokeWidth={1.75} />
            </div>
            <p className="mt-3 text-[15px] leading-[1.45]">
              Merge concurrent edits with Yjs CRDTs — no locks, no turn-taking, no conflicts.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-1.5 text-[12px]">
                <span className="rounded-full border border-soft-mist bg-white px-2 py-0.5">Yjs</span>
                <span className="rounded-full border border-soft-mist bg-white px-2 py-0.5">Hocuspocus</span>
              </div>
              <span className="link-violet text-[14px] group-hover:decoration-current">Case study</span>
            </div>
          </Link>
          </div>

          <div
            data-rev
            style={{ "--d": "560ms" } as React.CSSProperties}
            className="max-sm:hidden sm:justify-self-end md:mb-20"
          >
          <Link
            href="/projects/paygent"
            style={{ "--float-d": "1.4s" } as React.CSSProperties}
            className="card-glass float-soft group block w-full max-w-[340px] p-4 text-left md:rotate-[1.5deg]"
          >
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-[8px] bg-midnight-wine text-white">
                <Trophy aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-emphasis leading-tight">ETHGlobal HackMoney</p>
                <p className="text-[12px] text-stone-gray">2026 · Partner prize</p>
              </div>
            </div>
            <p className="mt-3 text-[15px] leading-[1.45]">
              Paygent took the Integrate ENS prize — agentic on-chain payments with ENS as the
              control surface.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-full bg-lilac-mist px-2 py-0.5 text-[12px]">Shipped</span>
              <span className="link-violet text-[14px] group-hover:decoration-current">Read the build</span>
            </div>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
