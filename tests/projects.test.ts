import { describe, it, expect } from "vitest";
import {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectSlugs,
  getAdjacentProject,
  getAllCategories,
} from "@/lib/projects";
import { projectSchema } from "@/types/project";

describe("projects content", () => {
  it("loads exactly the four featured projects", () => {
    const projects = getAllProjects();
    expect(projects).toHaveLength(4);
    expect(getProjectSlugs()).toEqual(
      expect.arrayContaining(["syncspace", "paygent", "luxauth", "repo-analyzer"]),
    );
  });

  it("is sorted by priority with SyncSpace first", () => {
    const projects = getAllProjects();
    const priorities = projects.map((p) => p.priority);
    expect(priorities).toEqual([...priorities].sort((a, b) => a - b));
    expect(projects[0].slug).toBe("syncspace");
  });

  it("every project passes the schema and has derived allTech", () => {
    for (const p of getAllProjects()) {
      expect(() => projectSchema.parse(p)).not.toThrow();
      expect(p.allTech && p.allTech.length).toBeGreaterThan(0);
      // allTech is de-duplicated
      expect(new Set(p.allTech).size).toBe(p.allTech!.length);
    }
  });

  it("looks up by slug and returns undefined for unknown", () => {
    expect(getProjectBySlug("paygent")?.title).toBe("Paygent");
    expect(getProjectBySlug("nope")).toBeUndefined();
  });

  it("all featured projects are marked featured", () => {
    expect(getFeaturedProjects()).toHaveLength(4);
  });

  it("adjacent project wraps around", () => {
    // repo-analyzer is last (priority 4) -> next wraps to syncspace
    expect(getAdjacentProject("repo-analyzer").slug).toBe("syncspace");
    expect(getAdjacentProject("syncspace").slug).toBe("paygent");
  });

  it("collects categories used across projects", () => {
    const cats = getAllCategories();
    expect(cats).toEqual(
      expect.arrayContaining(["Realtime", "Web3", "Developer Tools"]),
    );
  });

  it("Repo Analyzer records the Groq-over-Gemini decision", () => {
    const repo = getProjectBySlug("repo-analyzer")!;
    const decision = repo.decisions.find((d) => /Groq/.test(d.title));
    expect(decision).toBeDefined();
    expect(decision!.rationale).toMatch(/Gemini/);
  });
});
