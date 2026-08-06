import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { ResumeActions } from "@/components/resume/resume-actions";
import { profile } from "@/content/profile";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name} — ${profile.role}.`,
};

export default function ResumePage() {
  const projects = getAllProjects();
  const allStack = [
    ...profile.stack.frontend,
    ...profile.stack.backend,
    ...profile.stack.systems,
    ...profile.stack.web3,
    ...profile.stack.ai,
  ];

  return (
    <PageShell eyebrow="Resume" title="The one-page version.">
      <div className="mt-8">
        <ResumeActions />
      </div>

      {/* Printable resume sheet */}
      <div className="mt-10 rounded-2xl border border-border bg-card p-8 md:p-10 print:border-0 print:p-0">
        <header className="border-b border-border pb-6">
          <h2 className="text-2xl font-bold tracking-tight">{profile.name}</h2>
          <p className="mt-1 text-brand">{profile.role}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {profile.email} · {profile.location}
          </p>
        </header>

        <Section title="Summary">
          <p className="text-sm leading-relaxed text-foreground/90">{profile.tagline}</p>
        </Section>

        <Section title="Education">
          <p className="text-sm font-medium">{profile.education.degree}</p>
          <p className="text-sm text-muted-foreground">
            {profile.education.school} · Class of {profile.education.graduationYear}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{profile.education.note}</p>
        </Section>

        <Section title="Selected projects">
          <ul className="space-y-4">
            {projects.map((p) => (
              <li key={p.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="text-sm font-semibold">
                    {p.title}
                    {p.award && (
                      <span className="ml-2 font-normal text-brand">
                        {p.award.replace(/^🏆\s*/, "· ")}
                      </span>
                    )}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {p.category} · {p.year}
                  </p>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{p.tagline}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {(p.allTech ?? []).slice(0, 6).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {allStack.join(" · ")}
          </p>
        </Section>

        <Section title="Communities">
          <ul className="text-sm text-muted-foreground">
            {profile.communities.map((c) => (
              <li key={c.name}>
                {c.name} — {c.role}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}
