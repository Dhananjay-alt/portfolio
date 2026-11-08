export type Skill = {
  name: string;
  note: string;
};

export type SkillGroup = {
  category: string;
  accent: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    accent: "#714cb6",
    skills: [
      { name: "TypeScript", note: "Primary language across the stack." },
      { name: "React", note: "Component architecture, hooks, RSC." },
      { name: "Next.js", note: "App Router, SSR/SSG, server actions." },
      { name: "TailwindCSS", note: "Design-system-driven styling." },
    ],
  },
  {
    category: "Backend",
    accent: "#0c4243",
    skills: [
      { name: "FastAPI", note: "Python APIs — used in Repo Analyzer." },
      { name: "Node", note: "JS/TS services and tooling." },
      { name: "Supabase", note: "Realtime + Postgres — used in SyncSpace." },
    ],
  },
  {
    category: "Systems",
    accent: "#421d24",
    skills: [{ name: "Rust", note: "Open-source Ethereum tooling contributions." }],
  },
  {
    category: "Web3",
    accent: "#5c6f4e",
    skills: [
      { name: "Solidity", note: "Smart contracts for Paygent & LuxAuth." },
      { name: "Foundry", note: "Contract testing and deployment." },
      { name: "wagmi", note: "React hooks for wallet/chain state." },
      { name: "viem", note: "Typed Ethereum client." },
      { name: "OpenZeppelin", note: "Audited contract primitives." },
    ],
  },
  {
    category: "AI",
    accent: "#b07a45",
    skills: [
      { name: "LLM integration", note: "Groq / Llama — grounded generation." },
      { name: "Retrieval", note: "RAG over structured content." },
      { name: "Agent workflows", note: "Tool-using, multi-step flows." },
    ],
  },
];
