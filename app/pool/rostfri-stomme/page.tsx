import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";
export const metadata = { title: "Rostfri stomme | PoolPro" };
const products = [
  { name: "Rostfri Stomme 316L", description: "Pool i maringrade 316L rostfritt stål. Extremt hållbar och underhållsfri.", price: 195000 },
  { name: "Rostfri Stomme Premium", description: "Premiumpol i rostfritt stål med inbyggd LED och automatisk rengöring.", price: 275000 },
];
export default function Page() {
  return <PageShell title="Rostfri stomme" description="Pool i maringrade rostfritt stål – extremt hållbar och underhållsfri." breadcrumbs={[{ label: "Pool", href: "/pool" }, { label: "Rostfri stomme" }]} badge="Pool"><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((p) => <ProductCard key={p.name} {...p} />)}</div></PageShell>;
}
