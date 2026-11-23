"use client";

import { useEffect } from "react";

/**
 * Adds a copy button to every code block in the rendered MDX. The code blocks
 * come from rehype-pretty-code (server-rendered), so we enhance them from the
 * client after mount rather than through React components.
 */
export function CopyCode() {
  useEffect(() => {
    const pres = Array.from(document.querySelectorAll<HTMLPreElement>(".prose pre"));
    const added: HTMLButtonElement[] = [];
    const touched: HTMLElement[] = [];

    for (const pre of pres) {
      const parent = pre.parentElement;
      if (!parent || parent.dataset.copyReady) continue;
      parent.dataset.copyReady = "true";
      parent.style.position = "relative";
      touched.push(parent);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", "Copy code");
      // Always visible: nothing on the page depends on hover.
      btn.className = "label absolute right-1 top-1 grid h-11 min-w-11 place-items-center px-3 hover:text-ink";
      btn.textContent = "Copy";
      btn.setAttribute("aria-live", "polite");

      btn.addEventListener("click", () => {
        const code = pre.querySelector("code")?.innerText ?? pre.innerText;
        navigator.clipboard?.writeText(code).then(() => {
          btn.textContent = "Copied";
          setTimeout(() => (btn.textContent = "Copy"), 1500);
        });
      });

      parent.appendChild(btn);
      added.push(btn);
    }

    return () => {
      added.forEach((b) => b.remove());
      touched.forEach((p) => {
        delete p.dataset.copyReady;
      });
    };
  }, []);

  return null;
}
