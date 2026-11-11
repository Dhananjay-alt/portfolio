import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/motion/reveal";
import { experience } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "A timeline of Dhananjay's hackathons, projects, community roles, and education.",
};

export default function ExperiencePage() {
  return (
    <PageShell
      eyebrow="Experience"
      title="Hackathons, builds, and communities."
      description="How the work has unfolded — ETHGlobal builds, shipped products, and community roles at IIT Roorkee."
    >
      <ol className="mt-[clamp(40px,6vw,80px)] border-b border-line">
        {experience.map((entry, idx) => (
          <Reveal
            as="li"
            key={`${entry.title}-${idx}`}
            index={idx % 4}
            className="grid-12 items-baseline gap-y-3 border-t border-line py-8"
          >
            <p className="label tabular md:col-span-3">
              {entry.period}
              <span className="mt-1 block text-ink">{entry.kind}</span>
            </p>
            <div className="md:col-span-8">
              <h2 className="text-h3">
                {entry.href ? (
                  <Link href={entry.href} className="link">
                    {entry.title}
                  </Link>
                ) : (
                  entry.title
                )}
              </h2>
              <p className="mt-1 text-[0.9375rem] text-mute">{entry.org}</p>
              <p className="mt-3 max-w-[64ch]">{entry.description}</p>
              {entry.highlights && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {entry.highlights.map((h) => (
                    <li key={h} className="tag">
                      {h.replace(/^\p{Extended_Pictographic}\s*/u, "")}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </PageShell>
  );
}
