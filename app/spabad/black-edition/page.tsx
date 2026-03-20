import PageShell from "../../Components/PageShell";
import ProductCard from "../../Components/ProductCard";

export const metadata = { title: "Black Edition | Elite Pool & Spa" };

const products = [
  { name: "Black Edition 700",         sku: "SPA-BE-001", description: "Exklusiv spabad i helsvart utförande med 40 jets och LED-belysning.",              price: 79000  },
  { name: "Black Edition 900 Pro",      sku: "SPA-BE-002", description: "Premiumbadkar för sex personer med vattenfallsfunktion och WiFi-styrning.",        price: 109000 },
  { name: "Black Edition 500 Compact",  sku: "SPA-BE-003", description: "Kompakt black edition för mindre utrymmen, utan att kompromissa med stil.",       price: 59000  },
];

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
        {products.map((p) => <ProductCard key={p.name} {...p} />)}
      </div>
    </PageShell>
  );
}
