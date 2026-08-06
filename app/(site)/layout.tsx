import type { ReactNode } from "react";
import { CustomCursor } from "@/components/site/custom-cursor";
import { FloatingNav } from "@/components/site/floating-nav";
import { Footer } from "@/components/site/footer";
import { CommandPalette } from "@/components/command/command-palette";
import { IntroOverlay } from "@/components/site/intro-overlay";
import { AiAssistant } from "@/components/ai/ai-assistant";
import { SoundManager } from "@/components/site/sound-manager";
import { KonamiEasterEgg } from "@/components/site/konami-easter-egg";
import { ShortcutsHelp } from "@/components/site/shortcuts-help";
import { BackToTop } from "@/components/site/back-to-top";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <IntroOverlay />
      <CustomCursor />
      <SoundManager />
      <KonamiEasterEgg />
      <ShortcutsHelp />
      <BackToTop />
      <CommandPalette />
      <FloatingNav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <AiAssistant />
    </>
  );
}
