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
  { label: "WRITING", href: "/blog" },
  { label: "EXPERIENCE", href: "/experience" },
  { label: "CONTACT", href: "/contact" },
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
      className="fixed inset-x-0 top-0 z-50 flex h-[56px] items-center justify-between border-b border-[rgba(231,226,216,0.16)] bg-[#241a12]/90 px-6 backdrop-blur-md md:px-12 select-none text-[#fffdf8]"
    >
      {/* Brand Wordmark in Anton display with hot red period */}
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="font-anton text-[20px] tracking-tight text-[#fffdf8] transition-opacity hover:opacity-85"
        >
          DHANANJAY<span className="text-[#ef493c]">.</span>
        </Link>
      </div>

      {/* Uppercase links at 10.5px with +0.18em tracking turning red on hover */}
      <nav className="hidden items-center gap-8 md:flex">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`mono-label transition-colors ${
                active ? "text-[#ef493c]" : "text-[rgba(231,226,216,0.65)] hover:text-[#ef493c]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right actions: search trigger + 0-radius square CTA */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleCommand}
          aria-label="Search"
          className="hidden items-center gap-2 border border-[rgba(231,226,216,0.18)] px-3 py-1.5 mono-label text-[rgba(231,226,216,0.65)] hover:border-[#ef493c] hover:text-[#fffdf8] transition-colors md:inline-flex"
        >
          <Search className="size-3" />
          <span>⌘K</span>
        </button>

        <Link
          href="/contact"
          className="border border-[#ef493c] bg-[rgba(239,73,60,0.12)] px-4 py-1.5 mono-label text-[#ef493c] hover:bg-[#ef493c] hover:text-[#fffdf8] transition-colors"
        >
          GET IN TOUCH
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle Navigation"
          className="flex size-8 items-center justify-center text-[#fffdf8] md:hidden"
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
            className="absolute inset-x-0 top-[56px] border-b border-[rgba(231,226,216,0.16)] bg-[#241a12] px-6 py-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="mono-label text-[11px] text-[#fffdf8] hover:text-[#ef493c]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={toggleCommand}
                  className="flex items-center gap-2 mono-label text-[11px] text-[rgba(231,226,216,0.6)]"
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