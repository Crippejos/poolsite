import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";
export const metadata = { title: "Gjuten stomme | PoolPro" };
const products = [
  { name: "Gjuten Stomme Classic", description: "Traditionell betongpool med gjuten stomme – robust och tidlös design.", price: 145000 },
  { name: "Gjuten Stomme Oval", description: "Oval betongpool i gjuten stomme, perfekt för mindre trädgårdar.", price: 115000 },
  { name: "Gjuten Stomme XL", description: "Extra stor gjuten pool för hela familjen med plats för simning.", price: 195000 },
];
export default function Page() {
  return <PageShell title="Gjuten stomme" description="Traditionell betongpool med gjuten stomme – robust och tidlös." breadcrumbs={[{ label: "Pool", href: "/pool" }, { label: "Gjuten stomme" }]} badge="Pool"><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((p) => <ProductCard key={p.name} {...p} />)}</div></PageShell>;
}
