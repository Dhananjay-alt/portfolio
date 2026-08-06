"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { Search } from "lucide-react";
import { navItems } from "@/config/nav";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { SoundToggle } from "@/components/site/sound-toggle";
import { useUIStore } from "@/stores/ui-store";

export function FloatingNav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide when scrolling down past a threshold; reveal on scroll up.
    setHidden(latest > previous && latest > 160);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="glass flex items-center gap-1 rounded-full p-1.5 shadow-lg shadow-black/5">
        <Link
          href="/"
          className="mr-1 grid size-8 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-brand-foreground"
          aria-label="Home"
        >
          D
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {navItems.slice(1).map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <span className="mx-1 hidden h-5 w-px bg-border md:block" />
        <CommandTrigger />
        <SoundToggle />
        <ThemeToggle />
        <MobileMenu />
      </nav>
    </motion.header>
  );
}

function CommandTrigger() {
  const toggle = useUIStore((s) => s.toggleCommand);
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Open command menu"
      className="hidden items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
    >
      <Search className="size-4" />
      <kbd className="rounded border border-border bg-secondary/60 px-1.5 py-0.5 font-mono text-[10px]">
        ⌘K
      </kbd>
    </button>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid size-9 place-items-center rounded-full text-muted-foreground hover:text-foreground"
      >
        <div className="relative h-3 w-4">
          <span
            className={cn(
              "absolute left-0 top-0 h-0.5 w-full bg-current transition-transform",
              open && "translate-y-[5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform",
              open && "-translate-y-[5px] -rotate-45",
            )}
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass absolute right-4 top-16 flex w-48 flex-col gap-1 rounded-2xl p-2"
          >
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
