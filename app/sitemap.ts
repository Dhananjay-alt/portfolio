import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { navItems } from "@/config/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return navItems.map((item) => ({
    url: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    lastModified: now,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
