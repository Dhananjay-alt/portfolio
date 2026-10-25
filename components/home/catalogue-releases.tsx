"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

type ReleaseCard = {
  id: string;
  code: string;
  title: string;
  category: string;
  year: string;
  award?: string;
  tagline: string;
  tech: string[];
  slug: string;
};

const INITIAL_CARDS: ReleaseCard[] = [
  {
    id: "syncspace",
    code: "DH-01 / SYNC",
    title: "SyncSpace",
    category: "REALTIME COLLABORATIVE ENGINE",
    year: "2026",
    tagline:
      "Distributed notes and code editor backed by Yjs CRDTs over a custom Hocuspocus server with Postgres RLS and per-run Docker sandbox.",
    tech: ["Yjs CRDTs", "Hocuspocus", "Postgres RLS", "Docker"],
    slug: "syncspace",
  },
  {
    id: "paygent",
    code: "DH-02 / PYGT",
    title: "Paygent",
    category: "AGENTIC PAYMENTS & DEFI",
    year: "2026",
    award: "ETHGlobal HackMoney — ENS Partner Prize",
    tagline:
      "Autonomous agent-driven liquidity routing and on-chain settlement, with ENS strategy routing and Foundry-tested vault contracts.",
    tech: ["Solidity", "Foundry", "ENS", "DeFi Agents"],
    slug: "paygent",
  },
  {
    id: "luxauth",
    code: "DH-03 / LUXA",
    title: "LuxuryAuthNFT",
    category: "ON-CHAIN PROVENANCE",
    year: "2025",
    award: "ETHGlobal ETHOnline",
    tagline:
      "Cryptographic provenance pairing physical luxury assets with ERC-721 certificates, brand-gated minting, and IPFS verification.",
    tech: ["ERC-721", "Foundry", "IPFS", "Next.js"],
    slug: "luxauth",
  },
  {
    id: "repo-analyzer",
    code: "DH-04 / RPAN",
    title: "Repo Analyzer",
    category: "AST DEPENDENCY & LLM GRAPH",
    year: "2026",
    award: "GDSC IIT Roorkee — Open Summer of Code",
    tagline:
      "Static code graph generator mapping Python AST imports, detecting circular cycles via NetworkX, and streaming Groq LLM architecture summaries.",
    tech: ["FastAPI", "React Flow", "NetworkX", "Groq LLM"],
    slug: "repo-analyzer",
  },
];

export function CatalogueReleases() {
  const [cards, setCards] = useState<ReleaseCard[]>(INITIAL_CARDS);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [throwing, setThrowing] = useState<"left" | "right" | null>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();

  // Find index of current top card in original list for dots
  const activeOriginalIndex = INITIAL_CARDS.findIndex((c) => c.id === cards[0]?.id);

  const cycleCard = useCallback((direction: "left" | "right") => {
    if (throwing) return;
    setThrowing(direction);
    setTimeout(() => {
      setCards((prev) => [...prev.slice(1), prev[0]]);
      setThrowing(null);
      setDragOffset({ x: 0, y: 0 });
    }, 280);
  }, [throwing]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || throwing) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || reduced || throwing) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handlePointerUp = () => {
    if (!isDragging || reduced || throwing) return;
    setIsDragging(false);

    const deckWidth = deckRef.current?.offsetWidth || 400;
    const threshold = deckWidth * 0.1; // roughly a tenth of deck width

    if (Math.abs(dragOffset.x) > threshold) {
      cycleCard(dragOffset.x > 0 ? "right" : "left");
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      cycleCard("right");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      cycleCard("left");
    }
  };

  // Stack offsets for physical card look
  const getStackStyle = (index: number) => {
    if (index === 0) {
      if (throwing) {
        const xOffset = throwing === "right" ? "130%" : "-130%";
        const rotate = throwing === "right" ? 28 : -28;
        return {
          transform: `translate(${xOffset}, -30px) rotate(${rotate}deg)`,
          transition: "transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          zIndex: 40,
        };
      }
      if (isDragging) {
        const rotation = dragOffset.x * 0.08;
        return {
          transform: `translate(${dragOffset.x}px, ${dragOffset.y * 0.4}px) rotate(${rotation}deg) scale(1.02)`,
          transition: "none",
          zIndex: 40,
        };
      }
      return {
        transform: "translate(0px, 0px) rotate(0deg) scale(1)",
        transition: "transform 350ms cubic-bezier(0.34, 1.4, 0.5, 1)",
        zIndex: 40,
      };
    }

    if (index === 1) {
      return {
        transform: "translate(8px, -6px) rotate(2.8deg) scale(0.96)",
        transition: "transform 350ms cubic-bezier(0.34, 1.4, 0.5, 1)",
        zIndex: 30,
      };
    }

    if (index === 2) {
      return {
        transform: "translate(-8px, -12px) rotate(-2.5deg) scale(0.92)",
        transition: "transform 350ms cubic-bezier(0.34, 1.4, 0.5, 1)",
        zIndex: 20,
      };
    }

    return {
      transform: "translate(12px, -18px) rotate(3.5deg) scale(0.88)",
      transition: "transform 350ms cubic-bezier(0.34, 1.4, 0.5, 1)",
      zIndex: 10,
    };
  };

  return (
    <section
      id="releases"
      className="border-b border-[rgba(237,231,220,0.13)] bg-[#0A0C0E] px-6 py-32 md:px-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-12">
        {/* Left Column: headline, lede, two buttons */}
        <div className="lg:col-span-5">
          <div className="mb-6 flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-[#E8913C]" />
            <span className="font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8]">
              [ 02 / CATALOGUE ]
            </span>
          </div>

          <h2 className="font-syne text-[clamp(28px,4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-[#EDE7DC]">
            SELECTED BUILDS & SYSTEMS
          </h2>

          <p className="mt-6 font-sora text-[14px] leading-relaxed text-[#9EA5A8]">
            Four production-grade systems engineered from first principles: CRDT realtime
            engines, DeFi vaults, AI static analysis, and cryptographic authentication.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(237,231,220,0.2)] px-6 py-3 font-sora text-[11px] font-medium uppercase tracking-[0.14em] text-[#EDE7DC] transition-colors hover:border-[#E8913C] hover:text-[#E8913C]"
            >
              ALL RELEASES
              <ArrowUpRight className="size-3.5" />
            </Link>

            <a
              href="https://github.com/Dhananjay-alt"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-transparent px-6 py-3 font-sora text-[11px] font-medium uppercase tracking-[0.14em] text-[#9EA5A8] transition-colors hover:text-[#EDE7DC]"
            >
              GITHUB ARCHIVE
            </a>
          </div>
        </div>

        {/* Right Column: Throwable card deck */}
        <div className="flex flex-col items-center lg:col-span-7">
          <div
            ref={deckRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="relative aspect-square w-full max-w-[440px] cursor-grab select-none outline-none active:cursor-grabbing"
            style={{ touchAction: "pan-y" }}
            aria-label="Interactive project card deck. Drag card or use left and right arrow keys to browse."
          >
            {cards.map((card, i) => {
              const isTop = i === 0;
              const stackStyle = getStackStyle(i);

              return (
                <div
                  key={card.id}
                  style={stackStyle}
                  onPointerDown={isTop ? handlePointerDown : undefined}
                  onPointerMove={isTop ? handlePointerMove : undefined}
                  onPointerUp={isTop ? handlePointerUp : undefined}
                  onPointerCancel={isTop ? handlePointerUp : undefined}
                  className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-[rgba(237,231,220,0.13)] bg-[#101317] p-8 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.85)]"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-[rgba(237,231,220,0.08)] pb-4">
                    <span className="font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#E8913C]">
                      {card.code}
                    </span>
                    <span className="font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8]">
                      {card.year}
                    </span>
                  </div>

                  {/* Card Middle: Title, Award, Tagline */}
                  <div className="my-auto space-y-3 py-4">
                    <div className="font-sora text-[10px] uppercase tracking-[0.15em] text-[#9EA5A8]">
                      {card.category}
                    </div>

                    <h3 className="font-syne text-[32px] font-bold tracking-[-0.02em] text-[#EDE7DC]">
                      {card.title}
                    </h3>

                    {card.award && (
                      <div className="inline-flex items-center gap-1.5 font-sora text-[10px] uppercase tracking-[0.12em] text-[#E8913C]">
                        <span>★</span>
                        <span>{card.award}</span>
                      </div>
                    )}

                    <p className="line-clamp-3 font-sora text-[12.5px] leading-relaxed text-[#9EA5A8]">
                      {card.tagline}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {card.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[rgba(237,231,220,0.1)] px-2.5 py-0.5 font-sora text-[10px] uppercase tracking-[0.12em] text-[#9EA5A8]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Action */}
                  <div className="flex items-center justify-between border-t border-[rgba(237,231,220,0.08)] pt-4">
                    <span className="font-sora text-[10px] uppercase tracking-[0.14em] text-[#6C7378]">
                      FORMAT: SLEEVE LP
                    </span>
                    <Link
                      href={`/projects/${card.slug}`}
                      className="inline-flex items-center gap-1.5 font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#EDE7DC] hover:text-[#E8913C]"
                    >
                      READ CASE STUDY
                      <ArrowUpRight className="size-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hint line and progress dots beneath deck */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#6C7378]">
              DRAG SLEEVE TO TOSS / ARROW KEYS TO CYCLE
            </p>

            <div className="flex items-center gap-2">
              {INITIAL_CARDS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  aria-label={`Jump to sleeve ${dotIdx + 1}`}
                  onClick={() => {
                    const shift = (dotIdx - activeOriginalIndex + INITIAL_CARDS.length) % INITIAL_CARDS.length;
                    if (shift > 0) {
                      setCards((prev) => [...prev.slice(shift), ...prev.slice(0, shift)]);
                    }
                  }}
                  className={`size-2 rounded-full transition-colors ${
                    dotIdx === activeOriginalIndex ? "bg-[#E8913C]" : "bg-[rgba(237,231,220,0.2)]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
