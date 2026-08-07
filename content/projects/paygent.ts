import type { Project } from "@/types/project";

export const paygent: Project = {
  slug: "paygent",
  title: "Paygent",
  tagline: "Agentic on-chain payments & DeFi automation with ENS.",
  category: "Web3",
  secondaryCategory: "AI",
  year: 2026,
  status: "Hackathon",
  role: "Full-stack Web3 engineer",
  timeline: "ETHGlobal HackMoney 2026 · Jan–Feb 2026",
  priority: 2,
  featured: true,
  context:
    "Built at ETHGlobal HackMoney 2026 and awarded the Integrate ENS partner prize (Paygent V2) — an agent-driven platform that automates liquidity allocation and on-chain settlement, with ENS as the human-readable control surface.",
  links: {
    liveDemo: "", // TODO
    github: "", // TODO
  },
  award: "🏆 ETHGlobal HackMoney 2026 — Integrate ENS Prize",
  techStack: {
    frontend: ["React", "Next.js", "wagmi", "viem"],
    web3: ["Solidity", "Foundry", "ENS"],
    ai: ["Agent orchestration"],
  },
  problem:
    "Managing on-chain payments and DeFi positions is manual, error-prone, and unfriendly: you juggle raw addresses, sign every step by hand, and rebalance liquidity yourself. There's no readable, automated control layer over payment and settlement workflows.",
  approach:
    "Paygent is an agent-driven orchestration layer over payments and DeFi. Agents automate liquidity allocation and on-chain settlement against Solidity contracts for vault, payment, and settlement workflows, while ENS provides human-readable strategy management — you name and manage strategies instead of tracking addresses. wagmi and viem give the frontend a typed interface to wallets and chains.",
  architecture: [
    { layer: "Agents", detail: "Orchestrate liquidity allocation and on-chain settlement automatically" },
    { layer: "Contracts", detail: "Solidity vault / payment / settlement workflows, tested with Foundry" },
    { layer: "ENS control surface", detail: "Human-readable strategy management via ENS names" },
    { layer: "Wallet layer", detail: "wagmi + viem for typed connection, signing, and chain interactions" },
  ],
  features: [
    {
      title: "Pay to a name, not an address",
      description:
        "ENS-based payment UX lets users send funds to readable names — the basis of the partner-prize win.",
    },
    {
      title: "Foundry-tested contracts",
      description:
        "Payment logic is authored and covered by tests in Foundry for confidence before deployment.",
    },
    {
      title: "Typed wallet & chain interactions",
      description:
        "wagmi and viem provide a modern, type-safe interface to wallets and on-chain calls.",
    },
  ],
  challenges: [
    {
      title: "Making ENS resolution feel seamless",
      description:
        "Resolving names to addresses reliably — and handling the cases where a name doesn't resolve — was central to making the payment flow trustworthy rather than surprising.",
    },
    {
      title: "Shipping tested contracts under hackathon time",
      description:
        "Writing Solidity that's both correct and covered by Foundry tests within a hackathon window meant being disciplined about scope and test-first on the money-moving paths.",
    },
  ],
  decisions: [
    {
      title: "Foundry over Hardhat",
      choice: "Used Foundry for contract authoring and testing.",
      rationale:
        "Foundry's Solidity-native tests are fast and let contract logic and its tests live in the same language, which tightened the write-test loop during the hackathon.",
    },
    {
      title: "viem + wagmi over ethers.js",
      choice: "Built the frontend Web3 layer on viem and wagmi.",
      rationale:
        "The viem/wagmi stack is fully typed and has first-class React hooks, cutting boilerplate around wallet state and chain calls and reducing whole categories of runtime errors.",
    },
  ],
  lessons: [
    "Human-readable names are the single biggest UX unlock for on-chain payments — it's what judges and users responded to.",
    "Test-first on money-moving contract paths pays for itself even under hackathon pressure.",
    "A typed Web3 client (viem) removes a surprising amount of foot-gun surface.",
  ],
  metrics: [
    { label: "Award", value: "ENS Partner Prize" },
    { label: "Event", value: "ETHGlobal HackMoney" },
    { label: "Version", value: "Paygent V2" },
  ],
  media: {
    hero: "", // TODO
    screenshots: [], // TODO
  },
  accent: "oklch(0.8 0.13 200)",
};
