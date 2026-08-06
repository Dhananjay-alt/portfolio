import type { Project } from "@/types/project";

export const paygent: Project = {
  slug: "paygent",
  title: "Paygent",
  tagline: "On-chain payments dApp with ENS.",
  category: "Web3",
  year: 2024,
  status: "Hackathon",
  role: "Full-stack Web3 engineer",
  timeline: "Built at ETHGlobal HackMoney",
  priority: 2,
  featured: true,
  context:
    "Built at ETHGlobal HackMoney and awarded an ENS partner prize (Paygent V2) — a payments-focused decentralized app that lets people transact using human-readable names instead of raw addresses.",
  links: {
    liveDemo: "", // TODO
    github: "", // TODO
  },
  award: "🏆 ETHGlobal HackMoney — ENS Partner Prize",
  techStack: {
    frontend: ["React", "Next.js", "wagmi", "viem"],
    web3: ["Solidity", "Foundry", "ENS"],
  },
  problem:
    "Crypto payments still ask people to copy-paste 42-character hexadecimal addresses, where a single wrong character means funds are gone forever. That friction and risk keeps on-chain payments intimidating for anyone who isn't already deep in the ecosystem.",
  approach:
    "Paygent puts ENS at the center of the payment flow: you send to a human-readable name, and the app resolves it to an address under the hood. Smart contracts authored and tested with Foundry handle the on-chain logic, while the frontend orchestrates wallet connections and chain interactions through wagmi and viem for a clean, typed Web3 surface.",
  architecture: [
    { layer: "Contracts", detail: "Solidity payment contracts, authored and tested with Foundry" },
    { layer: "Name resolution", detail: "ENS resolves human-readable names to addresses in the payment path" },
    { layer: "Wallet layer", detail: "wagmi + viem handle connection, signing, and chain interactions" },
    { layer: "Frontend", detail: "React / Next.js payment UX built around names, not addresses" },
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
