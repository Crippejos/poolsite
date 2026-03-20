import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";

export const metadata = { title: "Swimspa | Elite Pool & Spa" };

const products = [
  { name: "Swimspa Duo 550", sku: "SPA-SS-001", description: "Kombinerad swimspa och spabad. Simma och koppla av i samma enhet.",                    price: 155000 },
  { name: "Swimspa Pro 750", sku: "SPA-SS-002", description: "Professionell swimspa med kraftfull motström för riktigt simträning.",                  price: 210000 },
];

export default function Page() {
  return (
    <PageShell
      title="Swimspa"
      description="Kombinerad swimspa och spabad — simma mot motstömmen eller koppla av i jetmassagen."
      breadcrumbs={[{ label: "Spabad", href: "/spabad" }, { label: "Swimspa" }]}
      badge="Spabad"
      count={products.length}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.name} {...p} />)}
      </div>
    </PageShell>
  );
}
