import { skillGroups } from "@/content/skills";

/** Accessible, reduced-motion / small-screen alternative to the constellation. */
export function SkillsFallback() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {skillGroups.map((group) => (
        <div key={group.category}>
          <h2 className="label !font-mono">{group.category}</h2>
          <ul className="mt-3 border-b border-line">
            {group.skills.map((skill) => (
              <li key={skill.name} className="border-t border-line py-3">
                <p className="text-[length:var(--text-small)] font-medium">{skill.name}</p>
                <p className="mt-1 text-[length:var(--text-small)] text-mute">{skill.note}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
