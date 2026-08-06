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
      btn.className =
        "absolute right-2 top-2 rounded-md border border-border bg-card/80 px-2 py-1 text-xs text-muted-foreground opacity-0 backdrop-blur transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover/code:opacity-100";
      btn.textContent = "Copy";

      // Reveal on hover of the code block.
      parent.classList.add("group/code");

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
        p.classList.remove("group/code");
      });
    };
  }, []);

  return null;
}
