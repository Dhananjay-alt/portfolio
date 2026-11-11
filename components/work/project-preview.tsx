import Image from "next/image";

export type PreviewProject = {
  slug: string;
  title: string;
  year: number;
  architecture: { layer: string; detail: string }[];
  hero?: string;
};

/**
 * A project's preview. Shows `media.hero` when the project has one; until
 * then it draws the architecture as a hairline schematic, so every project
 * has something true to show.
 *
 * - `sm`: the hover / inline preview in the work list (stacked layers)
 * - `lg`: the case-study hero (the same layers as a left-to-right pipeline)
 */
export function ProjectPreview({
  project,
  size = "sm",
  priority = false,
}: {
  project: PreviewProject;
  size?: "sm" | "lg";
  priority?: boolean;
}) {
  if (project.hero) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-line bg-surface">
        <Image
          src={project.hero}
          alt={`${project.title} interface`}
          fill
          priority={priority}
          sizes={size === "lg" ? "(min-width: 1280px) 1200px, 100vw" : "(min-width: 768px) 360px, 100vw"}
          className="object-cover"
        />
      </div>
    );
  }

  const steps = project.architecture;

  if (size === "lg") {
    return (
      <figure className="rounded-md border border-line bg-surface p-5 md:p-8">
        <figcaption className="label flex items-center justify-between gap-4">
          <span>{project.slug} / architecture</span>
          <span className="tabular">{steps.length} layers</span>
        </figcaption>
        <ol
          className="mt-10 grid gap-y-6 md:mt-16 md:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
          style={{ "--n": steps.length } as React.CSSProperties}
        >
          {steps.map((step, i) => (
            <li key={step.layer} className="relative md:pr-6">
              {/* Node on a hairline rail */}
              <div className="flex items-center gap-3 md:block">
                <span aria-hidden="true" className="relative block md:h-3 md:w-full">
                  <span className="absolute left-0 top-1/2 hidden h-px w-full bg-line md:block" />
                  <span
                    className={`relative block size-[9px] rounded-full border md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 ${
                      i === 0 ? "border-accent bg-accent" : "border-ink bg-surface"
                    }`}
                  />
                </span>
                <span className="label tabular md:mt-5 md:block">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-2 font-display text-[1.5rem] leading-[1.1] md:text-[1.75rem]">{step.layer}</p>
            </li>
          ))}
        </ol>
      </figure>
    );
  }

  return (
    <div className="flex aspect-[4/3] w-full flex-col rounded-md border border-line bg-surface p-4">
      <p className="label flex items-center justify-between gap-4">
        <span>{project.slug} / architecture</span>
        <span className="tabular">{project.year}</span>
      </p>
      <ol className="mt-auto">
        {steps.map((step, i) => (
          <li key={step.layer} className="flex items-baseline gap-3 border-t border-line py-[7px] first:border-t-0">
            <span className="label tabular">{String(i + 1).padStart(2, "0")}</span>
            <span className="truncate text-[0.875rem] font-medium">{step.layer}</span>
            <span
              aria-hidden="true"
              className={`ml-auto size-[7px] shrink-0 self-center rounded-full border ${
                i === 0 ? "border-accent bg-accent" : "border-ink"
              }`}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
