import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";
export const metadata = { title: "Tillbehör | PoolPro" };
const products = [
  { name: "Spa Cover Lyft", description: "Hydraulisk lock-lyftare för enklare hantering av spa-locket.", price: 3200 },
  { name: "Spa Kemikaliepaket Start", description: "Komplett startpaket med alla kemikalier för din nya spabad.", price: 890 },
  { name: "Spa Stege", description: "Säker och slitstark stege i rostfritt stål för enkel in- och urstigning.", price: 2400 },
];
export default function Page() {
  return <PageShell title="Tillbehör" description="Allt tillbehör du behöver för din spabad." breadcrumbs={[{ label: "Spabad", href: "/spabad" }, { label: "Tillbehör" }]} badge="Spabad"><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((p) => <ProductCard key={p.name} {...p} />)}</div></PageShell>;
}
