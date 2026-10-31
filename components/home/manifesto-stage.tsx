"use client";

import React from "react";

export function ManifestoStage() {
  const sentence =
    "I DESIGN AND SHIP COMPLETE SYSTEMS — FROM REALTIME CRDT APPS TO ON-CHAIN PROTOCOLS AND AGENTIC TOOLS.";

  return (
    <section
      id="stage-manifesto"
      className="relative h-[260svh] bg-[#e7e2d8] text-[#171717] border-y border-[rgba(23,23,23,0.16)]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between px-6 py-8 md:px-16 md:py-12 select-none">
        {/* Top Furniture Line */}
        <div className="w-full flex items-center justify-between border-b border-[rgba(23,23,23,0.16)] pb-4">
          <span className="mono-label text-[rgba(23,23,23,0.56)]">
            STAGE 02 // MANIFESTO WIPE
          </span>
          <div className="flex items-center gap-2">
            <span className="size-2 bg-[#ef493c]" />
            <span className="mono-label text-[#ef493c]">INK SATURATION</span>
          </div>
          <span className="mono-label text-[rgba(23,23,23,0.56)] hidden sm:inline">
            CORE DOCTRINE
          </span>
        </div>

        {/* Centered Sentence Container with Exact Overlay */}
        <div className="my-auto flex flex-col items-center justify-center w-full">
          <div
            className="relative will-change-transform max-w-[16ch] text-center"
            style={{
              transform: `scale(var(--manifesto-scale, 1))`,
              transformOrigin: "center center",
              transition: "transform 0.08s linear",
            }}
          >
            {/* Base Sentence in 34% Ink */}
            <h2
              className="font-anton select-none text-[clamp(34px,5.6vw,78px)] uppercase leading-[0.88] tracking-[-0.035em] text-[rgba(23,23,23,0.34)] m-0 p-0"
              aria-hidden="true"
            >
              {sentence}
            </h2>

            {/* Exact Duplicate in Full Ink with Bottom-Up Clip Wipe */}
            <h2
              className="font-anton select-none text-[clamp(34px,5.6vw,78px)] uppercase leading-[0.88] tracking-[-0.035em] text-[#171717] absolute inset-0 m-0 p-0 pointer-events-none will-change-[clip-path]"
              style={{
                clipPath: `inset(calc(100% - var(--manifesto-wipe, 0%)) 0 0)`,
                transition: "clip-path 0.04s linear",
              }}
            >
              {sentence}
            </h2>
          </div>
        </div>

        {/* Bottom Status & Instruction */}
        <div className="w-full flex items-center justify-between border-t border-[rgba(23,23,23,0.16)] pt-4">
          <span className="mono-label text-[rgba(23,23,23,0.56)]">
            SPECIFICATION // 34% TO 100% CLIP FILL
          </span>
          <span className="mono-label text-[#ef493c]">
            [ ADVANCE TO HORIZONTAL RAIL ]
          </span>
          <span className="mono-label text-[rgba(23,23,23,0.56)] hidden sm:inline">
            16CH TYPOGRAPHIC LOCKUP
          </span>
        </div>
      </div>
    </section>
  );
}