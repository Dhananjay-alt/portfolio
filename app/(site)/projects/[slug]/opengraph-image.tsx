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
          background: "#f2f0eb",
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
            background: "radial-gradient(circle, rgba(212,199,255,0.8), transparent 70%)",
          }}
        />
        <div style={{ display: "flex", gap: 16, color: "#666666", fontSize: 28 }}>
          <span style={{ color: "#421d24" }}>{category}</span>
          <span>·</span>
          <span>{year}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 500, color: "#292827", letterSpacing: -3 }}>
            {title}
          </div>
          <div style={{ marginTop: 20, fontSize: 38, color: "#3d3a38", maxWidth: 960 }}>
            {tagline}
          </div>
          {award && (
            <div style={{ marginTop: 28, fontSize: 30, color: "#714cb6", fontWeight: 600 }}>
              {award}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#292827", fontSize: 28 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#421d24",
              color: "#ffffff",
              fontWeight: 600,
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
