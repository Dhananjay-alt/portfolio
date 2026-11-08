"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Network, ShieldCheck, Users, Wallet, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type SuiteProject = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: number;
  status: string;
  timeline: string;
  context: string;
  award?: string;
  tech: string[];
  architecture: { layer: string; detail: string }[];
};

const ICONS: Record<string, LucideIcon> = {
  syncspace: Users,
  paygent: Wallet,
  luxauth: ShieldCheck,
  "repo-analyzer": Network,
};

/** Four equal tabs on a white strip; the active tab takes the lilac wash. */
export function WorkSuiteTabs({ items }: { items: SuiteProject[] }) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const project = items[active];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Projects"
        className="grid grid-cols-2 overflow-hidden rounded-[8px] border border-soft-mist bg-white sm:grid-cols-4"
      >
        {items.map((item, idx) => {
          const Icon = ICONS[item.slug] ?? Users;
          const selected = idx === active;
          return (
            <button
              key={item.slug}
              ref={(el) => {
                tabsRef.current[idx] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${idx}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(idx)}
              onKeyDown={onKeyDown}
              className={cn(
                "flex items-center gap-2.5 p-4 text-left transition-colors duration-200 focus-visible:-outline-offset-2",
                "border-soft-mist max-sm:[&:nth-child(-n+2)]:border-b sm:[&:not(:last-child)]:border-r max-sm:odd:border-r",
                selected ? "bg-lilac-mist" : "bg-white hover:bg-warm-parchment",
              )}
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1.75}
                className={cn("size-[18px] shrink-0", selected ? "text-midnight-wine" : "text-ink-charcoal")}
              />
              <span className="min-w-0">
                <span className="block truncate text-[16px] font-emphasis">{item.title}</span>
                <span className="block truncate text-[12px] text-stone-gray">{item.category}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="card-paper mt-4 grid gap-8 p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12 md:p-10"
      >
        <div key={project.slug} className="flex flex-col animate-in fade-in duration-500">
          <p className="text-[14px] text-stone-gray">
            {String(active + 1).padStart(2, "0")} · {project.category} · {project.year}
          </p>
          <h3 className="mt-3 text-heading-sm font-normal">{project.title}</h3>
          <p className="mt-3 text-[18px] leading-[1.45]">{project.tagline}</p>
          <p className="mt-4 text-[16px] leading-[1.5] text-stone-gray">{project.context}</p>

          {project.award && (
            <p className="mt-5 w-fit rounded-full bg-lilac-mist px-3 py-1 text-[14px]">{project.award}</p>
          )}

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-soft-mist bg-warm-parchment px-2.5 py-0.5 text-[12px]"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-6 pt-8">
            <Link href={`/projects/${project.slug}`} className="link-violet">
              Read the {project.title} case study <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
            <Link href="/projects" className="btn-ghost text-[14px]">
              All projects
            </Link>
          </div>
        </div>

        {/* Architecture, presented as a product UI card */}
        <div
          key={`${project.slug}-arch`}
          className="rounded-[16px] bg-warm-parchment p-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1 pb-3">
            <p className="text-[14px] font-emphasis">Architecture</p>
            <p className="text-[12px] text-stone-gray">{project.timeline}</p>
          </div>
          <ol className="flex flex-col gap-2">
            {project.architecture.map((step, idx) => (
              <li key={step.layer} className="rounded-[12px] border border-soft-mist bg-white p-4">
                <div className="flex items-baseline gap-3">
                  <span className="tabular text-[12px] text-stone-gray">{String(idx + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-emphasis">{step.layer}</p>
                    <p className="mt-1 text-[14px] leading-[1.5] text-stone-gray">{step.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
