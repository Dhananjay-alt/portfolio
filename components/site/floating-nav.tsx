"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";

const links = [
  { label: "WORK", href: "/projects" },
  { label: "ABOUT", href: "/about" },
  { label: "ROSTER", href: "/#roster" },
  { label: "DATES", href: "/#dates" },
  { label: "WRITING", href: "/blog" },
  { label: "EXPERIENCE", href: "/experience" },
];

export function FloatingNav() {
  const pathname = usePathname();
  const toggleCommand = useUIStore((s) => s.toggleCommand);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      data-chrome
      className="fixed inset-x-0 top-0 z-50 flex h-[58px] items-center justify-between border-b border-[rgba(237,231,220,0.13)] bg-[#0A0C0E]/80 px-6 backdrop-blur-[14px] md:px-12"
    >
      {/* Display wordmark at 15px with trailing period in the amber */}
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="font-syne text-[15px] font-bold tracking-[-0.02em] text-[#EDE7DC] transition-opacity hover:opacity-85"
        >
          DHANANJAY<span className="text-[#E8913C]">.</span>
        </Link>
      </div>

      {/* Uppercase links at 10.5px turning amber on hover */}
      <nav className="hidden items-center gap-8 md:flex">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`font-sora text-[10.5px] uppercase tracking-[0.14em] transition-colors ${
                active ? "text-[#E8913C]" : "text-[#9EA5A8] hover:text-[#E8913C]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right actions: search trigger + one pill button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleCommand}
          aria-label="Search"
          className="hidden items-center gap-2 rounded-full border border-[rgba(237,231,220,0.13)] px-3 py-1.5 text-[#9EA5A8] transition-colors hover:border-[#E8913C] hover:text-[#EDE7DC] md:inline-flex"
        >
          <Search className="size-3 text-[#9EA5A8]" />
          <span className="font-sora text-[10px] tracking-[0.12em]">⌘K</span>
        </button>

        {/* One pill button */}
        <Link
          href="/contact"
          className="rounded-full border border-[rgba(237,231,220,0.18)] px-4 py-1.5 font-sora text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#EDE7DC] transition-colors hover:border-[#E8913C] hover:text-[#E8913C]"
        >
          GET IN TOUCH
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle Navigation"
          className="flex size-8 items-center justify-center text-[#EDE7DC] md:hidden"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-5 bg-current transition-transform ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-opacity ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-transform ${
                mobileOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-0 top-[58px] border-b border-[rgba(237,231,220,0.13)] bg-[#0A0C0E]/95 px-6 py-6 backdrop-blur-[16px] md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-sora text-[11px] uppercase tracking-[0.15em] text-[#EDE7DC] hover:text-[#E8913C]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={toggleCommand}
                  className="flex items-center gap-2 font-sora text-[11px] uppercase tracking-[0.15em] text-[#9EA5A8]"
                >
                  <Search className="size-3.5" />
                  <span>SEARCH / COMMAND</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
