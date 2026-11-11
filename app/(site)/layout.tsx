import type { ReactNode } from "react";
import { CustomCursor } from "@/components/site/custom-cursor";
import { SiteHeader } from "@/components/site/site-header";
import { Footer } from "@/components/site/footer";
import { CommandPaletteLoader } from "@/components/command/command-palette-loader";
import { IntroDone } from "@/components/motion/intro-done";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="btn btn-fill btn-sm sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1 pt-[var(--header-h)]">
        {children}
      </main>
      <Footer />
      <IntroDone />
      <CommandPaletteLoader />
      <CustomCursor />
    </>
  );
}
