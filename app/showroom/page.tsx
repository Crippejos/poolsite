export const metadata = { title: "Showroom | PoolPro" };

const categories = ["Alla", "Pool", "Spabad", "Bastu"];

const gallery = [
  { title: "Infinity Pool", category: "Pool", size: "large", color: "bg-slate-400" },
  { title: "Thermoblock 8×4", category: "Pool", size: "small", color: "bg-stone-300" },
  { title: "Black Edition 900", category: "Spabad", size: "small", color: "bg-zinc-400" },
  { title: "Utomhuspool med terrass", category: "Pool", size: "small", color: "bg-slate-300" },
  { title: "Swimspa Duo", category: "Spabad", size: "large", color: "bg-neutral-400" },
  { title: "Vildmarksspa", category: "Spabad", size: "small", color: "bg-stone-400" },
  { title: "Utomhusbastu", category: "Bastu", size: "small", color: "bg-amber-200" },
  { title: "Family Spa", category: "Spabad", size: "small", color: "bg-neutral-200" },
  { title: "Rostfri pool", category: "Pool", size: "large", color: "bg-zinc-300" },
  { title: "Bastu med utsikt", category: "Bastu", size: "small", color: "bg-amber-300" },
  { title: "Cover Seal pool", category: "Pool", size: "small", color: "bg-stone-500" },
  { title: "Black Edition 700", category: "Spabad", size: "small", color: "bg-neutral-500" },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="px-6 pt-16 pb-10 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Galleri</p>
          <h1 className="text-4xl font-black text-slate-900 sm:text-5xl">Showroom</h1>
          <p className="mt-3 text-sm text-slate-500 max-w-lg">
            Se exempel på våra genomförda projekt — pooler, spabad och bastur för moderna hem i hela Stockholmsområdet.
          </p>
        </div>
      </section>

      {/* ── Filter tabs ── */}
      <section className="px-6 pb-10 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat, i) => (
              <div key={cat}
                className={`rounded-full px-5 py-2 text-sm font-semibold cursor-default ${i === 0 ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-500"}`}>
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Masonry grid ── */}
      <section className="px-6 pb-24 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {gallery.map((item) => (
              <div key={item.title}
                className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl ${item.color} ${item.size === "large" ? "aspect-[4/3]" : "aspect-square"} flex flex-col justify-end cursor-pointer hover:opacity-95 transition-all`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs uppercase tracking-widest">
                  Bild här
                </div>
                <div className="relative p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs text-white/70 uppercase tracking-widest">{item.category}</p>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20 bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-black text-slate-900">Vill du se mer?</h2>
          <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto">Besök vårt fysiska showroom i Stockholm eller kontakta oss för en kostnadsfri konsultation.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/kontakt" className="rounded-full bg-slate-900 px-7 py-3 font-bold text-white hover:bg-slate-700 transition-all">
              Kontakta oss
            </a>
            <a href="/om-oss" className="rounded-full border border-slate-200 px-7 py-3 font-bold text-slate-700 hover:bg-[#efefef] transition-all">
              Om oss
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}