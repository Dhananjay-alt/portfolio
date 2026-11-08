"use client";

import { useEffect, type ReactNode } from "react";

/**
 * One-shot reveals for the home page: every [data-rev] / .word-reveal
 * element gains `.is-revealed` the first time it enters the viewport.
 */
export function ScrollChoreographer({ children }: { children: ReactNode }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-rev], .word-reveal")
      .forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
