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
          background: "#f2f0eb",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#66635d",
            fontSize: 24,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {profile.role} · {profile.education.school}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, color: "#111111", letterSpacing: -4, lineHeight: 1 }}>
            Complete systems,
          </div>
          <div style={{ fontSize: 104, color: "#111111", letterSpacing: -4, lineHeight: 1.05 }}>
            shipped end to end.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #d9d5cc",
            paddingTop: 28,
            fontSize: 28,
            color: "#111111",
          }}
        >
          <span>{profile.name}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#66635d" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#b93a15" }} />
            Realtime · Web3 · AI tooling
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
