import PageShell from "../../../Components/PageShell";
import ProductCard from "../../../Components/ProductCard";
import { getProductsByCategory } from "@/lib/allProducts";

export const metadata = { title: "Pooltak | Elite Pool & Spa" };

const products = getProductsByCategory("/pool/pooloverdrag/pooltak");

export default function Page() {
  return (
    <PageShell
      title="Pooltak"
      description="Skydda din pool och förläng säsongen med ett kvalitetstak. Vi erbjuder pooltak från Gullberg & Jansson — eleganta, hållbara och anpassningsbara efter din pools mått."
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Poolöverdrag", href: "/pool/pooloverdrag" },
        { label: "Pooltak" },
      ]}
      badge="Poolöverdrag"
      count={products.length}
    >
      <div className="mb-8 flex flex-wrap gap-6 items-center">
        <img src="/gullberg.png" alt="Gullberg & Jansson" className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity" />
        <img src="/CFgroup.png" alt="CF Group" className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.sku} {...p} href={`/produkt/${p.slug}`} />
        ))}
      </div>
    </PageShell>
  );
}
