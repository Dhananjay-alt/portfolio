import { JsonLd } from "@/components/seo/json-ld";
import { personSchema, websiteSchema } from "@/lib/structured-data";
import { ScrollChoreographer } from "@/components/home/scroll-choreographer";
import { VoidHero } from "@/components/void/home/void-hero";
import { Manifesto } from "@/components/void/home/manifesto";
import { SelectedWork } from "@/components/void/home/selected-work";
import { Capabilities } from "@/components/void/home/capabilities";
import { Chronology } from "@/components/void/home/chronology";
import { Faq } from "@/components/void/home/faq";
import { Closing } from "@/components/void/home/closing";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema()]} />
      <ScrollChoreographer>
        <VoidHero />
        <Manifesto />
        <SelectedWork />
        <Capabilities />
        <Chronology />
        <Faq />
        <Closing />
      </ScrollChoreographer>
    </>
  );
}
