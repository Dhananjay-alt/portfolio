"use client";

import { useEffect, useState } from "react";

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
      className="label link hover:text-ink"
    >
      {on ? "Exit reading mode" : "Reading mode"}
    </button>
  );
}
