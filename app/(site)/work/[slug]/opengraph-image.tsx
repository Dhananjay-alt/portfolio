import { ImageResponse } from "next/og";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { profile } from "@/content/profile";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? profile.name;
  const tagline = project?.tagline ?? profile.tagline;
  const category = project?.category ?? "Project";
  const year = project?.year ?? "";
  const badge = project?.badge;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f2f0eb",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            color: "#66635d",
            fontSize: 24,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>Case study</span>
          <span>·</span>
          <span>{category}</span>
          <span>·</span>
          <span>{year}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, color: "#111111", letterSpacing: -4, lineHeight: 1 }}>{title}</div>
          <div style={{ marginTop: 28, fontSize: 38, color: "#66635d", maxWidth: 960 }}>{tagline}</div>
          {badge && (
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 32, fontSize: 28, color: "#111111" }}>
              <div style={{ width: 12, height: 12, borderRadius: 12, background: "#b93a15" }} />
              {badge}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #d9d5cc",
            paddingTop: 28,
            color: "#111111",
            fontSize: 28,
          }}
        >
          <span>{profile.name}</span>
          <span style={{ color: "#66635d" }}>{profile.role}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
