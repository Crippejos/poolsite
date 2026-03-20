import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";

export const metadata = { title: "Tillbehör | Elite Pool & Spa" };

const products = [
  { name: "Spa Cover Lyft",           sku: "SPA-TL-001", description: "Hydraulisk lock-lyftare för enklare hantering av spa-locket.",                                 price: 3200 },
  { name: "Spa Kemikaliepaket Start",  sku: "SPA-TL-002", description: "Komplett startpaket med alla kemikalier för din nya spabad.",                                  price: 890  },
  { name: "Spa Stege",                 sku: "SPA-TL-003", description: "Säker och slitstark stege i rostfritt stål för enkel in- och urstigning.",                    price: 2400 },
];

export default function Page() {
  return (
    <PageShell
      title="Tillbehör"
      description="Allt tillbehör du behöver för din spabad — kemikalier, lock-lyftare, stegar och mer."
      breadcrumbs={[{ label: "Spabad", href: "/spabad" }, { label: "Tillbehör" }]}
      badge="Spabad"
      count={products.length}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.name} {...p} />)}
      </div>
    </PageShell>
  );
}
