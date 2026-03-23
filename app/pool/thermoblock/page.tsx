import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";
import { getProductsByCategory } from "@/lib/allProducts";

export const metadata = { title: "Thermoblock | Elite Pool & Spa" };

const products = getProductsByCategory("/pool/thermoblock");

export default function Page() {
  return (
    <PageShell
      title="Thermoblock"
      description="Energieffektiva pooler med isolerande thermoblockvägg för lägre driftskostnader."
      breadcrumbs={[{ label: "Pool", href: "/pool" }, { label: "Thermoblock" }]}
      badge="Pool"
      count={products.length}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.sku} {...p} href={`/produkt/${p.slug}`} />)}
      </div>
    </PageShell>
  );
}
