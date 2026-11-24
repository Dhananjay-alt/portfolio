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
          background: "#ffffff",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#5c5c5c", fontSize: 28 }}>
          {profile.role}, {profile.education.school}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, color: "#111111", letterSpacing: -5, lineHeight: 1, fontWeight: 600 }}>
            Complete systems,
          </div>
          <div style={{ fontSize: 104, color: "#111111", letterSpacing: -5, lineHeight: 1.05, fontWeight: 600 }}>
            shipped end to end.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e5e5e5",
            paddingTop: 28,
            fontSize: 28,
            color: "#111111",
          }}
        >
          <span>{profile.name}</span>
          <span style={{ color: "#5c5c5c" }}>Realtime, Web3 and AI tooling</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
