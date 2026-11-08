import Link from "next/link";
import { ArrowRight, Sparkle } from "lucide-react";

/** Wine strip that sits flush above the header and scrolls away with the page. */
export function AnnouncementBar() {
  return (
    <div data-chrome className="bg-midnight-wine text-white">
      <div className="container-page flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center text-[14px] leading-[1.5]">
        <Sparkle aria-hidden="true" className="size-4 shrink-0 opacity-80" strokeWidth={1.75} />
        <p>
          <span className="max-sm:hidden">Paygent won the ENS partner prize at ETHGlobal HackMoney. </span>
          <span className="sm:hidden">ENS partner prize at HackMoney. </span>
        </p>
        <Link
          href="/projects/paygent"
          className="inline-flex items-center gap-1 rounded-full border border-white/40 px-3 py-0.5 transition-colors hover:border-white hover:bg-white/10"
        >
          Read the build <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}
