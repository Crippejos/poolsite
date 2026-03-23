import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { bassangutrustning, cirkulation, poolkonstruktion, uppvarmning, vattenrening } from "@/lib/pahlenProducts";

export const metadata: Metadata = { title: "Tillbehör & Reservdelar | Elite Pool & Spa" };

const categories = [
  { label: "Bassängutrustning", slug: "bassangutrustning", count: bassangutrustning.length, desc: "Skimmers, munstycken, belysning, Jet Swim och tillbehör." },
  { label: "Cirkulation",       slug: "cirkulation",       count: cirkulation.length,       desc: "Filter, pumpar, pumphus, motorer och ventiler." },
  { label: "Poolkonstruktion",  slug: "poolkonstruktion",  count: poolkonstruktion.length,  desc: "Poolduk, upprullning, vajrar, PoolGuard och Aqua Roll." },
  { label: "Uppvärmning",       slug: "uppvarmning",       count: uppvarmning.length,       desc: "Elpatroner, värmepumpar, styrkort och kompressorer." },
  { label: "Vattenrening",      slug: "vattenrening",      count: vattenrening.length,      desc: "UV-anläggningar, doseringssystem, elektroder och poolrobotar." },
];

export default function PoolTillbehorPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-100 px-6 pt-10 pb-0 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 flex items-center gap-1 text-xs text-slate-400">
            <Link href="/" className="hover:text-slate-700 transition-colors">Hem</Link>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <Link href="/pool" className="hover:text-slate-700 transition-colors">Pool</Link>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="text-slate-700 font-medium">Tillbehör & Reservdelar</span>
          </nav>
          <div className="flex items-end justify-between gap-4 pb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Pahlén</p>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Tillbehör &amp;<br />Reservdelar
              </h1>
              <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-lg">
                Originalreservdelar och tillbehör från Pahlén — välj en kategori nedan.
              </p>
            </div>
            <div className="shrink-0 text-right hidden sm:block">
              <span className="text-[80px] sm:text-[100px] font-black leading-none text-slate-100 select-none tabular-nums">
                {String(categories.length).padStart(2, "0")}
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-300 -mt-2">kategorier</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(c => (
            <Link
              key={c.slug}
              href={`/pool/tillbehor/${c.slug}`}
              className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow group"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{c.count} artiklar</p>
              <h2 className="text-lg font-black text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">{c.label}</h2>
              <p className="text-sm text-slate-500 leading-relaxed">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
