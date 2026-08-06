import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
            top: -160,
            left: -80,
            width: 640,
            height: 640,
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(99,102,241,0.35), transparent 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#8b8fa3", fontSize: 26 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(120deg,#6366f1,#22d3ee)",
              color: "#0a0a0f",
              fontWeight: 800,
              fontSize: 28,
            }}
          >
            D
          </div>
          {profile.education.school} · Class of {profile.education.graduationYear}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, color: "#fafafa", letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              letterSpacing: -1,
              backgroundImage: "linear-gradient(120deg,#818cf8,#22d3ee)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.role}
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#b4b7c5", maxWidth: 900 }}>
            {profile.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
