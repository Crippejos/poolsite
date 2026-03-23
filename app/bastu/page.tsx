import PageShell from "../Components/PageShell";
import ProductCard from "../Components/ProductCard";

export const metadata = { title: "Bastu | Elite Pool & Spa" };

const products = [
  { name: "Utomhusbastu Classic",       sku: "BST-001", description: "Fristående utomhusbastu i obehandlad nordic spruce. Rymmer 4–6 personer med elbastu-aggregat.", price: 42000 },
  { name: "Utomhusbastu Compact",       sku: "BST-002", description: "Kompakt utomhusbastu för 2–3 personer. Perfekt för mindre tomter — enkel att montera.",        price: 28000 },
  { name: "Bastu med omklädningsrum",   sku: "BST-003", description: "Rymlig bastu med separat omklädningsdel och veranda. Komplett lösning för din trädgård.",       price: 68000 },
];

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
        {products.map((p) => <ProductCard key={p.name} {...p} />)}
      </div>
    </PageShell>
  );
}
