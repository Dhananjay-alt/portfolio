"use client";

import React, { useEffect, createContext, useContext, useState } from "react";

interface ChoreographyContextType {
  artifactPhase: number;
  seasonChapter: number;
}

const ChoreographyContext = createContext<ChoreographyContextType>({
  artifactPhase: 0,
  seasonChapter: 0,
});

export const useChoreography = () => useContext(ChoreographyContext);

export function ScrollChoreographer({ children }: { children: React.ReactNode }) {
  const [artifactPhase, setArtifactPhase] = useState(0);
  const [seasonChapter, setSeasonChapter] = useState(0);

  useEffect(() => {
    let ticking = false;
    let lastPhase = -1;
    let lastChapter = -1;

    const root = document.documentElement;

    const calcProgress = (el: HTMLElement | null): number => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const height = el.offsetHeight - window.innerHeight;
      if (height <= 0) return 0;
      const progress = -rect.top / height;
      return Math.min(1, Math.max(0, progress));
    };

    const updateProperties = () => {
      // 1. Stage Hero (280svh)
      const heroEl = document.getElementById("stage-hero");
      if (heroEl) {
        const p0 = calcProgress(heroEl);
        root.style.setProperty("--hero-type-y", `-${(p0 * 90).toFixed(2)}px`);
        root.style.setProperty("--hero-type-scale", `${(1 - p0 * 0.26).toFixed(4)}`);
        root.style.setProperty("--hero-type-alpha", `${Math.max(0, 1 - p0 * 1.35).toFixed(4)}`);
        root.style.setProperty("--hero-meta-alpha", `${Math.max(0, 1 - p0 * 1.75).toFixed(4)}`);
      }

      // 2. Stage Manifesto (260svh)
      const manifestoEl = document.getElementById("stage-manifesto");
      if (manifestoEl) {
        const p1 = calcProgress(manifestoEl);
        root.style.setProperty("--manifesto-wipe", `${(p1 * 100).toFixed(2)}%`);
        root.style.setProperty("--manifesto-scale", `${(1 + p1 * 0.05).toFixed(4)}`);
      }

      // 3. Stage Card Rail (340svh)
      const railEl = document.getElementById("stage-rail");
      const trackEl = document.getElementById("rail-track");
      if (railEl && trackEl) {
        const p2 = calcProgress(railEl);
        const overflowWidth = Math.max(0, trackEl.scrollWidth - window.innerWidth + 80);
        root.style.setProperty("--rail-progress", `${p2.toFixed(4)}`);
        root.style.setProperty("--rail-overflow", `${overflowWidth}px`);
        root.style.setProperty("--rail-meter", `${(p2 * 100).toFixed(2)}%`);
      }

      // 4. Stage Artifact (420svh)
      const artifactEl = document.getElementById("stage-artifact");
      if (artifactEl) {
        const p3 = calcProgress(artifactEl);
        root.style.setProperty("--packet-alpha", `${Math.min(1, Math.max(0, p3 * 2.8)).toFixed(3)}`);
        root.style.setProperty("--packet-enter", `${(Math.max(0, 1 - p3 * 2.5) * 38).toFixed(2)}px`);
        root.style.setProperty("--packet-scale", `${(0.78 + Math.min(1, p3 * 1.4) * 0.22).toFixed(3)}`);
        root.style.setProperty("--packet-meter", `${(p3 * 100).toFixed(1)}%`);
        root.style.setProperty("--packet-copy-x", `${(-p3 * 24).toFixed(1)}px`);

        // Perforation cut opens in final quarter [0.74, 1.0]
        const cut = Math.min(1, Math.max(0, (p3 - 0.74) / 0.26));
        root.style.setProperty("--packet-cut", `${cut.toFixed(3)}`);

        // Phase index: 0, 1, 2, 3
        const phase = Math.min(3, Math.floor(p3 * 4));
        if (phase !== lastPhase) {
          lastPhase = phase;
          setArtifactPhase(phase);
        }
      }

      // 5. Stage Season (300svh)
      const seasonEl = document.getElementById("stage-season");
      if (seasonEl) {
        const p4 = calcProgress(seasonEl);
        root.style.setProperty("--season-y", `${(-4 + p4 * 8).toFixed(2)}%`);
        root.style.setProperty("--season-scale", `${(1.10 - p4 * 0.045).toFixed(4)}`);
        root.style.setProperty("--season-progress", `${p4.toFixed(4)}`);

        const chapter = Math.min(2, Math.floor(p4 * 3));
        if (chapter !== lastChapter) {
          lastChapter = chapter;
          setSeasonChapter(chapter);
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProperties);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateProperties();

    // IntersectionObserver for ~200 data-rev elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const revElements = document.querySelectorAll("[data-rev], .word-reveal");
    revElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <ChoreographyContext.Provider value={{ artifactPhase, seasonChapter }}>
      {children}
    </ChoreographyContext.Provider>
  );
}