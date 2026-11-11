import { profile } from "@/content/profile";

export type Social = {
  label: string;
  href: string;
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/Dhananjay-alt" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dhananjay-hire-8aa10a256" },
  { label: "Email", href: `mailto:${profile.email}` },
];
