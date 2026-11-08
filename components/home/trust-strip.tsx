import type { ReactNode } from "react";

/**
 * Six square cells in one row — the places this work was built, judged and
 * shipped. Each wordmark is set typographically, monochrome in ink.
 */
const MARKS: { label: string; mark: ReactNode }[] = [
  {
    label: "IIT Roorkee",
    mark: <span className="text-[18px] font-bold tracking-[-0.01em]">IIT Roorkee</span>,
  },
  {
    label: "ETHGlobal",
    mark: (
      <span className="inline-flex items-center gap-1.5 text-[18px] font-semibold tracking-[-0.02em]">
        <svg viewBox="0 0 12 18" aria-hidden="true" className="h-4 w-auto">
          <path d="M6 0 0 9.2 6 12.8l6-3.6L6 0Z" fill="currentColor" />
          <path d="M6 14 0 10.4 6 18l6-7.6L6 14Z" fill="currentColor" opacity="0.6" />
        </svg>
        ETHGlobal
      </span>
    ),
  },
  {
    label: "HackMoney",
    mark: <span className="text-[17px] font-medium italic tracking-[-0.01em]">HackMoney</span>,
  },
  {
    label: "ETHOnline",
    mark: <span className="text-[13px] font-bold uppercase tracking-[0.18em]">ETHOnline</span>,
  },
  {
    label: "MDG Space",
    mark: (
      <span className="inline-flex items-center gap-1.5 text-[18px] font-emphasis">
        <span aria-hidden="true" className="size-3.5 rounded-full border-2 border-current" />
        MDG Space
      </span>
    ),
  },
  {
    label: "Google Developer Student Clubs",
    mark: (
      <span className="inline-flex items-center gap-1.5 text-[18px] font-semibold tracking-[-0.01em]">
        <span aria-hidden="true" className="text-[15px] font-bold">{"<>"}</span>
        GDSC
      </span>
    ),
  },
];

export function TrustStrip() {
  return (
    <section aria-labelledby="trust-heading" className="pt-16 md:pt-20">
      <div className="container-page">
        <h2
          id="trust-heading"
          className="text-center text-[14px] font-normal tracking-normal text-stone-gray"
        >
          Built at, judged by and shipped with
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-soft-mist bg-soft-mist sm:grid-cols-3 lg:grid-cols-6">
          {MARKS.map((m) => (
            <li
              key={m.label}
              aria-label={m.label}
              className="flex min-h-[88px] items-center justify-center bg-white px-4 py-6 text-ink-charcoal"
            >
              {m.mark}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
