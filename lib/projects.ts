import { projects } from "@/content/projects";
import type { Project } from "@/types/project";

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

/** Previous/next in priority order, wrapping around, for detail-page nav. */
export function getAdjacentProject(slug: string): Project {
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  return next;
}

export function getAllCategories(): string[] {
  const set = new Set<string>();
  for (const p of projects) {
    set.add(p.category);
    if (p.secondaryCategory) set.add(p.secondaryCategory);
  }
  return Array.from(set);
}
