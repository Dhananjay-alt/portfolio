"use client";

import { useCallback } from "react";
import { useUIStore } from "@/stores/ui-store";
import { playSound } from "@/lib/sound";

/** Returns a play() that no-ops unless the user has enabled sounds. */
export function useSound() {
  const enabled = useUIStore((s) => s.soundEnabled);
  return useCallback(
    (name: "hover" | "click" | "success") => {
      if (enabled) playSound(name);
    },
    [enabled],
  );
}
