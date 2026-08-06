"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";

export function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 600);
  });

  function toTop() {
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          data-chrome
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          className="fixed bottom-5 left-5 z-[150] grid size-11 place-items-center rounded-full border border-border bg-card/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
