import Link from "next/link";
import { socials } from "@/config/socials";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { Logo } from "@/components/site/logo";

type Column = { heading: string; links: { label: string; href: string; external?: boolean }[] };

const columns: Column[] = [
  {
    heading: "Work",
    links: [
      ...projects.map((p) => ({ label: p.title, href: `/projects/${p.slug}` })),
      { label: "All projects", href: "/projects" },
    ],
  },
  {
    heading: "Writing",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Playground", href: "/playground" },
      { label: "Open source", href: "/open-source" },
      { label: "RSS feed", href: "/feed.xml" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About", href: "/about" },
      { label: "Experience", href: "/experience" },
      { label: "Skills", href: "/skills" },
      { label: "Résumé", href: "/resume" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Get in touch", href: "/contact" },
      ...socials.map((s) => ({ label: s.label, href: s.href, external: true })),
    ],
  },
];

export function Footer() {
  return (
    <footer className="select-none bg-midnight-wine text-white">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="max-w-xs">
            <Logo tone="light" />
            <p className="mt-5 text-[14px] leading-[1.5] text-white/70">{profile.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading}>
                <h2 className="text-[14px] font-bold tracking-normal text-white">{col.heading}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noreferrer noopener"
                          className="text-[14px] text-white/70 underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-white hover:decoration-white/60"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[14px] text-white/70 underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-white hover:decoration-white/60"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/15 pt-8 text-[12px] leading-[1.5] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.education.school}
          </p>
          <p>Built with Next.js, set in Inter.</p>
        </div>
      </div>
    </footer>
  );
}
