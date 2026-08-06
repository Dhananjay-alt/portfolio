import { ArrowDown } from "lucide-react";
import type { Project } from "@/types/project";

export function ArchitectureDiagram({
  steps,
  accent,
}: {
  steps: Project["architecture"];
  accent?: string;
}) {
  const color = accent ?? "var(--brand)";
  return (
    <ol className="relative space-y-3">
      {steps.map((step, i) => (
        <li key={step.layer}>
          <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4">
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-1"
              style={{ background: color }}
            />
            <div className="flex items-baseline gap-3 pl-2">
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-medium">{step.layer}</p>
                <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
              </div>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex justify-center py-1" aria-hidden>
              <ArrowDown className="size-4 text-muted-foreground/50" />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
