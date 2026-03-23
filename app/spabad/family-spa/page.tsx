import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";
import { getProductsByCategory } from "@/lib/allProducts";

export const metadata = { title: "Family Spa | Elite Pool & Spa" };

const products = getProductsByCategory("/spabad/family-spa");

export default function Page() {
  return (
    <PageShell
      title="Family Spa"
      description="Rymliga familjespadar för hela familjen — med plats för upp till 8 personer och barnvänliga funktioner."
      breadcrumbs={[{ label: "Spabad", href: "/spabad" }, { label: "Family Spa" }]}
      badge="Spabad"
      count={products.length}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.sku} {...p} href={`/produkt/${p.slug}`} />)}
      </div>
    </PageShell>
  );
}
