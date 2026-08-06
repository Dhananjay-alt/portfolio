import type { Transition, Variants } from "motion/react";

/** Shared easing curves — mirror the CSS custom props in globals.css. */
export const easing = {
  outExpo: [0.16, 1, 0.3, 1],
  outQuart: [0.25, 1, 0.5, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const;

export const duration = {
  xs: 0.15,
  s: 0.3,
  m: 0.5,
  l: 0.8,
} as const;

export const stagger = 0.06;

/** Spring presets for interactive/gesture motion. */
export const springs = {
  soft: { type: "spring", stiffness: 120, damping: 18, mass: 0.6 },
  snappy: { type: "spring", stiffness: 400, damping: 30 },
  gentle: { type: "spring", stiffness: 90, damping: 20 },
} satisfies Record<string, Transition>;

/** Reveal-on-scroll: fade + rise. Pair with `whileInView`. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.l, ease: easing.outExpo },
  },
};

/** Container that staggers its children's reveal. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.m } },
};
