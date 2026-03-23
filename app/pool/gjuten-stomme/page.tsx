import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";

export const metadata = { title: "Gjuten stomme | Elite Pool & Spa" };

import { getProductsByCategory } from "@/lib/allProducts";

const products = getProductsByCategory("/pool/gjuten-stomme");

export default function Page() {
  return (
    <PageShell
      title="Gjuten stomme"
      description="Traditionell betongpool med gjuten stomme — robust, tidlös och byggd för att hålla i decennier."
      breadcrumbs={[{ label: "Pool", href: "/pool" }, { label: "Gjuten stomme" }]}
      badge="Pool"
      count={products.length}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.sku} {...p} href={`/produkt/${p.slug}`} />)}
      </div>
    </PageShell>
  );
}
