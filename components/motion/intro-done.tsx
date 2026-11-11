"use client";

import { useEffect } from "react";

/**
 * The page-load intro belongs to the first paint only. Once it has finished,
 * drop the classes that drive it so client-side navigations — which get the
 * route transition instead — never replay it.
 */
export function IntroDone() {
  useEffect(() => {
    const classes = document.documentElement.classList;
    const wait = classes.contains("intro-first") ? 1300 : 400;
    const id = setTimeout(() => classes.remove("intro-first", "intro-repeat"), wait);
    return () => clearTimeout(id);
  }, []);
  return null;
}
