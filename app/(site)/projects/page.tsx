import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { getAllProjects, getAllCategories } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "SyncSpace, Paygent, LuxAuth, and Repo Analyzer — realtime, Web3, and AI developer tools, each with a full case study.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getAllCategories();

  return (
    <PageShell
      eyebrow="Projects"
      title="Things I've shipped, end to end."
      description="Each of these has a product-page-quality case study covering the problem, architecture, real engineering decisions, and what I'd do differently."
    >
      <ProjectsExplorer projects={projects} categories={categories} />
    </PageShell>
  );
}
