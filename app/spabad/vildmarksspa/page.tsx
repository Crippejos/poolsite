import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";
import { getProductsByCategory } from "@/lib/allProducts";

export const metadata = { title: "Vildmarksspa | Elite Pool & Spa" };

const products = getProductsByCategory("/spabad/vildmarksspa");

export default function Page() {
  return (
    <PageShell
      title="Vildmarksspa"
      description="Klassisk vedeldad vildmarksspa i cederträ — en tidlös upplevelse utan el och nära naturen."
      breadcrumbs={[{ label: "Spabad", href: "/spabad" }, { label: "Vildmarksspa" }]}
      badge="Spabad"
      count={products.length}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.sku} {...p} href={`/produkt/${p.slug}`} />)}
      </div>
    </PageShell>
  );
}
