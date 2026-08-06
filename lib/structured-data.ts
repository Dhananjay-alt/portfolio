import { siteConfig } from "@/config/site";
import { profile } from "@/content/profile";
import { socials } from "@/config/socials";
import type { Project } from "@/types/project";
import type { PostMeta } from "@/lib/blog";

const url = siteConfig.url;

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.school,
    },
    knowsAbout: [
      ...profile.stack.frontend,
      ...profile.stack.backend,
      ...profile.stack.web3,
      ...profile.stack.ai,
    ],
    sameAs: socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.shortName,
    url,
    description: siteConfig.description,
  };
}

export function projectSchema(project: Project) {
  const isSoftware = true;
  return {
    "@context": "https://schema.org",
    "@type": isSoftware ? "SoftwareApplication" : "CreativeWork",
    name: project.title,
    description: project.tagline,
    url: `${url}/projects/${project.slug}`,
    applicationCategory: project.category,
    datePublished: String(project.year),
    author: { "@type": "Person", name: profile.name },
    ...(project.links.github ? { codeRepository: project.links.github } : {}),
    ...(project.award ? { award: project.award.replace(/^🏆\s*/, "") } : {}),
  };
}

export function blogPostingSchema(post: PostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${url}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    author: { "@type": "Person", name: profile.name },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${url}${item.path}`,
    })),
  };
}
