"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const SEEN_KEY = "intro-seen";

export function IntroOverlay() {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const seen = sessionStorage.getItem(SEEN_KEY);
    if (!seen) {
      setShow(true);
      sessionStorage.setItem(SEEN_KEY, "1");
      const t = setTimeout(() => setShow(false), 1900);
      return () => clearTimeout(t);
    }
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] grid place-items-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        >
          <motion.div
            exit={{ y: -20, opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <svg width="96" height="96" viewBox="0 0 100 100" aria-hidden>
              <motion.path
                d="M 28 20 L 28 80 L 52 80 C 72 80 82 66 82 50 C 82 34 72 20 52 20 Z"
                fill="none"
                stroke="url(#introGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
              <defs>
                <linearGradient id="introGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.15 265)" />
                  <stop offset="100%" stopColor="oklch(0.8 0.13 200)" />
                </linearGradient>
              </defs>
            </svg>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
              Dhananjay
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
