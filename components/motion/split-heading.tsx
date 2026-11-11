"use client";

import { useEffect, useRef, type ElementType } from "react";
import { loadGsap, whenIdle } from "@/lib/gsap";
import { duration, gsapEase, prefersReducedMotion, reveal } from "@/lib/motion";

type SplitHeadingProps = {
  children: string;
  as?: ElementType;
  className?: string;
  id?: string;
};

/**
 * Section heading that reveals line by line: SplitText measures the real line
 * breaks, wraps each in an overflow-hidden mask, and the lines slide up into
 * place. Plays once, when 30% of the heading is in view.
 *
 * - GSAP is fetched on idle, never in the initial bundle.
 * - The split is reverted when the animation ends, leaving the original DOM
 *   (so resizing just reflows text like any other heading).
 * - Reduced motion: no split at all, a 180ms opacity fade (handled in CSS).
 * - If GSAP fails to load the heading simply appears.
 */
export function SplitHeading({ children, as, className, id }: SplitHeadingProps) {
  const Tag: ElementType = as ?? "h2";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    // Already shown before first paint (it was above the fold).
    if (!node || node.hasAttribute("data-split-ready")) return;

    const reduced = prefersReducedMotion();
    let cancelled = false;
    let cleanupSplit: (() => void) | undefined;

    const show = () => node.setAttribute("data-split-ready", "");

    const play = async () => {
      if (reduced) return show();
      try {
        const { gsap, SplitText } = await loadGsap();
        await document.fonts.ready;
        if (cancelled) return;
        show();
        const split = SplitText.create(node, {
          type: "lines",
          mask: "lines",
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: duration.large,
              ease: gsapEase.out,
              stagger: 0.07,
              onComplete: () => self.revert(),
            }),
        });
        cleanupSplit = () => split.revert();
      } catch {
        show();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const passed = entry.boundingClientRect.bottom < 0;
        if (passed) {
          io.disconnect();
          show();
        } else if (entry.isIntersecting && entry.intersectionRatio >= reveal.amount) {
          io.disconnect();
          void play();
        }
      },
      { threshold: [0, reveal.amount] },
    );
    io.observe(node);

    // Warm the chunk so the first heading doesn't wait on the network.
    const cancelIdle = reduced ? () => {} : whenIdle(() => void loadGsap().catch(() => {}));

    return () => {
      cancelled = true;
      cancelIdle();
      io.disconnect();
      cleanupSplit?.();
    };
  }, []);

  return (
    <Tag ref={ref} id={id} data-split="" suppressHydrationWarning className={className}>
      {children}
    </Tag>
  );
}
