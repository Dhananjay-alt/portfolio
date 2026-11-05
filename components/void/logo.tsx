import Link from "next/link";
import { cn } from "@/lib/utils";

/** Angular triangle fragment (violet → teal) + wordmark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-6", className)}>
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8052ff" />
          <stop offset="100%" stopColor="#15846e" />
        </linearGradient>
      </defs>
      <path d="M3 20.5 12 3l9 17.5H3Z" fill="url(#logo-grad)" />
      <path d="M12 3 7.4 20.5H3L12 3Z" fill="#8052ff" />
      <path d="m12 11.2 3.1 6H8.9l3.1-6Z" fill="#000" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Dhananjay — home"
      className={cn(
        "inline-flex items-center gap-2.5 text-[17px] font-normal tracking-[-0.02em] text-white",
        className,
      )}
    >
      <LogoMark />
      <span>Dhananjay</span>
    </Link>
  );
}
