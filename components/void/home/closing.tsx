import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Constellation } from "@/components/void/constellation";
import { WordSplit } from "@/components/ui/word-split";

export function Closing() {
  return (
    <section className="py-[120px]">
      <div className="void-container grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="word-reveal text-display font-normal">
            <WordSplit text="Let's build" />
            <br />
            <WordSplit text="what ships." baseDelayMs={80} highlightWord="ships." />
          </h2>
          <p data-rev className="body-light mt-8 max-w-[480px] text-white">
            Open to protocols, multiplayer engines and founding teams. Based at IIT
            Roorkee, working across timezones.
          </p>
          <div data-rev className="mt-12 flex flex-wrap items-center gap-8">
            <Link href="/contact" className="btn-iris">
              Start a conversation
            </Link>
            <Link href="/resume" className="btn-ghost">
              Résumé <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <div className="relative aspect-square w-full max-md:hidden">
          <Constellation shape="seal" count={1200} seed={99} />
        </div>
      </div>
    </section>
  );
}
