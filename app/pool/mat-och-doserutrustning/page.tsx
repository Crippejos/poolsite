import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/app/Components/Breadcrumb";
import { vattenrening } from "@/lib/pahlenProducts";

export const metadata: Metadata = { title: "Mät- & doserutrustning | Elite Pool & Spa" };

const co2Products = vattenrening.filter(p => p.group === "CO2");
const doseringProducts = vattenrening.filter(p => p.group === "ASEKO" || p.group === "MiniMaster" || p.group === "Autodos");
const uvProducts = vattenrening.filter(p => p.group === "UV-rening");

const subcategories = [
  {
    label: "CO2 & pH-reglering",
    slug: "co2-ph-reglering",
    count: co2Products.length,
    desc: "pH-MaxiDos och pH-MiniDos — automatisk CO2-dosering för exakt pH-kontroll utan kemikalier.",
    bg: "bg-green-50",
    tag: "Pahlén",
  },
  {
    label: "Dosering & vattenanalys",
    slug: "dosering",
    count: doseringProducts.length,
    desc: "ASEKO ASIN Aqua-serien, MiniMaster och Autodos — intelligenta system för automatisk kemikaliedosering och realtidsövervakning.",
    bg: "bg-blue-50",
    tag: "Pahlén / ASEKO",
  },
  {
    label: "UV-rening",
    slug: "uv-rening",
    count: uvProducts.length,
    desc: "UV Premium, UV Bas och Puriq Bright — UV-anläggningar som desinficerar poolvatten utan kemikalier.",
    bg: "bg-yellow-50",
    tag: "Pahlén",
  },
];

export default function MatDoseringPage() {
  const total = co2Products.length + doseringProducts.length + uvProducts.length;

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="border-b border-slate-100 px-6 pt-10 pb-0 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <Breadcrumb crumbs={[
              { label: "Pool", href: "/pool" },
              { label: "Mät- & doserutrustning" },
            ]} />
          </div>
          <div className="flex items-end justify-between gap-4 pb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Pahlén · ASEKO</p>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Mät- &amp; doserutrustning
              </h1>
              <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-lg">
                Automatisk dosering, pH-reglering och UV-rening från Pahlén och ASEKO. Håll poolens vattenkvalitet optimal — dygnet runt, utan manuellt arbete.
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
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                {c.count > 0 && (
                  <span className="absolute top-3 right-3 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold text-white">
                    {c.count} art.
                  </span>
                )}
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h2 className="text-base font-black text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                  {c.label}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{c.desc}</p>
                <div className="mt-5">
                  <Link
                    href={`/pool/mat-och-doserutrustning/${c.slug}`}
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
