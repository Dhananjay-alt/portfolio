"use client";

import React from "react";

interface WordSplitProps {
  text: string;
  className?: string;
  baseDelayMs?: number;
  highlightWord?: string;
  highlightClass?: string;
}

export function WordSplit({
  text,
  className = "",
  baseDelayMs = 0,
  highlightWord,
  highlightClass = "text-midnight-wine",
}: WordSplitProps) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, idx) => {
        const isHighlight =
          highlightWord &&
          word.toLowerCase().replace(/[^a-z0-9]/gi, "") ===
            highlightWord.toLowerCase().replace(/[^a-z0-9]/gi, "");

        return (
          <span
            key={`${word}-${idx}`}
            className={`word-span inline-block mr-[0.28em] ${isHighlight ? highlightClass : ""}`}
            style={{ "--word-d": `${baseDelayMs + idx * 38}ms` } as React.CSSProperties}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}