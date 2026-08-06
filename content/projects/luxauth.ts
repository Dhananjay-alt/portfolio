import type { Project } from "@/types/project";

export const luxauth: Project = {
  slug: "luxauth",
  title: "LuxAuth",
  tagline: "NFT-based authentication & provenance for luxury goods.",
  category: "Web3",
  secondaryCategory: "Full-Stack",
  year: 2025,
  status: "Hackathon",
  role: "Full-stack Web3 engineer",
  timeline: "Built at ETHGlobal ETHOnline 2025",
  priority: 3,
  featured: true,
  context:
    "Built at ETHOnline 2025 (project name: LuxuryAuthNFT) — on-chain certificates of authenticity so buyers can verify provenance and brands can prove their products are genuine.",
  links: {
    liveDemo: "", // TODO
    github: "", // TODO
  },
  award: "ETHGlobal ETHOnline 2025",
  techStack: {
    frontend: ["Next.js", "TailwindCSS"],
    web3: ["Solidity", "Foundry", "ERC-721"],
    infra: ["IPFS"],
  },
  problem:
    "The luxury market is riddled with counterfeits, and paper certificates or brand databases are easy to forge and impossible for a buyer to independently verify. There's no portable, tamper-proof way to prove a specific physical item is the genuine article.",
  approach:
    "LuxAuth issues each authenticated product an ERC-721 certificate whose metadata is pinned to IPFS, making authenticity a public, on-chain, tamper-evident fact. Brands mint certificates through a verification dashboard; end-buyers verify an item via a public QR / hash page that checks the certificate on-chain — no trust in a central database required.",
  architecture: [
    { layer: "Certificates", detail: "ERC-721 tokens represent per-product certificates of authenticity" },
    { layer: "Metadata", detail: "Certificate metadata pinned to IPFS for tamper-evident storage" },
    { layer: "Issuer tools", detail: "Brand-verification dashboard + minting portal for authenticated products" },
    { layer: "Verification", detail: "Public QR / hash page lets any buyer check authenticity on-chain" },
  ],
  features: [
    {
      title: "ERC-721 certificates of authenticity",
      description:
        "Every genuine product gets a unique on-chain certificate, with metadata pinned to IPFS.",
    },
    {
      title: "Brand-verification dashboard",
      description:
        "Verified issuers get a dashboard to manage and mint certificates for their products.",
    },
    {
      title: "Minting portal",
      description:
        "A dedicated flow for issuing certificates to authenticated products at the point of sale or manufacture.",
    },
    {
      title: "Public verification page",
      description:
        "Buyers scan a QR or check a hash to independently confirm an item's authenticity — no brand login needed.",
    },
  ],
  challenges: [
    {
      title: "Binding a physical item to a token",
      description:
        "The hard part of provenance is the physical-to-digital link. Designing the QR / hash verification so a buyer can trust the mapping — without a central authority — drove the whole architecture.",
    },
    {
      title: "Keeping metadata tamper-evident",
      description:
        "Certificate details have to be immutable to be worth anything. Pinning metadata to IPFS and referencing it from the token made forgery detectable.",
    },
  ],
  decisions: [
    {
      title: "IPFS for metadata over on-chain storage",
      choice: "Pinned certificate metadata to IPFS, referenced by the token.",
      rationale:
        "Storing rich metadata fully on-chain is prohibitively expensive. IPFS keeps it tamper-evident and content-addressed while the token holds the authoritative pointer, balancing cost and integrity.",
    },
    {
      title: "ERC-721 over a custom registry",
      choice: "Modeled certificates as standard ERC-721 tokens.",
      rationale:
        "Using the NFT standard means wallets, explorers, and marketplaces understand certificates out of the box, and it inherits a battle-tested ownership model instead of a bespoke one.",
    },
  ],
  lessons: [
    "Provenance is a UX problem as much as a contract problem — the verification page is what makes it real for buyers.",
    "Content-addressed storage (IPFS) is the right default for anything that must be tamper-evident but not on-chain.",
    "Standards (ERC-721) buy you an entire ecosystem of tooling for free.",
  ],
  metrics: [
    { label: "Standard", value: "ERC-721" },
    { label: "Metadata", value: "IPFS-pinned" },
    { label: "Event", value: "ETHOnline 2025" },
  ],
  media: {
    hero: "", // TODO
    screenshots: [], // TODO
  },
  accent: "oklch(0.78 0.15 85)",
};
