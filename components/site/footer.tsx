"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/config/nav";
import { socials } from "@/config/socials";
import { profile } from "@/content/profile";

export function Footer() {
  const pathname = usePathname();

  // On the home page, the PortalClose component provides the spec-mandated close section
  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="mt-32 border-t border-[rgba(237,231,220,0.13)] bg-[#0A0C0E]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-syne text-lg font-bold text-[#EDE7DC]">{profile.name}</p>
            <p className="mt-2 font-sora text-sm text-[#9EA5A8]">
              {profile.role} — {profile.education.school}
            </p>
            <p className="mt-4 font-sora text-sm text-[#6C7378]">
              {profile.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sora text-sm text-[#9EA5A8] transition-colors hover:text-[#E8913C]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-[rgba(237,231,220,0.13)] pt-6 md:flex-row md:items-center">
          <p className="font-sora text-xs text-[#6C7378]">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-4">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="grid size-9 place-items-center rounded-full text-[#9EA5A8] transition-colors hover:text-[#E8913C]"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
