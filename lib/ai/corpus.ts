import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { getAllProjects } from "@/lib/projects";

export type Chunk = { id: string; title: string; text: string };

/** Build a retrieval corpus from the site's own typed content. */
export function buildCorpus(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    id: "profile-bio",
    title: "About Dhananjay",
    text: `${profile.name} is a ${profile.role}. ${profile.bio.join(" ")} ${profile.tagline}`,
  });

  chunks.push({
    id: "profile-education",
    title: "Education",
    text: `${profile.education.degree} at ${profile.education.school}, Class of ${profile.education.graduationYear}. ${profile.education.note}`,
  });

  chunks.push({
    id: "profile-communities",
    title: "Communities & affiliations",
    text: profile.communities.map((c) => `${c.name} (${c.role})`).join(", "),
  });

  chunks.push({
    id: "profile-highlights",
    title: "Highlights & proof of work",
    text: profile.highlights.join(". "),
  });

  chunks.push({
    id: "profile-stack",
    title: "Tech stack",
    text: Object.entries(profile.stack)
      .map(([k, v]) => `${k}: ${(v as readonly string[]).join(", ")}`)
      .join(". "),
  });

  chunks.push({
    id: "skills",
    title: "Skills detail",
    text: skillGroups
      .map(
        (g) =>
          `${g.category} — ${g.skills.map((s) => `${s.name} (${s.note})`).join("; ")}`,
      )
      .join(". "),
  });

  for (const p of getAllProjects()) {
    chunks.push({
      id: `project-${p.slug}-overview`,
      title: `${p.title} — overview`,
      text: `${p.title}: ${p.tagline}. ${p.context} Category: ${p.category}, ${p.year}, ${p.status}. Role: ${p.role}. ${p.award ? `Award: ${p.award}.` : ""} Tech: ${(p.allTech ?? []).join(", ")}.`,
    });
    chunks.push({
      id: `project-${p.slug}-problem-approach`,
      title: `${p.title} — problem & approach`,
      text: `Problem: ${p.problem} Approach: ${p.approach}`,
    });
    chunks.push({
      id: `project-${p.slug}-features`,
      title: `${p.title} — features`,
      text: p.features.map((f) => `${f.title}: ${f.description}`).join(" "),
    });
    chunks.push({
      id: `project-${p.slug}-decisions`,
      title: `${p.title} — engineering decisions`,
      text: p.decisions
        .map((d) => `${d.title}. ${d.choice} ${d.rationale}`)
        .join(" "),
    });
    chunks.push({
      id: `project-${p.slug}-lessons`,
      title: `${p.title} — challenges & lessons`,
      text: `${p.challenges.map((c) => `${c.title}: ${c.description}`).join(" ")} Lessons: ${p.lessons.join(" ")}`,
    });
  }

  return chunks;
}
