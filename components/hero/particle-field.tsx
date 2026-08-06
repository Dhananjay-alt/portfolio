"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Points as ThreePoints } from "three";

function Starfield({ count = 2600 }: { count?: number }) {
  const ref = useRef<ThreePoints>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a rounded box for depth.
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, [count]);

  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!ref.current) return;
    // Slow ambient drift.
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.006;
    // Subtle mouse parallax.
    ref.current.rotation.y += (pointer.x * 0.15 - ref.current.rotation.y * 0) * 0;
    ref.current.position.x += (pointer.x * 0.4 - ref.current.position.x) * 0.03;
    ref.current.position.y += (pointer.y * 0.25 - ref.current.position.y) * 0.03;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b8cf0"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}

export default function ParticleField() {
  // R3F's ResizeObserver can report 0 on first mount inside a nested absolute
  // container; nudge a resize on the next frames so the canvas measures correctly.
  useEffect(() => {
    const nudge = () => window.dispatchEvent(new Event("resize"));
    const timers = [0, 80, 200, 500].map((d) => setTimeout(nudge, d));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 60 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Starfield />
    </Canvas>
  );
}
