import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";

export const metadata = { title: "Family Spa | Elite Pool & Spa" };

const products = [
  { name: "Family Spa 6-sits", sku: "SPA-FS-001", description: "Rymlig familjespa för upp till 6 personer med barnvänliga funktioner.",      price: 69000 },
  { name: "Family Spa 8-sits", sku: "SPA-FS-002", description: "Extra stor familjespa för upp till 8 personer med lekfulla jets.",            price: 89000 },
];

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
        {products.map((p) => <ProductCard key={p.name} {...p} />)}
      </div>
    </PageShell>
  );
}
