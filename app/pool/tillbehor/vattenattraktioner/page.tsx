import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/app/Components/Breadcrumb";
import { bassangutrustning } from "@/lib/pahlenProducts";

export const metadata: Metadata = { title: "Vattenattraktioner | Elite Pool & Spa" };

const jetMassageCount   = bassangutrustning.filter(p => p.group === "Massage").length;
const jetSwimCount      = bassangutrustning.filter(p => p.group === "Jet Swim").length;
const vattenfallCount   = bassangutrustning.filter(p => p.group === "Vattenfall & Kanoner").length;

const subcategories = [
  {
    label: "Jet Massage",
    slug: "jet-massage",
    count: jetMassageCount,
    desc: "Massagemunstycken i Classic och Marine-utförande — Soft, Medium och kompletta Jet Massage-paket med pump.",
    bg: "bg-blue-50",
    tag: "Pahlén",
  },
  {
    label: "Jet Swim",
    slug: "jet-swim",
    count: jetSwimCount,
    desc: "Motion- och Athlete-serien för motionssimning i pooler. Kompletta paket med pump, grundsats och styrbox.",
    bg: "bg-cyan-50",
    tag: "Pahlén",
  },
  {
    label: "Vattenfall och Vattenkanoner",
    slug: "vattenfall-och-vattenkanoner",
    count: vattenfallCount,
    desc: "Vattenfall 300 och 500 samt Vattenkanon 109 i fyra munstyckesvarianter — bred, stril, stråle och platt.",
    bg: "bg-teal-50",
    tag: "Pahlén",
  },
];

export default function VattenattraktionerPage() {
  const total = jetMassageCount + jetSwimCount + vattenfallCount;

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="border-b border-slate-100 px-6 pt-10 pb-0 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <Breadcrumb crumbs={[
              { label: "Pool", href: "/pool" },
              { label: "Tillbehör & Reservdelar", href: "/pool/tillbehor" },
              { label: "Vattenattraktioner" },
            ]} />
          </div>
          <div className="flex items-end justify-between gap-4 pb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Pahlén</p>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Vattenattraktioner
              </h1>
              <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-lg">
                Jet Massage, Jet Swim, vattenfall och vattenkanoner från Pahlén — skapa rörelse och upplevelse i din pool.
              </p>
            </div>
            <div className="shrink-0 text-right hidden sm:block">
              <span className="text-[80px] sm:text-[100px] font-black leading-none text-slate-100 select-none tabular-nums">
                {String(total).padStart(2, "0")}
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-300 -mt-2">artiklar</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subcategory cards ── */}
      <section className="px-6 py-14 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
          {subcategories.map(c => (
            <div key={c.slug} className="group flex flex-col rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`relative w-full aspect-[4/3] ${c.bg} flex items-center justify-center`}>
                <div className="flex flex-col items-center gap-2 opacity-30">
                  <div className="w-16 h-16 rounded-full bg-slate-300" />
                  <div className="w-24 h-2 rounded-full bg-slate-300" />
                  <div className="w-16 h-2 rounded-full bg-slate-300" />
                </div>
                <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 shadow-sm">
                  {c.tag}
                </span>
                <span className="absolute top-3 right-3 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold text-white">
                  {c.count} art.
                </span>
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h2 className="text-base font-black text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                  {c.label}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{c.desc}</p>
                <div className="mt-5">
                  <Link
                    href={`/pool/tillbehor/vattenattraktioner/${c.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
                  >
                    Se produkter
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
