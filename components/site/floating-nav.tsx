"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/blog" },
  { label: "Experience", href: "/experience" },
];

/**
 * Sticky header: transparent with a 12px backdrop blur; the hairline
 * bottom border fades in once content scrolls underneath.
 */
export function FloatingNav() {
  const pathname = usePathname();
  const toggleCommand = useUIStore((s) => s.toggleCommand);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-chrome
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-[12px] transition-[border-color,background-color] duration-300",
        scrolled || mobileOpen
          ? "border-soft-mist bg-warm-parchment/75"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-[var(--header-height)] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="btn-ghost"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={toggleCommand}
            aria-label="Search (⌘K)"
            className="btn-ghost hidden md:inline-flex"
          >
            <Search className="size-[18px]" strokeWidth={1.75} />
          </button>
          <Link href="/resume" className="btn-ghost hidden lg:inline-flex">
            Résumé
          </Link>
          <Link href="/contact" className="btn-secondary hidden sm:inline-flex">
            Get in touch
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            className="flex size-9 items-center justify-center text-ink-charcoal md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-px w-5 bg-current transition-transform",
                  mobileOpen && "translate-y-[7px] rotate-45",
                )}
              />
              <span
                className={cn("block h-px w-5 bg-current transition-opacity", mobileOpen && "opacity-0")}
              />
              <span
                className={cn(
                  "block h-px w-5 bg-current transition-transform",
                  mobileOpen && "-translate-y-[7px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-0 top-full border-b border-soft-mist bg-warm-parchment px-4 pb-10 pt-6 md:hidden"
          >
            <div className="flex flex-col gap-5">
              {[...links, { label: "Résumé", href: "/resume" }, { label: "Contact", href: "/contact" }].map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-heading-sm font-normal text-ink-charcoal"
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <button type="button" onClick={toggleCommand} className="btn-ghost mt-2 self-start">
                <Search className="size-4" strokeWidth={1.75} />
                <span>Search</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
