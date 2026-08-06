import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { SkillsConstellation } from "@/components/skills/skills-constellation";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "An interactive constellation of the stack — frontend, backend, systems, Web3, and AI.",
};

export default function SkillsPage() {
  return (
    <PageShell
      eyebrow="Skills"
      title="An interactive map of what I build with."
      description="Hover or focus any node to see how I've used it. Grouped by frontend, backend, systems, Web3, and AI."
    >
      <SkillsConstellation />
    </PageShell>
  );
}
