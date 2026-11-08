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
          background: "linear-gradient(180deg, #c3c6d4 0%, #e8d6cb 40%, #f1d2b0 62%, #e2a978 82%, #b98a6f 100%)",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 640,
            width: 640,
            height: 640,
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(255,241,214,0.9), transparent 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#292827", fontSize: 26 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#421d24",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: 28,
            }}
          >
            D
          </div>
          {profile.education.school} · Class of {profile.education.graduationYear}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 500, color: "#292827", letterSpacing: -3 }}>
            {profile.name}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 500,
              letterSpacing: -1.5,
              color: "#421d24",
            }}
          >
            {profile.role}
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#3d3a38", maxWidth: 900 }}>
            {profile.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
