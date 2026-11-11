"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";
import { ThemeProvider } from "@/providers/theme-provider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

const loadFeatures = () => import("@/components/motion/motion-features").then((mod) => mod.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LazyMotion features={loadFeatures} strict>
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          {children}
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
