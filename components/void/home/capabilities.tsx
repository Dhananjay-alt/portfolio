import { WordSplit } from "@/components/ui/word-split";

const CAPABILITIES = [
  {
    label: "Realtime collaboration",
    title: "Conflict-free multiplayer workspaces",
    body: "Concurrent editing without locks, presence that feels local, and untrusted code isolated in ephemeral sandboxes.",
    stack: "Yjs · Hocuspocus · Docker · Postgres RLS",
  },
  {
    label: "Smart contracts",
    title: "Protocol vaults and agent settlement",
    body: "Solidity built test-first with fuzzing and invariants — from ERC-721 provenance to automated liquidity routing.",
    stack: "Solidity · Foundry · ERC-721 · ENS · viem",
  },
  {
    label: "Code intelligence",
    title: "AST graphs and grounded LLM agents",
    body: "Static dependency mapping, cycle detection and AI summaries anchored to real structure rather than guesswork.",
    stack: "FastAPI · NetworkX · Groq Llama 3.3",
  },
  {
    label: "Product engineering",
    title: "Fast, accessible web interfaces",
    body: "Interfaces that hydrate quickly, respect reduced motion and keyboard users, and stay legible under load.",
    stack: "Next.js · React · TypeScript · Tailwind",
  },
  {
    label: "Systems",
    title: "Safe, high-throughput internals",
    body: "Parsers and data paths written with memory layout and concurrency in mind.",
    stack: "Rust · C++ · WebAssembly",
  },
];

export function Capabilities() {
  return (
    <section className="py-[120px]">
      <div className="void-container grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <h2 className="word-reveal text-heading-lg font-normal">
              <WordSplit text="What I build" />
            </h2>
            <p data-rev className="body-light mt-8 max-w-[420px] text-[#bdbdbd]">
              Five disciplines, one habit: treat correctness as a property of the data
              model, not an afterthought.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[60px] md:col-span-7 md:pt-4">
          {CAPABILITIES.map((item, idx) => (
            <div
              key={item.label}
              data-rev
              style={{ "--d": `${idx * 60}ms` } as React.CSSProperties}
            >
              <p className="eyebrow">{item.label}</p>
              <h3 className="mt-3 text-heading-2xs font-normal text-white">{item.title}</h3>
              <p className="body-light mt-3 max-w-[560px] text-[#bdbdbd]">{item.body}</p>
              <p className="mt-3 text-[12px] leading-[1.5] text-[#9a9a9a]">{item.stack}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
