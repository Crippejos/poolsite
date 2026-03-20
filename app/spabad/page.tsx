import Link from "next/link";

export const metadata = { title: "Spabad | PoolPro" };

const subCategories = [
  { title: "Black Edition", href: "/spabad/black-edition", color: "bg-zinc-800", desc: "Exklusiva spabad i helsvart utförande med LED-belysning." },
  { title: "Swimspa", href: "/spabad/swimspa", color: "bg-blue-900", desc: "Kombinerad swimspa och spabad — simma och koppla av." },
  { title: "Vildmarksspa", href: "/spabad/vildmarksspa", color: "bg-stone-600", desc: "Klassisk vedeldad vildmarksspa i cederträ." },
  { title: "Family Spa", href: "/spabad/family-spa", color: "bg-slate-500", desc: "Rymlig familjespa för upp till 8 personer." },
  { title: "Tillbehör", href: "/spabad/tillbehor", color: "bg-neutral-500", desc: "Kemikalier, lock-lyftare och övriga tillbehör." },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="px-6 pt-16 pb-10 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Spabad</p>
          <h1 className="text-4xl font-black text-slate-900 sm:text-5xl">Våra spabad</h1>
          <p className="mt-3 text-sm text-slate-500 max-w-lg leading-relaxed">
            Upptäck vårt kompletta sortiment av spabad — från exklusiva Black Edition till klassiska vildmarksspa. Vi hjälper dig hitta rätt modell för din livsstil.
          </p>
        </div>
      </section>

      {/* ── Subcategory grid ── */}
      <section className="px-6 pb-24 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subCategories.map((cat) => (
              <Link key={cat.href} href={cat.href}
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
          <h2 className="text-3xl font-black text-slate-900">Osäker på vilken modell?</h2>
          <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto">Kontakta oss för rådgivning. Vi hjälper dig välja rätt spabad utifrån dina önskemål och budget.</p>
          <Link href="/kontakt" className="mt-8 inline-block rounded-full bg-slate-900 px-7 py-3 font-bold text-white hover:bg-slate-700 transition-all">
            Begär offert
          </Link>
        </div>
      </section>

    </main>
  );
}
