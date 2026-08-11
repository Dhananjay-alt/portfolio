import type { Transition, Variants } from "motion/react";

/**
 * Motion tokens, Apple-style. Springs are the default tool: interruptible,
 * velocity-aware, and continuous. `bounce` + `duration` map to Apple's
 * damping + response — bounce 0 is critically damped (no overshoot).
 */

/** Eased curves for the few non-spring cases (mirror globals.css). */
export const easing = {
  reveal: [0.22, 1, 0.36, 1],
  outExpo: [0.16, 1, 0.3, 1],
} as const;

export const duration = {
  xs: 0.15,
  s: 0.3,
  m: 0.5,
  l: 0.8,
} as const;

export const stagger = 0.06;

/** Fire once, slightly before fully in view. */
export const revealViewport = { once: true, margin: "-15% 0px" } as const;

/**
 * Apple spring presets. Default UI is critically damped (no overshoot);
 * bounce is reserved for momentum-driven interactions (flick / drag release).
 */
export const springs = {
  /** Default UI move/reposition — critically damped. */
  ui: { type: "spring", bounce: 0, duration: 0.4 },
  /** Momentum interaction — slight overshoot, only after a flick/throw. */
  momentum: { type: "spring", bounce: 0.2, duration: 0.4 },
  /** Drawer / sheet. */
  drawer: { type: "spring", bounce: 0.2, duration: 0.3 },
  /** Snappy control (toggles, small chips). */
  snappy: { type: "spring", bounce: 0, duration: 0.3 },
} satisfies Record<string, Transition>;

/** Reveal-on-scroll: fade + small rise, on a calm critically-damped spring. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0, duration: 0.55 },
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
