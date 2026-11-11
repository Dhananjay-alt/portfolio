"use client";

import { useSyncExternalStore } from "react";
import { FINE_POINTER_QUERY, REDUCED_MOTION_QUERY } from "@/lib/motion";

/** SSR-safe media-query hook. Returns `false` on the server and first render. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const usePrefersReducedMotion = () => useMediaQuery(REDUCED_MOTION_QUERY);

export const useIsTouch = () => useMediaQuery("(pointer: coarse)");

/** True only where hover is real: a mouse or trackpad. */
export const useFinePointer = () => useMediaQuery(FINE_POINTER_QUERY);
