import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WordSplit } from "@/components/ui/word-split";

/**
 * Atmospheric closing band: layered radial glows (violet, blue, pink, cyan)
 * over parchment with a monospaced code whisper. Decorative only.
 */
export function GradientBanner() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 38% 70% at 68% 50%, rgba(113, 76, 182, 0.55), transparent 70%)",
            "radial-gradient(ellipse 30% 70% at 93% 50%, rgba(92, 140, 255, 0.55), transparent 70%)",
            "radial-gradient(ellipse 50% 45% at 50% 98%, rgba(255, 150, 190, 0.5), transparent 70%)",
            "radial-gradient(ellipse 45% 40% at 50% 75%, rgba(110, 220, 230, 0.5), transparent 70%)",
            "#f2f0eb",
          ].join(", "),
        }}
      />
      <pre
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-0 -z-10 hidden select-none overflow-hidden pt-8 font-mono text-[12px] leading-[1.7] text-ink-charcoal/15 lg:block"
      >
        {`const doc = new Y.Doc();
provider.on("sync", () => ready());
// merge(a, b) === merge(b, a)
contract Paygent { ... }
graph.find_cycles(modules);
await sandbox.run(code, { net: false });`}
      </pre>

      <div className="container-page flex flex-col gap-10 py-20 md:flex-row md:items-end md:justify-between md:py-28">
        <div className="max-w-[640px]">
          <h2 className="word-reveal text-[clamp(36px,4.4vw,48px)] font-normal leading-[1] tracking-[-0.027em]">
            <WordSplit text="Let's build what ships." />
          </h2>
          <p data-rev className="mt-5 max-w-[480px] text-[18px] leading-[1.5] text-ink-charcoal/80">
            Open to protocols, multiplayer engines and founding teams. Based at IIT Roorkee,
            working across timezones.
          </p>
        </div>
        <div data-rev className="flex flex-wrap items-center gap-6">
          <Link href="/resume" className="btn-ghost">
            Résumé
          </Link>
          <Link href="/contact" className="btn-paper">
            Start a conversation <ArrowRight className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
