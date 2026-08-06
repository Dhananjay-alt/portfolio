"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fireConfetti } from "@/lib/confetti";
import { playSound } from "@/lib/sound";
import { useUIStore } from "@/stores/ui-store";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function KonamiEasterEgg() {
  const [toast, setToast] = useState(false);
  const soundEnabled = useUIStore((s) => s.soundEnabled);

  useEffect(() => {
    let index = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[index]) {
        index += 1;
        if (index === SEQUENCE.length) {
          index = 0;
          fireConfetti();
          if (soundEnabled) playSound("success");
          setToast(true);
          setTimeout(() => setToast(false), 3200);
        }
      } else {
        index = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [soundEnabled]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="glass fixed bottom-20 left-1/2 z-[300] -translate-x-1/2 rounded-full border border-brand/40 px-5 py-2.5 text-sm font-medium"
          role="status"
        >
          🎮 Konami unlocked — you found the easter egg!
        </motion.div>
      )}
    </AnimatePresence>
  );
}
