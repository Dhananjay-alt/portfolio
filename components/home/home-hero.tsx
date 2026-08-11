"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { profile } from "@/content/profile";
import { GithubIcon } from "@/components/site/brand-icons";
import { AuroraBackground } from "@/components/home/aurora-background";
import { Magnetic } from "@/components/site/magnetic";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/** Kinetic clip-mask: each line rises from behind a mask. */
const rise: Variants = {
  hidden: { y: "115%" },
  visible: { y: 0, transition: { type: "spring", bounce: 0, duration: 0.9 } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0, duration: 0.6 } },
};

function MaskLine({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span variants={rise} className={"block " + (className ?? "")}>
        {children}
      </motion.span>
    </span>
  );
}

export function HomeHero() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 480], [1, 0]);
  const scale = useTransform(scrollY, [0, 480], [1, 0.97]);
  const y = useTransform(scrollY, [0, 480], [0, 48]);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <AuroraBackground />

      <motion.div
        style={reduced ? undefined : { opacity, scale, y }}
        className="mx-auto w-full max-w-4xl text-center"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}
        >
          <motion.div variants={fade} className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-2 opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand-2" />
              </span>
              {profile.role} · {profile.education.school}
            </span>
          </motion.div>

          <h1 className="mt-8 text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-tight">
            <MaskLine>{profile.name}</MaskLine>
            <MaskLine className="text-brand-gradient">builds things that ship.</MaskLine>
          </h1>

          <motion.p
            variants={fade}
            className="mx-auto mt-8 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted-foreground"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={fade}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground"
              >
                View Projects
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-7 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-accent"
              >
                Get in touch
              </Link>
            </Magnetic>
            <a
              href="https://github.com/Dhananjay-alt"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full px-3 py-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-4" /> GitHub
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
