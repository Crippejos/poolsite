import PageShell from "@/app/Components/PageShell";
import ProductSearch from "@/app/Components/ProductSearch";
import { bassangutrustning, pahlenPrice } from "@/lib/pahlenProducts";

const products = bassangutrustning
  .filter(p => p.group === "Vattenfall & Kanoner")
  .map(p => ({
    ...p,
    price: pahlenPrice(p.price),
    variants: p.variants?.map(v => ({ ...v, price: pahlenPrice(v.price) ?? v.price })),
  }));

const descriptions: Record<string, string> = {
  "125010": "Vattenfall 300 — elegant vattenkaskad 300 mm bred. Monteras i poolkanten för dekorativt inlopp.",
  "125020": "Vattenfall 500 — bred vattenkaskad 500 mm för imponerande vatteneffekt. Passar större pooler.",
  "125110": "Vattenkanon 109F (bred) — sprutar ett brett vattenfläkt. Idealisk för lekpool och vattenspel.",
  "125120": "Vattenkanon 109G (stril) — finstriligt vattenmönster för dekorativ effekt.",
  "125130": "Vattenkanon 109E (stråle) — kraftfull sammanhängande vattenstråle. Perfekt för poollek.",
  "125140": "Vattenkanon 109A (platt) — platt, böjd vattenstråle som landar som en bro i vattnet.",
};

export const metadata = { title: "Vattenfall och Vattenkanoner | Elite Pool & Spa" };

export default function VattenfallPage() {
  return (
    <PageShell
      title="Vattenfall och Vattenkanoner"
      description="Vattenfall 300 och 500 samt Vattenkanon 109 i fyra varianter — bred, stril, stråle och platt. Dekorativa och lekfulla inslag för din pool."
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Tillbehör & Reservdelar", href: "/pool/tillbehor" },
        { label: "Vattenattraktioner", href: "/pool/tillbehor/vattenattraktioner" },
        { label: "Vattenfall och Vattenkanoner" },
      ]}
      badge="Pahlén"
      count={products.length}
    >
      <ProductSearch products={products} descriptions={descriptions} />
    </PageShell>
  );
}
