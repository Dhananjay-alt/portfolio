import { Constellation } from "@/components/void/constellation";
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
    body: "On-chain design with Solidity and Foundry, ERC-721 provenance at ETHGlobal ETHOnline, and BlocSoc core tooling.",
  },
  {
    year: "2026",
    title: "Multiplayer & agents",
    body: "SyncSpace's CRDT workspace, Paygent's ENS prize at HackMoney, and an AST graph analyzer powered by Groq.",
  },
];

export function Chronology() {
  return (
    <section className="py-[120px]">
      <div className="void-container grid items-center gap-16 md:grid-cols-2 md:gap-20">
        <div className="relative aspect-square w-full max-md:order-2">
          <Constellation shape="orbit" count={1100} seed={42} />
        </div>

        <div>
          <h2 className="word-reveal text-heading-lg font-normal">
            <WordSplit text="Three seasons" />
          </h2>
          <ol className="mt-[60px] flex flex-col gap-12">
            {SEASONS.map((s, idx) => (
              <li
                key={s.year}
                data-rev
                style={{ "--d": `${idx * 80}ms` } as React.CSSProperties}
                className="grid grid-cols-[88px_1fr] gap-6"
              >
                <span className="text-heading-2xs font-normal text-[#9a9a9a]">{s.year}</span>
                <div>
                  <h3 className="text-heading-2xs font-normal text-white">{s.title}</h3>
                  <p className="body-light mt-3 text-[#bdbdbd]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
