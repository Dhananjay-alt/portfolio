"use client";

import { useState } from "react";

/** Uses the Web Share API when available; falls back to copy-to-clipboard. */
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function onShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <button type="button" onClick={onShare} className="label link hover:text-ink">
      <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
    </button>
  );
}
