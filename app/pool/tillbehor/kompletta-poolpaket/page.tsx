import { Metadata } from "next";
import Breadcrumb from "@/app/Components/Breadcrumb";
import PoolpaketCard from "./PoolpaketCard";
import { poolpaket } from "@/lib/poolpaket";

export const metadata: Metadata = { title: "Kompletta poolpaket | Elite Pool & Spa" };

export default function KomplettaPoolpaketPage() {
  return (
    <main className="min-h-screen bg-white">

      <section className="border-b border-slate-100 px-6 pt-10 pb-0 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <Breadcrumb crumbs={[
              { label: "Pool", href: "/pool" },
              { label: "Tillbehör & Reservdelar", href: "/pool/tillbehor" },
              { label: "Kompletta poolpaket" },
            ]} />
          </div>
          <div className="flex items-end justify-between gap-4 pb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Pahlén · Elite Pool & Spa</p>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Kompletta poolpaket
              </h1>
              <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-lg">
                Allt du behöver för en färdig poolinstallation — stomme, värmepump, filtrering, belysning och dosering i ett paket.
              </p>
            </div>
            <div className="shrink-0 text-right hidden sm:block">
              <span className="text-[80px] sm:text-[100px] font-black leading-none text-slate-100 select-none tabular-nums">
                0{poolpaket.length}
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-300 -mt-2">paket</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl">
          {poolpaket.map(p => (
            <PoolpaketCard key={p.slug} paket={p} />
          ))}
        </div>
      </section>

    </main>
  );
}
