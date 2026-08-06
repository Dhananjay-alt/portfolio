"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/** A mouse-reactive 2D constellation — points drift and link to nearby neighbors + the cursor. */
export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -999, y: -999 };

    type P = { x: number; y: number; vx: number; vy: number };
    let points: P[] = [];

    function seed() {
      const density = Math.round((w * h) / 14000);
      points = Array.from({ length: Math.min(density, 90) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    }

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--brand")
      .trim() || "#6366f1";

    let raf = 0;
    function frame() {
      ctx!.clearRect(0, 0, w, h);

      for (const p of points) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
        }
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Cursor attraction
        const dxm = mouse.x - p.x;
        const dym = mouse.y - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 140) {
          p.x += dxm * 0.008;
          p.y += dym * 0.008;
        }
      }

      // Links
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 110) {
            ctx!.strokeStyle = accent;
            ctx!.globalAlpha = (1 - d / 110) * 0.25;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(points[i].x, points[i].y);
            ctx!.lineTo(points[j].x, points[j].y);
            ctx!.stroke();
          }
        }
      }

      // Points
      ctx!.globalAlpha = 0.9;
      ctx!.fillStyle = accent;
      for (const p of points) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    const onMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className="relative h-72 w-full overflow-hidden rounded-xl">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
