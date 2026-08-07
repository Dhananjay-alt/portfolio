"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/types/project";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";

/**
 * The site's one big motion moment — SyncSpace only. Pins a panel and scrubs
 * the approach + architecture into view 1:1 with scroll, smoothed by Lenis.
 * Under reduced motion it renders as a plain, static section (no pin, no scrub).
 */
export function FlagshipScroll({ project }: { project: Project }) {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    const panel = panelRef.current;
    if (!track || !panel) return;

    gsap.registerPlugin(ScrollTrigger);

    // Drive ScrollTrigger from Lenis' scroll so pin + scrub stay in sync.
    const onScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onScroll);

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-flagship-step]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          pin: panel,
          scrub: true,
        },
      });

      tl.from("[data-flagship-lead]", { autoAlpha: 0, y: 24, duration: 0.6 });
      steps.forEach((step, i) => {
        tl.from(step, { autoAlpha: 0, y: 28, duration: 0.8 }, 0.6 + i * 0.9);
      });
      // Progress line grows across the scrub.
      tl.fromTo(
        "[data-flagship-progress]",
        { scaleY: 0 },
        { scaleY: 1, duration: steps.length * 0.9, ease: "none" },
        0.6,
      );
    }, track);

    ScrollTrigger.refresh();

    return () => {
      lenis?.off("scroll", onScroll);
      ctx.revert();
    };
  }, [reduced, lenis]);

  // Reduced-motion / no-JS friendly static version.
  if (reduced) {
    return (
      <section className="border-t border-border/60 py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-[200px_1fr]">
          <div>
            <p className="font-mono text-xs text-brand">02</p>
            <h2 className="mt-2 text-[length:var(--text-h3)] font-semibold tracking-tight">
              Approach &amp; architecture
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-foreground/90">{project.approach}</p>
            <div className="mt-8">
              <ArchitectureDiagram steps={project.architecture} accent={project.accent} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={trackRef}
      className="relative border-t border-border/60"
      style={{ height: `${(project.architecture.length + 1) * 62}vh` }}
    >
      <div ref={panelRef} className="flex min-h-screen items-center py-16">
        <div className="grid w-full gap-10 md:grid-cols-[220px_1fr]">
          <div className="md:pt-2" data-flagship-lead>
            <p className="font-mono text-xs text-brand">02 · Flagship</p>
            <h2 className="mt-2 text-[length:var(--text-h2)] font-semibold leading-[1.05] tracking-tight">
              Inside SyncSpace
            </h2>
            <p className="mt-4 max-w-xs text-muted-foreground">{project.approach}</p>
          </div>

          <div className="relative pl-6">
            {/* Scrubbed progress line */}
            <span
              aria-hidden
              data-flagship-progress
              className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px origin-top bg-brand-gradient"
            />
            <ol className="space-y-5">
              {project.architecture.map((step, i) => (
                <li
                  key={step.layer}
                  data-flagship-step
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-medium">{step.layer}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
