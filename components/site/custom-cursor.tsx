"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { spring } from "@/lib/motion";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-media-query";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, label[for]';

/**
 * A small dot that trails the pointer and grows over interactive elements.
 * The native cursor is left alone. Mouse/trackpad only; off on touch and
 * under reduced motion. Size changes are a scale transform, never width/height.
 */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { ...spring, stiffness: 500, damping: 40 });
  const sy = useSpring(y, { ...spring, stiffness: 500, damping: 40 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHovering(Boolean((e.target as Element | null)?.closest?.(INTERACTIVE)));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden="true"
      data-chrome
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <m.div
        className="-ml-1 -mt-1 size-2 rounded-full bg-white"
        initial={false}
        animate={{ scale: hovering ? 4 : 1, opacity: visible ? (hovering ? 0.35 : 1) : 0 }}
        transition={spring}
      />
    </m.div>
  );
}
