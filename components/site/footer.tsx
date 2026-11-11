import Link from "next/link";
import { secondaryNav } from "@/config/nav";
import { socials } from "@/config/socials";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { ClosingCtaFrame } from "@/components/site/closing-cta";
import { EmailCopy } from "@/components/site/email-copy";
import { CommandPaletteButton } from "@/components/command/command-palette-loader";

const external = socials.filter((s) => s.href.startsWith("http"));

/** Closing call-to-action followed by the footer bar. */
export function Footer() {
  return (
    <footer className="site-footer mt-auto">
      <ClosingCtaFrame>
        <div className="container-page section-y">
          <p className="label">
            <span className="closing-index tabular text-ink">05</span>
            <span className="closing-index" aria-hidden="true">
              {" — "}
            </span>
            Contact
          </p>

          <SplitHeading id="closing-heading" className="text-display mt-8 max-w-[14ch]">
            Let&apos;s build what ships.
          </SplitHeading>

          <div className="grid-12 mt-12 gap-y-10">
            <Reveal as="p" className="text-lead text-mute md:col-span-5">
              Open to protocols, multiplayer engines and founding teams. Based at IIT Roorkee,
              working across timezones.
            </Reveal>

            <Reveal index={1} className="flex flex-col items-start gap-8 md:col-span-6 md:col-start-7">
              <EmailCopy email={profile.email} />

              <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                <MagneticButton>
                  <Link href="/contact" className="btn btn-fill">
                    Start a conversation
                    <span aria-hidden="true" className="arrow">
                      →
                    </span>
                  </Link>
                </MagneticButton>
                {external.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" className="link">
                    {s.label}
                  </a>
                ))}
                <Link href="/resume" className="link">
                  Résumé
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </ClosingCtaFrame>

      <div className="rule">
        <div className="container-page flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
          <p className="label">
            © {new Date().getFullYear()} {profile.name} · {profile.education.school}
          </p>
          <nav aria-label="Secondary" className="label flex flex-wrap gap-x-6 gap-y-2">
            {secondaryNav.map((item) => (
              <Link key={item.href} href={item.href} className="link hover:text-ink">
                {item.label}
              </Link>
            ))}
            <a href="/feed.xml" className="link hover:text-ink">
              RSS
            </a>
            <CommandPaletteButton className="link uppercase hover:text-ink" />
          </nav>
        </div>
      </div>
    </footer>
  );
}
