"use client";

import React, { useEffect, useRef } from "react";
import { useChoreography } from "./scroll-choreographer";
import { WordSplit } from "@/components/ui/word-split";

const CUES = [
  { id: "cue-0", label: "01 / STATIC AST & GRAPH ISOLATION", desc: "AST parsing and circular cycle checks" },
  { id: "cue-1", label: "02 / CRDT CONVERGENCE & SYNC ENGINE", desc: "Hocuspocus WebSocket conflict resolution" },
  { id: "cue-2", label: "03 / FORMAL PROOFS & HARDENED TEST SUITE", desc: "Foundry fuzz tests and Postgres RLS proofs" },
  { id: "cue-3", label: "04 / PERFORATED RELEASE & MAINNET SOWING", desc: "Deterministic contract byte-code tear" },
];

const STATUS_LINES = [
  "STATUS // PHASE 0: PRE-FLIGHT INITIALIZED",
  "STATUS // PHASE 1: AST GRAPH RESOLVED & ISOLATED",
  "STATUS // PHASE 2: CRDT CONVERGENCE 100% VERIFIED",
  "STATUS // PHASE 3: AUDIT COMPLETE — PERFORATION CLEARED",
];

export function ArtifactStage() {
  const { artifactPhase } = useChoreography();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generative seed stamp & cryptographic seal canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = (canvas.width = 320);
    const h = (canvas.height = 200);

    ctx.fillStyle = "#fffdf8";
    ctx.fillRect(0, 0, w, h);

    // Fine concentric harmonic seal lines
    const cx = w / 2;
    const cy = h / 2;

    for (let r = 18; r <= 84; r += 9) {
      ctx.beginPath();
      ctx.strokeStyle = r === 63 ? "#ef493c" : "rgba(23, 23, 23, 0.2)";
      ctx.lineWidth = r === 63 ? 1.5 : 1;

      for (let theta = 0; theta <= Math.PI * 2; theta += 0.05) {
        const rad = r + Math.sin(theta * 6) * 3;
        const x = cx + rad * Math.cos(theta);
        const y = cy + rad * Math.sin(theta);
        if (theta === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Centre seal mark
    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 16, cy - 16, 32, 32);
    ctx.fillStyle = "#ef493c";
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();

    // Verification lines across left and right
    ctx.strokeStyle = "rgba(23, 23, 23, 0.14)";
    ctx.lineWidth = 1;
    for (let y = 30; y < h - 30; y += 14) {
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(cx - 95, y);
      ctx.moveTo(cx + 95, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();
    }
  }, []);

  return (
    <section
      id="stage-artifact"
      className="relative h-[420svh] bg-[#241a12] text-[#fffdf8] border-b border-[rgba(231,226,216,0.14)]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between px-6 py-8 md:px-12 md:py-10 select-none">
        {/* Top Furniture Line */}
        <div className="w-full flex items-center justify-between border-b border-[rgba(231,226,216,0.14)] pb-4">
          <span className="mono-label text-[rgba(231,226,216,0.56)]">
            STAGE 04 // THE PRINTED ARTIFACT
          </span>
          <div className="flex items-center gap-2">
            <span className="size-2 bg-[#ef493c]" />
            <span className="mono-label text-[#ef493c]">
              PHASE INDEX {artifactPhase} OF 3
            </span>
          </div>
          <span className="mono-label text-[rgba(231,226,216,0.56)] hidden sm:inline">
            PROVENANCE DOSSIER
          </span>
        </div>

        {/* Two-Column Middle: Copy Left, Artifact Right */}
        <div className="my-auto w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Copy Column (Left 6 cols) sliding slightly opposite */}
          <div
            className="lg:col-span-6 flex flex-col justify-center will-change-transform"
            style={{
              transform: `translateX(var(--packet-copy-x, 0px))`,
              transition: "transform 0.08s linear",
            }}
          >
            <span className="mono-label text-[#ef493c] mb-2">
              [ 04 / DOSSIER SPECIFICATION ]
            </span>

            <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#fffdf8] leading-[0.88] mb-4">
              <WordSplit text="VERIFICATION DOSSIER & DEPLOYMENT PACKET" />
            </h2>

            <p className="font-inter text-[14px] text-[rgba(231,226,216,0.7)] leading-relaxed mb-6 max-w-md">
              Every system release is a sealed agreement between formal AST proofs, CRDT
              convergence tests, and production container isolation. As verification
              proceeds, the ledger stamps proof and prepares the release.
            </p>

            {/* Four Cues Lighting Cumulatively */}
            <div className="space-y-2 mb-6">
              {CUES.map((cue, idx) => {
                const isLit = artifactPhase >= idx;
                const isCurrent = artifactPhase === idx;

                return (
                  <div
                    key={cue.id}
                    data-rev
                    style={{ "--d": `${idx * 40}ms` } as React.CSSProperties}
                    className={`p-3 border transition-all duration-300 ${
                      isCurrent
                        ? "border-[#ef493c] bg-[rgba(239,73,60,0.08)]"
                        : isLit
                        ? "border-[rgba(231,226,216,0.4)] bg-[rgba(231,226,216,0.04)]"
                        : "border-[rgba(231,226,216,0.12)] opacity-40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`mono-label ${
                          isLit ? "text-[#fffdf8]" : "text-[rgba(231,226,216,0.5)]"
                        }`}
                      >
                        {cue.label}
                      </span>
                      <span
                        className={`mono-label ${
                          isCurrent
                            ? "text-[#ef493c]"
                            : isLit
                            ? "text-[rgba(231,226,216,0.7)]"
                            : "text-[rgba(231,226,216,0.3)]"
                        }`}
                      >
                        {isLit ? "[ PASS ]" : "[ WAIT ]"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Status Line */}
            <div className="border-t border-[rgba(231,226,216,0.14)] pt-3 flex items-center gap-2">
              <span className="size-2 bg-[#ef493c] animate-pulse" />
              <span className="mono-label text-[#ef493c]">
                {STATUS_LINES[artifactPhase]}
              </span>
            </div>
          </div>

          {/* Paper Artifact Column (Right 6 cols) */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div
              className="relative w-full max-w-[370px] aspect-[3/4] border-ink-15 bg-[#fffdf8] text-[#171717] p-6 flex flex-col justify-between will-change-transform shadow-2xl"
              style={{
                transform: `translateY(var(--packet-enter, 38px)) scale(var(--packet-scale, 0.78))`,
                opacity: `var(--packet-alpha, 0)`,
                transition: "transform 0.08s linear, opacity 0.08s linear",
              }}
            >
              {/* Packet Header Block */}
              <div className="border-b border-[rgba(23,23,23,0.16)] pb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="mono-label text-[rgba(23,23,23,0.56)]">
                    SPECIFICATION // DH-2026-ENG
                  </span>
                  <span className="mono-label text-[#ef493c] font-bold">
                    ORIGINAL
                  </span>
                </div>
                <h3 className="font-anton text-2xl tracking-tight text-[#171717] leading-[0.9]">
                  SPECIMEN // DEPLOYMENT PROTOCOL
                </h3>
              </div>

              {/* Generative Plate in Middle */}
              <div className="my-auto py-2">
                <canvas
                  ref={canvasRef}
                  className="w-full aspect-[16/10] border border-[rgba(23,23,23,0.14)] bg-[#fffdf8]"
                />
              </div>

              {/* Dashed 2px Ink Perforation across the artifact */}
              <div
                className="relative my-2 w-full will-change-transform"
                style={{
                  transform: `translateY(calc(var(--packet-cut, 0) * 16px))`,
                  opacity: `calc(0.4 + var(--packet-cut, 0) * 0.6)`,
                  transition: "transform 0.05s linear",
                }}
              >
                <div className="w-full border-t-2 border-dashed border-[#171717]" />
                <div className="flex items-center justify-between mt-1">
                  <span className="mono-label text-[rgba(23,23,23,0.48)] text-[9px]">
                    TEAR ALONG DASHED PERFORATION
                  </span>
                  <span className="mono-label text-[#ef493c] text-[9px]">
                    {artifactPhase === 3 ? "[ OPENED ]" : "[ SEALED ]"}
                  </span>
                </div>
              </div>

              {/* Three Mono Rows at Foot */}
              <div className="border-t border-[rgba(23,23,23,0.16)] pt-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="mono-label text-[rgba(23,23,23,0.56)]">LOT NUMBER</span>
                  <span className="mono-label text-[#ef493c] font-bold">
                    LOT // 0x8F92...B41A
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="mono-label text-[rgba(23,23,23,0.56)]">TEST RESULT</span>
                  <span
                    className={`mono-label font-bold ${
                      artifactPhase >= 1 ? "text-[#ef493c]" : "text-[rgba(23,23,23,0.45)]"
                    }`}
                  >
                    {artifactPhase >= 1 ? "99.4% VERIFIED [PULL #42]" : "PENDING REVIEW"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="mono-label text-[rgba(23,23,23,0.56)]">SOWING WINDOW</span>
                  <span className="mono-label text-[#171717]">
                    MAINNET SOWING 2026.Q2
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Phase Scrub Meter Bar */}
        <div className="w-full flex flex-col gap-2 border-t border-[rgba(231,226,216,0.14)] pt-4">
          <div className="flex items-center justify-between">
            <span className="mono-label text-[rgba(231,226,216,0.56)]">
              CALIBRATION CYCLE
            </span>
            <span className="mono-label text-[#ef493c]">
              FOUR STAGES CUMULATIVE PRINT
            </span>
          </div>
          <div className="w-full h-[2px] bg-[rgba(231,226,216,0.14)] relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#ef493c] will-change-[width]"
              style={{
                width: `var(--packet-meter, 0%)`,
                transition: "width 0.04s linear",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}