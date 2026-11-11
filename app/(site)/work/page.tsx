import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { WorkList } from "@/components/work/work-list";
import { getWorkItems } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "SyncSpace, Paygent, LuxAuth, and Repo Analyzer — realtime, Web3, and AI developer tools, each with a full case study.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <PageShell
      eyebrow="Work"
      title="Things I've shipped, end to end."
      description="Each of these has a case study covering the problem, the architecture, the engineering decisions, and the result."
    >
      <div className="mt-[clamp(40px,6vw,80px)]">
        <WorkList items={getWorkItems()} />
      </div>
    </PageShell>
  );
}
