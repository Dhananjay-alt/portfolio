"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { primaryNav } from "@/config/nav";
import { profile } from "@/content/profile";
import { duration, ease, spring } from "@/lib/motion";
import { ThemeToggle } from "@/components/site/theme-toggle";

const SCROLLED_AFTER = 40;
const HIDE_AFTER = 160;
const DIRECTION_THRESHOLD = 6;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Header: name left, three links and the single filled button right.
 * - hides on scroll down, returns on scroll up (transform only)
 * - gains a hairline and backdrop blur after 40px (opacity on a pseudo-element)
 * - the active link's underline is one shared element that slides between items
 */
export function SiteHeader() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  // The menu belongs to the route it was opened on, so navigating closes it.
  const menuOpen = menuFor === pathname;
  const menuOpenRef = useRef(menuOpen);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    if (menuOpen && ref.current) ref.current.dataset.hidden = "false";
  }, [menuOpen]);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      header.dataset.scrolled = String(y > SCROLLED_AFTER);

      const delta = y - lastY;
      if (Math.abs(delta) < DIRECTION_THRESHOLD) return;
      lastY = y;

      const keepVisible = menuOpenRef.current || header.contains(document.activeElement);
      header.dataset.hidden = String(delta > 0 && y > HIDE_AFTER && !keepVisible);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Keyboard users tabbing back into a hidden header bring it back.
    const onFocusIn = () => {
      header.dataset.hidden = "false";
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("focusin", onFocusIn);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuFor(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      ref={ref}
      data-intro="nav"
      data-scrolled="false"
      data-hidden="false"
      className="site-header fixed inset-x-0 top-0 z-50"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" className="py-2.5 text-[0.9375rem] font-medium tracking-[-0.01em]">
          {profile.name}
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <nav aria-label="Primary" className="mr-3 hidden items-center gap-7 md:flex">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2.5 text-[0.9375rem] ${active ? "text-ink" : "text-mute hover:text-ink"}`}
                >
                  {item.label}
                  {active && (
                    <m.span
                      layoutId="nav-underline"
                      transition={spring}
                      className="absolute inset-x-0 bottom-1.5 h-px bg-accent"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <ThemeToggle />

          <Link href="/contact" className="btn btn-fill btn-sm max-[380px]:hidden">
            Get in touch
          </Link>

          <button
            type="button"
            onClick={() => setMenuFor(menuOpen ? null : pathname)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="label -mr-2 px-2 py-2 !text-ink md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: duration.small, ease: ease.out }}
            className="absolute inset-x-0 top-full border-b border-line bg-paper md:hidden"
          >
            <nav aria-label="Mobile" className="container-page flex flex-col py-4">
              {[...primaryNav, { label: "Résumé", href: "/resume" }, { label: "Get in touch", href: "/contact" }].map(
                (item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="border-t border-line py-4 font-display text-[1.75rem] leading-none first:border-t-0"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
