import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
};

export type Heading = { depth: number; text: string; slug: string };

/** Slugify to match rehype-slug (github-slugger) closely enough for a TOC. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function readFile(slug: string): { data: Record<string, unknown>; content: string } | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  return matter(raw);
}

function toMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    readingTime: readingTime(content).text,
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getAllPostSlugs()
    .map((slug) => {
      const parsed = readFile(slug);
      if (!parsed) return null;
      return toMeta(slug, parsed.data, parsed.content);
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(
  slug: string,
): { meta: PostMeta; content: string; headings: Heading[] } | null {
  const parsed = readFile(slug);
  if (!parsed) return null;
  const meta = toMeta(slug, parsed.data, parsed.content);
  const headings = extractHeadings(parsed.content);
  return { meta, content: parsed.content, headings };
}

/** Pull h2/h3 headings for the table of contents. */
function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split("\n");
  let inFence = false;
  for (const line of lines) {
    if (line.startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.*)$/.exec(line);
    if (match) {
      const text = match[2].trim();
      headings.push({ depth: match[1].length, text, slug: slugify(text) });
    }
  }
  return headings;
}
