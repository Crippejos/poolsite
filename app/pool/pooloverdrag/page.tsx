import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Poolöverdrag | Elite Pool & Spa" };

const subcategories = [
  {
    title: "Pooltak",
    href: "/pool/pooloverdrag/pooltak",
    description: "Teleskoptak i klarplast för säsongsförlängning och ökad säkerhet. Exklusiva modeller från Gullberg & Jansson.",
    count: 2,
    image: "/products/nova-comfort.jpg",
  },
  {
    title: "Lamell",
    href: "/pool/pooloverdrag/lamell",
    description: "Stilrena lamelltäcken med elektrisk eller solcellsdriven funktion. Moderna modeller från CF Group.",
    count: 2,
    image: "/products/tixit-sol.jpg",
  },
];

const brands = [
  { name: "Gullberg & Jansson", logo: "/gullberg.png", href: "/pool/pooloverdrag/pooltak" },
  { name: "CF Group",           logo: "/CFgroup.png",  href: "/pool/pooloverdrag/lamell"  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="pt-4 flex justify-center">
        <div className="w-[90%]">
          <div className="relative overflow-hidden rounded-3xl h-[70vh] min-h-[440px] bg-slate-700">
            <img
              src="/products/leia-premium.jpg"
              alt="Poolöverdrag"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">Pool</p>
              <div className="inline-block bg-white rounded-2xl px-6 py-3">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Poolöverdrag</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Skydd & komfort</p>
              <h2 className="text-4xl font-black text-slate-900 leading-tight sm:text-5xl">
                Skydda din pool.<br />Förläng säsongen.
              </h2>
            </div>
            <div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Vi erbjuder ett komplett sortiment av poolöverdrag — från eleganta teleskoptak i klarplast till moderna lamelltäcken med elektrisk eller solcellsdriven funktion. Alla produkter levereras av våra samarbetspartners Gullberg & Jansson och CF Group.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subcategory cards ── */}
      <section className="px-6 pb-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {subcategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group relative overflow-hidden rounded-3xl bg-slate-200 aspect-[4/3] flex flex-col justify-end hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">
                        {cat.count} produkter
                      </p>
                      <h3 className="text-2xl font-black text-white">{cat.title}</h3>
                      <p className="mt-1 text-sm text-white/70 leading-relaxed max-w-xs">{cat.description}</p>
                    </div>
                    <div className="shrink-0 ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brands ── */}
      <section className="border-t border-slate-100 px-6 py-16 sm:px-12 lg:px-20 bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">Varumärken vi säljer</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={brand.href}
                className="group flex items-center gap-6 rounded-2xl bg-white border border-slate-100 px-8 py-6 hover:border-slate-200 hover:shadow-md transition-all"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900">{brand.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Se produkter</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-black text-slate-900">Osäker på vad du behöver?</h2>
          <p className="mt-4 text-sm text-slate-500 max-w-md mx-auto">
            Vi hjälper dig välja rätt poolöverdrag för din pool, tomt och budget. Kontakta oss för kostnadsfri rådgivning.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/kontakt" className="rounded-full bg-slate-900 px-7 py-3 font-bold text-white hover:bg-slate-700 transition-all">
              Kontakta oss
            </Link>
            <Link href="/pool" className="rounded-full border border-slate-200 px-7 py-3 font-bold text-slate-700 hover:bg-[#f5f5f5] transition-all">
              Tillbaka till Pool
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
