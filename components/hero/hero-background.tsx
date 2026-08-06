"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion, useMediaQuery } from "@/hooks/use-media-query";

// The 3D field is heavy — load it only on the client, only when it earns its place.
const ParticleField = dynamic(() => import("@/components/hero/particle-field"), {
  ssr: false,
});

export function HeroBackground() {
  const reduced = usePrefersReducedMotion();
  const isSmall = useMediaQuery("(max-width: 767px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Static gradient/grid always paints (SSR-safe, and the reduced-motion fallback).
  const staticLayer = (
    <>
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,black,transparent)]" />
      <div className="absolute left-1/2 top-1/4 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
    </>
  );

  const enable3D = mounted && !reduced && !isSmall;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {staticLayer}
      {enable3D && (
        <div className="absolute inset-0 opacity-70">
          <ParticleField />
        </div>
      )}
    </div>
  );
}
