"use client";

import { useEffect, useState } from "react";
import { BookOpen, X } from "lucide-react";

/** Toggles distraction-free reading: hides site chrome via a root class. */
export function ReadingMode() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("reading-mode", on);
    return () => root.classList.remove("reading-mode");
  }, [on]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOn(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
    >
      {on ? <X className="size-4" /> : <BookOpen className="size-4" />}
      {on ? "Exit reading" : "Reading mode"}
    </button>
  );
}
