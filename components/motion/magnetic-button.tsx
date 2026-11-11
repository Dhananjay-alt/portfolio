"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { magnetic, spring } from "@/lib/motion";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Magnetic pull for the primary CTA only: the button leans up to 6px toward
 * the pointer on a critically damped spring, and springs back on leave.
 * Inert on touch and under reduced motion. Wraps a link or button without
 * changing its semantics.
 */
export function MagneticButton({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  function onPointerMove(e: PointerEvent<HTMLSpanElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(Math.max(-1, Math.min(1, nx)) * magnetic.max);
    y.set(Math.max(-1, Math.min(1, ny)) * magnetic.max);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x, y, display: "inline-block" }}
      className={className}
    >
      {children}
    </m.span>
  );
}
