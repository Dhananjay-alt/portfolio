export type ExperienceEntry = {
  title: string;
  org: string;
  period: string;
  kind: "Hackathon" | "Project" | "Community" | "Education";
  description: string;
  highlights?: string[];
  href?: string; // internal project link where relevant
};

/** Reverse-chronological timeline. Dates are approximate where only the event is known. */
export const experience: ExperienceEntry[] = [
  {
    title: "LuxAuth — NFT provenance for luxury goods",
    org: "ETHGlobal · ETHOnline 2025",
    period: "2025",
    kind: "Hackathon",
    description:
      "Built on-chain certificates of authenticity (ERC-721 + IPFS) with a brand dashboard, minting portal, and public verification page.",
    highlights: ["Solidity + Foundry", "ERC-721 / IPFS", "Next.js"],
    href: "/projects/luxauth",
  },
  {
    title: "SyncSpace — realtime collaborative workspace",
    org: "Nebula · MDG Space, IIT Roorkee",
    period: "2025",
    kind: "Project",
    description:
      "A multiplayer study & coding workspace with CRDT-backed realtime editing, live presence, and Docker-sandboxed code execution.",
    highlights: ["Yjs CRDTs", "Supabase", "Docker sandbox"],
    href: "/projects/syncspace",
  },
  {
    title: "Repo Analyzer — dependency visualizer with AI",
    org: "GDSC IIT Roorkee · Open Summer of Code",
    period: "2025",
    kind: "Project",
    description:
      "Solo build: static dependency mapping, circular-dependency detection, complexity metrics, and role-aware AI summaries via Groq.",
    highlights: ["FastAPI", "networkx / radon", "Groq (Llama 3.3)"],
    href: "/projects/repo-analyzer",
  },
  {
    title: "Paygent — on-chain payments with ENS",
    org: "ETHGlobal · HackMoney",
    period: "2024",
    kind: "Hackathon",
    description:
      "Payments dApp using ENS names instead of raw addresses. Won the ENS partner prize (Paygent V2).",
    highlights: ["🏆 ENS Partner Prize", "Solidity + Foundry", "wagmi / viem"],
    href: "/projects/paygent",
  },
  {
    title: "Member — Blockchain Society (BlocSoc)",
    org: "BlocSoc IIT Roorkee",
    period: "2024 — present",
    kind: "Community",
    description:
      "Active in the campus blockchain community — building, learning, and shipping Web3 projects with peers.",
  },
  {
    title: "Member — Google Developer Student Clubs",
    org: "GDSC IIT Roorkee",
    period: "2024 — present",
    kind: "Community",
    description:
      "Contributing to developer-community initiatives, including the Open Summer of Code program.",
  },
  {
    title: "B.Tech, Metallurgical & Materials Engineering",
    org: "IIT Roorkee",
    period: "2024 — 2028",
    kind: "Education",
    description:
      "Pursuing the degree while focusing heavily on software engineering — full-stack, Web3, and AI systems.",
  },
];
