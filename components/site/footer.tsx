import Link from "next/link";
import { navItems } from "@/config/nav";
import { socials } from "@/config/socials";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold">{profile.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {profile.role} · {profile.education.school}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {profile.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-border/60 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js.
          </p>
          <ul className="flex items-center gap-2">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
