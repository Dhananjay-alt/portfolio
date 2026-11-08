import { JsonLd } from "@/components/seo/json-ld";
import { personSchema, websiteSchema } from "@/lib/structured-data";
import { ScrollChoreographer } from "@/components/home/scroll-choreographer";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { WorkSuite } from "@/components/home/work-suite";
import { CapabilityCards } from "@/components/home/capability-cards";
import { Seasons } from "@/components/home/seasons";
import { LagoonBand } from "@/components/home/lagoon-band";
import { Faq } from "@/components/home/faq";
import { GradientBanner } from "@/components/home/gradient-banner";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema()]} />
      <ScrollChoreographer>
        <Hero />
        <TrustStrip />
        <WorkSuite />
        <CapabilityCards />
        <Seasons />
        <LagoonBand />
        <Faq />
        <GradientBanner />
      </ScrollChoreographer>
    </>
  );
}
