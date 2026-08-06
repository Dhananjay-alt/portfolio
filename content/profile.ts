/**
 * Canonical facts about Dhananjay. Single source of truth for the whole site.
 * TODO markers denote values the owner still needs to supply.
 */

export const profile = {
  name: "Dhananjay",
  role: "Full-Stack & Web3 Engineer",
  tagline:
    "Full-stack engineer who ships — from CRDT-backed realtime apps to on-chain protocols and AI-powered developer tooling.",
  location: "IIT Roorkee, India",
  education: {
    degree: "B.Tech, Metallurgical & Materials Engineering",
    school: "IIT Roorkee",
    graduationYear: 2028,
    note: "Active focus on software engineering rather than the core degree field.",
  },
  bio: [
    "I'm a full-stack and Web3 engineer studying at IIT Roorkee, more at home in a codebase than a foundry.",
    "I build end-to-end products: realtime collaborative apps backed by CRDTs, on-chain protocols with Solidity and Foundry, and AI-powered developer tooling.",
    "Multiple ETHGlobal builds — including an ENS partner-prize win at HackMoney — plus open-source work on Rust and Ethereum tooling.",
  ],
  stack: {
    frontend: ["TypeScript", "React", "Next.js"],
    backend: ["FastAPI (Python)", "Node"],
    systems: ["Rust"],
    web3: ["Solidity", "Foundry", "wagmi", "viem", "OpenZeppelin"],
    ai: ["LLM integration (Groq / Llama)", "Retrieval", "Agent workflows"],
  },
  communities: [
    { name: "BlocSoc IIT Roorkee", role: "Blockchain society" },
    { name: "GDSC IIT Roorkee", role: "Google Developer Student Clubs" },
  ],
  highlights: [
    "Multiple ETHGlobal builds, incl. an ENS partner-prize win at HackMoney",
    "Solo and team full-stack products shipped end to end",
    "Open-source contribution (Rust / Ethereum tooling)",
  ],
  // TODO: confirm/replace before launch
  email: "hackerxdhananjay@gmail.com", // TODO: confirm public contact address
  resumeUrl: "/resume.pdf", // TODO: add resume PDF to /public
  headshot: "/headshot.jpg", // TODO: add headshot to /public
} as const;

export type Profile = typeof profile;
