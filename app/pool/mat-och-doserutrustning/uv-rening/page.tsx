import PageShell from "@/app/Components/PageShell";
import ProductSearch from "@/app/Components/ProductSearch";
import { vattenrening, pahlenPrice } from "@/lib/pahlenProducts";

const products = vattenrening
  .filter(p => p.group === "UV-rening")
  .map(p => ({ ...p, price: pahlenPrice(p.price) }));

const descriptions: Record<string, string> = {
  "34760": "UV Premium för pooler 3×6 till 4×8 m. Kraftfull UV-desinfektion som reducerar klorbehovet med upp till 80 %. Titankammare.",
  "417760": "Auto UV 75 med titankammare — automatisk UV-reningsanläggning för pooler upp till 75 m³.",
  "417770": "Auto UV 130 med titankammare — för pooler upp till 130 m³. Hög genomströmning och lång lamplivslängd.",
  "34765": "UV Bas för pooler 3×6 till 4×8 m. Kostnadseffektiv UV-rening med enkel installation.",
  "417740": "UV Puriq Bright 80 — effektiv UV-desinfektion för pooler upp till 80 m³. Låg energiförbrukning.",
  "417745": "UV Puriq Bright 120 med amalgamlampa — hög intensitet och lång livslängd för pooler upp till 120 m³.",
};

export const metadata = { title: "UV-rening | Elite Pool & Spa" };

export default function UvReningPage() {
  return (
    <PageShell
      title="UV-rening"
      description="UV-anläggningar från Pahlén — desinficera poolvatten med UV-ljus och minska kemikaliebehovet drastiskt. Auto UV med titankammare eller UV Bas/Puriq Bright för kostnadseffektiv rening."
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Mät- & doserutrustning", href: "/pool/mat-och-doserutrustning" },
        { label: "UV-rening" },
      ]}
      badge="Pahlén"
      count={products.length}
    >
      <ProductSearch products={products} descriptions={descriptions} />
    </PageShell>
  );
}
