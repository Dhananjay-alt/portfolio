import type { CSSProperties } from "react";
import type { Transition } from "motion/react";

/**
 * Motion tokens — the single source of truth for every animation on the site.
 *
 * JS consumers (Motion, GSAP) import the values below. CSS consumers read the
 * custom properties produced by `motionCssVars()`, which the root layout puts
 * on <html>, so the two can never drift apart.
 *
 * Rules the tokens encode:
 *  - animate only transform, opacity, clip-path and filter
 *  - reveals travel 16–24px, never rotate, never bounce
 *  - stagger 40–60ms between siblings, at most 8 per group
 */

type Bezier = readonly [number, number, number, number];

export const ease = {
  /** Default for anything entering or settling. */
  out: [0.22, 1, 0.36, 1],
  /** For things that move between two resting states. */
  inOut: [0.65, 0, 0.35, 1],
} as const satisfies Record<string, Bezier>;

/**
 * GSAP's named equivalents of the curves above: `ease.out` is an ease-out
 * quint and `ease.inOut` an ease-in-out cubic, so no CustomEase plugin needed.
 */
export const gsapEase = {
  out: "power4.out",
  inOut: "power2.inOut",
} as const;

/** Seconds — Motion and GSAP both take seconds. */
export const duration = {
  /** Hover, press, colour-adjacent feedback. */
  micro: 0.15,
  /** Small UI moves: nav hide, underline draw, label swap. */
  small: 0.25,
  /** Reveals and clip-path wipes. */
  medium: 0.45,
  /** Hero and page-level moments only. */
  large: 0.8,
} as const;

export const stagger = {
  /** Seconds between siblings. */
  step: 0.05,
  /** Siblings beyond this share the last slot's delay. */
  maxItems: 8,
} as const;

export const reveal = {
  /** Pixels of upward travel. */
  distance: 16,
  /** Fraction of the element that must be visible before it reveals. */
  amount: 0.3,
} as const;

/** Critically damped spring for anything the pointer drives. */
export const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const satisfies Transition;

export const magnetic = {
  /** Maximum pull in pixels. */
  max: 6,
} as const;

const bezier = (b: Bezier) => `cubic-bezier(${b.join(", ")})`;
const ms = (seconds: number) => `${Math.round(seconds * 1000)}ms`;

export const cssEase = {
  out: bezier(ease.out),
  inOut: bezier(ease.inOut),
} as const;

/** Custom properties mirrored onto <html> for stylesheets to consume. */
export function motionCssVars(): CSSProperties {
  return {
    "--ease-out": cssEase.out,
    "--ease-in-out": cssEase.inOut,
    "--dur-micro": ms(duration.micro),
    "--dur-small": ms(duration.small),
    "--dur-medium": ms(duration.medium),
    "--dur-large": ms(duration.large),
    "--stagger": ms(stagger.step),
    "--reveal-y": `${reveal.distance}px`,
  } as CSSProperties;
}

/** Clamp a sibling index so long lists never stagger past `maxItems`. */
export function staggerIndex(index: number): number {
  return Math.min(Math.max(index, 0), stagger.maxItems - 1);
}

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
