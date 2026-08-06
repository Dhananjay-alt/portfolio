"use client";

import type { Heading } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;
  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-2 border-l border-border">
        {headings.map((h) => (
          <li key={h.slug} className={cn(h.depth === 3 && "ml-3")}>
            <a
              href={`#${h.slug}`}
              className="-ml-px block border-l border-transparent pl-3 text-muted-foreground transition-colors hover:border-brand hover:text-foreground"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
