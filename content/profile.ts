/**
 * Canonical facts about Dhananjay. Single source of truth for the whole site.
 * TODO markers denote values the owner still needs to supply.
 */

export const profile = {
  name: "Dhananjay Hire",
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
    frontend: ["TypeScript", "JavaScript", "React", "Next.js", "TailwindCSS"],
    backend: ["FastAPI (Python)", "Node.js", "Postgres"],
    systems: ["Rust", "C++"],
    web3: ["Solidity", "Foundry", "wagmi", "viem", "OpenZeppelin"],
    ai: ["LLM integration (Groq / Llama)", "Vision models", "Retrieval", "Agent workflows"],
  },
  communities: [
    { name: "BlocSoc IIT Roorkee", role: "Blockchain society" },
    { name: "GDSC IIT Roorkee", role: "Google Developer Student Clubs" },
    { name: "Esports IITR", role: "Operations team" },
  ],
  highlights: [
    "Multiple ETHGlobal builds, incl. an ENS partner-prize win at HackMoney",
    "Solo and team full-stack products shipped end to end",
    "Open-source contribution (Rust / Ethereum tooling)",
  ],
  // From résumé. Swap to a personal address here if you prefer a durable one.
  email: "dhananjay_h@mt.iitr.ac.in",
  resumeUrl: "/resume.pdf", // generated from Dhananjay_Hire_Resume.docx
  headshot: "/headshot.jpg", // TODO: add headshot to /public
} as const;

export type Profile = typeof profile;
