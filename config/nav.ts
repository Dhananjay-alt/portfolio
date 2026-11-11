export type NavItem = {
  label: string;
  href: string;
};

/** The three destinations in the header. */
export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/blog" },
];

/** Routes that live in the footer rather than the header. */
export const secondaryNav: NavItem[] = [
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Playground", href: "/playground" },
  { label: "Open source", href: "/open-source" },
];

/** Every top-level route — used by the sitemap and the command palette. */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  ...primaryNav,
  ...secondaryNav,
  { label: "Résumé", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
