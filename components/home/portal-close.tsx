"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { socials } from "@/config/socials";

export function PortalClose() {
  return (
    <footer className="relative overflow-hidden bg-[#0A0C0E] pt-32">
      {/* Top CTA Row */}
      <div className="mx-auto max-w-6xl px-6 md:px-16">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
          {/* Left: Headline & fine-print line */}
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-[#E8913C]" />
              <span className="font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8]">
                [ 05 / CLOSE ]
              </span>
            </div>

            <h2 className="font-syne text-[clamp(30px,4.5vw,56px)] font-bold leading-[1.05] tracking-[-0.025em] text-[#EDE7DC]">
              AVAILABLE FOR PROTOCOLS & PRODUCTS.
            </h2>

            <p className="mt-6 max-w-lg font-sora text-[14px] leading-relaxed text-[#9EA5A8]">
              Based at IIT Roorkee. Available for engineering roles, seed-stage founding
              teams, and high-agency product builds in full-stack, Web3, and AI.
            </p>
          </div>

          {/* Right: Two buttons at the opposite edge */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(237,231,220,0.2)] px-6 py-3.5 font-sora text-[11px] font-medium uppercase tracking-[0.14em] text-[#EDE7DC] transition-colors hover:border-[#E8913C] hover:text-[#E8913C]"
            >
              START A CONVERSATION
              <ArrowUpRight className="size-3.5" />
            </Link>

            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-full border border-transparent px-6 py-3.5 font-sora text-[11px] font-medium uppercase tracking-[0.14em] text-[#9EA5A8] transition-colors hover:text-[#EDE7DC]"
            >
              INSPECT RÉSUMÉ
            </Link>
          </div>
        </div>

        {/* Hairline footer strip */}
        <div className="mt-28 flex flex-col items-center justify-between gap-6 border-t border-[rgba(237,231,220,0.13)] py-8 font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8] md:flex-row">
          <div>© 2026 DHANANJAY HIRE</div>

          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#E8913C]" />
            <span className="text-[#EDE7DC]">OPEN TO ROLES & COLLABORATIONS</span>
          </div>

          <div className="text-center md:text-right">
            29.8543° N, 77.8880° E / IIT ROORKEE
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#9EA5A8] transition-colors hover:text-[#E8913C]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* The wordmark full width, translated down slightly so the page edge crops it */}
      <div className="pointer-events-none select-none overflow-hidden border-t border-[rgba(237,231,220,0.06)] pt-6">
        <div className="w-full translate-y-[32%] text-center font-syne text-[clamp(3.5rem,14.5vw,16rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.035em] text-[#EDE7DC] whitespace-nowrap opacity-90">
          DHANANJAY HIRE
        </div>
      </div>
    </footer>
  );
}
