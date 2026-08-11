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
  const award = project?.award?.replace(/^🏆\s*/, "🏆 ");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0f",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 640,
            height: 640,
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(100,210,255,0.28), transparent 70%)",
          }}
        />
        <div style={{ display: "flex", gap: 16, color: "#8b8fa3", fontSize: 28, fontFamily: "monospace" }}>
          <span style={{ color: "#5AA9FF" }}>{category}</span>
          <span>·</span>
          <span>{year}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 800, color: "#fafafa", letterSpacing: -2 }}>
            {title}
          </div>
          <div style={{ marginTop: 20, fontSize: 38, color: "#b4b7c5", maxWidth: 960 }}>
            {tagline}
          </div>
          {award && (
            <div style={{ marginTop: 28, fontSize: 30, color: "#5AA9FF", fontWeight: 600 }}>
              {award}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#8b8fa3", fontSize: 28 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(120deg,#0A84FF,#64D2FF)",
              color: "#0a0a0f",
              fontWeight: 800,
            }}
          >
            D
          </div>
          {profile.name} — {profile.role}
        </div>
      </div>
    ),
    { ...size },
  );
}
