"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";
import { playSound } from "@/lib/sound";

export function SoundToggle() {
  const enabled = useUIStore((s) => s.soundEnabled);
  const toggle = useUIStore((s) => s.toggleSound);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const on = mounted && enabled;

  return (
    <button
      type="button"
      aria-label={on ? "Mute sound effects" : "Enable sound effects"}
      aria-pressed={on}
      onClick={() => {
        if (!enabled) playSound("success"); // confirm audibly when turning on
        toggle();
      }}
      className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {on ? <Volume2 className="size-[18px]" /> : <VolumeX className="size-[18px]" />}
    </button>
  );
}
