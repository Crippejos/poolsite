import Link from "next/link";

export const metadata = { title: "Tillbehör | Elite Pool & Spa" };

const categories = [
  { title: "Pool tillbehör",   href: "/pool",                color: "bg-slate-500",   desc: "Kemikalier, skimmer, pumpar och allt för din pool." },
  { title: "Spabad tillbehör", href: "/spabad/tillbehor",    color: "bg-stone-500",   desc: "Lock-lyftare, kemikalier, stegar och spa-tillbehör." },
  { title: "Bastu tillbehör",  href: "/bastu",               color: "bg-amber-900",   desc: "Bastutillbehör, löyly och bastuaggregat." },
  { title: "Grill tillbehör",  href: "/grillar",             color: "bg-stone-700",   desc: "Grillverktyg, täcken, kol och rökflis." },
  { title: "Rengöring",        href: "/kontakt",             color: "bg-zinc-500",    desc: "Rengöringsprodukter för pool, spa och utemiljö." },
  { title: "Reservdelar",      href: "/kontakt",             color: "bg-neutral-600", desc: "Reservdelar och komponenter för alla produktkategorier." },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="pt-4 flex justify-center">
        <div className="w-[90%]">
          <div className="relative overflow-hidden rounded-3xl h-[90vh] bg-zinc-700">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">Elite Pool & Spa</p>
              <div className="inline-block bg-white rounded-2xl px-6 py-3">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tillbehör</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Sortiment</p>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Allt du behöver</h2>
          <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
            Vi erbjuder ett komplett sortiment av tillbehör för pool, spabad, bastu och grillar. Hitta rätt tillbehör för din produkt eller kontakta oss för rådgivning.
          </p>
        </div>
      </section>

      {/* ── Category grid ── */}
      <section className="px-6 pb-24 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link key={cat.href + cat.title} href={cat.href}
                className={`group relative overflow-hidden rounded-2xl ${cat.color} aspect-[4/3] flex flex-col justify-end p-6 hover:opacity-90 transition-all`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative">
                  <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                  <p className="mt-1 text-sm text-white/70 leading-relaxed">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20 bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-black text-slate-900">Hittar du inte det du söker?</h2>
          <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto">Kontakta oss — vi kan hjälpa dig beställa specifika reservdelar och tillbehör.</p>
          <Link href="/kontakt" className="mt-8 inline-block rounded-full bg-slate-900 px-7 py-3 font-bold text-white hover:bg-slate-700 transition-all">
            Kontakta oss
          </Link>
        </div>
      </section>

    </main>
  );
}
