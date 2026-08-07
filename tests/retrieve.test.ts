import { describe, it, expect } from "vitest";
import { retrieve, buildContext } from "@/lib/ai/retrieve";
import { buildCorpus } from "@/lib/ai/corpus";

describe("RAG retrieval", () => {
  it("builds a non-empty corpus from site content", () => {
    const corpus = buildCorpus();
    expect(corpus.length).toBeGreaterThan(5);
    expect(corpus.every((c) => c.id && c.title && c.text)).toBe(true);
  });

  it("retrieves SyncSpace chunks for a SyncSpace query", () => {
    const hits = retrieve("What is SyncSpace and CRDTs?");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.some((h) => /syncspace/i.test(h.id) || /SyncSpace/.test(h.title))).toBe(
      true,
    );
  });

  it("retrieves Web3 / ENS content for a Paygent query", () => {
    const hits = retrieve("ENS payments partner prize");
    expect(hits.some((h) => /paygent/i.test(h.id))).toBe(true);
  });

  it("buildContext returns formatted, non-empty context for a known topic", () => {
    const ctx = buildContext("Groq Llama Repo Analyzer");
    expect(ctx).toMatch(/##/);
    expect(ctx.length).toBeGreaterThan(50);
  });

  it("falls back to some context for an empty query", () => {
    expect(retrieve("").length).toBeGreaterThan(0);
  });

  it("returns nothing for gibberish with no term overlap", () => {
    expect(retrieve("zzxqq wobblefrotz").length).toBe(0);
  });
});
