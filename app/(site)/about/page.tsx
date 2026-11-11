import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { SectionLabel } from "@/components/site/section-label";
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

const FAQS = [
  {
    q: "What roles are you open to?",
    a: "Engineering internships, early-stage founding-engineer roles and high-agency product builds across full-stack, Web3 protocols and AI developer tools. I work comfortably across timezones and ship complete systems independently.",
  },
  {
    q: "How do you balance IIT Roorkee and shipping production code?",
    a: "I build and ship daily. Alongside my degree, my practical focus is software engineering — hackathons (multiple ETHGlobal builds and awards) and open-source work on Rust and Ethereum tooling.",
  },
  {
    q: "How do you approach distributed state and CRDTs?",
    a: "Correctness belongs in the data model. Yjs CRDTs let documents be edited concurrently without locks or merge conflicts, while ephemeral Docker sandboxes keep untrusted code away from the host.",
  },
  {
    q: "How do you test smart contracts?",
    a: "Foundry and Solidity with extensive fuzzing and invariant suites — across ERC-721 physical-pairing systems, DeFi liquidity routing and a prize-winning ENS integration.",
  },
  {
    q: "How can we get in touch?",
    a: `Write to ${profile.email}, find me on GitHub, or use the contact page. I reply with repositories, architecture notes and proof of work.`,
  },
];

export default function AboutPage() {
  return (
    <PageShell eyebrow="About" title="Engineer first, metallurgist by degree.">
      <div className="grid-12 mt-[clamp(48px,7vw,96px)] gap-y-14">
        <div className="space-y-6 md:col-span-7">
          {profile.bio.map((para, idx) => (
            <Reveal as="p" key={para} index={idx} className="text-lead">
              {para}
            </Reveal>
          ))}
        </div>

        <aside className="md:col-span-4 md:col-start-9">
          <Reveal className="rule pt-5">
            <h2 className="label !font-mono">Education</h2>
            <p className="mt-3 font-medium">{profile.education.degree}</p>
            <p className="text-[0.9375rem] text-mute">
              {profile.education.school} · Class of {profile.education.graduationYear}
            </p>
            <p className="mt-3 text-[0.9375rem] text-mute">{profile.education.note}</p>
          </Reveal>

          <Reveal index={1} className="rule mt-8 pt-5">
            <h2 className="label !font-mono">Communities</h2>
            <ul className="mt-3 space-y-3">
              {profile.communities.map((c) => (
                <li key={c.name}>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-[0.9375rem] text-mute">{c.role}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>

      <section aria-labelledby="philosophy-heading" className="rule grid-12 mt-[var(--section-y)] gap-y-8 pt-10">
        <div className="md:col-span-4">
          <SectionLabel>Philosophy</SectionLabel>
          <SplitHeading id="philosophy-heading" className="text-h2 mt-6">
            The right primitive over the clever hack.
          </SplitHeading>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <Reveal as="p" className="text-lead">
            I care about shipping things that work end to end — not demos that fall over. That means
            picking the right primitive (CRDTs, container isolation, static analysis) over the
            clever hack, keeping systems provider-agnostic so a dead end is a one-file swap, and
            treating UX and security as first-class from the start rather than bolt-ons.
          </Reveal>

          <h3 className="label mt-12 !font-mono">Signal</h3>
          <ul className="mt-4 border-b border-line">
            {profile.highlights.map((h, idx) => (
              <Reveal as="li" key={h} index={idx} className="border-t border-line py-4">
                {h}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="toolbox-heading" className="rule grid-12 mt-[var(--section-y)] gap-y-8 pt-10">
        <div className="md:col-span-4">
          <SectionLabel>Stack</SectionLabel>
          <SplitHeading id="toolbox-heading" className="text-h2 mt-6">
            The toolbox
          </SplitHeading>
        </div>
        <dl className="border-b border-line md:col-span-7 md:col-start-6">
          {stackGroups.map((group, idx) => (
            <Reveal
              key={group.label}
              index={idx}
              className="grid grid-cols-[10ch_minmax(0,1fr)] gap-x-5 border-t border-line py-4"
            >
              <dt className="label pt-1">{group.label}</dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section aria-labelledby="faq-heading" className="rule grid-12 mt-[var(--section-y)] gap-y-8 pt-10">
        <div className="md:col-span-4">
          <SectionLabel>FAQ</SectionLabel>
          <SplitHeading id="faq-heading" className="text-h2 mt-6">
            Questions, answered
          </SplitHeading>
        </div>
        <div className="border-b border-line md:col-span-7 md:col-start-6">
          {FAQS.map((faq, idx) => (
            <Reveal key={faq.q} index={idx}>
              <details className="group border-t border-line">
                <summary className="flex list-none items-baseline justify-between gap-8 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-sans text-[1.0625rem] font-medium leading-snug tracking-normal">{faq.q}</h3>
                  <span
                    aria-hidden="true"
                    className="label !text-ink transition-transform duration-[var(--dur-small)] ease-[var(--ease-out)] group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-6 text-mute">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
