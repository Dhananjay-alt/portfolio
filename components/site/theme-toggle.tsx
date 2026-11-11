"use client";

import { useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { cssEase, duration, prefersReducedMotion } from "@/lib/motion";

/**
 * Theme toggle with a circular reveal: the new theme grows out of the button
 * through a clip-path on the View Transitions root snapshot. Browsers without
 * the API, and reduced-motion users, get an instant switch.
 */
export function ThemeToggle() {
  const { setTheme } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);

  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";

    if (typeof document.startViewTransition !== "function" || prefersReducedMotion()) {
      setTheme(next);
      return;
    }

    const rect = ref.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    // Fold every named element back into the root snapshot for this transition.
    root.classList.add("theme-vt");
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
      // next-themes applies the class in an effect; make sure the snapshot sees it.
      root.classList.toggle("dark", next === "dark");
      root.classList.toggle("light", next === "light");
      root.style.colorScheme = next;
    });

    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
          },
          {
            duration: duration.large * 1000,
            easing: cssEase.inOut,
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});

    transition.finished.finally(() => root.classList.remove("theme-vt"));
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="grid size-9 place-items-center rounded-full text-ink"
    >
      {/* Half-filled disc: reads the same in both themes, so no hydration swap. */}
      <svg viewBox="0 0 20 20" aria-hidden="true" className="size-[18px]">
        <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5Z" fill="currentColor" />
      </svg>
    </button>
  );
}
