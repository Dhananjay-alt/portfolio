import type { Metadata } from "next";
import { CalendarClock } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { ContactForm } from "@/components/contact/contact-form";
import { socials } from "@/config/socials";
import { profile } from "@/content/profile";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Dhananjay — for roles, projects, and collaborations.",
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Let's build something."
      description="Recruiters, founders, and collaborators — drop a message and I'll get back to you. Or reach me directly through any of the links."
    >
      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div className="max-w-xl">
          <ContactForm />
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Direct
            </p>
            <ul className="mt-4 space-y-1">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Icon className="size-4" />
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Email
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 block break-all text-sm font-medium transition-colors hover:text-brand"
            >
              {profile.email}
            </a>
          </div>

          {siteConfig.calendlyUrl && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Book a call
              </p>
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                <CalendarClock className="size-4" /> Find a time
              </a>
            </div>
          )}
        </aside>
      </div>
    </PageShell>
  );
}
