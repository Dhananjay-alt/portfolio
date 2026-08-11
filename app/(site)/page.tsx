import { JsonLd } from "@/components/seo/json-ld";
import { personSchema, websiteSchema } from "@/lib/structured-data";
import { HomeHero } from "@/components/home/home-hero";
import { Statement } from "@/components/home/statement";
import { FeaturedShowcase } from "@/components/home/featured-showcase";
import { StatsBand } from "@/components/home/stats-band";
import { ClosingCta } from "@/components/home/closing-cta";

const STATEMENT =
  "I design and ship complete products — from CRDT-backed realtime apps to on-chain protocols and AI-powered developer tools.";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema()]} />
      <HomeHero />
      <Statement text={STATEMENT} />
      <FeaturedShowcase />
      <StatsBand />
      <ClosingCta />
    </>
  );
}
