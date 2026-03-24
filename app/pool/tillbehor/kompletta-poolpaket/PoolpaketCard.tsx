"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Zap, ArrowRight } from "lucide-react";
import { useCart } from "@/app/Components/CartContext";
import { type Poolpaket } from "@/lib/poolpaket";

function formatPrice(n: number) {
  return n.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " kr";
}

export default function PoolpaketCard({ paket }: { paket: Poolpaket }) {
  const [selected, setSelected] = useState(paket.variants[0]);
  const [added, setAdded] = useState(false);
  const { addItem, setOpen } = useCart();

  function handleAdd() {
    addItem({ name: `${paket.name} ${selected.label}`, sku: selected.sku, price: selected.price, options: { Storlek: selected.label } });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    addItem({ name: `${paket.name} ${selected.label}`, sku: selected.sku, price: selected.price, options: { Storlek: selected.label } });
    setOpen(true);
  }

  const isPremium = paket.tier === "Premium";

  return (
    <div className={`flex flex-col rounded-3xl overflow-hidden border ${isPremium ? "border-amber-200 bg-amber-50/40" : "border-slate-100 bg-white"} hover:shadow-xl transition-[box-shadow] duration-150`}>

      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={isPremium ? "/pool-premium.jpg" : "/pool-bas.jpg"}
          alt={paket.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm ${isPremium ? "bg-amber-900 text-amber-100" : "bg-slate-900 text-white"}`}>
          {paket.badge}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-slate-500 shadow-sm">
          {selected.items.length} artiklar ingår
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <h2 className="text-xl font-black text-slate-900 mb-1">{paket.name}</h2>
        <p className="text-xs text-slate-400 leading-relaxed mb-5">{paket.tagline}</p>

        {/* Size selector */}
        <div className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Välj storlek</p>
          <div className="flex gap-2">
            {paket.variants.map(v => (
              <button
                key={v.sku}
                onClick={() => setSelected(v)}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors duration-100 ${
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
        <div className="mb-6">
          <span className="text-3xl font-black text-slate-900">{formatPrice(selected.price)}</span>
          <span className="text-xs text-slate-400 ml-2">inkl. moms</span>
        </div>

        {/* CTAs */}
        <div className="space-y-2 mb-4">
          <button
            onClick={handleAdd}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-black transition-colors duration-100 ${
              added ? "bg-green-600 text-white" : "bg-slate-900 text-white hover:bg-slate-700"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            {added ? "Tillagd i varukorg!" : "Lägg i varukorg"}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 py-3 text-sm font-black text-slate-700 hover:bg-[#f5f5f5] transition-colors duration-100"
          >
            <Zap className="h-4 w-4" />
            Köp nu
          </button>
        </div>

        {/* Detail link */}
        <Link
          href={`/pool/tillbehor/kompletta-poolpaket/${paket.slug}?storlek=${encodeURIComponent(selected.label)}`}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors"
        >
          Visa ingående artiklar
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
