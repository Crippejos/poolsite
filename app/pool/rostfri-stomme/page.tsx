import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";

export const metadata = { title: "Rostfri stomme | Elite Pool & Spa" };

const products = [
  { name: "Rostfri Stomme 316L",    sku: "POOL-RS-001", description: "Pool i maringrade 316L rostfritt stål. Extremt hållbar och underhållsfri.",              price: 195000 },
  { name: "Rostfri Stomme Premium", sku: "POOL-RS-002", description: "Premiumpool i rostfritt stål med inbyggd LED och automatisk rengöring.",                  price: 275000 },
];

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
        {products.map((p) => <ProductCard key={p.name} {...p} />)}
      </div>
    </PageShell>
  );
}
