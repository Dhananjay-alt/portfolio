export type ExperienceEntry = {
  title: string;
  org: string;
  period: string;
  kind: "Hackathon" | "Project" | "Community" | "Education";
  description: string;
  highlights?: string[];
  href?: string; // internal project link where relevant
};

/** Reverse-chronological timeline, from Dhananjay's résumé. */
export const experience: ExperienceEntry[] = [
  {
    title: "Operations Team",
    org: "Esports IITR",
    period: "Nov 2024 — Present",
    kind: "Community",
    description:
      "Run on-ground operations and crowd management for esports events, and built an internal tool to automate score and points tracking during live matches.",
    highlights: ["Event ops", "Automation"],
  },
  {
    title: "Repo Analyzer — dependency visualizer with AI",
    org: "GDSC IIT Roorkee · Open Summer of Code",
    period: "Jun–Jul 2026",
    kind: "Project",
    description:
      "Solo build: static dependency mapping via Python's ast, circular-dependency detection (networkx), complexity metrics (radon), and cached, context-aware LLM file summaries.",
    highlights: ["FastAPI", "React Flow", "networkx", "Groq"],
    href: "/projects/repo-analyzer",
  },
  {
    title: "SyncSpace — realtime collaborative workspace",
    org: "MDG Space, IIT Roorkee",
    period: "May–Jun 2026",
    kind: "Project",
    description:
      "Real-time notes + code editor using Yjs CRDTs over a custom Hocuspocus WebSocket server with Postgres snapshots and row-level security; per-run Docker sandbox for untrusted Python.",
    highlights: ["Yjs CRDTs", "Hocuspocus", "Postgres RLS", "Docker"],
    href: "/projects/syncspace",
  },
  {
    title: "Vision-powered score & leaderboard tracker",
    org: "Esports IITR",
    period: "Mar–Apr 2026",
    kind: "Project",
    description:
      "Full-stack app that extracts BGMI match results from screenshots via a Groq vision-language model, with human-in-the-loop review, RapidFuzz roster matching, and config-driven scoring.",
    highlights: ["FastAPI", "Groq vision", "RapidFuzz", "Postgres"],
  },
  {
    title: "Coordinator — Esports vertical",
    org: "Cognizance, IIT Roorkee",
    period: "Mar 2026",
    kind: "Community",
    description:
      "Led the esports vertical of IIT Roorkee's annual technical fest — tournament logistics, registrations, scheduling, and inter-college coordination across 100+ institutions.",
  },
  {
    title: "Paygent — agentic payments & DeFi automation",
    org: "ETHGlobal · HackMoney 2026",
    period: "Jan–Feb 2026",
    kind: "Hackathon",
    description:
      "Agent-driven orchestration of liquidity allocation and on-chain settlement, with ENS-based strategy management and Solidity vault/payment/settlement contracts. Won the Integrate ENS prize.",
    highlights: ["🏆 Integrate ENS Prize", "Solidity + Foundry", "Agents", "ENS"],
    href: "/projects/paygent",
  },
  {
    title: "LuxuryAuthNFT — on-chain luxury authentication",
    org: "ETHGlobal · ETHOnline 2025",
    period: "Sept 2025",
    kind: "Hackathon",
    description:
      "NFT provenance pairing physical goods with ERC-721 certificates — brand-gated minting, IPFS metadata, and public QR/hash verification. Foundry-tested Solidity, Next.js frontend.",
    highlights: ["ERC-721", "Foundry", "IPFS", "Next.js"],
    href: "/projects/luxauth",
  },
  {
    title: "Volunteer — Navodaya Cell",
    org: "NSS IIT Roorkee",
    period: "Oct 2024 — May 2025",
    kind: "Community",
    description:
      "Taught Mathematics to Class 5 and Class 8 students preparing for the JNVST exam and designed mock papers on the JNVST pattern, as part of an NSS outreach initiative.",
  },
  {
    title: "B.Tech, Metallurgical & Materials Engineering",
    org: "IIT Roorkee",
    period: "2024 — 2028",
    kind: "Education",
    description:
      "Pursuing the degree while focusing heavily on software engineering — full-stack, systems, Web3, and AI.",
  },
];
