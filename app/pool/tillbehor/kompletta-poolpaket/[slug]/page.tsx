"use client";

import { use, useState, useEffect } from "react";
import { notFound, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Zap, Check } from "lucide-react";
import Breadcrumb from "@/app/Components/Breadcrumb";
import { useCart } from "@/app/Components/CartContext";
import { poolpaket } from "@/lib/poolpaket";

function formatPrice(n: number) {
  return n.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " kr";
}

export default function PoolpaketDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const paket = poolpaket.find(p => p.slug === slug);
  if (!paket) notFound();

  const initialLabel = searchParams.get("storlek");
  const initialVariant = paket.variants.find(v => v.label === initialLabel) ?? paket.variants[0];
  const [selected, setSelected] = useState(initialVariant);
  const [added, setAdded] = useState(false);
  const { addItem, setOpen } = useCart();

  useEffect(() => {
    const label = searchParams.get("storlek");
    const v = paket.variants.find(v => v.label === label);
    if (v) setSelected(v);
  }, [searchParams, paket.variants]);

  function handleAdd() {
    addItem({ name: `${paket!.name} ${selected.label}`, sku: selected.sku, price: selected.price, options: { Storlek: selected.label } });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    addItem({ name: `${paket!.name} ${selected.label}`, sku: selected.sku, price: selected.price, options: { Storlek: selected.label } });
    setOpen(true);
  }

  const isPremium = paket.tier === "Premium";

  return (
    <main className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="border-b border-slate-100 px-6 py-4 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb crumbs={[
            { label: "Pool", href: "/pool" },
            { label: "Tillbehör & Reservdelar", href: "/pool/tillbehor" },
            { label: "Kompletta poolpaket", href: "/pool/tillbehor/kompletta-poolpaket" },
            { label: paket.name },
          ]} />
        </div>
      </div>

      {/* Main */}
      <section className="px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left: image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <img
                src={isPremium ? "/pool-premium.jpg" : "/pool-bas.jpg"}
                alt={paket.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <span className={`absolute top-4 left-4 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest ${isPremium ? "bg-amber-900 text-amber-100" : "bg-slate-900 text-white"}`}>
                {paket.badge}
              </span>
            </div>

            {/* Right: product info */}
            <div className="flex flex-col">
              <div className="mb-2">
                <Link
                  href="/pool/tillbehor/kompletta-poolpaket"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors font-semibold uppercase tracking-widest"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Kompletta poolpaket
                </Link>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">
                {paket.name}
              </h1>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">{paket.tagline}</p>

              {/* Size selector */}
              <div className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Välj storlek</p>
                <div className="flex gap-2">
                  {paket.variants.map(v => (
                    <button
                      key={v.sku}
                      onClick={() => setSelected(v)}
                      className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                        selected.sku === v.sku
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-black text-slate-900">{formatPrice(selected.price)}</span>
                <span className="text-sm text-slate-400 ml-2">inkl. moms</span>
              </div>

              {/* CTAs */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={handleAdd}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black tracking-wide transition-all ${
                    added ? "bg-green-600 text-white" : "bg-slate-900 text-white hover:bg-slate-700"
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {added ? "Tillagd i varukorg!" : "Lägg i varukorg"}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 py-4 text-sm font-black tracking-wide text-slate-700 hover:bg-[#f5f5f5] transition-all"
                >
                  <Zap className="h-4 w-4" />
                  Köp nu
                </button>
              </div>

              {/* Key facts */}
              <ul className="space-y-2">
                {[
                  `${selected.items.length} artiklar ingår i paketet`,
                  "Komplett med stomme, värmepump, filtrering och belysning",
                  "Kontakta oss för installation och monteringshjälp",
                ].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <Check className="h-4 w-4 text-slate-400 shrink-0" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Article list — changes with selected variant */}
      <section className="border-t border-slate-100 px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Ingående artiklar</p>
              <h2 className="text-2xl font-black text-slate-900">
                {paket.name} — {selected.label}
              </h2>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500">
              {selected.items.length} artiklar
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[140px_1fr] bg-slate-50 border-b border-slate-100 px-6 py-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Art. nr.</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Benämning</span>
            </div>
            {selected.items.map((item, i) => (
              <div
                key={item.sku + i}
                className={`grid grid-cols-[140px_1fr] px-6 py-4 border-b border-slate-50 last:border-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                }`}
              >
                <span className="font-mono text-xs text-slate-400">{item.sku}</span>
                <span className="text-sm text-slate-700">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back bar */}
      <section className="border-t border-slate-100 px-6 py-12 sm:px-12 lg:px-20 bg-slate-900">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Elite Pool & Spa</p>
            <p className="text-white font-black text-xl">Se alla kompletta poolpaket</p>
          </div>
          <Link
            href="/pool/tillbehor/kompletta-poolpaket"
            className="rounded-2xl bg-white px-7 py-3.5 text-sm font-black text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
          >
            Tillbaka till paket
          </Link>
        </div>
      </section>

    </main>
  );
}
