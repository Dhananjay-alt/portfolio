"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Constellation — the site's signature visual.
 *
 * Thousands of tiny outlined triangles in saturated colours, arranged into a
 * shape (a brain-like cloud for the hero, smaller forms for project sections)
 * and gently drifting. Particles are batched by colour + alpha bucket so the
 * whole field strokes in ~20 draw calls per frame.
 */

export type ConstellationShape =
  | "brain"
  | "orbit"
  | "lattice"
  | "seal"
  | "tree"
  | "ambient";

const PALETTE = [
  "#8052ff", // electric iris
  "#ffb829", // saffron spark
  "#2bc4a0", // verdant (lifted for legibility on black)
  "#e04bd6", // magenta
  "#4b7bff", // blue
  "#b49cff", // lavender
];

// Weighted so violet dominates, amber sparks punctuate.
const COLOR_WEIGHTS = [0.34, 0.16, 0.14, 0.12, 0.12, 0.12];
const ALPHA_BUCKETS = [0.35, 0.65, 1];

type Particle = {
  bx: number; // base x in [-1, 1]
  by: number; // base y in [-1, 1]
  size: number;
  rot: number;
  spin: number;
  phase: number;
  drift: number;
  color: number;
  alpha: number;
};

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(rand: () => number) {
  return (rand() + rand() + rand() - 1.5) / 1.5;
}

function pickColor(rand: () => number) {
  let r = rand();
  for (let i = 0; i < COLOR_WEIGHTS.length; i++) {
    r -= COLOR_WEIGHTS[i];
    if (r <= 0) return i;
  }
  return 0;
}

/** Point generators — each returns a point roughly inside [-1, 1]². */
const SHAPES: Record<ConstellationShape, (rand: () => number) => [number, number]> = {
  brain(rand) {
    // Two overlapping hemispheres, a cerebellum and a short stem, with
    // sulci-like banding so the cloud reads as organic rather than a blob.
    const lobes: [number, number, number, number, number][] = [
      // cx, cy, rx, ry, weight
      [-0.28, -0.1, 0.58, 0.5, 0.36],
      [0.28, -0.12, 0.58, 0.48, 0.36],
      [0.38, 0.38, 0.34, 0.2, 0.14],
      [0.02, 0.32, 0.4, 0.22, 0.1],
      [0.12, 0.62, 0.08, 0.18, 0.04],
    ];
    let r = rand();
    let lobe = lobes[0];
    for (const l of lobes) {
      r -= l[4];
      if (r <= 0) {
        lobe = l;
        break;
      }
    }
    for (;;) {
      const x = rand() * 2 - 1;
      const y = rand() * 2 - 1;
      const d = x * x + y * y;
      if (d > 1) continue;
      const theta = Math.atan2(y, x);
      const band = 0.5 + 0.5 * Math.sin(Math.sqrt(d) * 14 + theta * 3);
      if (rand() > 0.35 + 0.65 * band) continue;
      return [lobe[0] + x * lobe[2], lobe[1] + y * lobe[3]];
    }
  },
  orbit(rand) {
    const ring = Math.floor(rand() * 3);
    const t = rand() * Math.PI * 2;
    const rad = 0.38 + ring * 0.22 + gauss(rand) * 0.04;
    const tilt = 0.55 + ring * 0.1;
    if (rand() < 0.12) return [gauss(rand) * 0.12, gauss(rand) * 0.12];
    return [Math.cos(t) * rad, Math.sin(t) * rad * tilt];
  },
  lattice(rand) {
    const cols = 7;
    const rows = 5;
    const c = Math.floor(rand() * cols);
    const rr = Math.floor(rand() * rows);
    const cx = -0.8 + (c / (cols - 1)) * 1.6;
    const cy = -0.6 + (rr / (rows - 1)) * 1.2;
    const lit = (c + rr) % 3 === 0;
    const spread = lit ? 0.07 : 0.035;
    return [cx + gauss(rand) * spread, cy + gauss(rand) * spread];
  },
  seal(rand) {
    const t = rand() * Math.PI * 2;
    const ring = Math.floor(rand() * 6);
    const rad = 0.2 + ring * 0.13 + Math.sin(t * 6) * 0.03;
    return [Math.cos(t) * rad + gauss(rand) * 0.015, Math.sin(t) * rad + gauss(rand) * 0.015];
  },
  tree(rand) {
    const nodes: [number, number][] = [
      [0, -0.7],
      [-0.45, -0.15],
      [0.45, -0.15],
      [-0.7, 0.45],
      [-0.2, 0.45],
      [0.25, 0.45],
      [0.7, 0.45],
    ];
    const edges: [number, number][] = [
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 4],
      [2, 5],
      [2, 6],
    ];
    if (rand() < 0.55) {
      const n = nodes[Math.floor(rand() * nodes.length)];
      return [n[0] + gauss(rand) * 0.09, n[1] + gauss(rand) * 0.09];
    }
    const [a, b] = edges[Math.floor(rand() * edges.length)];
    const k = rand();
    return [
      nodes[a][0] + (nodes[b][0] - nodes[a][0]) * k + gauss(rand) * 0.02,
      nodes[a][1] + (nodes[b][1] - nodes[a][1]) * k + gauss(rand) * 0.02,
    ];
  },
  ambient(rand) {
    return [rand() * 2 - 1, rand() * 2 - 1];
  },
};

function buildParticles(shape: ConstellationShape, count: number, seed: number) {
  const rand = mulberry32(seed);
  const gen = SHAPES[shape];
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const [bx, by] = gen(rand);
    particles.push({
      bx,
      by,
      size: 1.6 + rand() * (shape === "ambient" ? 3.2 : 3.6),
      rot: rand() * Math.PI * 2,
      spin: (rand() - 0.5) * 0.6,
      phase: rand() * Math.PI * 2,
      drift: 0.004 + rand() * 0.012,
      color: pickColor(rand),
      alpha: Math.floor(rand() * ALPHA_BUCKETS.length),
    });
  }
  // A halo of loose particles scattered around the main form.
  if (shape !== "ambient") {
    const halo = Math.round(count * 0.08);
    for (let i = 0; i < halo; i++) {
      const t = rand() * Math.PI * 2;
      const r = 0.9 + rand() * 0.5;
      particles.push({
        bx: Math.cos(t) * r,
        by: Math.sin(t) * r * 0.8,
        size: 1.4 + rand() * 2.4,
        rot: rand() * Math.PI * 2,
        spin: (rand() - 0.5) * 0.4,
        phase: rand() * Math.PI * 2,
        drift: 0.01 + rand() * 0.02,
        color: pickColor(rand),
        alpha: 0,
      });
    }
  }
  return particles;
}

type Props = {
  shape?: ConstellationShape;
  /** Particle count at full size; scaled down on small canvases. */
  count?: number;
  seed?: number;
  /** Global opacity multiplier (ambient fields sit low). */
  intensity?: number;
  className?: string;
  /** Follow the pointer with a soft parallax. */
  interactive?: boolean;
};

export function Constellation({
  shape = "brain",
  count = 2200,
  seed = 7,
  intensity = 1,
  className,
  interactive = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      // Density follows area so small screens stay light.
      const areaScale =
        shape === "ambient"
          ? 1
          : Math.min(1, Math.max(0.35, (width * height) / (720 * 720)));
      particles = buildParticles(shape, Math.round(count * areaScale), seed);
      if (reduced) draw(0);
    };

    const draw = (time: number) => {
      const t = time * 0.001;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const cx = width / 2;
      const cy = height / 2;
      const scale = shape === "ambient" ? 1 : Math.min(width, height) * 0.46;
      const sx = shape === "ambient" ? width / 2 : scale;
      const sy = shape === "ambient" ? height / 2 : scale;
      const breathe = 1 + Math.sin(t * 0.5) * 0.012;

      // One path per (colour, alpha) bucket.
      const paths: Path2D[][] = PALETTE.map(() => ALPHA_BUCKETS.map(() => new Path2D()));

      for (const p of particles) {
        const depth = 0.4 + p.size / 6;
        const dx = Math.sin(t * 0.6 + p.phase) * p.drift;
        const dy = Math.cos(t * 0.45 + p.phase * 1.3) * p.drift;
        const x = cx + (p.bx * breathe + dx) * sx + pointer.x * 18 * depth;
        const y = cy + (p.by * breathe + dy) * sy + pointer.y * 18 * depth;
        const a = p.rot + t * p.spin;
        const r = p.size;
        const path = paths[p.color][p.alpha];
        path.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
        path.lineTo(x + Math.cos(a + 2.094) * r, y + Math.sin(a + 2.094) * r);
        path.lineTo(x + Math.cos(a + 4.189) * r, y + Math.sin(a + 4.189) * r);
        path.closePath();
      }

      ctx.lineWidth = 1;
      ctx.lineJoin = "miter";
      for (let c = 0; c < PALETTE.length; c++) {
        ctx.strokeStyle = PALETTE[c];
        for (let b = 0; b < ALPHA_BUCKETS.length; b++) {
          ctx.globalAlpha = ALPHA_BUCKETS[b] * intensity;
          ctx.stroke(paths[c][b]);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      if (visible) draw(time);
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    if (!reduced) {
      raf = requestAnimationFrame(loop);
      if (interactive) window.addEventListener("pointermove", onPointer, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [shape, count, seed, intensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none block size-full", className)}
    />
  );
}
