import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

const CAPABILITIES: {
  title: string;
  body: string;
  stack: string;
  href: string;
  proof: string;
}[] = [
  {
    title: "Realtime collaboration",
    body: "Concurrent editing without locks, presence that feels local, and untrusted code isolated in ephemeral sandboxes.",
    stack: "Yjs, Hocuspocus, Docker, Postgres RLS",
    href: "/work/syncspace",
    proof: "SyncSpace",
  },
  {
    title: "Smart contracts",
    body: "Solidity built test-first with fuzzing and invariants — from ERC-721 provenance to automated liquidity routing.",
    stack: "Solidity, Foundry, ERC-721, ENS, viem",
    href: "/work/paygent",
    proof: "Paygent",
  },
  {
    title: "Code intelligence",
    body: "Static dependency mapping, cycle detection and AI summaries anchored to the import graph rather than guesswork.",
    stack: "FastAPI, NetworkX, Groq Llama 3.3",
    href: "/work/repo-analyzer",
    proof: "Repo Analyzer",
  },
  {
    title: "Product engineering",
    body: "Interfaces that hydrate quickly, respect reduced motion and keyboard users, and stay legible under load.",
    stack: "Next.js, React, TypeScript, Tailwind",
    href: "/work",
    proof: "All work",
  },
  {
    title: "Systems",
    body: "Parsers and data paths written with memory layout and concurrency in mind.",
    stack: "Rust, C++, WebAssembly",
    href: "/skills",
    proof: "The stack",
  },
];

/** The five disciplines as a tight ruled list — no cards, no icons. */
export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-heading" className="section-y rule">
      <div className="container-page">
        <div className="grid-12 items-end gap-y-6">
          <SplitHeading id="capabilities-heading" className="text-h1 md:col-span-6">
            What I build
          </SplitHeading>
          <Reveal as="p" className="text-lead text-mute md:col-span-5 md:col-start-8">
            Five disciplines, one habit: treat correctness as a property of the data model, not an
            afterthought.
          </Reveal>
        </div>

        <ul className="mt-[clamp(40px,6vw,80px)] border-b border-line">
          {CAPABILITIES.map((item, idx) => (
            <Reveal
              as="li"
              key={item.title}
              index={idx}
              className="grid-12 items-baseline gap-y-3 border-t border-line py-7"
            >
              <h3 className="text-h3 md:col-span-5">{item.title}</h3>
              <p className="md:col-span-4">{item.body}</p>
              <div className="md:col-span-3 md:text-right">
                <p className="label !normal-case !tracking-normal">{item.stack}</p>
                <Link href={item.href} className="tap link mt-3 text-[length:var(--text-small)]">
                  {item.proof}
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
