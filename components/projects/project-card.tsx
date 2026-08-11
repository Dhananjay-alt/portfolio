"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Trophy } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Project } from "@/types/project";
import { TechBadge } from "@/components/projects/tech-badge";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = usePrefersReducedMotion();

  // Pointer-tracked spotlight + subtle 3D tilt
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 });
  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);

  function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const tech = (project.allTech ?? []).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ type: "spring", bounce: 0, duration: 0.55, delay: index * 0.06 }}
      style={{ perspective: 1000 }}
    >
      <motion.div style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <Link
          ref={ref}
          href={`/projects/${project.slug}`}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/40"
        >
          {/* Spotlight glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(340px circle at ${glowX} ${glowY}, color-mix(in oklch, ${project.accent ?? "var(--brand)"} 22%, transparent), transparent 70%)`,
            }}
          />

          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {project.category}
                </span>
                <span className="text-muted-foreground/40">·</span>
                <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
              </div>
              <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-2 text-muted-foreground">{project.tagline}</p>

            {project.award && (
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
                <Trophy className="size-3" />
                {project.award.replace(/^🏆\s*/, "")}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <TechBadge key={t}>{t}</TechBadge>
              ))}
              {(project.allTech?.length ?? 0) > tech.length && (
                <TechBadge className="text-muted-foreground">
                  +{(project.allTech?.length ?? 0) - tech.length}
                </TechBadge>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
