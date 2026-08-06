import { profile } from "@/content/profile";

export const siteConfig = {
  name: `${profile.name} — ${profile.role}`,
  shortName: profile.name,
  description:
    "Portfolio of Dhananjay, a full-stack & Web3 engineer shipping realtime apps, on-chain protocols, and AI-powered developer tools.",
  // TODO: set final production domain
  url: "https://dhananjay.dev",
  ogImage: "/og.png",
  keywords: [
    "Dhananjay",
    "Full-Stack Engineer",
    "Web3 Engineer",
    "Solidity",
    "Next.js",
    "React",
    "Rust",
    "IIT Roorkee",
    "ETHGlobal",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
