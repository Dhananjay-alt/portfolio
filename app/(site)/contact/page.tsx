import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { ContactForm } from "@/components/contact/contact-form";
import { EmailCopy } from "@/components/site/email-copy";
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
      <div className="mt-[clamp(40px,6vw,80px)] grid gap-14 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="max-w-xl">
          <ContactForm />
        </div>

        <aside className="space-y-8">
          <div className="rule pt-5">
            <p className="label">Email</p>
            <div className="mt-3">
              <EmailCopy email={profile.email} />
            </div>
          </div>

          <div className="rule pt-5">
            <p className="label">Elsewhere</p>
            <ul className="mt-3 space-y-2">
              {socials
                .filter((s) => s.href.startsWith("http"))
                .map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer noopener" className="link">
                      {s.label}{" "}
                      <span aria-hidden="true" className="arrow arrow-up">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {siteConfig.calendlyUrl && (
            <div className="rule pt-5">
              <p className="label">Book a call</p>
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="link mt-3"
              >
                Find a time
              </a>
            </div>
          )}
        </aside>
      </div>
    </PageShell>
  );
}
