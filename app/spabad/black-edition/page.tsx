import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";
export const metadata = { title: "Black Edition | PoolPro" };
const products = [
  { name: "Black Edition 700", description: "Exklusiv spabad i helsvart utförande med 40 jets och LED-belysning.", price: 79000 },
  { name: "Black Edition 900 Pro", description: "Premiumbadkar för sex personer med vattenfallsfunktion och WiFi-styrning.", price: 109000 },
  { name: "Black Edition 500 Compact", description: "Kompakt black edition för mindre utrymmen, utan att kompromissa med stil.", price: 59000 },
];
export default function Page() {
  return <PageShell title="Black Edition" description="Exklusiva spabad i helsvart utförande med LED-belysning." breadcrumbs={[{ label: "Spabad", href: "/spabad" }, { label: "Black Edition" }]} badge="Spabad"><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((p) => <ProductCard key={p.name} {...p} />)}</div></PageShell>;
}
