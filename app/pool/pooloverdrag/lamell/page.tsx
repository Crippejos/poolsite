import PageShell from "../../../Components/PageShell";
import ProductCard from "../../../Components/ProductCard";

export const metadata = { title: "Lamell | Elite Pool & Spa" };

const products = [
  {
    name: "Tixit Lamelltäcke med solceller",
    sku: "CF-TIXIT-SOL",
    description: "Modernt lamelltäcke med integrerade solceller och LED-belysning i fäststolparna. Solcellerna driver systemet hållbart — ett ekologiskt och energieffektivt alternativ för din pool.",
    price: 0,
    images: [
      "/products/tixit-sol.jpg",
      "/products/tixit-1.jpg",
      "/products/tixit-5.jpg",
      "/products/tixit-11.jpg",
    ],
    options: [
      {
        label: "Färg",
        values: ["Antracit", "Silver", "Vit"],
      },
      {
        label: "Belysning",
        values: ["Ingår (solcellsdriven)"],
      },
    ],
  },
  {
    name: "Tixit Lamelltäcke elektrisk",
    sku: "CF-TIXIT-EL",
    description: "Elektriskt lamelltäcke med inbyggd belysning i fäststolparna och möjlighet till högtalaranpassning. Modern design som kombinerar funktion och estetik.",
    price: 0,
    images: [
      "/products/tixit-el.jpg",
      "/products/tixit-2.jpg",
      "/products/tixit-4.jpg",
      "/products/tixit-7.jpg",
    ],
    options: [
      {
        label: "Färg",
        values: ["Antracit", "Silver", "Vit"],
      },
      {
        label: "Belysning",
        values: ["Ingår (el-driven)"],
      },
      {
        label: "Tillval",
        values: ["Utan högtalare", "Med högtalare"],
      },
    ],
  },
];

export default function Page() {
  return (
    <PageShell
      title="Lamell"
      description="Stilrena lamelltäcken för energieffektiv pool — elektriska och solcellsdrivna alternativ från CF Group."
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Poolöverdrag", href: "/pool/pooloverdrag" },
        { label: "Lamell" },
      ]}
      badge="Poolöverdrag"
      count={products.length}
    >
      {/* Brands */}
      <div className="mb-10 pb-10 border-b border-slate-100">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">Varumärken vi säljer</p>
        <div className="flex flex-wrap gap-8 items-center">
          <img src="/CFgroup.png" alt="CF Group" className="h-7 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          <img src="/gullberg.png" alt="Gullberg & Jansson" className="h-7 object-contain opacity-60 hover:opacity-100 transition-opacity" />
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
