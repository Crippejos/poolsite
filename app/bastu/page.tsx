import PageShell from "../Components/PageShell";
import ProductCard from "../Components/ProductCard";
import { getProductsByCategory } from "@/lib/allProducts";

export const metadata = { title: "Bastu | Elite Pool & Spa" };

const products = getProductsByCategory("/bastu");

export default function Page() {
  return (
    <PageShell
      title="Bastu"
      description="Med en bastu skapar du en naturlig plats för avkoppling och välmående. Vi erbjuder bastulösningar för både inomhus- och utomhusbruk, anpassade efter din miljö och dina önskemål. Oavsett om du vill ha en traditionell bastu eller en modern variant hjälper vi dig att skapa en helhetslösning som kompletterar din pool- och spa-anläggning."
      breadcrumbs={[{ label: "Bastu" }]}
      badge="Bastu"
      count={products.length}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.sku} {...p} href={`/produkt/${p.slug}`} />
        ))}
      </div>
    </PageShell>
  );
}
