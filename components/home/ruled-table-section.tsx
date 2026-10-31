"use client";

import React from "react";
import { WordSplit } from "@/components/ui/word-split";

interface TableRowData {
  code: string;
  domain: string;
  toolchain: string;
  deliverable: string;
  status: string;
}

const ROWS: TableRowData[] = [
  {
    code: "01 / CRDT",
    domain: "REALTIME COLLABORATION ENGINES",
    toolchain: "YJS / HOCUSPOCUS / DOCKER / POSTGRES RLS",
    deliverable: "Conflict-free multi-user workspaces & sandbox execution",
    status: "PRODUCTION READY",
  },
  {
    code: "02 / DEFI",
    domain: "SMART CONTRACT ARCHITECTURE",
    toolchain: "SOLIDITY / FOUNDRY / ERC-721 / ENS / VIEM",
    deliverable: "Audited protocol vaults & autonomous agent settlements",
    status: "ETHGLOBAL PRIZE",
  },
  {
    code: "03 / GRAPH",
    domain: "AST CODE GRAPHS & LLM AGENTS",
    toolchain: "FASTAPI / NETWORKX / GROQ LLAMA 3.3 / AST",
    deliverable: "Static cycle detection & automated architectural reviews",
    status: "SHIPPED OPEN SOURCE",
  },
  {
    code: "04 / FULLSTACK",
    domain: "HIGH-PERFORMANCE WEB SYSTEMS",
    toolchain: "NEXT.JS 16 / REACT 19 / TYPESCRIPT / TAILWIND",
    deliverable: "Sub-millisecond state hydration & accessible interfaces",
    status: "ACTIVE STACK",
  },
  {
    code: "05 / SYSTEMS",
    domain: "SYSTEMS PROGRAMMING & ENGINE OPS",
    toolchain: "RUST / C++ / WEBASSEMBLY / MEMORY MODELS",
    deliverable: "High-throughput data parsing & safe concurrency barriers",
    status: "BENCHMARKED",
  },
];

export function RuledTableSection() {
  return (
    <section className="bg-[#e7e2d8] text-[#171717] px-6 py-28 md:px-12 md:py-36 border-b border-[rgba(23,23,23,0.16)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="size-2 bg-[#ef493c]" />
              <span className="mono-label text-[rgba(23,23,23,0.56)]">
                [ 05 / SPECIFICATION REGISTER ]
              </span>
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[0.88]">
              <WordSplit text="CAPABILITIES & ENGAGEMENT MATRIX" />
            </h2>
          </div>
          <span className="mono-label text-[#ef493c]">
            RULED SPECIFICATION TABLE // FIVE CORE DISCIPLINES
          </span>
        </div>

        {/* Ruled Table */}
        <div className="border-t-2 border-b-2 border-[#171717]">
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-12 py-3 border-b border-[rgba(23,23,23,0.16)] font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(23,23,23,0.48)]">
            <div className="col-span-2">CODE</div>
            <div className="col-span-4">DOMAIN & FOCUS</div>
            <div className="col-span-3">TOOLCHAIN</div>
            <div className="col-span-3 text-right">STATUS</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[rgba(23,23,23,0.14)]">
            {ROWS.map((row, idx) => (
              <div
                key={row.code}
                data-rev
                style={{ "--d": `${idx * 55}ms` } as React.CSSProperties}
                className="py-6 group transition-colors hover:bg-[rgba(23,23,23,0.02)]"
              >
                {/* Desktop Grid Layout */}
                <div className="hidden lg:grid grid-cols-12 items-center gap-4">
                  <div className="col-span-2 mono-label text-[#ef493c] font-bold">
                    {row.code}
                  </div>
                  <div className="col-span-4">
                    <h3 className="font-anton text-xl tracking-tight text-[#171717] group-hover:text-[#ef493c] transition-colors leading-[0.9]">
                      {row.domain}
                    </h3>
                    <p className="font-inter text-xs text-[rgba(23,23,23,0.65)] mt-1">
                      {row.deliverable}
                    </p>
                  </div>
                  <div className="col-span-3 mono-label text-[rgba(23,23,23,0.56)] text-[10px]">
                    {row.toolchain}
                  </div>
                  <div className="col-span-3 text-right mono-label text-[#171717] font-semibold">
                    {row.status}
                  </div>
                </div>

                {/* Mobile / Tablet Collapsed View */}
                <div className="lg:hidden flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="mono-label text-[#ef493c] font-bold">
                      {row.code}
                    </span>
                    <span className="mono-label text-[#171717] font-semibold text-[10px]">
                      {row.status}
                    </span>
                  </div>
                  <h3 className="font-anton text-lg tracking-tight text-[#171717]">
                    {row.domain}
                  </h3>
                  <p className="font-inter text-xs text-[rgba(23,23,23,0.65)]">
                    {row.deliverable}
                  </p>
                  <span className="mono-label text-[rgba(23,23,23,0.48)] text-[9.5px]">
                    {row.toolchain}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}