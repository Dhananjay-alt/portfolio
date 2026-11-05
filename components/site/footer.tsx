import Link from "next/link";
import { navItems } from "@/config/nav";
import { socials } from "@/config/socials";
import { profile } from "@/content/profile";
import { Logo } from "@/components/void/logo";

export function Footer() {
  return (
    <footer className="mt-[120px] select-none">
      <div className="void-container pb-16 pt-24">
        <div className="grid gap-16 md:grid-cols-2">
          <div className="max-w-sm">
            <Logo />
            <p className="body-light mt-6 text-[#bdbdbd]">{profile.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-4 sm:grid-cols-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="btn-ghost">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-col-reverse items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="text-[12px] leading-[1.5] text-[#9a9a9a]">
            © {new Date().getFullYear()} {profile.name} · {profile.education.school}
          </p>

          <div className="flex items-center gap-8">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer noopener"
                className="btn-ghost"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
