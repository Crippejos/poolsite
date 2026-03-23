import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";
import { getProductsByCategory } from "@/lib/allProducts";

export const metadata = { title: "Black Edition | Elite Pool & Spa" };

const products = getProductsByCategory("/spabad/black-edition");

export default function Page() {
  return (
    <PageShell
      title="Black Edition"
      description="Exklusiva spabad i helsvart utförande med LED-belysning, kraftfulla jets och smart styrning."
      breadcrumbs={[{ label: "Spabad", href: "/spabad" }, { label: "Black Edition" }]}
      badge="Spabad"
      count={products.length}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.sku} {...p} href={`/produkt/${p.slug}`} />)}
      </div>
    </PageShell>
  );
}
