import { WordSplit } from "@/components/ui/word-split";

const SEASONS = [
  {
    year: "2024",
    title: "Systems & foundations",
    body: "Arrived at IIT Roorkee and went low-level: C++, Rust, memory layout and algorithmic fundamentals.",
  },
  {
    year: "2025",
    title: "Protocols & provenance",
    body: "On-chain design with Solidity and Foundry, and ERC-721 provenance for luxury goods at ETHGlobal ETHOnline.",
  },
  {
    year: "2026",
    title: "Multiplayer & agents",
    body: "SyncSpace's CRDT workspace, Paygent's ENS prize at HackMoney, and an AST graph analyzer powered by Groq.",
  },
];

export function Seasons() {
  return (
    <section className="section-y">
      <div className="container-page">
        <h2 className="word-reveal text-heading-lg font-normal">
          <WordSplit text="Three seasons" />
        </h2>
        <ol className="mt-10 grid divide-y divide-soft-mist overflow-hidden rounded-[16px] border border-soft-mist bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
          {SEASONS.map((s, idx) => (
            <li
              key={s.year}
              data-rev
              style={{ "--d": `${idx * 80}ms` } as React.CSSProperties}
              className="flex flex-col p-6 md:p-8"
            >
              <span className="tabular text-heading-lg font-normal text-midnight-wine">{s.year}</span>
              <h3 className="mt-6 text-label-bold font-bold tracking-normal">{s.title}</h3>
              <p className="mt-2 text-[16px] leading-[1.5] text-stone-gray">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
