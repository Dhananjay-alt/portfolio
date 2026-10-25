"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

export function PortalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Portal opening transforms: image scale settles from 1.16 down to 1.0
  const imageScale = useTransform(scrollYProgress, [0, 0.85], [1.16, 1.0]);

  // Duotone wash blends amber and teal at mix-blend-mode overlay, raising from 0 to 0.40 opacity
  const duotoneOpacity = useTransform(scrollYProgress, [0, 0.85], [0, 0.4]);

  // Two solid panels parting outward
  const leftPanelX = useTransform(scrollYProgress, [0, 0.85], ["0%", "-105%"]);
  const rightPanelX = useTransform(scrollYProgress, [0, 0.85], ["0%", "105%"]);

  // Two glowing accent dots at centre travelling out toward opposite corners
  const dotAmberX = useTransform(scrollYProgress, [0, 0.85], [0, -320]);
  const dotAmberY = useTransform(scrollYProgress, [0, 0.85], [0, -220]);
  const dotTealX = useTransform(scrollYProgress, [0, 0.85], [0, 320]);
  const dotTealY = useTransform(scrollYProgress, [0, 0.85], [0, 220]);

  // The portal title: wordmark grows while tracking tightens and halves travel outward
  const titleScale = useTransform(scrollYProgress, [0, 0.85], [1, 1.32]);
  const titleLetterSpacing = useTransform(
    scrollYProgress,
    [0, 0.85],
    ["-0.01em", "-0.04em"]
  );
  // Split DHANANJAY into two halves: "DHAN" and "ANJAY" traveling outward
  const spanLeftX = useTransform(scrollYProgress, [0, 0.85], ["0%", "-48%"]);
  const spanRightX = useTransform(scrollYProgress, [0, 0.85], ["0%", "48%"]);

  return (
    <section
      ref={containerRef}
      className={`relative bg-[#0A0C0E] ${reduced ? "min-h-screen" : "h-[250vh]"}`}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden isolate">
        {/* Layer 1 (back): Full-bleed image starting overscaled */}
        <motion.div
          style={reduced ? undefined : { scale: imageScale }}
          className="absolute inset-0 size-full"
        >
          <Image
            src="/images/portal-hero.jpg"
            alt="Atmospheric brutalist architecture at night"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Layer 2: Duotone wash blending amber and teal at mix-blend-mode: overlay */}
        <motion.div
          style={
            reduced
              ? { opacity: 0.35 }
              : {
                  opacity: duotoneOpacity,
                  background:
                    "linear-gradient(135deg, #E8913C 0%, #2E6B72 100%)",
                  mixBlendMode: "overlay",
                }
          }
          className="pointer-events-none absolute inset-0 z-1"
        />

        {/* Layer 3: Radial veil darkening the edges */}
        <div
          className="pointer-events-none absolute inset-0 z-2"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, #0A0C0E 92%)",
          }}
        />

        {/* Layer 4: TWO solid panels meeting in middle so hero begins CLOSED */}
        {!reduced && (
          <>
            <motion.div
              style={{ x: leftPanelX }}
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[52vw] bg-[#0A0C0E]"
            />
            <motion.div
              style={{ x: rightPanelX }}
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[52vw] bg-[#0A0C0E]"
            />
          </>
        )}

        {/* Layer 5: Two small glowing accent dots at centre travelling out */}
        {!reduced && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            {/* Amber accent dot */}
            <motion.span
              style={{ x: dotAmberX, y: dotAmberY }}
              className="size-1.5 rounded-full bg-[#E8913C]"
            />
            {/* Teal accent dot */}
            <motion.span
              style={{ x: dotTealX, y: dotTealY }}
              className="size-1.5 rounded-full bg-[#2E6B72]"
            />
          </div>
        )}

        {/* Layer 6: Corner metadata pins to top and bottom edges */}
        <div className="pointer-events-none absolute inset-x-0 top-20 z-30 flex items-center justify-between px-6 md:px-12">
          <span className="font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8]">
            DHANANJAY / 2026
          </span>
          <span className="font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8]">
            IIT ROORKEE — INDIA
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-[#E8913C]" />
            <span className="font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8]">
              FULL-STACK & WEB3 ENGINEER
            </span>
          </div>
          <span className="font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8]">
            SCROLL TO ENTER / 01
          </span>
        </div>

        {/* Layer 7: The Portal Title on top, split into two spans: DHAN + ANJAY */}
        <div className="relative z-25 flex items-center justify-center px-4">
          <motion.h1
            style={
              reduced
                ? undefined
                : {
                    scale: titleScale,
                    letterSpacing: titleLetterSpacing,
                  }
            }
            className="flex items-center justify-center whitespace-nowrap font-syne font-extrabold uppercase text-[#EDE7DC]"
          >
            <motion.span
              style={reduced ? undefined : { x: spanLeftX }}
              className="inline-block text-[clamp(2.5rem,8vw,7.8rem)] leading-none tracking-[-0.025em]"
            >
              DHAN
            </motion.span>
            <motion.span
              style={reduced ? undefined : { x: spanRightX }}
              className="inline-block text-[clamp(2.5rem,8vw,7.8rem)] leading-none tracking-[-0.025em] text-[#EDE7DC]"
            >
              ANJAY
            </motion.span>
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
