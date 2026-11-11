"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useUIStore } from "@/stores/ui-store";

const CommandPalette = dynamic(() => import("@/components/command/command-palette"), { ssr: false });

/**
 * Owns the ⌘K shortcut and fetches the palette (and cmdk) only once it is
 * first asked for, so none of it is in the initial bundle.
 */
export function CommandPaletteLoader() {
  const open = useUIStore((s) => s.commandOpen);
  const toggle = useUIStore((s) => s.toggleCommand);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setRequested(true);
        toggle();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [toggle]);

  return requested || open ? <CommandPalette /> : null;
}

/** Text button that opens the palette, for pointer users. */
export function CommandPaletteButton({ className }: { className?: string }) {
  const toggle = useUIStore((s) => s.toggleCommand);
  return (
    <button type="button" onClick={toggle} className={className}>
      Search <kbd className="font-mono">⌘K</kbd>
    </button>
  );
}
