import Link from "next/link";
import { cn } from "@/lib/utils";

type Tone = "ink" | "light";

/** Wine tile with a geometric lowercase "d". */
export function LogoMark({ className, tone = "ink" }: { className?: string; tone?: Tone }) {
  const tile = tone === "ink" ? "#421d24" : "#ffffff";
  const glyph = tone === "ink" ? "#ffffff" : "#421d24";
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-6", className)}>
      <rect width="24" height="24" rx="7" fill={tile} />
      <circle cx="10.25" cy="13.75" r="4" fill="none" stroke={glyph} strokeWidth="2" />
      <path d="M14.25 5.75v12.25" stroke={glyph} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, tone = "ink" }: { className?: string; tone?: Tone }) {
  return (
    <Link
      href="/"
      aria-label="Dhananjay — home"
      className={cn(
        "inline-flex items-center gap-2.5 text-[18px] font-normal tracking-[-0.008em]",
        tone === "ink" ? "text-ink-charcoal" : "text-white",
        className,
      )}
    >
      <LogoMark tone={tone} />
      <span>Dhananjay</span>
    </Link>
  );
}
