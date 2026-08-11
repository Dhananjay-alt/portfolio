import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Magnetic } from "@/components/site/magnetic";
import { socials } from "@/config/socials";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[130px]" />
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
            Let&apos;s talk
          </p>
          <h2 className="mt-5 text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-tight">
            Let&apos;s build
            <span className="block text-brand-gradient">something great.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[length:var(--text-lead)] text-muted-foreground">
            Open to roles, collaborations, and hard problems — in full-stack, Web3, and
            AI. If you&apos;re building something ambitious, I&apos;d love to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground"
              >
                Start a conversation
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-7 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-accent"
              >
                View résumé
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex items-center justify-center gap-2">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
                >
                  <Icon className="size-[18px]" />
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
