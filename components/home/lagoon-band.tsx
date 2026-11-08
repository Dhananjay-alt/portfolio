import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WordSplit } from "@/components/ui/word-split";

/**
 * The only dark surface in the system: full-bleed deep lagoon, a collage of
 * photography, translucent rectangles and handwritten notes on the left,
 * a white light-cut headline on the right.
 */
export function LagoonBand() {
  return (
    <section className="overflow-hidden bg-deep-lagoon text-white">
      <div className="container-page grid items-center gap-14 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        {/* Collage */}
        <div aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
          <div className="absolute left-[2%] top-[4%] h-[46%] w-[44%] rounded-[16px] bg-[rgba(212,199,255,0.5)]" />
          <div className="absolute bottom-[2%] right-[0%] h-[40%] w-[52%] rounded-[16px] bg-[rgba(132,168,255,0.45)]" />
          <div className="absolute bottom-[14%] left-[8%] h-[30%] w-[30%] rounded-[16px] bg-[rgba(255,176,204,0.45)]" />

          <div className="grain absolute inset-[12%_8%_14%_14%] overflow-hidden rounded-[16px]">
            <Image
              src="/images/portal-hero.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover object-[62%_50%]"
            />
          </div>

          <div className="absolute right-[2%] top-[0%] w-[42%] rounded-[16px] border border-white/30 bg-white/12 p-3 backdrop-blur-md">
            <p className="text-[12px] text-white/70">invariant</p>
            <p className="mt-1 text-[14px] leading-[1.35]">merge(a, b) = merge(b, a)</p>
          </div>

          <p className="absolute -left-[2%] bottom-[0%] -rotate-[5deg] font-script text-[30px] leading-none text-white sm:text-[36px]">
            no locks, no turns
          </p>
          <p className="absolute right-[4%] top-[34%] rotate-[4deg] font-script text-[24px] leading-none text-white/90 sm:text-[28px]">
            correct by construction
          </p>
        </div>

        {/* Copy */}
        <div>
          <h2 className="word-reveal text-display font-normal text-white">
            <WordSplit text="Correctness belongs in the data model." />
          </h2>
          <p data-rev className="mt-6 max-w-[480px] text-[18px] leading-[1.5] text-white/80">
            I design and ship complete systems — from realtime CRDT apps to on-chain protocols and
            agentic developer tools. Pick the right primitive over the clever hack, and the
            interface gets to stay simple.
          </p>
          <div data-rev style={{ "--d": "120ms" } as React.CSSProperties} className="mt-10">
            <Link href="/blog" className="btn-outline-light">
              Read the writing <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
