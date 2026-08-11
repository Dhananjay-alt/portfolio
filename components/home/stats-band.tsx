"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

type Stat = { value: number; suffix?: string; display?: string; label: string };

const stats: Stat[] = [
  { value: 5, label: "Products shipped end to end" },
  { value: 2, label: "ETHGlobal builds" },
  { value: 1, label: "ENS partner prize", suffix: "🏆" },
  { value: 0, display: "∞", label: "Concurrent CRDT editors" },
];

export function StatsBand() {
  return (
    <section className="border-y border-border/60">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-10 px-6 py-16 md:grid-cols-4 md:py-20">
        {stats.map((s) => (
          <StatItem key={s.label} stat={s} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (stat.display || !inView) return;
    if (reduced) {
      setN(stat.value);
      return;
    }
    const controls = animate(0, stat.value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, stat.value, stat.display]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="text-[length:var(--text-h1)] font-semibold tracking-tight tabular-nums">
        {stat.display ?? n}
        {stat.suffix && <span className="ml-1 align-super text-xl">{stat.suffix}</span>}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
    </div>
  );
}
