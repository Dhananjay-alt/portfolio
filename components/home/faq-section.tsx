"use client";

import React from "react";
import { WordSplit } from "@/components/ui/word-split";

const FAQS = [
  {
    q: "WHAT ROLES AND ENGAGEMENTS ARE YOU CURRENTLY OPEN TO?",
    a: "I am actively seeking engineering internships, early-stage founding engineering roles, and high-agency product builds in full-stack, Web3 protocols, and AI developer tools. I operate comfortably across timezones and deliver complete systems independently.",
    code: "SEC // 01",
  },
  {
    q: "HOW DO YOU BALANCE IIT ROORKEE STUDIES AND SHIPPING PRODUCTION CODE?",
    a: "I prioritize building and shipping software daily. While pursuing my degree at IIT Roorkee, my practical dedication is directed entirely to software engineering, hackathons (multiple ETHGlobal awards), and open-source contributions in Rust and Ethereum tooling.",
    code: "SEC // 02",
  },
  {
    q: "HOW DO YOU APPROACH DISTRIBUTED ARCHITECTURE AND CRDTS?",
    a: "I treat correctness as an infrastructural and data-model property rather than an afterthought. Using Yjs CRDTs allows concurrent document editing without locks or merge conflicts, while isolating untrusted runs inside ephemeral Docker sandboxes enforces strict host safety.",
    code: "SEC // 03",
  },
  {
    q: "WHAT IS YOUR EXPERIENCE WITH SMART CONTRACT SECURITY AND TESTING?",
    a: "I build smart contracts with Foundry and Solidity, utilizing extensive fuzzing and invariant testing suites. My projects include audited ERC-721 physical pairing systems, DeFi liquidity routing, and partner-prize winning integrations with Ethereum Name Service (ENS).",
    code: "SEC // 04",
  },
  {
    q: "HOW CAN TEAMS AND COLLABORATORS GET IN TOUCH?",
    a: "You can write directly to dhananjay_h@mt.iitr.ac.in, connect on GitHub (@dhananjay-hire), or schedule a technical discussion. I respond promptly with code repositories, architectural notes, and proof of work.",
    code: "SEC // 05",
  },
];

export function FaqSection() {
  return (
    <section className="bg-[#e7e2d8] text-[#171717] px-6 py-28 md:px-12 md:py-36 border-b border-[rgba(23,23,23,0.16)]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="size-2 bg-[#ef493c]" />
              <span className="mono-label text-[rgba(23,23,23,0.56)]">
                [ 06 / INQUIRIES & PROTOCOL ]
              </span>
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[0.88]">
              <WordSplit text="FREQUENTLY EXAMINED QUESTIONS" />
            </h2>
          </div>
          <span className="mono-label text-[#ef493c]">
            NATIVE DETAILS // ACCORDION REGISTRY
          </span>
        </div>

        {/* Native Details Rows */}
        <div className="divide-y divide-[rgba(23,23,23,0.16)] border-y border-[rgba(23,23,23,0.16)]">
          {FAQS.map((faq, idx) => (
            <details
              key={faq.code}
              data-rev
              style={{ "--d": `${idx * 45}ms` } as React.CSSProperties}
              className="group py-6 cursor-pointer select-none transition-colors hover:bg-[rgba(23,23,23,0.02)]"
            >
              <summary className="list-none flex items-start justify-between gap-6 outline-none">
                <div className="flex items-baseline gap-4">
                  <span className="mono-label text-[#ef493c] font-bold">
                    {faq.code}
                  </span>
                  <h3 className="font-anton text-xl sm:text-2xl tracking-tight text-[#171717] group-open:text-[#ef493c] transition-colors leading-[0.9]">
                    {faq.q}
                  </h3>
                </div>
                <span className="mono-label text-[rgba(23,23,23,0.48)] group-open:text-[#ef493c] transition-colors text-sm">
                  <span className="group-open:hidden">[ + ]</span>
                  <span className="hidden group-open:inline">[ − ]</span>
                </span>
              </summary>

              <div className="mt-4 pl-12 pr-6">
                <p className="font-inter text-sm sm:text-base text-[rgba(23,23,23,0.72)] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}