"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Smooth scrolling via Lenis. Disabled entirely when the user prefers
 * reduced motion (falls back to native scrolling).
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
