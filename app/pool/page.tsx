import Link from "next/link";

export const metadata = { title: "Pool | PoolPro" };

const details = [
  { label: "Produkt", value: "Pooler" },
  { label: "Location", value: "Stockholm" },
  { label: "Project Type", value: "Residential Design" },
  { label: "Size", value: "Från 20 m²" },
];

const subCategories = [
  { title: "Thermoblock", href: "/pool/thermoblock", color: "bg-slate-300" },
  { title: "Gjuten stomme", href: "/pool/gjuten-stomme", color: "bg-stone-300" },
  { title: "Rostfri stomme", href: "/pool/rostfri-stomme", color: "bg-zinc-300" },
  { title: "Poolöverdrag", href: "/pool/pooloverdrag", color: "bg-neutral-300" },
  { title: "Liner", href: "/pool/liner", color: "bg-slate-400" },
  { title: "Pooltak", href: "/pool/pooloverdrag/pooltak", color: "bg-stone-400" },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero image ── */}
     <section className="pt-4 flex justify-center">
        <div className="w-[90%]">
          <div className="relative overflow-hidden rounded-3xl" style={{ height: "90vh" }}>
            <img src="/alla poler hero.png" alt="Pool hero" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="inline-block bg-white rounded-2xl px-6 py-3">
                <h1 className="text-3xl font-black text-slate-900 lowercase tracking-tight">pool</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Details + description ── */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

            {/* Left — detail boxes */}
            <div className="grid grid-cols-2 gap-3">
              {details.map((detail) => (
                <div key={detail.label} className="rounded-2xl bg-[#efefef] px-5 py-4">
                  <p className="text-xs text-slate-400 mb-1">{detail.label}</p>
                  <p className="text-sm font-semibold text-slate-900">{detail.value}</p>
                </div>
              ))}
            </div>

            {/* Right — description */}
            <div className="space-y-4 text-sm text-slate-500 leading-relaxed">
              <p>Vi erbjuder pooler i flera olika utföranden och anpassar varje lösning efter kundens önskemål och tomtens förutsättningar. Tillsammans går vi igenom design, storlek, teknik och tillbehör för att skapa en pool som passar både din livsstil och din utemiljö.</p>
              <p>Våra poollösningar håller hög kvalitet och kan kombineras med moderna system för enkel skötsel, energieffektiv drift och god vattenkvalitet. Oavsett om poolen ingår i ett större projekt eller är ett fristående poolbygge hjälper vi dig hela vägen till färdig anläggning.</p>
              <p>Vi arbetar framst med thermoblock, rostfritt och helgjutna pooler med kakel eller svetsad liner samt poolskydd från CoverSeal, pooltak från Gullberg & Jansson eller lamelltäckning från Pahlen eller CF-Group.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subcategory grid ── */}
      <section className="px-6 pb-24 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Våra pooltyper</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {subCategories.map((cat) => (
              <Link key={cat.href} href={cat.href}
                className={`group relative overflow-hidden rounded-2xl ${cat.color} aspect-[4/3] flex flex-col justify-end p-5 hover:opacity-90 transition-all`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs uppercase tracking-widest">
                  Bild här
                </div>
                <div className="relative">
                  <h3 className="text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">{cat.title}</h3>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-900">
                    {cat.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}