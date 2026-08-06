import type { Metadata } from "next";
import { GraduationCap, Users, Sparkles } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { TechBadge } from "@/components/projects/tech-badge";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description: profile.bio[0],
};

const stackGroups: { label: string; items: readonly string[] }[] = [
  { label: "Frontend", items: profile.stack.frontend },
  { label: "Backend", items: profile.stack.backend },
  { label: "Systems", items: profile.stack.systems },
  { label: "Web3", items: profile.stack.web3 },
  { label: "AI", items: profile.stack.ai },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Engineer first, metallurgist by degree."
    >
      <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_320px]">
        <div className="max-w-2xl space-y-6">
          {profile.bio.map((para) => (
            <Reveal key={para}>
              <p className="text-[length:var(--text-lead)] leading-relaxed text-foreground/90">
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal>
            <div className="mt-10">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Sparkles className="size-4 text-brand" /> Philosophy
              </h2>
              <p className="mt-3 text-muted-foreground">
                I care about shipping things that work end to end — not demos that
                fall over. That means picking the right primitive (CRDTs, container
                isolation, static analysis) over the clever hack, keeping systems
                provider-agnostic so a dead end is a one-file swap, and treating
                UX and security as first-class from the start rather than bolt-ons.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10">
              <h2 className="text-lg font-semibold">Signal</h2>
              <ul className="mt-4 space-y-3">
                {profile.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-foreground/90">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <GraduationCap className="size-4 text-brand" /> Education
              </h2>
              <p className="mt-3 font-medium">{profile.education.degree}</p>
              <p className="text-sm text-muted-foreground">
                {profile.education.school} · Class of {profile.education.graduationYear}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {profile.education.note}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <Users className="size-4 text-brand" /> Communities
              </h2>
              <ul className="mt-3 space-y-3">
                {profile.communities.map((c) => (
                  <li key={c.name}>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </aside>
      </div>

      {/* Stack */}
      <Reveal>
        <div className="mt-20 border-t border-border/60 pt-12">
          <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">
            The toolbox
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stackGroups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-xs uppercase tracking-widest text-brand">
                  {group.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((t) => (
                    <TechBadge key={t}>{t}</TechBadge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </PageShell>
  );
}
