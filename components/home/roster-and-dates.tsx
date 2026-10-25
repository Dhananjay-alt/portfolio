"use client";

type RosterItem = {
  label: string;
  name: string;
  count: string;
};

const ROSTER_ITEMS: RosterItem[] = [
  {
    label: "SYSTEMS",
    name: "Rust & C++",
    count: "04 REPOS",
  },
  {
    label: "FRONTEND",
    name: "TypeScript / Next.js / React / Tailwind",
    count: "12 SHIPPED",
  },
  {
    label: "BACKEND & DATA",
    name: "FastAPI / Node.js / Postgres / Redis",
    count: "06 ENGINES",
  },
  {
    label: "WEB3 PROTOCOLS",
    name: "Solidity / Foundry / viem / ENS / ERC-721",
    count: "03 AUDITED",
  },
  {
    label: "AI & AGENTS",
    name: "Groq LLM / Vision Models / AST / LangGraph",
    count: "05 WORKFLOWS",
  },
  {
    label: "REALTIME & CRDTS",
    name: "Yjs CRDTs / Hocuspocus / WebSockets",
    count: "02 CLUSTERS",
  },
];

type DateEntry = {
  year: string;
  project: string;
  org: string;
  remark: string;
};

const DATES_ENTRIES: DateEntry[] = [
  {
    year: "2026",
    project: "Paygent — Agentic Payments & DeFi",
    org: "ETHGlobal HackMoney",
    remark: "Integrate ENS Prize Winner",
  },
  {
    year: "2026",
    project: "Repo Analyzer — AST & LLM Graph",
    org: "GDSC Open Summer of Code",
    remark: "Solo Shipped Architecture",
  },
  {
    year: "2026",
    project: "SyncSpace — Collaborative Workspace",
    org: "MDG Space, IIT Roorkee",
    remark: "CRDTs + Docker Sandbox",
  },
  {
    year: "2026",
    project: "Vision BGMI Tournament Tracker",
    org: "Esports IIT Roorkee",
    remark: "VLM Extraction Pipeline",
  },
  {
    year: "2025",
    project: "LuxuryAuthNFT — Provenance Engine",
    org: "ETHGlobal ETHOnline",
    remark: "ERC-721 Physical Pairing",
  },
  {
    year: "2024",
    project: "B.Tech Engineering & Code",
    org: "IIT Roorkee",
    remark: "Class of 2028 Matriculation",
  },
];

export function RosterAndDates() {
  return (
    <section
      id="roster"
      className="border-b border-[rgba(237,231,220,0.13)] bg-[#0A0C0E] px-6 py-32 md:px-16"
    >
      <div className="mx-auto max-w-6xl space-y-32">
        {/* Sub-section 1: Hairline Roster */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-[#E8913C]" />
            <span className="font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8]">
              [ 03 / ROSTER ]
            </span>
          </div>

          <h2 className="mb-12 font-syne text-[clamp(28px,4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-[#EDE7DC]">
            CORE CAPABILITIES & STACK
          </h2>

          <div className="divide-y divide-[rgba(237,231,220,0.13)] border-y border-[rgba(237,231,220,0.13)]">
            {ROSTER_ITEMS.map((item) => (
              <div
                key={item.label}
                className="group flex flex-col justify-between py-6 transition-colors duration-200 hover:bg-[#101317]/50 sm:flex-row sm:items-center sm:px-4"
              >
                <div className="mb-2 sm:mb-0 sm:w-1/4">
                  <span className="font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8] group-hover:text-[#E8913C]">
                    [ {item.label} ]
                  </span>
                </div>

                <div className="sm:w-1/2">
                  <span className="font-syne text-[18px] font-semibold tracking-[-0.015em] text-[#EDE7DC] md:text-[22px]">
                    {item.name}
                  </span>
                </div>

                <div className="mt-2 text-left sm:mt-0 sm:w-1/4 sm:text-right">
                  <span className="font-sora text-[11px] uppercase tracking-[0.14em] text-[#6C7378] group-hover:text-[#EDE7DC]">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-section 2: Dates Table */}
        <div id="dates">
          <div className="mb-6 flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-[#E8913C]" />
            <span className="font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8]">
              [ 04 / DATES ]
            </span>
          </div>

          <h2 className="mb-12 font-syne text-[clamp(28px,4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-[#EDE7DC]">
            RECORD OF ENGAGEMENTS
          </h2>

          {/* Desktop Table Headers */}
          <div className="hidden grid-cols-12 border-b border-[rgba(237,231,220,0.13)] pb-4 font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#6C7378] md:grid">
            <div className="col-span-2">YEAR</div>
            <div className="col-span-4">PROJECT / ENGAGEMENT</div>
            <div className="col-span-3">ORGANIZATION / VENUE</div>
            <div className="col-span-3 text-right">CLASSIFICATION</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[rgba(237,231,220,0.13)]">
            {DATES_ENTRIES.map((entry, idx) => (
              <div
                key={idx}
                className="py-5 transition-colors duration-150 hover:bg-[#101317]/50 md:px-2"
              >
                {/* Desktop layout */}
                <div className="hidden grid-cols-12 items-center md:grid">
                  <div className="col-span-2 font-syne text-[18px] font-bold tracking-tight text-[#EDE7DC]">
                    {entry.year}
                  </div>
                  <div className="col-span-4 font-sora text-[13.5px] font-medium text-[#EDE7DC]">
                    {entry.project}
                  </div>
                  <div className="col-span-3 font-sora text-[12.5px] text-[#9EA5A8]">
                    {entry.org}
                  </div>
                  <div className="col-span-3 text-right font-sora text-[11px] uppercase tracking-[0.12em] text-[#E8913C]">
                    {entry.remark}
                  </div>
                </div>

                {/* Mobile collapsed 2-column grid per row */}
                <div className="grid grid-cols-2 gap-y-2 md:hidden">
                  <div className="font-syne text-[18px] font-bold text-[#EDE7DC]">
                    {entry.year}
                  </div>
                  <div className="text-right font-sora text-[10.5px] uppercase tracking-[0.12em] text-[#E8913C]">
                    {entry.remark}
                  </div>
                  <div className="col-span-2 font-sora text-[13px] font-medium text-[#EDE7DC]">
                    {entry.project}
                  </div>
                  <div className="col-span-2 font-sora text-[12px] text-[#9EA5A8]">
                    {entry.org}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
