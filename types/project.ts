import { z } from "zod";

export const projectCategories = [
  "Realtime",
  "Full-Stack",
  "Web3",
  "Developer Tools",
  "AI",
] as const;

export const projectStatuses = ["Live", "Demo", "Hackathon", "Archived"] as const;

const techGroupSchema = z.object({
  frontend: z.array(z.string()).optional(),
  backend: z.array(z.string()).optional(),
  web3: z.array(z.string()).optional(),
  infra: z.array(z.string()).optional(),
  ai: z.array(z.string()).optional(),
});

const linkSchema = z.object({
  liveDemo: z.string().optional(),
  github: z.string().optional(),
  caseStudy: z.string().optional(),
});

const titledEntry = z.object({
  title: z.string(),
  description: z.string(),
});

const decisionSchema = z.object({
  title: z.string(),
  choice: z.string(),
  rationale: z.string(),
});

const metricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const architectureStepSchema = z.object({
  layer: z.string(),
  detail: z.string(),
});

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  category: z.enum(projectCategories),
  secondaryCategory: z.enum(projectCategories).optional(),
  year: z.number(),
  status: z.enum(projectStatuses),
  role: z.string(),
  timeline: z.string(),
  /** Lower number = higher priority in rails and listings. */
  priority: z.number(),
  featured: z.boolean().default(false),
  context: z.string(),
  links: linkSchema,
  award: z.string().optional(),
  techStack: techGroupSchema,
  /** Flat, de-duplicated tech list for badges + filtering (derived if omitted). */
  allTech: z.array(z.string()).optional(),
  problem: z.string(),
  approach: z.string(),
  architecture: z.array(architectureStepSchema),
  features: z.array(titledEntry),
  challenges: z.array(titledEntry),
  decisions: z.array(decisionSchema),
  lessons: z.array(z.string()),
  metrics: z.array(metricSchema).optional(),
  media: z.object({
    hero: z.string().optional(),
    screenshots: z.array(z.string()).default([]),
    video: z.string().optional(),
  }),
  accent: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectStatus = (typeof projectStatuses)[number];
