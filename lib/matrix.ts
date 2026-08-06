"use client";

/** Self-contained "Matrix rain" overlay. Runs for a few seconds, then cleans up. */
export function fireMatrix(durationMs = 6000) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9998;background:rgba(0,0,0,0.88)";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = window.innerWidth;
  let H = window.innerHeight;
  const fontSize = 16;
  let columns = 0;
  let drops: number[] = [];

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    columns = Math.floor(W / fontSize);
    drops = Array.from({ length: columns }, () => Math.floor((Math.random() * H) / fontSize));
  }
  resize();
  window.addEventListener("resize", resize);

  const glyphs = "アイウエオカキクケコサシスセソタチツテトﾊﾋﾌﾍﾎ0123456789ABCDEF<>/{}[]";
  const start = performance.now();
  let raf = 0;

  function frame(now: number) {
    const elapsed = now - start;
    ctx!.fillStyle = "rgba(0,0,0,0.08)";
    ctx!.fillRect(0, 0, W, H);
    ctx!.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx!.fillStyle = Math.random() > 0.975 ? "#d6ffe0" : "#22d3ee";
      ctx!.fillText(char, x, y);
      if (y > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }

    // Fade out over the last second.
    const remaining = durationMs - elapsed;
    if (remaining < 1000) {
      canvas.style.opacity = String(Math.max(0, remaining / 1000));
    }

    if (elapsed < durationMs) {
      raf = requestAnimationFrame(frame);
    } else {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      canvas.remove();
    }
  }
  raf = requestAnimationFrame(frame);
}
