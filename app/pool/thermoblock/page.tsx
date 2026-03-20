import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";

export const metadata = { title: "Thermoblock | Elite Pool & Spa" };

const products = [
  { name: "Thermoblock Standard 8×4", sku: "POOL-TB-001", description: "Energieffektiv pool med isolerande thermoblockvägg. Håller värmen längre och sänker driftskostnaderna.", price: 89000  },
  { name: "Thermoblock Premium 10×5", sku: "POOL-TB-002", description: "Stor familjepool i thermoblock med extra isolering och inbyggd sittbänk.",                              price: 129000 },
  { name: "Thermoblock Compact 6×3",  sku: "POOL-TB-003", description: "Kompakt thermoblock-pool perfekt för mindre trädgårdar.",                                              price: 69000  },
];

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
        {products.map((p) => <ProductCard key={p.name} {...p} />)}
      </div>
    </PageShell>
  );
}
