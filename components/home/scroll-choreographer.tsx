"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Drives the home page's scroll-linked CSS variables and one-shot reveals.
 * Kept deliberately small: one pinned wipe (manifesto) plus an
 * IntersectionObserver for every [data-rev] / .word-reveal element.
 */
export function ScrollChoreographer({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = document.getElementById("stage-manifesto");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = el.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 1;
      root.style.setProperty("--manifesto-wipe", `${(p * 100).toFixed(2)}%`);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

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

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      root.style.removeProperty("--manifesto-wipe");
    };
  }, []);

  return <>{children}</>;
}
