import type { ReactNode } from "react";
import { SplitHeading } from "@/components/motion/split-heading";
import { SectionLabel } from "@/components/site/section-label";

/** One numbered chapter of a case study: label and heading left, content right. */
export function CaseSection({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  const id = `case-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <section aria-labelledby={id} className="rule">
      <div className="container-page grid-12 gap-y-8 py-[clamp(56px,8vw,112px)]">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-[calc(var(--header-h)+32px)]">
            <SectionLabel index={index}>{label}</SectionLabel>
            <SplitHeading id={id} className="text-h2 mt-6">
              {title}
            </SplitHeading>
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6">{children}</div>
      </div>
    </section>
  );
}
