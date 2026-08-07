import type { ComponentType, SVGProps } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/site/brand-icons";
import { profile } from "@/content/profile";

export type Social = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/Dhananjay-alt", icon: GithubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dhananjay-hire-8aa10a256",
    icon: LinkedinIcon,
  },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];
