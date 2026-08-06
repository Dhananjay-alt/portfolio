"use client";

import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";

/** Uses the Web Share API when available; falls back to copy-to-clipboard. */
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function onShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
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
    <button
      type="button"
      onClick={onShare}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
    >
      {copied ? (
        <>
          <Check className="size-4 text-brand" /> Copied
        </>
      ) : (
        <>
          {typeof navigator !== "undefined" && "share" in navigator ? (
            <Share2 className="size-4" />
          ) : (
            <Link2 className="size-4" />
          )}
          Share
        </>
      )}
    </button>
  );
}
