import { ViewTransition, type ReactNode } from "react";

/**
 * Route-change transition. Wrap the content of each `page.tsx` (not a layout —
 * layouts persist, so enter/exit never fire there). The outgoing page fades
 * out in 150ms; the incoming one fades up after it. Timings live in
 * globals.css under `::view-transition-*(.page)`.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}

/**
 * Shared element: give the same `name` to an element on two routes and it
 * morphs between them (e.g. a project title in the work list and in the
 * case-study hero).
 */
export function SharedElement({ name, children }: { name: string; children: ReactNode }) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
