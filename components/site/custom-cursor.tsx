"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsTouch, usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Soft round cursor: a small inverted dot that swells over interactive targets.
 * Difference blending keeps it legible on parchment, lagoon and wine alike.
 */
export function CustomCursor() {
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const enabled = !isTouch && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 550, damping: 38, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 550, damping: 38, mass: 0.35 });

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]',
      );
      setHovering(Boolean(interactive));
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled || !visible) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="bg-white"
        style={{ borderRadius: 9999 }}
        animate={{
          width: hovering ? 36 : 10,
          height: hovering ? 36 : 10,
          x: hovering ? -18 : -5,
          y: hovering ? -18 : -5,
          scale: pressed ? 0.8 : 1,
          opacity: hovering ? 0.3 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </motion.div>
  );
}