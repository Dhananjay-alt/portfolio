"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { skillGroups } from "@/content/skills";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { SkillsFallback } from "@/components/skills/skills-fallback";

const W = 1000;
const H = 760;
const CX = W / 2;
const CY = H / 2;
const R_CLUSTER = 215;
const R_SKILL = 100;

type Node = {
  id: string;
  x: number;
  y: number;
  name: string;
  note: string;
  accent: string;
  category: string;
  clusterX: number;
  clusterY: number;
};

function useLayout() {
  return useMemo(() => {
    const clusters: { x: number; y: number; category: string; accent: string }[] = [];
    const nodes: Node[] = [];
    const G = skillGroups.length;

    skillGroups.forEach((group, i) => {
      const angle = -Math.PI / 2 + (i / G) * Math.PI * 2;
      const cx = CX + R_CLUSTER * Math.cos(angle);
      const cy = CY + R_CLUSTER * Math.sin(angle);
      clusters.push({ x: cx, y: cy, category: group.category, accent: group.accent });

      const s = group.skills.length;
      group.skills.forEach((skill, j) => {
        const spread = 0.55;
        const a = angle + (j - (s - 1) / 2) * spread;
        nodes.push({
          id: `${group.category}-${skill.name}`,
          x: cx + R_SKILL * Math.cos(a),
          y: cy + R_SKILL * Math.sin(a),
          name: skill.name,
          note: skill.note,
          accent: group.accent,
          category: group.category,
          clusterX: cx,
          clusterY: cy,
        });
      });
    });

    return { clusters, nodes };
  }, []);
}

export function SkillsConstellation() {
  const reduced = usePrefersReducedMotion();
  const { clusters, nodes } = useLayout();
  const [active, setActive] = useState<Node | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tx = useSpring(px, { stiffness: 80, damping: 20 });
  const ty = useSpring(py, { stiffness: 80, damping: 20 });

  function onMove(e: React.PointerEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    px.set(nx * 24);
    py.set(ny * 24);
  }

  if (reduced) return <SkillsFallback />;

  return (
    <div className="mt-10">
      {/* Constellation — hidden on small screens in favor of the grouped list */}
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
        className="relative hidden md:block"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Interactive constellation of skills grouped by category"
        >
          <motion.g style={{ x: tx, y: ty }}>
            {/* hub → cluster links */}
            {clusters.map((c) => (
              <line
                key={`hub-${c.category}`}
                x1={CX}
                y1={CY}
                x2={c.x}
                y2={c.y}
                stroke="var(--border)"
                strokeWidth={1.5}
              />
            ))}
            {/* cluster → skill links */}
            {nodes.map((n) => {
              const dim = active && active.category !== n.category;
              return (
                <line
                  key={`link-${n.id}`}
                  x1={n.clusterX}
                  y1={n.clusterY}
                  x2={n.x}
                  y2={n.y}
                  stroke={active?.id === n.id ? n.accent : "var(--border)"}
                  strokeWidth={active?.id === n.id ? 2 : 1}
                  opacity={dim ? 0.25 : 1}
                />
              );
            })}

            {/* hub */}
            <circle cx={CX} cy={CY} r={30} fill="var(--card)" stroke="var(--border)" />
            <text
              x={CX}
              y={CY}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-foreground"
              style={{ fontSize: 22, fontWeight: 700 }}
            >
              D
            </text>

            {/* clusters */}
            {clusters.map((c) => (
              <g key={c.category}>
                <circle cx={c.x} cy={c.y} r={6} fill={c.accent} />
                <text
                  x={c.x}
                  y={c.y - 16}
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  style={{ fontSize: 15, fontWeight: 600, fontFamily: "var(--font-mono)" }}
                >
                  {c.category}
                </text>
              </g>
            ))}

            {/* skill nodes */}
            {nodes.map((n) => {
              const isActive = active?.id === n.id;
              const dim = active && active.category !== n.category;
              return (
                <g
                  key={n.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${n.name}: ${n.note}`}
                  className="cursor-pointer outline-none"
                  onPointerEnter={() => setActive(n)}
                  onFocus={() => setActive(n)}
                  style={{ opacity: dim ? 0.35 : 1, transition: "opacity 0.2s" }}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isActive ? 9 : 5}
                    fill={isActive ? n.accent : "var(--foreground)"}
                    style={{ transition: "r 0.15s" }}
                  />
                  <text
                    x={n.x}
                    y={n.y + 22}
                    textAnchor="middle"
                    className="fill-foreground"
                    style={{ fontSize: 14, fontWeight: isActive ? 600 : 400 }}
                  >
                    {n.name}
                  </text>
                </g>
              );
            })}
          </motion.g>
        </svg>

        {/* Info panel */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 min-h-[3.5rem] w-full max-w-md -translate-x-1/2 rounded-xl border border-border bg-card/80 p-4 text-center backdrop-blur">
          {active ? (
            <>
              <p className="text-sm font-semibold" style={{ color: active.accent }}>
                {active.name}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">{active.note}</p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Hover or focus a node to explore the stack.
            </p>
          )}
        </div>
      </div>

      {/* Small screens */}
      <div className="md:hidden">
        <SkillsFallback />
      </div>
    </div>
  );
}
