"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { reveal, staggerIndex } from "@/lib/motion";

/**
 * One IntersectionObserver for every <Reveal> on the page. An element reveals
 * once 30% of it is visible — or, for blocks taller than the viewport, once it
 * covers 30% of the viewport — and is then dropped from the observer, so
 * nothing off-screen ever animates.
 */
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const viewport = entry.rootBounds?.height ?? window.innerHeight;
        const visible =
          entry.isIntersecting &&
          (entry.intersectionRatio >= reveal.amount ||
            entry.intersectionRect.height >= viewport * reveal.amount);
        // Already scrolled past (restored scroll position, in-page anchor).
        const passed = entry.boundingClientRect.bottom < 0;
        if (visible || passed) {
          entry.target.setAttribute("data-revealed", "");
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: [0, reveal.amount] },
  );
  return observer;
}

type RevealProps = {
  children: ReactNode;
  /** Element to render. Defaults to a div. */
  as?: ElementType;
  /** Position among siblings; each step delays by one stagger token. */
  index?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

/**
 * Body-copy reveal: a 16px fade-up, once, on enter. The hidden state lives in
 * CSS behind `html.js`, so server HTML is visible as-is; under reduced motion
 * the travel is dropped and only a short opacity fade remains.
 */
export function Reveal({ children, as, index = 0, className, style, id }: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = getObserver();
    io.observe(node);
    return () => io.unobserve(node);
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      className={className}
      style={{ ...style, "--i": staggerIndex(index) } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
