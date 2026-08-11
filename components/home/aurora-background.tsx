"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { usePrefersReducedMotion, useIsTouch } from "@/hooks/use-media-query";

type Blob = {
  color: string;
  size: number;
  top: string;
  left: string;
  drift: { x: number[]; y: number[]; scale: number[] };
  duration: number;
};

const blobs: Blob[] = [
  {
    color: "oklch(0.62 0.2 255)",
    size: 40,
    top: "6%",
    left: "16%",
    drift: { x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.95, 1] },
    duration: 18,
  },
  {
    color: "oklch(0.7 0.15 210)",
    size: 34,
    top: "38%",
    left: "60%",
    drift: { x: [0, -50, 40, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.1, 1] },
    duration: 22,
  },
  {
    color: "oklch(0.6 0.2 300)",
    size: 30,
    top: "56%",
    left: "24%",
    drift: { x: [0, 40, -40, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] },
    duration: 26,
  },
];

export function AuroraBackground() {
  const reduced = usePrefersReducedMotion();
  const isTouch = useIsTouch();

  // Mouse-reactive spotlight (normalized 0..1 → percent).
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.4);
  const left = useTransform(useSpring(mx, { stiffness: 60, damping: 20 }), (n) => `${n * 100}%`);
  const top = useTransform(useSpring(my, { stiffness: 60, damping: 20 }), (n) => `${n * 100}%`);

  useEffect(() => {
    if (reduced || isTouch) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, isTouch, mx, my]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-background">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute rounded-full blur-[110px]"
          style={{
            top: b.top,
            left: b.left,
            width: `${b.size}rem`,
            height: `${b.size}rem`,
            background: b.color,
            opacity: 0.3,
          }}
          animate={reduced ? undefined : { x: b.drift.x, y: b.drift.y, scale: b.drift.scale }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {!reduced && !isTouch && (
        <motion.div
          aria-hidden
          className="absolute h-[55rem] w-[55rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
          style={{
            left,
            top,
            background:
              "radial-gradient(closest-side, color-mix(in oklch, var(--brand) 20%, transparent), transparent)",
          }}
        />
      )}

      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />
    </div>
  );
}
