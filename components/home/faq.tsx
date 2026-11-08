import { Plus } from "lucide-react";
import { profile } from "@/content/profile";
import { WordSplit } from "@/components/ui/word-split";

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

export function Faq() {
  return (
    <section className="section-y">
      <div className="container-page grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="word-reveal text-heading-lg font-normal md:sticky md:top-[calc(var(--header-height)+32px)]">
            <WordSplit text="Questions, answered" />
          </h2>
        </div>

        <div className="border-t border-soft-mist md:col-span-7">
          {FAQS.map((faq, idx) => (
            <details
              key={faq.q}
              data-rev
              style={{ "--d": `${idx * 50}ms` } as React.CSSProperties}
              className="group border-b border-soft-mist"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-subheading font-normal">{faq.q}</h3>
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-soft-mist bg-white transition-colors group-open:bg-lilac-mist">
                  <Plus
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="size-4 transition-transform duration-300 group-open:rotate-45"
                  />
                </span>
              </summary>
              <p className="max-w-[600px] pb-6 text-[16px] leading-[1.6] text-stone-gray">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
