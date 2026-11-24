import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Element to render. Defaults to a div. */
  as?: ElementType;
  /** Kept for call-site compatibility; content no longer staggers in. */
  index?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

/**
 * Formerly a scroll fade-up. Sections no longer animate in on scroll: content
 * is simply there. The wrapper stays so call sites keep their element and
 * classes.
 */
export function Reveal({ children, as, className, style, id }: RevealProps) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag id={id} className={className} style={style}>
      {children}
    </Tag>
  );
}
