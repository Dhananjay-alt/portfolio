import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-heading" className="section-y rule">
      <div className="container-page">
        <SplitHeading id="philosophy-heading" className="text-display max-w-[16ch]">
          Correctness belongs in the data model.
        </SplitHeading>
        <div className="grid-12 mt-12">
          <div className="md:col-span-6 md:col-start-7">
            <Reveal as="p" className="text-lead">
              I design and ship complete systems — from realtime CRDT apps to on-chain protocols and
              agentic developer tools. Pick the right primitive over the clever hack, and the
              interface gets to stay simple.
            </Reveal>
            <Reveal index={1} className="mt-8">
              <Link href="/blog" className="tap link link-accent">
                Read the writing
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
