import Link from "next/link";
import { ArrowRight, Boxes, Code2, Cpu, FileCode2, Network, type LucideIcon } from "lucide-react";
import { WordSplit } from "@/components/ui/word-split";

const CAPABILITIES: {
  icon: LucideIcon;
  title: string;
  body: string;
  stack: string;
  href: string;
  cta: string;
}[] = [
  {
    icon: Network,
    title: "Realtime collaboration",
    body: "Concurrent editing without locks, presence that feels local, and untrusted code isolated in ephemeral sandboxes.",
    stack: "Yjs · Hocuspocus · Docker · Postgres RLS",
    href: "/projects/syncspace",
    cta: "See SyncSpace",
  },
  {
    icon: FileCode2,
    title: "Smart contracts",
    body: "Solidity built test-first with fuzzing and invariants — from ERC-721 provenance to automated liquidity routing.",
    stack: "Solidity · Foundry · ERC-721 · ENS · viem",
    href: "/projects/paygent",
    cta: "See Paygent",
  },
  {
    icon: Boxes,
    title: "Code intelligence",
    body: "Static dependency mapping, cycle detection and AI summaries anchored to real structure rather than guesswork.",
    stack: "FastAPI · NetworkX · Groq Llama 3.3",
    href: "/projects/repo-analyzer",
    cta: "See Repo Analyzer",
  },
  {
    icon: Code2,
    title: "Product engineering",
    body: "Interfaces that hydrate quickly, respect reduced motion and keyboard users, and stay legible under load.",
    stack: "Next.js · React · TypeScript · Tailwind",
    href: "/projects",
    cta: "Browse projects",
  },
  {
    icon: Cpu,
    title: "Systems",
    body: "Parsers and data paths written with memory layout and concurrency in mind.",
    stack: "Rust · C++ · WebAssembly",
    href: "/skills",
    cta: "See the stack",
  },
];

export function CapabilityCards() {
  return (
    <section className="section-y pt-0 md:pt-0">
      <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col justify-end pb-2 pr-6 sm:col-span-2 lg:col-span-1">
          <h2 className="word-reveal text-heading-lg font-normal">
            <WordSplit text="What I build" />
          </h2>
          <p data-rev className="mt-4 max-w-[380px] text-[18px] leading-[1.5] text-stone-gray">
            Five disciplines, one habit: treat correctness as a property of the data model, not an
            afterthought.
          </p>
        </div>

        {CAPABILITIES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              data-rev
              style={{ "--d": `${idx * 60}ms` } as React.CSSProperties}
              className="card-paper flex flex-col p-4 sm:p-6"
            >
              <span className="grid size-9 place-items-center rounded-[8px] bg-lilac-mist">
                <Icon aria-hidden="true" className="size-[18px] text-midnight-wine" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-label-bold font-bold tracking-normal">{item.title}</h3>
              <p className="mt-2 text-[16px] leading-[1.5]">{item.body}</p>
              <p className="mt-3 text-[14px] text-stone-gray">{item.stack}</p>
              <Link href={item.href} className="link-violet mt-auto self-start pt-6">
                {item.cta} <ArrowRight className="size-4" strokeWidth={1.75} />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
