"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

export function StatementFold() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const circleDriftY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const circleRotate = useTransform(scrollYProgress, [0, 1], [-20, 35]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden border-b border-[rgba(237,231,220,0.13)] bg-[#0A0C0E] px-6 py-28 md:px-16"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Small uppercase label */}
        <div className="mb-6 flex items-center gap-3">
          <span className="size-1.5 rounded-full bg-[#E8913C]" />
          <span className="font-sora text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8]">
            [ 01 / ETHOS ]
          </span>
        </div>

        {/* Outlined index numeral using -webkit-text-stroke with transparent fill */}
        <div
          className="select-none font-syne font-extrabold leading-none text-transparent"
          style={{
            WebkitTextStroke: "1px rgba(237, 231, 220, 0.18)",
            fontSize: "clamp(80px, 12vw, 180px)",
          }}
        >
          01
        </div>

        {/* Statement at clamp(24px,3.6vw,52px) over about 22ch with one phrase in amber */}
        <p className="mt-4 max-w-[22ch] font-syne font-semibold leading-[1.12] tracking-[-0.025em] text-[#EDE7DC] text-[clamp(24px,3.6vw,52px)]">
          I design and ship complete products — from CRDT-backed realtime apps to{" "}
          <span className="text-[#E8913C]">on-chain protocols</span> and AI-powered
          developer tools.
        </p>
      </div>

      {/* Circular image floating off the right edge at reduced opacity that drifts and rotates on scroll */}
      <motion.div
        style={
          reduced
            ? undefined
            : {
                y: circleDriftY,
                rotate: circleRotate,
              }
        }
        className="pointer-events-none absolute -right-24 top-1/2 aspect-square w-[320px] -translate-y-1/2 overflow-hidden rounded-full border border-[rgba(237,231,220,0.13)] opacity-35 md:-right-16 md:w-[500px]"
      >
        <Image
          src="/images/statement-circle.jpg"
          alt="Brutalist architectural detail"
          fill
          sizes="(max-width: 768px) 320px, 500px"
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
