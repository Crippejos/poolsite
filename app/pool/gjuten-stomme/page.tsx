import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";

export const metadata = { title: "Gjuten stomme | Elite Pool & Spa" };

const products = [
  { name: "Gjuten Stomme Classic", sku: "POOL-GS-001", description: "Traditionell betongpool med gjuten stomme – robust och tidlös design.",                    price: 145000 },
  { name: "Gjuten Stomme Oval",    sku: "POOL-GS-002", description: "Oval betongpool i gjuten stomme, perfekt för mindre trädgårdar.",                          price: 115000 },
  { name: "Gjuten Stomme XL",      sku: "POOL-GS-003", description: "Extra stor gjuten pool för hela familjen med plats för simning.",                          price: 195000 },
];

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
        {products.map((p) => <ProductCard key={p.name} {...p} />)}
      </div>
    </PageShell>
  );
}
