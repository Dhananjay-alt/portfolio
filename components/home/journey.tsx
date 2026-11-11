"use client";

import { useEffect, useRef, useState } from "react";
import { loadGsap, whenIdle } from "@/lib/gsap";
import { gsapEase } from "@/lib/motion";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { SectionLabel } from "@/components/site/section-label";

const ERAS = [
  {
    year: "2024",
    title: "Systems & foundations",
    body: "Arrived at IIT Roorkee and went low-level: C++, Rust, memory layout and algorithmic fundamentals.",
  },
  {
    year: "2025",
    title: "Protocols & provenance",
    body: "On-chain design with Solidity and Foundry, and ERC-721 provenance for luxury goods at ETHGlobal ETHOnline.",
  },
  {
    year: "2026",
    title: "Multiplayer & agents",
    body: "SyncSpace's CRDT workspace, Paygent's ENS prize at HackMoney, and an AST graph analyzer powered by Groq.",
  },
];

const PINNED_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
/** Timeline units: rest on a year, travel to the next. */
const HOLD = 0.5;
const TRAVEL = 1;

/**
 * 2024 → 2025 → 2026.
 *
 * Desktop: the section pins (CSS sticky, so there is no pin-spacer and no
 * layout shift) and ScrollTrigger scrubs a horizontal track. A hairline
 * draws across as you scroll and the last digit of the year rolls 4 → 5 → 6.
 *
 * Under 768px, with reduced motion, without JS, or if GSAP fails to load,
 * it is a plain vertical list — the same markup, laid out by CSS.
 */
export function Journey() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const digitRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<"pinned" | "static">("pinned");

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.matchMedia(PINNED_QUERY).matches) return;

    let revert: (() => void) | undefined;
    let cancelled = false;

    const cancelIdle = whenIdle(() => {
      loadGsap()
        .then(({ gsap, ScrollTrigger }) => {
          if (cancelled) return;
          const mm = gsap.matchMedia();

          mm.add(PINNED_QUERY, () => {
            const steps = ERAS.length - 1;
            const ticks = Array.from(root.querySelectorAll<HTMLElement>("[data-tick]"));
            let current = -1;

            const tl = gsap.timeline({
              defaults: { ease: gsapEase.inOut, duration: TRAVEL },
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const index = Math.round(self.progress * steps);
                  if (index === current) return;
                  current = index;
                  ticks.forEach((tick, t) => tick.toggleAttribute("data-active", t <= index));
                },
              },
            });

            for (let step = 1; step <= steps; step++) {
              const at = HOLD + (step - 1) * (TRAVEL + HOLD);
              tl.to(trackRef.current, { xPercent: -100 * step }, at);
              tl.to(digitRef.current, { yPercent: (-100 / ERAS.length) * step }, at);
            }
            const total = HOLD + steps * (TRAVEL + HOLD);
            tl.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: total }, 0);
          });

          ScrollTrigger.refresh();
          revert = () => mm.revert();
        })
        .catch(() => setMode("static"));
    });

    return () => {
      cancelled = true;
      cancelIdle();
      revert?.();
    };
  }, []);

  return (
    <section ref={rootRef} aria-labelledby="journey-heading" data-mode={mode} className="journey rule">
      <div className="journey-sticky">
        <div className="container-page journey-inner">
          <header>
            <SectionLabel index="03">Journey</SectionLabel>
            <SplitHeading id="journey-heading" className="text-h1 mt-8">
              Three seasons
            </SplitHeading>
          </header>

          <div className="journey-stage">
            {/* Decorative: the year with a rolling last digit (pinned mode only). */}
            <div aria-hidden="true" className="journey-numeral">
              <span>202</span>
              <span className="journey-digit-window">
                <span ref={digitRef} className="journey-digit-column">
                  {ERAS.map((era) => (
                    <span key={era.year}>{era.year.slice(-1)}</span>
                  ))}
                </span>
              </span>
            </div>

            <div className="journey-viewport">
              <ol ref={trackRef} className="journey-track">
                {ERAS.map((era, idx) => (
                  <Reveal as="li" key={era.year} index={idx} className="journey-panel">
                    <p className="journey-year tabular">{era.year}</p>
                    <div className="journey-copy">
                      <h3 className="text-h3">{era.title}</h3>
                      <p className="mt-3 text-mute">{era.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>

          <div aria-hidden="true" className="journey-progress">
            <span className="journey-rail">
              <span ref={barRef} className="journey-bar" />
            </span>
            <span className="journey-ticks">
              {ERAS.map((era, idx) => (
                <span key={era.year} data-tick data-active={idx === 0 ? "" : undefined} className="label tabular">
                  {era.year}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
