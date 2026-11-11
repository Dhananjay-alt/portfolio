"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Decides where the closing call-to-action shows. It is the last section of
 * every page except /contact (which is already the destination), and it only
 * carries its section number on the home page, where sections are numbered.
 */
export function ClosingCtaFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/contact") return null;
  return (
    <section
      aria-labelledby="closing-heading"
      data-home={pathname === "/" ? "" : undefined}
      className="closing-cta rule"
    >
      {children}
    </section>
  );
}
