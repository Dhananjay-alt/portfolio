import { skillGroups } from "@/content/skills";

/** Accessible, reduced-motion / small-screen alternative to the constellation. */
export function SkillsFallback() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {skillGroups.map((group) => (
        <div key={group.category}>
          <div className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ background: group.accent }}
              aria-hidden
            />
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {group.category}
            </h2>
          </div>
          <ul className="mt-3 space-y-2">
            {group.skills.map((skill) => (
              <li key={skill.name} className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-medium">{skill.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{skill.note}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
