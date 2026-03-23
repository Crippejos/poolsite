import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import {
  bassangutrustning,
  cirkulation,
  poolkonstruktion,
  uppvarmning,
  vattenrening,
} from "@/lib/pahlenProducts";

export const metadata: Metadata = { title: "Produkter | Elite Pool & Spa" };

const komplettaCount = [
  ...cirkulation.filter(p => /^343/.test(p.sku)),
  ...uppvarmning.filter(p => /^344/.test(p.sku)),
].length;

const categories = [
  {
    label: "Kompletta poolpaket",
    slug: "kompletta-poolpaket",
    count: komplettaCount,
    desc: "Färdiga filtreringslösningar och värmepumpspaket — allt du behöver för en komplett poolinstallation på ett ställe.",
    tag: "Paket",
    bg: "bg-slate-100",
  },
  {
    label: "Rening och cirkulation",
    slug: "cirkulation",
    count: cirkulation.length,
    desc: "Sandfilter, pumpar, filtermedia och Besgo-ventiler från Pahlén för ett optimalt flödessystem i din pool.",
    tag: "Pahlén",
    bg: "bg-blue-50",
  },
  {
    label: "Vattenattraktioner",
    slug: "vattenattraktioner",
    count: bassangutrustning.length,
    desc: "Jet Swim, massagemunstycken, vattenfall och kanoner — skapa rörelse och upplevelse i din pool.",
    tag: "Pahlén",
    bg: "bg-cyan-50",
  },
  {
    label: "Uppvärmning",
    slug: "uppvarmning",
    count: uppvarmning.length,
    desc: "Elpatroner, värmepumpar, Calidi-serien och sidokanalfläktar för effektiv uppvärmning av poolvatten.",
    tag: "Pahlén",
    bg: "bg-orange-50",
  },
  {
    label: "Belysning & inbyggnadsdetaljer",
    slug: "belysning",
    count: bassangutrustning.length,
    desc: "LED-armaturer i Classic och Marine-serien, skimmers, inlopp, bräddavlopp och övrig inbyggnadshårdvara.",
    tag: "Pahlén",
    bg: "bg-yellow-50",
  },
  {
    label: "Mät- & doserutrustning",
    slug: "mat-dosering",
    count: vattenrening.length,
    desc: "Autodos, MiniMaster, UV-anläggningar, elektroder och kompletta doseringssystem för kemikalier.",
    tag: "Pahlén",
    bg: "bg-purple-50",
  },
  {
    label: "Poolvård och testinstrument",
    slug: "poolvard",
    count: 0,
    desc: "Testutrustning, bottensugare, poolborstar, teleskopstänger och underhållsredskap för löpande skötsel.",
    tag: "Kommer snart",
    bg: "bg-slate-50",
  },
  {
    label: "Poolstommar",
    slug: "poolstommar",
    count: poolkonstruktion.length,
    desc: "Liner, SBM-stommar, PoolGuard-duk, Aqua Roll upprullare och konstruktionsmaterial för poolbygge.",
    tag: "Pahlén",
    bg: "bg-green-50",
  },
  {
    label: "Kemikalier",
    slug: "kemikalier",
    count: 0,
    desc: "Poolkemikalier för balanserat och rent vatten — klor, pH-justering, algicid och mer under hela säsongen.",
    tag: "Kommer snart",
    bg: "bg-slate-50",
  },
];

export default function ProdukterPage() {
  const totalProducts =
    cirkulation.length +
    bassangutrustning.length +
    uppvarmning.length +
    poolkonstruktion.length +
    vattenrening.length;

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="border-b border-slate-100 px-6 pt-10 pb-0 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 flex items-center gap-1 text-xs text-slate-400">
            <Link href="/" className="hover:text-slate-700 transition-colors">Hem</Link>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="text-slate-700 font-medium">Produkter</span>
          </nav>
          <div className="flex items-end justify-between gap-4 pb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Elite Pool & Spa</p>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Alla produkter
              </h1>
              <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-lg">
                Originalreservdelar och tillbehör från Pahlén. Välj en kategori för att hitta rätt produkt.
              </p>
            </div>
            <div className="shrink-0 text-right hidden sm:block">
              <span className="text-[80px] sm:text-[100px] font-black leading-none text-slate-100 select-none tabular-nums">
                {String(totalProducts).padStart(3, "0")}
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-300 -mt-2">artiklar</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category cards ── */}
      <section className="px-6 py-14 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(c => (
            <div key={c.slug} className="group flex flex-col rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">

              {/* Image placeholder */}
              <div className={`relative w-full aspect-[4/3] ${c.bg} flex items-center justify-center`}>
                <div className="flex flex-col items-center gap-2 opacity-30">
                  <div className="w-16 h-16 rounded-full bg-slate-300" />
                  <div className="w-24 h-2 rounded-full bg-slate-300" />
                  <div className="w-16 h-2 rounded-full bg-slate-300" />
                </div>
                {/* Tag badge */}
                <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 shadow-sm">
                  {c.tag}
                </span>
                {c.count > 0 && (
                  <span className="absolute top-3 right-3 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold text-white">
                    {c.count} art.
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5">
                <h2 className="text-base font-black text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                  {c.label}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {c.desc}
                </p>

                {/* CTA */}
                <div className="mt-5">
                  {c.count > 0 ? (
                    <Link
                      href={`/pool/tillbehor/${c.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
                    >
                      Se produkter
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-400 cursor-default">
                      Kommer snart
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
