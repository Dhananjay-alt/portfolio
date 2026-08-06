import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { ParticleCanvas } from "@/components/playground/particle-canvas";
import { SortingVisualizer } from "@/components/playground/sorting-visualizer";
import { Terminal } from "@/components/playground/terminal";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Interactive experiments — a mouse-reactive particle field, a sorting visualizer, and a CLI portfolio.",
};

export default function PlaygroundPage() {
  return (
    <PageShell
      eyebrow="Playground"
      title="Experiments & interactive toys."
      description="The fun, exploratory side of the craft. Everything here runs in your browser — poke at it."
    >
      <div className="mt-12 space-y-12">
        <Experiment
          title="CLI portfolio"
          blurb="A real terminal. Try help, projects, open syncspace, skills, or confetti."
        >
          <Terminal />
        </Experiment>

        <div className="grid gap-12 lg:grid-cols-2">
          <Experiment
            title="Particle constellation"
            blurb="A 2D field that links nearby points and reacts to your cursor."
          >
            <ParticleCanvas />
          </Experiment>

          <Experiment
            title="Sorting visualizer"
            blurb="Watch a bubble sort compare and swap its way to order."
          >
            <SortingVisualizer />
          </Experiment>
        </div>
      </div>
    </PageShell>
  );
}

function Experiment({
  title,
  blurb,
  children,
}: {
  title: string;
  blurb: string;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <section>
        <div className="mb-4">
          <h2 className="text-[length:var(--text-h3)] font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{blurb}</p>
        </div>
        {children}
      </section>
    </Reveal>
  );
}
