import { JsonLd } from "@/components/seo/json-ld";
import { personSchema, websiteSchema } from "@/lib/structured-data";
import { PageTransition } from "@/components/motion/page-transition";
import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { Capabilities } from "@/components/home/capabilities";
import { Journey } from "@/components/home/journey";
import { Philosophy } from "@/components/home/philosophy";

// Nav and the closing CTA + footer (sections 1 and 7) live in the site layout.
export default function HomePage() {
  return (
    <PageTransition>
      <div>
        <JsonLd data={[personSchema(), websiteSchema()]} />
        <Hero />
        <SelectedWork />
        <Capabilities />
        <Journey />
        <Philosophy />
      </div>
    </PageTransition>
  );
}
