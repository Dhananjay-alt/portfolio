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
          background: "#ffffff",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#5c5c5c", fontSize: 28 }}>
          {category}, {year}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, color: "#111111", letterSpacing: -5, lineHeight: 1, fontWeight: 600 }}>{title}</div>
          <div style={{ marginTop: 28, fontSize: 38, color: "#5c5c5c", maxWidth: 960 }}>{tagline}</div>
          {badge && (
            <div style={{ display: "flex", marginTop: 32, fontSize: 28, color: "#111111" }}>
              {badge}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #e5e5e5",
            paddingTop: 28,
            color: "#111111",
            fontSize: 28,
          }}
        >
          <span>{profile.name}</span>
          <span style={{ color: "#5c5c5c" }}>{profile.role}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
