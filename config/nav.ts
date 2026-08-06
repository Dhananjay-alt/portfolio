export type NavItem = {
  label: string;
  href: string;
};

/** Primary navigation shown in the floating nav and command palette. */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Blog", href: "/blog" },
  { label: "Playground", href: "/playground" },
  { label: "Open Source", href: "/open-source" },
  { label: "Contact", href: "/contact" },
];
