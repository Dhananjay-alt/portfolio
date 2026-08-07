import { describe, it, expect } from "vitest";
import { getAllPosts, getAllPostSlugs, getPost, slugify } from "@/lib/blog";

describe("blog", () => {
  it("slugify matches heading anchor expectations", () => {
    expect(slugify("The vague-summary problem")).toBe("the-vague-summary-problem");
    expect(slugify("Why CRDTs? (a note)")).toBe("why-crdts-a-note");
    // whitespace runs collapse to a single dash (matches github-slugger)
    expect(slugify("  Trim  Me  ")).toBe("trim-me");
  });

  it("lists posts sorted newest-first", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThanOrEqual(4);
    const dates = posts.map((p) => p.date);
    expect(dates).toEqual([...dates].sort((a, b) => (a < b ? 1 : -1)));
  });

  it("every post has required frontmatter and a reading time", () => {
    for (const p of getAllPosts()) {
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Array.isArray(p.tags)).toBe(true);
      expect(p.readingTime).toMatch(/min read/);
    }
  });

  it("getPost returns content + headings for a known slug", () => {
    const slug = getAllPostSlugs()[0];
    const post = getPost(slug);
    expect(post).not.toBeNull();
    expect(post!.content.length).toBeGreaterThan(0);
    // Headings should carry a depth and a slug matching slugify(text)
    for (const h of post!.headings) {
      expect([2, 3]).toContain(h.depth);
      expect(h.slug).toBe(slugify(h.text));
    }
  });

  it("returns null for an unknown post", () => {
    expect(getPost("does-not-exist")).toBeNull();
  });

  it("ignores fenced code when extracting headings", () => {
    // The grounding-llms post has a '# ' line inside a code fence that must not
    // become a heading.
    const post = getPost("grounding-llms-in-real-structure");
    expect(post).not.toBeNull();
    expect(post!.headings.every((h) => !h.text.includes("prompt ="))).toBe(true);
  });
});
