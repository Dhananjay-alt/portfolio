import { projects } from "@/content/projects";
import type { Project } from "@/types/project";
import type { WorkItem } from "@/components/work/work-list";
import type { PreviewProject } from "@/components/work/project-preview";

export function toPreview(p: Project): PreviewProject {
  return {
    slug: p.slug,
    title: p.title,
    year: p.year,
    architecture: p.architecture,
    hero: p.media.hero || undefined,
  };
}

/** Trim projects to what the work list renders (it ships to the client). */
export function getWorkItems(): WorkItem[] {
  return projects.map((p) => ({
    ...toPreview(p),
    outcome: p.outcome,
    tags: [...p.tags],
    badge: p.badge,
  }));
}
