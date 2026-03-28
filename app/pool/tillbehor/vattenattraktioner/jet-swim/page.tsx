import PageShell from "@/app/Components/PageShell";
import ProductSearch from "@/app/Components/ProductSearch";
import { bassangutrustning, pahlenPrice } from "@/lib/pahlenProducts";

const products = bassangutrustning
  .filter(p => p.group === "Jet Swim")
  .map(p => ({
    ...p,
    price: pahlenPrice(p.price),
    variants: p.variants?.map(v => ({ ...v, price: pahlenPrice(v.price) ?? v.price })),
  }));

const descriptions: Record<string, string> = {
  "1301285": "Jet Swim pump 2,2 kW 50 Hz — kraftfull pump för Motion-serien. Enkel att montera.",
  "1301300": "Grundsats Motion Classic — ingår munstycken och detaljer för Classic-pooler.",
  "1301305": "Grundsats Motion Marine — ingår munstycken och detaljer för Marine-pooler.",
  "1301310": "Monteringssats tunn vägg Motion — för linerbaserade pooler med tunn vägg.",
  "1301315": "Monteringssats Motion glasfiberpool — anpassad för glasfiberbaserade pooler.",
  "1301320": "Monteringssats tjock vägg Motion — för betong- och murverksbaserade pooler.",
  "1301390": "Jet Swim 2,2 kW Control box — elektronisk styrbox för Motion-serien.",
  "33041":   "Jet Swim Premium Motion Classic tunn vägg — komplett paket för Classic-pooler, tunn vägg. Pump + grundsats + styrbox.",
  "33042":   "Jet Swim Premium Motion Classic tjock vägg — komplett för Classic-pooler med tjockväggskonstruktion.",
  "33043":   "Jet Swim Premium Motion Marine tunn vägg — komplett paket för Marine-pooler, tunn vägg.",
  "33044":   "Jet Swim Premium Motion Marine tjock vägg — komplett för Marine-pooler med tjock vägg.",
  "1302090": "Jet Swim 2000/Athlete Control box — avancerad styrbox för Athlete-serien.",
  "1302100": "Jet Swim Athlete Grundsats — munstycken och inbyggnadsdelar för Athlete-serien.",
  "1302130": "Jet Swim Athlete Monteringssats — infästningsdetaljer för Athlete-installation.",
  "1302135": "Jet Swim Athlete Servicesats — reservdelar och tätningar för underhåll.",
  "1302185": "Jet Swim Athlete Pump 50 Hz — kraftfull pump för Athlete-serien, professionell prestanda.",
  "33045":   "Jet Swim Premium+ Athlete tunn vägg — komplett topppaket med Athlete-pump, tunn vägg.",
  "33046":   "Jet Swim Premium+ Athlete tjock vägg — komplett topppaket för tjockväggiga pooler.",
};

export const metadata = { title: "Jet Swim | Elite Pool & Spa" };

export default function JetSwimPage() {
  return (
    <PageShell
      title="Jet Swim"
      description="Motionssimning i din pool med Jet Swim från Pahlén — Motion- och Athlete-serien med pump, grundsats, monteringssats och styrbox."
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Tillbehör & Reservdelar", href: "/pool/tillbehor" },
        { label: "Vattenattraktioner", href: "/pool/tillbehor/vattenattraktioner" },
        { label: "Jet Swim" },
      ]}
      badge="Pahlén"
      count={products.length}
    >
      <ProductSearch products={products} descriptions={descriptions} />
    </PageShell>
  );
}
