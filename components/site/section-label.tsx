import type { ReactNode } from "react";

/** Mono section label with its index: "01 — Work". */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`label ${className ?? ""}`}>
      {index && (
        <>
          <span className="tabular text-ink">{index}</span>
          <span aria-hidden="true"> — </span>
        </>
      )}
      {children}
    </p>
  );
}
