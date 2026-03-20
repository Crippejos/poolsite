import Link from "next/link";
import Image from "next/image";
import PageShell from "../Components/PageShell";
import ProductCard from "../Components/ProductCard";

export const metadata = { title: "Grillar | Elite Pool & Spa" };

const subCategories = [
  { title: "Kolgrillar",      href: "/grillar/kolgrillar",      color: "bg-stone-700", desc: "Klassiska kolgrillar för äkta grillsmak och hög temperatur." },
  { title: "Gasolgrillar",    href: "/grillar/gasolgrillar",    color: "bg-slate-600", desc: "Bekväma gasolgrillar med exakt temperaturkontroll." },
  { title: "Kamado",          href: "/grillar/kamado",          color: "bg-stone-800", desc: "Keramiska kamadogrillar — grill, rök och baka i ett." },
  { title: "Utekök",          href: "/grillar/utekök",          color: "bg-zinc-600",  desc: "Kompletta utekök för den ultimata matlagningsupplevelsen." },
  { title: "Pelletsrök",      href: "/grillar/pellets",         color: "bg-amber-900", desc: "Pelletsrökare för låg & långsam tillagning med autentisk röksmak." },
  { title: "Tillbehör",       href: "/tillbehor",               color: "bg-neutral-600", desc: "Grillverktyg, täcken, kol och allt annat du behöver." },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="pt-4 flex justify-center">
        <div className="w-[90%]">
          <div className="relative overflow-hidden rounded-3xl h-[90vh] bg-stone-800">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">Elite Pool & Spa</p>
              <div className="inline-block bg-white rounded-2xl px-6 py-3">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Grillar</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Kategori",    value: "Grillar & Utekök" },
                { label: "Ursprung",    value: "Europa & USA" },
                { label: "Sortiment",   value: "Kol, gas, kamado" },
                { label: "Leverans",    value: "Hela Sverige" },
              ].map((d) => (
                <div key={d.label} className="rounded-2xl bg-[#efefef] px-5 py-4">
                  <p className="text-xs text-slate-400 mb-1">{d.label}</p>
                  <p className="text-sm font-semibold text-slate-900">{d.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4 text-sm text-slate-500 leading-relaxed">
              <p>Vi erbjuder ett noggrant utvalt sortiment av premiumgrillar för den som tar utomhusmatlagning på allvar. Från klassiska kolgrillar med äkta smak till avancerade kamadogrillar och kompletta utekök.</p>
              <p>Oavsett om du vill grilla snabbt på en gasolgrills precisa värme, röka kött i timmar på en pelletsgrill eller baka pizzor i en keramisk kamado — vi har rätt utrustning för dig.</p>
              <p>Alla modeller levereras med full service och vi hjälper dig välja rätt grill för ditt utomhuskök och livsstil.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="px-6 pb-24 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Vårt grillsortiment</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {subCategories.map((cat) => (
              <Link key={cat.href} href={cat.href}
                className={`group relative overflow-hidden rounded-2xl ${cat.color} aspect-[4/3] flex flex-col justify-end p-5 hover:opacity-90 transition-all`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative">
                  <h3 className="text-base font-bold text-white">{cat.title}</h3>
                  <p className="mt-1 text-xs text-white/60 leading-relaxed hidden sm:block">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20 bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-black text-slate-900">Osäker på vilken grill?</h2>
          <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto">Kontakta oss för personlig rådgivning. Vi hjälper dig hitta rätt grill för ditt utomhuskök och din livsstil.</p>
          <Link href="/kontakt" className="mt-8 inline-block rounded-full bg-slate-900 px-7 py-3 font-bold text-white hover:bg-slate-700 transition-all">
            Kontakta oss
          </Link>
        </div>
      </section>

    </main>
  );
}
