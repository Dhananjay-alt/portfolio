import type { ComponentType, SVGProps } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/site/brand-icons";
import { profile } from "@/content/profile";

export type Social = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

/** TODO: replace placeholder URLs with real profiles before launch. */
export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/", icon: GithubIcon }, // TODO
  { label: "LinkedIn", href: "https://linkedin.com/in/", icon: LinkedinIcon }, // TODO
  { label: "X", href: "https://x.com/", icon: XIcon }, // TODO
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];
