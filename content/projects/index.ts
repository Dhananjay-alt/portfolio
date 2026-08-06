import { projectSchema, type Project } from "@/types/project";
import { syncspace } from "./syncspace";
import { paygent } from "./paygent";
import { luxauth } from "./luxauth";
import { repoAnalyzer } from "./repo-analyzer";

/** Derive a flat, de-duplicated tech list from the grouped stack. */
function withAllTech(project: Project): Project {
  const all = Object.values(project.techStack).flat().filter(Boolean) as string[];
  return { ...project, allTech: project.allTech ?? Array.from(new Set(all)) };
}

/** Validate at module load so malformed content fails fast, not at render. */
const raw: Project[] = [syncspace, paygent, luxauth, repoAnalyzer].map((p) =>
  withAllTech(projectSchema.parse(p)),
);

export const projects: Project[] = [...raw].sort(
  (a, b) => a.priority - b.priority,
);
