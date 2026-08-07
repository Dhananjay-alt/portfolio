import { describe, it, expect } from "vitest";
import {
  personSchema,
  websiteSchema,
  projectSchema,
  blogPostingSchema,
  breadcrumbSchema,
} from "@/lib/structured-data";
import { getProjectBySlug } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";

describe("structured data (JSON-LD)", () => {
  it("person schema has the right type and fields", () => {
    const p = personSchema();
    expect(p["@type"]).toBe("Person");
    expect(p.name).toBeTruthy();
    expect(Array.isArray(p.knowsAbout)).toBe(true);
    expect(p.knowsAbout.length).toBeGreaterThan(0);
  });

  it("website schema is a WebSite", () => {
    expect(websiteSchema()["@type"]).toBe("WebSite");
  });

  it("project schema reflects the project and its award", () => {
    const paygent = getProjectBySlug("paygent")!;
    const s = projectSchema(paygent);
    expect(s["@type"]).toBe("SoftwareApplication");
    expect(s.name).toBe("Paygent");
    expect(s.url).toMatch(/\/projects\/paygent$/);
    expect(s.award).toMatch(/ENS/);
  });

  it("blog posting schema reflects the post", () => {
    const post = getAllPosts()[0];
    const s = blogPostingSchema(post);
    expect(s["@type"]).toBe("BlogPosting");
    expect(s.headline).toBe(post.title);
    expect(s.url).toContain(`/blog/${post.slug}`);
  });

  it("breadcrumb schema numbers items in order", () => {
    const s = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
    ]);
    expect(s["@type"]).toBe("BreadcrumbList");
    expect(s.itemListElement.map((i) => i.position)).toEqual([1, 2]);
  });
});
