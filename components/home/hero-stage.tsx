"use client";

import React, { useEffect, useRef } from "react";
import { WordSplit } from "@/components/ui/word-split";

export function HeroStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);

  // Generative tilled-soil canvas: grid of short red strokes drifting on sines of time and index
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

    const stepX = 36;
    const stepY = 24;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / stepX) + 2;
      const rows = Math.ceil(height / stepY) + 2;
      const t = time * 0.0014;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = r * cols + c;
          // Drift on sines of time and index at 5 to 19 percent alpha
          const sineVal = Math.sin(t + index * 0.38 + r * 0.15);
          const alpha = 0.05 + 0.14 * (0.5 + 0.5 * sineVal);

          const driftX = Math.sin(t * 0.7 + r * 0.5) * 4;
          const driftY = Math.cos(t * 0.5 + c * 0.4) * 3;

          const x = c * stepX + driftX;
          const y = r * stepY + driftY;
          const strokeLen = 14 + 6 * Math.sin(t + index);

          ctx.beginPath();
          ctx.strokeStyle = `rgba(239, 73, 60, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(x - strokeLen / 2, y);
          ctx.lineTo(x + strokeLen / 2, y);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const topLineText = "FULL-STACK & WEB3 ENGINEER";
  const bottomLineText = "DHANANJAY";

  return (
    <section id="stage-hero" className="relative h-[280svh] bg-[#241a12] text-[#fffdf8]">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between items-center px-6 py-8 md:px-12 md:py-10">
        {/* Full-bleed generated field canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 size-full pointer-events-none opacity-90"
        />

        {/* Top Furniture Bar */}
        <div className="relative z-10 w-full flex items-center justify-between border-b border-[rgba(231,226,216,0.14)] pb-4">
          <span className="mono-label text-[rgba(231,226,216,0.56)]">
            STAGE 01 // HORIZON PIN
          </span>
          <div className="flex items-center gap-2">
            <span className="size-2 bg-[#ef493c]" />
            <span className="mono-label text-[#ef493c]">LIVE REGISTER</span>
          </div>
          <span className="mono-label text-[rgba(231,226,216,0.56)] hidden sm:inline">
            FOLIO // 2026.EDITION
          </span>
        </div>

        {/* Two-Line Poster Lockup driven by 3 independent CSS variables */}
        <div
          ref={lockupRef}
          className="relative z-10 my-auto flex flex-col items-center justify-center text-center will-change-transform"
          style={{
            transform: `translateY(var(--hero-type-y, 0px)) scale(var(--hero-type-scale, 1))`,
            opacity: `var(--hero-type-alpha, 1)`,
            transition: "transform 0.08s linear, opacity 0.08s linear",
          }}
        >
          {/* Top Line: Sized by character count */}
          <div
            className="font-anton tracking-tight text-[#fffdf8] whitespace-nowrap mb-1"
            style={{
              fontSize: `min(4.8vw, calc(92vw / (${topLineText.length} * 0.44)))`,
              lineHeight: 0.9,
            }}
          >
            <WordSplit text={topLineText} />
          </div>

          {/* Bottom Line: Poster brand in hot red, sized by character count */}
          <div
            className="font-anton tracking-tighter text-[#ef493c] whitespace-nowrap"
            style={{
              fontSize: `min(18vw, calc(92vw / (${bottomLineText.length} * 0.44)))`,
              lineHeight: 0.84,
            }}
          >
            {bottomLineText}
          </div>
        </div>

        {/* Bottom Pinned Mono Metadata Bar */}
        <div
          className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between border-t border-[rgba(231,226,216,0.14)] pt-4 gap-2"
          style={{
            opacity: `var(--hero-meta-alpha, 1)`,
            transition: "opacity 0.08s linear",
          }}
        >
          <div className="mono-label text-[rgba(231,226,216,0.56)]">
            29.8543° N, 77.8880° E // IIT ROORKEE
          </div>
          <div className="mono-label text-[#fffdf8] text-center">
            CRDT COLLABORATION // ON-CHAIN PROTOCOLS // AST GRAPHS
          </div>
          <div className="mono-label text-[#ef493c]">
            [ SCROLL TO SCRUB CATALOGUE ]
          </div>
        </div>
      </div>
    </section>
  );
}