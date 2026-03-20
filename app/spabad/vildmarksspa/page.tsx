import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";

export const metadata = { title: "Vildmarksspa | Elite Pool & Spa" };

const products = [
  { name: "Vildmarksspa Vedeldad", sku: "SPA-VS-001", description: "Klassisk vedeldad vildmarksspa i cederträ. Ingen el behövs.",              price: 28000 },
  { name: "Vildmarksspa Stor",     sku: "SPA-VS-002", description: "Större vedeldad vildmarksspa för upp till 8 personer.",                    price: 42000 },
];

export default function Page() {
  return (
    <PageShell
      title="Vildmarksspa"
      description="Klassisk vedeldad vildmarksspa i cederträ — en tidlös upplevelse utan el och nära naturen."
      breadcrumbs={[{ label: "Spabad", href: "/spabad" }, { label: "Vildmarksspa" }]}
      badge="Spabad"
      count={products.length}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.name} {...p} />)}
      </div>
    </PageShell>
  );
}
