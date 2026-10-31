"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/config/nav";
import { socials } from "@/config/socials";
import { profile } from "@/content/profile";

export function Footer() {
  const pathname = usePathname();

  // On the home page, DarkFooter in the page flow serves as the footer
  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="mt-32 border-t border-[rgba(231,226,216,0.14)] bg-[#241a12] text-[#fffdf8] select-none">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-anton text-2xl tracking-tight text-[#fffdf8] leading-[0.9]">
              {profile.name}
            </p>
            <p className="mt-2 mono-label text-[rgba(231,226,216,0.65)]">
              {profile.role} — {profile.education.school}
            </p>
            <p className="mt-4 font-inter text-xs text-[rgba(231,226,216,0.56)] leading-relaxed">
              {profile.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mono-label text-[rgba(231,226,216,0.65)] transition-colors hover:text-[#ef493c]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-[rgba(231,226,216,0.1)] pt-6 md:flex-row md:items-center">
          <p className="mono-label text-[rgba(231,226,216,0.48)] text-[10px]">
            © {new Date().getFullYear()} {profile.name.toUpperCase()} // WARM PRINT REGISTER
          </p>

          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mono-label text-[rgba(231,226,216,0.6)] transition-colors hover:text-[#ef493c]"
              >
                {social.label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}