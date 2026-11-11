"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { duration, ease } from "@/lib/motion";

/**
 * Email address that copies on click. The small label morphs between "Copy"
 * and "Copied" (the two words cross in a fixed-width slot, so nothing shifts).
 * It stays a real mailto link, so it still works with JavaScript disabled or
 * when the clipboard is unavailable.
 */
export function EmailCopy({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  async function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (!navigator.clipboard) return; // fall through to mailto
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <>
      <a href={`mailto:${email}`} onClick={onClick} className={`group inline-flex flex-wrap items-baseline gap-x-4 gap-y-1 ${className ?? ""}`}>
        <span className="link link-group break-all font-display text-h3">{email}</span>
        <span aria-hidden="true" className="label relative inline-grid min-w-[7ch] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={copied ? "copied" : "copy"}
              initial={{ y: 10, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -10, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: duration.small, ease: ease.out }}
              className={copied ? "text-accent" : undefined}
            >
              {copied ? "Copied" : "Copy"}
            </m.span>
          </AnimatePresence>
        </span>
        <span className="sr-only">(copies the address)</span>
      </a>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}
