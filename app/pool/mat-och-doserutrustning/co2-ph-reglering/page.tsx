import PageShell from "@/app/Components/PageShell";
import ProductSearch from "@/app/Components/ProductSearch";
import { vattenrening, pahlenPrice } from "@/lib/pahlenProducts";

const products = vattenrening
  .filter(p => p.group === "CO2")
  .map(p => ({ ...p, price: pahlenPrice(p.price) }));

const descriptions: Record<string, string> = {
  "414800": "Automatisk CO2-dosering för exakt pH-reglering i pooler upp till 200 m³. Komplett system med regulator, elektromagnetventil och armatur.",
  "414810": "Kompakt CO2-doseringsenhet för pooler upp till 80 m³. Enkel installation och precis pH-kontroll utan hantering av flytande kemikalier.",
};

export const metadata = { title: "CO2 & pH-reglering | Elite Pool & Spa" };

export default function Co2PhRegleringPage() {
  return (
    <PageShell
      title="CO2 & pH-reglering"
      description="Automatisk pH-dosering med CO2 — precis kontroll utan flytande kemikalier. Idealiskt för privata pooler och anläggningar som kräver stabil vattenkvalitet."
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Mät- & doserutrustning", href: "/pool/mat-och-doserutrustning" },
        { label: "CO2 & pH-reglering" },
      ]}
      badge="Pahlén"
      count={products.length}
    >
      <ProductSearch products={products} descriptions={descriptions} />
    </PageShell>
  );
}
