"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";
import { Logo } from "@/components/void/logo";

const links = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/blog" },
  { label: "Experience", href: "/experience" },
];

export function FloatingNav() {
  const pathname = usePathname();
  const toggleCommand = useUIStore((s) => s.toggleCommand);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    // Solid black reads as transparent on the void, but keeps scrolled
    // content from colliding with the links. No border, no blur.
    <header data-chrome className="fixed inset-x-0 top-0 z-50 bg-black">
      <div className="void-container flex h-[76px] items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
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
            <Search className="size-4" strokeWidth={1.75} />
          </button>

          <Link href="/contact" className="btn-iris hidden sm:inline-flex">
            Get in touch
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            className="flex size-9 items-center justify-center text-white md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-px w-5 bg-current transition-transform ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-current transition-opacity ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-current transition-transform ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
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
            className="absolute inset-x-0 top-[76px] bg-black px-6 pb-10 pt-4 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {[...links, { label: "Contact", href: "/contact" }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[36px] font-normal leading-[1.1] tracking-[-0.04em] text-white"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={toggleCommand}
                className="btn-ghost mt-2 self-start"
              >
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
