import Link from "next/link";
import type { CSSProperties } from "react";
import { profile } from "@/content/profile";
import { MagneticButton } from "@/components/motion/magnetic-button";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * Eyebrow, headline, one line of subtext, two CTAs — nothing else above the
 * fold.
 *
 * The headline's two lines are masked in the server HTML and animated by CSS
 * (see `[data-intro]` in globals.css), so the reveal starts on first paint
 * and the largest element on the page never waits for JavaScript.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="container-page flex min-h-[calc(100svh-var(--header-h))] flex-col justify-end pb-[clamp(40px,9vh,112px)] pt-16"
    >
      <p data-intro="fade" style={i(0)} className="label">
        {profile.role} <span aria-hidden="true">·</span> {profile.education.school}
      </p>

      <h1 id="hero-heading" className="text-display mt-6">
        <span className="line-mask" data-intro="line" style={i(0)}>
          <span>Complete systems,</span>
        </span>{" "}
        <span className="line-mask" data-intro="line" style={i(1)}>
          <span>shipped end to end.</span>
        </span>
      </h1>

      <p data-intro="fade" style={i(1)} className="text-lead mt-8 max-w-[54ch] text-mute">
        {profile.tagline}
      </p>

      <div data-intro="fade" style={i(2)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
        <MagneticButton>
          <Link href="#work" className="btn btn-fill">
            View selected work
            <span aria-hidden="true" className="arrow arrow-down">
              ↓
            </span>
          </Link>
        </MagneticButton>
        <Link href="/resume" className="link">
          Read the résumé
        </Link>
      </div>
    </section>
  );
}
