import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";

export const metadata = { title: "Rostfri stomme | Elite Pool & Spa" };

import { getProductsByCategory } from "@/lib/allProducts";

const products = getProductsByCategory("/pool/rostfri-stomme");

export default function Page() {
  return (
    <PageShell
      title="Rostfri stomme"
      description="Pool i maringrade rostfritt stål — extremt hållbar, underhållsfri och designad för ett livstid."
      breadcrumbs={[{ label: "Pool", href: "/pool" }, { label: "Rostfri stomme" }]}
      badge="Pool"
      count={products.length}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.sku} {...p} href={`/produkt/${p.slug}`} />)}
      </div>
    </PageShell>
  );
}
