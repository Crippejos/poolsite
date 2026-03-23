import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";
import { getProductsByCategory } from "@/lib/allProducts";

export const metadata = { title: "Swimspa | Elite Pool & Spa" };

const products = getProductsByCategory("/spabad/swimspa");

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
        {products.map((p) => <ProductCard key={p.sku} {...p} href={`/produkt/${p.slug}`} />)}
      </div>
    </PageShell>
  );
}
