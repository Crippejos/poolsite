import Link from "next/link";
import { Check } from "lucide-react";
import PageShell from "@/app/Components/PageShell";
import ProductSearch from "@/app/Components/ProductSearch";
import { poolkonstruktion, pahlenPrice } from "@/lib/pahlenProducts";

const products = poolkonstruktion
  .filter(p =>
    p.group === "Liner" &&
    (p.name.includes("Persia") || p.name.includes("gaveltrappa") || p.name.includes("tilläggskostnad"))
  )
  .map(p => ({
    ...p,
    group: p.name.includes("tilläggskostnad") ? "Tillval" : "Persia-serien",
    price: pahlenPrice(p.price),
  }));

const descriptions: Record<string, string> = {
  "482448": "Liner 4×8 m, djup 1,5 m — Persia Blå med inbyggd gaveltrappa. Specialsvetsad för pooler med trappa i gaveln.",
  "482449": "Liner 4×8 m, djup 1,5 m — Persia Sand med inbyggd gaveltrappa. Varm sandton med integrerad trappsektionen.",
  "482600": "Tilläggskostnad för inbyggd trappa i liner. Gäller vid specialbeställning av liner med integrerad trappa.",
};

export const metadata = { title: "Svetsad liner | Elite Pool & Spa" };

export default function SvetsadLinerPage() {
  return (
    <PageShell
      title="Svetsad liner"
      description="Skräddarsydda liners svetsade efter din pools exakta mått — Persia-serien med inbyggd gaveltrappa och specialbeställning."
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Liner", href: "/pool/liner" },
        { label: "Svetsad liner" },
      ]}
      badge="Pahlén"
      count={products.length}
    >
      <ProductSearch products={products} descriptions={descriptions} />

      {/* Custom order CTA */}
      <section className="border-t border-slate-100 px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-slate-900 p-8 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Specialbeställning</p>
            <h2 className="text-2xl font-black text-white mb-4">Liner på beställning</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-md">
              Har du en pool med avvikande mått, rund form, eller behöver du en liner med specialtillval som inbyggd sittbänk, trappa eller RGB-belysning? Vi svetsbeställer en liner efter dina exakta mått.
            </p>
            <ul className="space-y-2.5 mb-8">
              {[
                "Alla poolformer och mått",
                "Inbyggd trappa, bänk eller nisch",
                "Valfritt mönster och färg",
                "Leverans inom 2–4 veckor",
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-slate-300">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/kontakt"
              className="inline-flex items-center rounded-2xl bg-white px-7 py-3.5 text-sm font-black text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Begär offert
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
