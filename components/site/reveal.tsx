"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { revealUp, staggerContainer, revealViewport } from "@/animations/tokens";

/**
 * Default reveal used across the whole site: fade + small rise on enter,
 * once, slightly before fully in view. Honors reduced motion via the global
 * MotionConfig (reducedMotion="user"), which drops the transform.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its children (each a <RevealItem/>). */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={revealUp}>
      {children}
    </motion.div>
  );
}
