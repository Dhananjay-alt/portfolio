"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * A big-type statement that brightens word-by-word as you scroll — Apple's
 * classic scrubbed text moment. Pinned while it reveals. Reduced motion shows
 * the full, legible statement immediately with no pin or scrub.
 */
export function Statement({ text }: { text: string }) {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const words = text.split(" ");

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    const panel = panelRef.current;
    if (!track || !panel) return;

    gsap.registerPlugin(ScrollTrigger);
    const onScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onScroll);

    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray<HTMLElement>("[data-word]");
      gsap.set(wordEls, { opacity: 0.16 });
      gsap.to(wordEls, {
        opacity: 1,
        stagger: 1,
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          pin: panel,
          scrub: true,
        },
      });
    }, track);

    ScrollTrigger.refresh();
    return () => {
      lenis?.off("scroll", onScroll);
      ctx.revert();
    };
  }, [reduced, lenis]);

  if (reduced) {
    return (
      <section className="mx-auto w-full max-w-5xl px-6 py-32">
        <p className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
          {text}
        </p>
      </section>
    );
  }

  return (
    <div ref={trackRef} style={{ height: "260vh" }} className="relative">
      <div ref={panelRef} className="flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="text-[length:var(--text-h1)] font-semibold leading-[1.08] tracking-tight text-balance">
            {words.map((w, i) => (
              <span key={i} data-word className="inline-block">
                {w}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
