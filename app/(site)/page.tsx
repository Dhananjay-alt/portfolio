import { JsonLd } from "@/components/seo/json-ld";
import { personSchema, websiteSchema } from "@/lib/structured-data";
import { PortalHero } from "@/components/home/portal-hero";
import { StatementFold } from "@/components/home/statement-fold";
import { CatalogueReleases } from "@/components/home/catalogue-releases";
import { RosterAndDates } from "@/components/home/roster-and-dates";
import { PortalClose } from "@/components/home/portal-close";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema()]} />
      <PortalHero />
      <StatementFold />
      <CatalogueReleases />
      <RosterAndDates />
      <PortalClose />
    </>
  );
}
