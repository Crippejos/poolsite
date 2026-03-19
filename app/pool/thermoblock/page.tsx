import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";

export const metadata = { title: "Thermoblock | PoolPro" };

const products = [
  {
    name: "Thermoblock Standard 8×4",
    description: "Energieffektiv pool med isolerande thermoblockvägg. Håller värmen längre och sänker driftskostnaderna.",
    price: 89000,
  },
  {
    name: "Thermoblock Premium 10×5",
    description: "Stor familjepol i thermoblock med extra isolering och inbyggd sittbänk.",
    price: 129000,
  },
  {
    name: "Thermoblock Compact 6×3",
    description: "Kompakt thermoblock-pool perfekt för mindre trädgårdar.",
    price: 69000,
  },
];

export default function Page() {
  return (
    <PageShell
      title="Thermoblock"
      description="Energieffektiva pooler med isolerande thermoblockvägg för lägre driftskostnader."
      breadcrumbs={[{ label: "Pool", href: "/pool" }, { label: "Thermoblock" }]}
      badge="Pool"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </PageShell>
  );
}
