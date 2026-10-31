"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CardSpec {
  id: string;
  num: string;
  title: string;
  category: string;
  tech: string;
  slug: string;
  plateType: "crdt" | "defi" | "nft" | "ast" | "vision" | "ethereum";
}

const CARDS: CardSpec[] = [
  {
    id: "syncspace",
    num: "№ 01 · 2026",
    title: "SYNC SPACE",
    category: "CRDT ENGINE & DOCKER SANDBOX",
    tech: "YJS CRDTS / HOCUSPOCUS / POSTGRES RLS",
    slug: "syncspace",
    plateType: "crdt",
  },
  {
    id: "paygent",
    num: "№ 02 · 2026",
    title: "PAYGENT",
    category: "AGENTIC DEFI & VAULT SETTLEMENT",
    tech: "ETHGLOBAL WINNER / SOLIDITY / FOUNDRY",
    slug: "paygent",
    plateType: "defi",
  },
  {
    id: "luxauth",
    num: "№ 03 · 2025",
    title: "LUXURY AUTH",
    category: "PHYSICAL PAIRING & ERC-721",
    tech: "ETHONLINE / CRYPTOGRAPHIC PROVENANCE",
    slug: "luxauth",
    plateType: "nft",
  },
  {
    id: "repo-analyzer",
    num: "№ 04 · 2026",
    title: "REPO ANALYZER",
    category: "AST DEPENDENCY & LLM GRAPH",
    tech: "FASTAPI / NETWORKX / GROQ LLAMA 3.3",
    slug: "repo-analyzer",
    plateType: "ast",
  },
  {
    id: "vision-bgmi",
    num: "№ 05 · 2026",
    title: "VISION BGMI",
    category: "ESPORTS VLM PIPELINE",
    tech: "COMPUTER VISION / OCR / REDIS STREAM",
    slug: "projects",
    plateType: "vision",
  },
  {
    id: "blocsoc-core",
    num: "№ 06 · 2025",
    title: "BLOCSOC CORE",
    category: "SOLIDITY VAULTS & AUDITING",
    tech: "ETHEREUM TOOLING / RUST CRATES / VIEM",
    slug: "open-source",
    plateType: "ethereum",
  },
];

function CardCanvas({ type }: { type: CardSpec["plateType"] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = (canvas.width = 300);
    const h = (canvas.height = 225); // 4:3 / 3:4 aspect

    ctx.fillStyle = "#fffdf8";
    ctx.fillRect(0, 0, w, h);

    // Flat generated algorithmic plate illustration
    if (type === "crdt") {
      // Mesh of collaborative cursor tracks
      ctx.strokeStyle = "rgba(23, 23, 23, 0.18)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(20, 30 + i * 22);
        ctx.bezierCurveTo(120, 20 + i * 26, 180, 45 + i * 18, 280, 35 + i * 24);
        ctx.stroke();
      }
      // Presence nodes
      [[60, 65], [140, 115], [230, 80], [180, 170]].forEach(([x, y], idx) => {
        ctx.strokeStyle = idx === 1 ? "#ef493c" : "#171717";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x - 5, y - 5, 10, 10);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = idx === 1 ? "#ef493c" : "#171717";
        ctx.fill();
      });
    } else if (type === "defi") {
      // Step function vault curve
      ctx.strokeStyle = "rgba(23, 23, 23, 0.2)";
      ctx.lineWidth = 1;
      for (let x = 30; x < 280; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 20);
        ctx.lineTo(x, 205);
        ctx.stroke();
      }
      // Red liquidity trajectory
      ctx.beginPath();
      ctx.strokeStyle = "#ef493c";
      ctx.lineWidth = 2;
      ctx.moveTo(30, 180);
      ctx.lineTo(90, 150);
      ctx.lineTo(150, 110);
      ctx.lineTo(210, 60);
      ctx.lineTo(270, 40);
      ctx.stroke();
      ctx.fillStyle = "#ef493c";
      ctx.fillRect(206, 56, 8, 8);
    } else if (type === "nft") {
      // Cryptographic provenance hash grid
      ctx.strokeStyle = "rgba(23, 23, 23, 0.22)";
      ctx.lineWidth = 1;
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 7; c++) {
          const px = 30 + c * 35;
          const py = 30 + r * 35;
          if ((r + c) % 3 === 0) {
            ctx.strokeStyle = "#ef493c";
            ctx.strokeRect(px, py, 14, 14);
          } else {
            ctx.strokeStyle = "rgba(23, 23, 23, 0.2)";
            ctx.strokeRect(px, py, 14, 14);
          }
        }
      }
    } else if (type === "ast") {
      // AST hierarchical tree lines
      ctx.strokeStyle = "#171717";
      ctx.lineWidth = 1.2;
      ctx.strokeRect(135, 25, 30, 20); // Root
      ctx.beginPath();
      ctx.moveTo(150, 45);
      ctx.lineTo(80, 95);
      ctx.moveTo(150, 45);
      ctx.lineTo(220, 95);
      ctx.stroke();

      ctx.strokeRect(65, 95, 30, 20);
      ctx.strokeStyle = "#ef493c";
      ctx.strokeRect(205, 95, 30, 20); // Hot red node

      ctx.beginPath();
      ctx.strokeStyle = "rgba(23, 23, 23, 0.25)";
      ctx.moveTo(80, 115);
      ctx.lineTo(45, 160);
      ctx.moveTo(80, 115);
      ctx.lineTo(110, 160);
      ctx.stroke();
      ctx.strokeRect(30, 160, 30, 20);
      ctx.strokeRect(95, 160, 30, 20);
    } else if (type === "vision") {
      // Vision bounding boxes & crosshairs
      ctx.strokeStyle = "rgba(23, 23, 23, 0.2)";
      ctx.lineWidth = 1;
      ctx.strokeRect(35, 35, 230, 155);
      ctx.strokeStyle = "#ef493c";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(70, 60, 110, 90);
      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(125, 50);
      ctx.lineTo(125, 160);
      ctx.moveTo(60, 105);
      ctx.lineTo(190, 105);
      ctx.stroke();
    } else {
      // Ethereum block state roots & signatures
      ctx.strokeStyle = "#171717";
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 7; i++) {
        const y = 35 + i * 24;
        ctx.beginPath();
        ctx.moveTo(35, y);
        ctx.lineTo(i === 3 ? 180 : 265, y);
        ctx.strokeStyle = i === 3 ? "#ef493c" : "rgba(23, 23, 23, 0.25)";
        ctx.stroke();
      }
      ctx.fillStyle = "#ef493c";
      ctx.fillRect(185, 35 + 3 * 24 - 3, 6, 6);
    }

    // Border framing inside canvas
    ctx.strokeStyle = "rgba(23, 23, 23, 0.12)";
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, w - 20, h - 20);
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full aspect-[4/3] border-b border-[rgba(23,23,23,0.16)] bg-[#fffdf8]"
    />
  );
}

export function CardRailStage() {
  return (
    <section
      id="stage-rail"
      className="relative h-[340svh] bg-[#e7e2d8] text-[#171717] border-b border-[rgba(23,23,23,0.16)]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between px-6 py-8 md:px-12 md:py-10 select-none">
        {/* Top Furniture Line */}
        <div className="w-full flex items-center justify-between border-b border-[rgba(23,23,23,0.16)] pb-4">
          <div className="flex items-center gap-3">
            <span className="mono-label text-[rgba(23,23,23,0.56)]">
              STAGE 03 // HORIZONTAL RAIL
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 bg-[#ef493c]" />
            <h2 className="font-anton text-lg tracking-tight text-[#171717] m-0">
              CATALOGUE OF BUILDS
            </h2>
          </div>
          <span className="mono-label text-[#ef493c] hidden sm:inline">
            [ SCROLL DOWN TO WALK ROW ]
          </span>
        </div>

        {/* Horizontal Rail Track translated sideways by exact measured overflow */}
        <div className="my-auto w-full overflow-visible py-4">
          <div
            id="rail-track"
            className="rail-track flex flex-nowrap items-stretch gap-6 md:gap-8 will-change-transform"
            style={{
              transform: `translateX(calc(-1 * var(--rail-progress, 0) * var(--rail-overflow, 0px)))`,
              transition: "transform 0.04s linear",
            }}
          >
            {CARDS.map((card, idx) => (
              <div
                key={card.id}
                data-rev
                style={{ "--d": `${idx * 45}ms` } as React.CSSProperties}
                className="flex-none w-[clamp(240px,26vw,340px)] border-ink-15 bg-[#fffdf8] flex flex-col justify-between group transition-colors hover:bg-white"
              >
                {/* Generated Plate Canvas at 3/4 aspect */}
                <CardCanvas type={card.plateType} />

                {/* Card Information Body */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="mono-label text-[#ef493c] font-semibold">
                        {card.num}
                      </span>
                      <span className="mono-label text-[rgba(23,23,23,0.48)]">
                        SPEC // 2026
                      </span>
                    </div>

                    <h3 className="font-anton text-2xl tracking-tight text-[#171717] group-hover:text-[#ef493c] transition-colors leading-[0.9] mb-2">
                      {card.title}
                    </h3>

                    <p className="mono-label text-[rgba(23,23,23,0.65)] mb-4 normal-case text-[10.5px]">
                      {card.category}
                    </p>
                  </div>

                  <div className="border-t border-[rgba(23,23,23,0.12)] pt-3 mt-auto flex items-center justify-between">
                    <span className="mono-label text-[rgba(23,23,23,0.45)] text-[9.5px]">
                      {card.tech}
                    </span>
                    <Link
                      href={`/projects/${card.slug}`}
                      className="inline-flex items-center gap-1 mono-label text-[#171717] group-hover:text-[#ef493c] transition-colors"
                      aria-label={`View ${card.title} details`}
                    >
                      <span>SPEC</span>
                      <ArrowUpRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hairline Progress Meter with Red Fill Beneath */}
        <div className="w-full flex flex-col gap-2 border-t border-[rgba(23,23,23,0.16)] pt-4">
          <div className="flex items-center justify-between">
            <span className="mono-label text-[rgba(23,23,23,0.56)]">
              OVERFLOW SCRUB TRACK
            </span>
            <span className="mono-label text-[#ef493c]">
              SIX EDITIONS FLUSH END
            </span>
          </div>
          <div className="w-full h-[2px] bg-[rgba(23,23,23,0.12)] relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#ef493c] will-change-[width]"
              style={{
                width: `var(--rail-meter, 0%)`,
                transition: "width 0.04s linear",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}