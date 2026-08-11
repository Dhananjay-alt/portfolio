"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/content/profile";
import { GithubIcon } from "@/components/site/brand-icons";
import { HeroBackground } from "@/components/hero/hero-background";
import { Magnetic } from "@/components/site/magnetic";
import { springs } from "@/animations/tokens";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const line = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function HomeHero() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  // The hero eases back as you scroll into the story (Apple-style depart).
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.96]);
  const y = useTransform(scrollY, [0, 500], [0, 40]);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6">
      <HeroBackground />

      <motion.div
        style={reduced ? undefined : { opacity, scale, y }}
        className="mx-auto w-full max-w-6xl"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
        >
          <motion.span
            variants={line}
            transition={springs.ui}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-brand-2" />
            {profile.education.degree.split(",")[0]} · {profile.education.school} · Class of{" "}
            {profile.education.graduationYear}
          </motion.span>

          <motion.h1
            variants={line}
            transition={springs.ui}
            className="mt-7 text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-tight"
          >
            {profile.name.split(" ")[0]}
            <span className="block text-brand-gradient">{profile.role}</span>
          </motion.h1>

          <motion.p
            variants={line}
            transition={springs.ui}
            className="mt-8 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted-foreground"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={line}
            transition={springs.ui}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                View Projects
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-accent"
              >
                Get in touch
              </Link>
            </Magnetic>
            <a
              href="https://github.com/Dhananjay-alt"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-4" /> GitHub
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 1 : [0, 1, 1] }}
        transition={{ delay: 1, duration: 1.5 }}
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
