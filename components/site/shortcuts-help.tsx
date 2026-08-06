"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["?"], label: "Show this help" },
  { keys: ["Esc"], label: "Close dialogs / exit reading mode" },
  { keys: ["↑↑↓↓←→←→", "B", "A"], label: "A little surprise" },
];

function isTypingTarget(el: EventTarget | null): boolean {
  const t = el as HTMLElement | null;
  if (!t) return false;
  const tag = t.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || t.isContentEditable;
}

export function ShortcutsHelp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "?" && !isTypingTarget(e.target)) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-label="Keyboard shortcuts"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div
            className="glass relative w-full max-w-sm rounded-2xl border border-border p-6 shadow-2xl"
            initial={{ scale: 0.96, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 10 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Keyboard shortcuts</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="grid size-7 place-items-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <ul className="mt-4 space-y-3">
              {SHORTCUTS.map((s) => (
                <li key={s.label} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className="flex items-center gap-1">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className="rounded border border-border bg-secondary/60 px-1.5 py-0.5 font-mono text-[11px]"
                      >
                        {k}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
