"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { duration, ease, spring } from "@/lib/motion";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { Reveal } from "@/components/motion/reveal";
import { SharedElement } from "@/components/motion/page-transition";
import { ProjectPreview, type PreviewProject } from "@/components/work/project-preview";

export type WorkItem = PreviewProject & {
  outcome: string;
  tags: string[];
  badge?: string;
};

const PREVIEW_W = 360;
const PREVIEW_H = 270;
const OFFSET = 28;
const EDGE = 16;

/** view-transition-name + class, set as plain CSS so hidden copies drop out. */
function previewTransition(slug: string): CSSProperties {
  return { viewTransitionName: `work-preview-${slug}`, viewTransitionClass: "morph" } as CSSProperties;
}

/**
 * Selected work as large, calm rows.
 *
 * With a mouse: hovering a row shifts its title, nudges the arrow, and a
 * preview follows the cursor on a spring, wiping in through a clip-path.
 * Clicking morphs the title and that preview into the case-study hero.
 *
 * Without hover (touch), without JS, or under reduced motion: the same
 * preview sits inline under each row instead — nothing depends on hover.
 */
export function WorkList({ items, headingLevel = "h3" }: { items: WorkItem[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const follow = fine && !reduced;

  const [active, setActive] = useState<number | null>(null);
  // The last hovered project stays painted while the panel wipes out.
  const [shown, setShown] = useState(0);
  const wasActive = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function place(e: PointerEvent) {
    const nx = Math.min(e.clientX + OFFSET, window.innerWidth - PREVIEW_W - EDGE);
    const ny = Math.min(Math.max(e.clientY - PREVIEW_H / 2, EDGE), window.innerHeight - PREVIEW_H - EDGE);
    x.set(nx);
    y.set(ny);
    if (!wasActive.current) {
      // First contact: appear at the cursor rather than flying in.
      sx.jump(nx);
      sy.jump(ny);
      wasActive.current = true;
    }
  }

  function enter(index: number, e: PointerEvent) {
    if (!follow || e.pointerType !== "mouse") return;
    place(e);
    setActive(index);
    setShown(index);
  }

  function leave() {
    setActive(null);
    wasActive.current = false;
  }

  return (
    <>
      <ol className="border-b border-line" onPointerLeave={leave}>
        {items.map((item, i) => (
          <Reveal as="li" key={item.slug} index={i} className="border-t border-line">
            <Link
              href={`/work/${item.slug}`}
              onPointerEnter={(e) => enter(i, e)}
              onPointerMove={(e) => active === i && place(e)}
              className="work-row group grid-12 items-baseline gap-y-4 py-[clamp(28px,4.2vw,52px)]"
            >
              <span className="label tabular md:col-span-1">{String(i + 1).padStart(2, "0")}</span>

              <div className="md:col-span-5">
                <Heading className="work-title text-h2">
                  <SharedElement name={`work-title-${item.slug}`}>
                    <span className="inline-block">{item.title}</span>
                  </SharedElement>
                </Heading>
                {item.badge && (
                  <p className="tag mt-4 gap-2 !text-ink">
                    <span aria-hidden="true" className="size-[6px] rounded-full bg-accent" />
                    {item.badge}
                  </p>
                )}
              </div>

              <div className="md:col-span-4">
                <p className="text-mute">{item.outcome}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-baseline justify-between gap-6 md:col-span-2 md:justify-end">
                <span className="label tabular">{item.year}</span>
                <span aria-hidden="true" className="work-arrow text-[1.25rem] leading-none">
                  ↗
                </span>
              </div>

              <div className="work-inline-preview mt-2 md:col-span-6 md:col-start-7" style={previewTransition(item.slug)}>
                <ProjectPreview project={item} />
              </div>
            </Link>
          </Reveal>
        ))}
      </ol>

      {follow && (
        <m.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40"
          style={{ x: sx, y: sy, width: PREVIEW_W, height: PREVIEW_H }}
        >
          <m.div
            className="relative size-full"
            initial={false}
            animate={{ clipPath: active !== null ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
            transition={{ duration: duration.medium, ease: ease.out }}
            style={active !== null ? previewTransition(items[active].slug) : undefined}
          >
            {items.map((item, i) => (
              <div
                key={item.slug}
                className="absolute inset-0 transition-opacity duration-150"
                style={{ opacity: i === shown ? 1 : 0 }}
              >
                <ProjectPreview project={item} />
              </div>
            ))}
          </m.div>
        </m.div>
      )}
    </>
  );
}
