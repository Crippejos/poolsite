import PageShell from "../../../Components/PageShell";
import ProductCard from "../../../Components/ProductCard";

export const metadata = { title: "Pooltak | Elite Pool & Spa" };

const products = [
  {
    name: "Nova Comfort Premium",
    sku: "GJ-NOVA",
    description: "Lågt exklusivt pooltak i klarplast med fördelade sektioner, skjutdörr och förlängningsskenor. Anpassas efter din pools storlek.",
    price: 0,
    href: "/kontakt",
    images: ["/products/nova-comfort.jpg", "/products/nova-comfort-2.jpg"],
    options: [
      {
        label: "Storlek (innermått)",
        values: ["3.20 × 6.20 m", "3.70 × 7.20 m", "4.20 × 8.20 m"],
      },
      {
        label: "Skjutdörr",
        values: ["Vänster sida", "Höger sida"],
      },
      {
        label: "Gavelpaneler",
        values: ["Utan gavel", "Fram", "Bak", "Fram & bak"],
      },
    ],
    pricing: {
      optionLabel: "Storlek (innermått)",
      map: {
        "3.20 × 6.20 m": 119900,
        "3.70 × 7.20 m": 166900,
        "4.20 × 8.20 m": 190900,
      },
    },
  },
  {
    name: "Leia Premium",
    sku: "GJ-LEIA",
    description: "Exklusivt pooltak i klarplast med automatisk sektionslåsning och extra platta komfortskenor. Elegant låg profil.",
    price: 0,
    href: "/kontakt",
    images: ["/products/leia-premium.jpg", "/products/leia-premium-2.jpg"],
    options: [
      {
        label: "Storlek (innermått)",
        values: ["3.20 × 6.20 m", "3.70 × 7.20 m", "4.20 × 8.20 m"],
      },
      {
        label: "Material",
        values: ["Klarplast"],
      },
      {
        label: "Skjutdörr",
        values: ["Vänster sida", "Höger sida"],
      },
    ],
    pricing: {
      optionLabel: "Storlek (innermått)",
      map: {
        "3.20 × 6.20 m": 158900,
        "3.70 × 7.20 m": 178900,
        "4.20 × 8.20 m": 199900,
      },
    },
  },
];

export default function Page() {
  return (
    <PageShell
      title="Pooltak"
      description="Teleskoptak för säsongsförlängning och ökad säkerhet — exklusiva modeller från Gullberg & Jansson."
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Poolöverdrag", href: "/pool/pooloverdrag" },
        { label: "Pooltak" },
      ]}
      badge="Poolöverdrag"
      count={products.length}
    >
      {/* Brands */}
      <div className="mb-10 pb-10 border-b border-slate-100">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">Varumärken vi säljer</p>
        <div className="flex flex-wrap gap-8 items-center">
          <img src="/gullberg.png" alt="Gullberg & Jansson" className="h-7 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/CFgroup.png" alt="CF Group" className="h-7 object-contain opacity-60 hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.sku} {...p} />
        ))}
      </div>
    </PageShell>
  );
}
