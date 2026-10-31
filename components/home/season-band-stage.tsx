"use client";

import React, { useEffect, useRef } from "react";
import { useChoreography } from "./scroll-choreographer";
import { WordSplit } from "@/components/ui/word-split";

const CHAPTERS = [
  {
    num: "CHAPTER 01",
    year: "2024",
    title: "SYSTEMS & FOUNDATION",
    summary:
      "Matriculation at IIT Roorkee. Focus on C++, Rust, memory layout, low-level algorithmic optimizations, and engineering fundamentals.",
    meta: "IIT ROORKEE // SYSTEMS LABS",
  },
  {
    num: "CHAPTER 02",
    year: "2025",
    title: "PROTOCOLS & PROVENANCE",
    summary:
      "On-chain protocol design: Solidity, Foundry fuzzed vaults, cryptographic ERC-721 provenance at ETHGlobal ETHOnline, and BlocSoc core tooling.",
    meta: "ETHGLOBAL // BLOCSOC PROTOCOLS",
  },
  {
    num: "CHAPTER 03",
    year: "2026",
    title: "MULTIPLAYER & AGENTS",
    summary:
      "SyncSpace CRDT collaborative workspace with Docker sandboxes, Paygent ENS prize winner at HackMoney, and Groq LLM AST graph analyzer.",
    meta: "ETHGLOBAL WINNER // REALTIME ENGINES",
  },
];

export function SeasonBandStage() {
  const { seasonChapter } = useChoreography();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 22 stacked contour lines drifting on sines of x + slower harmonic, every 5th line red
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const totalLines = 22;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const t = time * 0.001;
      const spacing = height / (totalLines + 2);

      for (let i = 0; i < totalLines; i++) {
        const isRed = i % 5 === 0;
        const baseY = (i + 1.5) * spacing;

        ctx.beginPath();
        ctx.strokeStyle = isRed ? "#ef493c" : "rgba(23, 23, 23, 0.18)";
        ctx.lineWidth = isRed ? 2 : 1;

        const points = 60;
        const dx = width / points;

        for (let j = 0; j <= points; j++) {
          const x = j * dx;
          // Primary sine + slower harmonic
          const primary = Math.sin(x * 0.0035 + t + i * 0.28) * 18;
          const harmonic = Math.sin(x * 0.0012 - t * 0.6 + i * 0.4) * 12;
          const y = baseY + primary + harmonic;

          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="stage-season"
      className="relative h-[300svh] bg-[#e7e2d8] text-[#171717] border-b border-[rgba(23,23,23,0.16)]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between px-6 py-8 md:px-12 md:py-10 select-none">
        {/* Parallax Contour Plate Canvas behind */}
        <div
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{
            transform: `translateY(var(--season-y, -4%)) scale(var(--season-scale, 1.10))`,
            transition: "transform 0.06s linear",
          }}
        >
          <canvas ref={canvasRef} className="size-full opacity-85" />
        </div>

        {/* Top Furniture Line */}
        <div className="relative z-10 w-full flex items-center justify-between border-b border-[rgba(23,23,23,0.16)] pb-4 bg-[#e7e2d8]/60 backdrop-blur-sm">
          <span className="mono-label text-[rgba(23,23,23,0.56)]">
            STAGE 05 // CHRONOLOGY BAND
          </span>
          <div className="flex items-center gap-2">
            <span className="size-2 bg-[#ef493c]" />
            <span className="mono-label text-[#ef493c]">
              CHAPTER {seasonChapter + 1} OF 3 ACTIVE
            </span>
          </div>
          <span className="mono-label text-[rgba(23,23,23,0.56)] hidden sm:inline">
            SWAP TRANSITIONS
          </span>
        </div>

        {/* Headline over the canvas */}
        <div className="relative z-10 my-auto text-center max-w-4xl mx-auto px-4">
          <span className="mono-label text-[#ef493c] mb-2 block">
            [ PROGRESSION & PHASES ]
          </span>
          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#171717] leading-[0.88]">
            <WordSplit text="CHRONOLOGY // THREE ENGINEERING SEASONS" />
          </h2>
        </div>

        {/* Bottom Three Chapters Swap (exactly ONE active at full opacity) */}
        <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[rgba(23,23,23,0.16)] bg-[#e7e2d8]/70 backdrop-blur-sm">
          {CHAPTERS.map((ch, idx) => {
            const isActive = seasonChapter === idx;

            return (
              <div
                key={ch.num}
                data-rev
                style={{ "--d": `${idx * 50}ms` } as React.CSSProperties}
                className={`p-5 border transition-all duration-300 ${
                  isActive
                    ? "border-ink-15 bg-[#fffdf8] opacity-100 shadow-md"
                    : "border-[rgba(23,23,23,0.16)] bg-transparent opacity-30"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`mono-label ${
                      isActive ? "text-[#ef493c]" : "text-[rgba(23,23,23,0.48)]"
                    }`}
                  >
                    {ch.num} // {ch.year}
                  </span>
                  <span
                    className={`mono-label ${
                      isActive ? "text-[#171717]" : "text-[rgba(23,23,23,0.4)]"
                    }`}
                  >
                    {isActive ? "[ CURRENT ]" : "[ SWAP ]"}
                  </span>
                </div>

                <h3
                  className={`font-anton text-xl tracking-tight leading-[0.9] mb-3 ${
                    isActive ? "text-[#171717]" : "text-[rgba(23,23,23,0.6)]"
                  }`}
                >
                  {ch.title}
                </h3>

                <p className="font-inter text-xs text-[rgba(23,23,23,0.7)] leading-relaxed mb-4">
                  {ch.summary}
                </p>

                <div className="border-t border-[rgba(23,23,23,0.12)] pt-2">
                  <span className="mono-label text-[9.5px] text-[rgba(23,23,23,0.48)]">
                    {ch.meta}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}