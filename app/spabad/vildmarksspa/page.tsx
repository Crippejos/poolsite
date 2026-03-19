import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";
export const metadata = { title: "Vildmarksspa | PoolPro" };
const products = [
  { name: "Vildmarksspa Vedeldad", description: "Klassisk vedeldad vildmarksspa i cederträ. Ingen el behövs.", price: 28000 },
  { name: "Vildmarksspa Stor", description: "Större vedeldad vildmarksspa för upp till 8 personer.", price: 42000 },
];
export default function Page() {
  return <PageShell title="Vildmarksspa" description="Klassisk vedeldad vildmarksspa i cederträ – ingen el behövs." breadcrumbs={[{ label: "Spabad", href: "/spabad" }, { label: "Vildmarksspa" }]} badge="Spabad"><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((p) => <ProductCard key={p.name} {...p} />)}</div></PageShell>;
}
