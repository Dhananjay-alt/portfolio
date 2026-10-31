import { JsonLd } from "@/components/seo/json-ld";
import { personSchema, websiteSchema } from "@/lib/structured-data";
import { ScrollChoreographer } from "@/components/home/scroll-choreographer";
import { HeroStage } from "@/components/home/hero-stage";
import { ManifestoStage } from "@/components/home/manifesto-stage";
import { CardRailStage } from "@/components/home/card-rail-stage";
import { ArtifactStage } from "@/components/home/artifact-stage";
import { SeasonBandStage } from "@/components/home/season-band-stage";
import { RuledTableSection } from "@/components/home/ruled-table-section";
import { FaqSection } from "@/components/home/faq-section";
import { DarkFooter } from "@/components/home/dark-footer";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema()]} />
      <ScrollChoreographer>
        {/* Stage 1: Poster Hero on Three Variables (280svh, dark ground) */}
        <HeroStage />

        {/* Stage 2: Clip-Wipe Manifesto (260svh, cream ground) */}
        <ManifestoStage />

        {/* Stage 3: Horizontal Card Rail (340svh, cream ground) */}
        <CardRailStage />

        {/* Stage 4: The Printed Artifact (420svh, dark ground) */}
        <ArtifactStage />

        {/* Stage 5: Parallax Season Band (300svh, cream ground) */}
        <SeasonBandStage />

        {/* After the Pins */}
        <RuledTableSection />
        <FaqSection />
        <DarkFooter />
      </ScrollChoreographer>
    </>
  );
}