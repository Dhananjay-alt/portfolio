"use client";

import { useEffect, useRef } from "react";
import { useUIStore } from "@/stores/ui-store";
import { playSound } from "@/lib/sound";

const INTERACTIVE = 'a, button, [role="button"], [data-cursor="hover"]';

/** When sounds are enabled, plays subtle cues on hover/click of interactive elements. */
export function SoundManager() {
  const enabled = useUIStore((s) => s.soundEnabled);
  const lastHover = useRef<EventTarget | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(INTERACTIVE);
      if (el && el !== lastHover.current) {
        lastHover.current = el;
        playSound("hover");
      }
    };
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement | null)?.closest(INTERACTIVE)) playSound("click");
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [enabled]);

  return null;
}
