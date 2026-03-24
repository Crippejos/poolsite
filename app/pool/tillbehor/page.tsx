import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/app/Components/Breadcrumb";
import {
  bassangutrustning,
  cirkulation,
  poolkonstruktion,
  uppvarmning,
  vattenrening,
} from "@/lib/pahlenProducts";

export const metadata: Metadata = { title: "Tillbehör & Reservdelar | Elite Pool & Spa" };

const ATTRACTION_GROUPS = ["Jet Swim", "Massage", "Vattenfall & Kanoner"];
const LIGHTING_GROUPS   = ["Belysning Marine", "Belysning Classic", "Inbyggnadsdetaljer"];
const DOSING_GROUPS     = ["MiniMaster", "Autodos", "UV-rening", "Saltklorinatorer", "ASEKO"];

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
    bg: "bg-slate-100",
    tag: "Paket",
  },
  {
    label: "Rening och cirkulation",
    slug: "cirkulation",
    count: cirkulation.length,
    desc: "Sandfilter, pumpar, filtermedia och Besgo-ventiler från Pahlén för ett optimalt flödessystem i din pool.",
    bg: "bg-blue-50",
    tag: "Pahlén",
  },
  {
    label: "Vattenattraktioner",
    slug: "vattenattraktioner",
    count: bassangutrustning.filter(p => ATTRACTION_GROUPS.includes(p.group ?? "")).length,
    desc: "Jet Swim, massagemunstycken, vattenfall och kanoner — skapa rörelse och upplevelse i din pool.",
    bg: "bg-cyan-50",
    tag: "Pahlén",
  },
  {
    label: "Uppvärmning",
    slug: "uppvarmning",
    count: uppvarmning.length,
    desc: "Elpatroner, värmepumpar, Calidi-serien och sidokanalfläktar för effektiv uppvärmning av poolvatten.",
    bg: "bg-orange-50",
    tag: "Pahlén",
  },
  {
    label: "Belysning & inbyggnadsdetaljer",
    slug: "belysning",
    count: bassangutrustning.filter(p => LIGHTING_GROUPS.includes(p.group ?? "")).length,
    desc: "LED-armaturer i Classic och Marine-serien, skimmers, inlopp, bräddavlopp och övrig inbyggnadshårdvara.",
    bg: "bg-yellow-50",
    tag: "Pahlén",
  },
  {
    label: "Mät- & doserutrustning",
    slug: "mat-dosering",
    count: vattenrening.filter(p => DOSING_GROUPS.includes(p.group ?? "")).length,
    desc: "Autodos, MiniMaster, UV-anläggningar, elektroder och kompletta doseringssystem för kemikalier.",
    bg: "bg-purple-50",
    tag: "Pahlén",
  },
  {
    label: "Poolvård och testinstrument",
    slug: "poolvard",
    count: 0,
    desc: "Testutrustning, bottensugare, poolborstar, teleskopstänger och underhållsredskap för löpande skötsel.",
    bg: "bg-slate-50",
    tag: "Kommer snart",
  },
  {
    label: "Poolstommar",
    slug: "poolstommar",
    count: poolkonstruktion.length,
    desc: "Liner, SBM-stommar, PoolGuard, Aqua Roll, Isoblock, solfolie, trappor och rör för poolbygge.",
    bg: "bg-green-50",
    tag: "Pahlén",
  },
  {
    label: "Kemikalier",
    slug: "kemikalier",
    count: 0,
    desc: "Poolkemikalier för balanserat och rent vatten — klor, pH-justering, algicid och mer under hela säsongen.",
    bg: "bg-slate-50",
    tag: "Kommer snart",
  },
];

const totalProducts =
  cirkulation.length +
  bassangutrustning.length +
  uppvarmning.length +
  poolkonstruktion.length +
  vattenrening.length;

export default function PoolTillbehorPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="border-b border-slate-100 px-6 pt-10 pb-0 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <Breadcrumb crumbs={[{ label: "Pool", href: "/pool" }, { label: "Tillbehör & Reservdelar" }]} />
          </div>
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
