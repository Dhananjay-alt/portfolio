import { buildCorpus, type Chunk } from "@/lib/ai/corpus";

const STOP = new Set([
  "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "of", "to",
  "in", "on", "for", "with", "at", "by", "from", "about", "as", "what", "who",
  "how", "does", "do", "did", "his", "her", "their", "he", "she", "they", "you",
  "your", "tell", "me", "can", "i", "it", "this", "that", "which", "has", "have",
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

let cached: Chunk[] | null = null;
function corpus(): Chunk[] {
  if (!cached) cached = buildCorpus();
  return cached;
}

/** Lightweight lexical retrieval — term overlap with a title boost. No embeddings needed. */
export function retrieve(query: string, k = 5): Chunk[] {
  const terms = tokenize(query);
  if (terms.length === 0) return corpus().slice(0, k);

  const scored = corpus().map((chunk) => {
    const haystack = tokenize(`${chunk.title} ${chunk.title} ${chunk.text}`);
    const counts = new Map<string, number>();
    for (const t of haystack) counts.set(t, (counts.get(t) ?? 0) + 1);
    let score = 0;
    for (const t of terms) score += counts.get(t) ?? 0;
    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => s.chunk);
}

export function buildContext(query: string): string {
  const hits = retrieve(query);
  if (hits.length === 0) return "";
  return hits.map((c) => `## ${c.title}\n${c.text}`).join("\n\n");
}
