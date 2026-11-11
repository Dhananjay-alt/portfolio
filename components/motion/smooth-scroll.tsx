"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { onGsapLoaded } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

let instance: Lenis | null = null;

/** The live Lenis instance, or null when smooth scrolling is off. */
export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Smooth scrolling. Renders nothing, so toggling it never remounts the page.
 * Off entirely under reduced motion (native scrolling takes over), and it
 * keeps ScrollTrigger in step once GSAP has been loaded by a consumer.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  // Tells the boot script the app hydrated, so `html.js` can stay.
  useEffect(() => {
    (window as Window & { __dhReady?: boolean }).__dhReady = true;
  }, []);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true, autoRaf: true });
    instance = lenis;

    const unsubscribe = onGsapLoaded(({ ScrollTrigger }) => {
      lenis.on("scroll", ScrollTrigger.update);
    });

    return () => {
      unsubscribe();
      lenis.destroy();
      if (instance === lenis) instance = null;
    };
  }, [reduced]);

  return null;
}
