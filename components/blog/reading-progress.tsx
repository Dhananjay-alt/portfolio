"use client";

import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <m.div
      aria-hidden
      data-chrome
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-accent"
    />
  );
}
