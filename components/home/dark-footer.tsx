"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { socials } from "@/config/socials";
import { profile } from "@/content/profile";

export function DarkFooter() {
  return (
    <footer className="relative bg-[#241a12] text-[#fffdf8] pt-28 pb-0 overflow-hidden select-none border-t border-[rgba(231,226,216,0.14)]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Top CTA Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 pb-20 border-b border-[rgba(231,226,216,0.14)]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="size-2 bg-[#ef493c]" />
              <span className="mono-label text-[rgba(231,226,216,0.56)]">
                [ 07 / TERMINAL CLOSE ]
              </span>
            </div>

            <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.88] text-[#fffdf8] mb-6">
              AVAILABLE FOR PROTOCOLS, MULTIPLAYER ENGINES & FOUNDING TEAMS.
            </h2>

            <p className="font-inter text-sm sm:text-base text-[rgba(231,226,216,0.68)] leading-relaxed max-w-lg">
              Based at IIT Roorkee. Shipping high-performance software across full-stack,
              Web3 protocols, and AI developer tools.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-[#fffdf8] px-6 py-3.5 mono-label text-[#fffdf8] hover:border-[#ef493c] hover:text-[#ef493c] transition-colors"
            >
              START A CONVERSATION
              <ArrowUpRight className="size-3.5" />
            </Link>

            <Link
              href="/resume"
              className="inline-flex items-center gap-2 border border-[rgba(231,226,216,0.2)] px-6 py-3.5 mono-label text-[rgba(231,226,216,0.6)] hover:text-[#fffdf8] transition-colors"
            >
              INSPECT RÉSUMÉ
            </Link>
          </div>
        </div>

        {/* Hairline Strip */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[rgba(231,226,216,0.1)] mono-label text-[rgba(231,226,216,0.56)] text-[10px]">
          <div>© 2026 {profile.name.toUpperCase()}</div>

          <div className="flex items-center gap-2">
            <span className="size-1.5 bg-[#ef493c]" />
            <span className="text-[#fffdf8]">OPEN FOR ENGINEERING ROLES</span>
          </div>

          <div>29.8543° N, 77.8880° E // IIT ROORKEE</div>

          <div className="flex items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-[#ef493c] transition-colors"
              >
                {s.label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Giant Cropped Anton Wordmark at Bottom Edge with one word in red */}
      <div className="pointer-events-none select-none overflow-hidden w-full pt-8">
        <div
          className="w-full text-center font-anton uppercase whitespace-nowrap leading-[0.76] tracking-[-0.045em] opacity-90 translate-y-[28%]"
          style={{
            fontSize: "clamp(4.5rem, 19vw, 24rem)",
          }}
        >
          <span className="text-[#fffdf8]">DHANAN</span>
          <span className="text-[#ef493c]">JAY</span>
        </div>
      </div>
    </footer>
  );
}