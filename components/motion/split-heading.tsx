import type { ElementType } from "react";

type SplitHeadingProps = {
  children: string;
  as?: ElementType;
  className?: string;
  id?: string;
};

/**
 * Section heading. It used to reveal line by line on scroll; headings are now
 * static, so this renders the element as-is.
 */
export function SplitHeading({ children, as, className, id }: SplitHeadingProps) {
  const Tag: ElementType = as ?? "h2";
  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}
