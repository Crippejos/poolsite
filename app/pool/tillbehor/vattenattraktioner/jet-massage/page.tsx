import PageShell from "@/app/Components/PageShell";
import ProductSearch from "@/app/Components/ProductSearch";
import { bassangutrustning, pahlenPrice } from "@/lib/pahlenProducts";

const products = bassangutrustning
  .filter(p => p.group === "Massage")
  .map(p => ({
    ...p,
    price: pahlenPrice(p.price),
    variants: p.variants?.map(v => ({ ...v, price: pahlenPrice(v.price) ?? v.price })),
  }));

const descriptions: Record<string, string> = {
  "130540": "Massagemunstycke Soft, Marine-utförande. Mjuk, bred vattenstråle. Passar Classic-serie pooler.",
  "130541": "Startknapp Marine — tryckknappsstart för massagesystemet, Marine-utförande.",
  "130542": "Massagemunstycke Medium, Marine-utförande. Kraftfull stråle för effektiv massagefunktion.",
  "130550": "Massagemunstycke Soft Marine 350 — bredare fäste, passar 350 mm-serien.",
  "130551": "Startknapp Marine 350 — anpassad för 350 mm-serien.",
  "130552": "Massagemunstycke Medium Marine 350 — kraftig stråle för 350 mm-serien.",
  "130560": "Massagemunstycke Soft Classic — mjuk stråle i Classic-utförande för ingjutning.",
  "130561": "Startknapp Classic — tryckknappsstart i Classic-utförande.",
  "130562": "Massagemunstycke Medium Classic — kraftig massagestråle för Classic-pooler.",
  "130570": "Massagemunstycke Soft Classic 350 — mjuk stråle, Classic-utförande 350 mm.",
  "130571": "Startknapp Classic 350 — anpassad för 350 mm Classic-serien.",
  "130572": "Massagemunstycke Medium Classic 350 — kraftig stråle, 350 mm Classic.",
  "35012":  "Komplett Jet Massage Classic-paket med 2 st CA-40 Medium-munstycken. Allt för installation ingår.",
  "35014":  "Komplett Jet Massage Classic-paket med 4 st CA-40 Medium-munstycken. För större pooler.",
  "35212":  "Komplett Jet Massage Classic-paket med 2 st CA-350 Medium-munstycken — 350 mm-serien.",
  "35214":  "Komplett Jet Massage Classic-paket med 4 st CA-350 Medium-munstycken. Maximalt med massagepunkter.",
};

export const metadata = { title: "Jet Massage | Elite Pool & Spa" };

export default function JetMassagePage() {
  return (
    <PageShell
      title="Jet Massage"
      description="Massagemunstycken och kompletta Jet Massage-paket från Pahlén — i Classic och Marine-utförande för alla pooltyper."
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Tillbehör & Reservdelar", href: "/pool/tillbehor" },
        { label: "Vattenattraktioner", href: "/pool/tillbehor/vattenattraktioner" },
        { label: "Jet Massage" },
      ]}
      badge="Pahlén"
      count={products.length}
    >
      <ProductSearch products={products} descriptions={descriptions} />
    </PageShell>
  );
}
