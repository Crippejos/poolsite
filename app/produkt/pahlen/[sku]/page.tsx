"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ShoppingCart, Zap, Check } from "lucide-react";
import { useCart } from "@/app/Components/CartContext";
import {
  bassangutrustning,
  cirkulation,
  poolkonstruktion,
  uppvarmning,
  vattenrening,
  type PahlenProduct,
} from "@/lib/pahlenProducts";
import { use } from "react";

type CategoryInfo = { label: string; slug: string };

const allPahlenProducts: Array<{ product: PahlenProduct; category: CategoryInfo }> = [
  ...bassangutrustning.map(p => ({ product: p, category: { label: "Bassängutrustning", slug: "bassangutrustning" } })),
  ...cirkulation.map(p =>      ({ product: p, category: { label: "Cirkulation",        slug: "cirkulation"       } })),
  ...poolkonstruktion.map(p => ({ product: p, category: { label: "Poolkonstruktion",   slug: "poolkonstruktion"  } })),
  ...uppvarmning.map(p =>      ({ product: p, category: { label: "Uppvärmning",        slug: "uppvarmning"       } })),
  ...vattenrening.map(p =>     ({ product: p, category: { label: "Vattenrening",       slug: "vattenrening"      } })),
];

function formatPrice(n: number | null) {
  if (n === null || n === 0) return null;
  return n.toLocaleString("sv-SE") + " kr";
}

export default function PahlenProductPage({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = use(params);
  const decoded = decodeURIComponent(sku);

  const match = allPahlenProducts.find(({ product }) => product.sku === decoded);
  if (!match) notFound();

  const { product, category } = match;
  const [added, setAdded] = useState(false);
  const { addItem, setOpen } = useCart();
  const formattedPrice = formatPrice(product.price);

  function handleAddToCart() {
    addItem({ name: product.name, sku: product.sku, price: product.price ?? 0, options: {} });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    addItem({ name: product.name, sku: product.sku, price: product.price ?? 0, options: {} });
    setOpen(true);
  }

  return (
    <main className="min-h-screen bg-white">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-slate-100 px-6 py-4 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl flex items-center gap-1 text-xs text-slate-400 flex-wrap">
          <Link href="/" className="hover:text-slate-700 transition-colors">Hem</Link>
          <span className="mx-1 opacity-40">/</span>
          <Link href="/pool/tillbehor" className="hover:text-slate-700 transition-colors">Tillbehör & Reservdelar</Link>
          <span className="mx-1 opacity-40">/</span>
          <Link href={`/pool/tillbehor/${category.slug}`} className="hover:text-slate-700 transition-colors">{category.label}</Link>
          <span className="mx-1 opacity-40">/</span>
          <span className="text-slate-700 font-medium">{product.name}</span>
        </div>
      </div>

      {/* ── Main section ── */}
      <section className="px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left: image placeholder */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#f2f2f2] flex items-center justify-center">
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at 35% 35%, #ffffff 0%, #e8e8e8 100%)" }}
              />
              <div className="relative flex flex-col items-center gap-3 text-center px-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70 shadow-sm">
                  <div className="h-7 w-7 rounded-full border-2 border-slate-300" />
                </div>
                <p className="text-xs text-slate-400 font-mono">{product.sku}</p>
              </div>
            </div>

            {/* Right: product info */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <Link
                  href={`/pool/tillbehor/${category.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors font-semibold uppercase tracking-widest"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> {category.label}
                </Link>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{product.sku}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4">{product.name}</h1>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Pahlén originalreservdel. Passar till Pahlén-anläggningar — kontakta oss om du är osäker på kompatibilitet.</p>

              {/* Price */}
              <div className="mb-8">
                {formattedPrice ? (
                  <div>
                    <span className="text-4xl font-black text-slate-900">{formattedPrice}</span>
                    <span className="text-sm text-slate-400 ml-2">inkl. moms</span>
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-slate-400">Pris på begäran — kontakta oss för offert</p>
                )}
              </div>

              {/* CTA */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={handleAddToCart}
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
                  "Pahlén originalreservdel",
                  "Artikelnummer: " + product.sku,
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

      {/* ── Specs ── */}
      <section className="border-t border-slate-100 px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-black text-slate-900 mb-8">Specifikationer</h2>
          <div className="rounded-2xl border border-slate-100 overflow-hidden">
            {[
              ["Artikelnummer", product.sku],
              ["Benämning", product.name],
              ["Kategori", category.label],
              ["Varumärke", "Pahlén"],
              ["Pris", formattedPrice ?? "På begäran"],
            ].map(([key, val], i) => (
              <div key={key} className={`grid grid-cols-2 px-6 py-4 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"} border-b border-slate-50 last:border-0`}>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{key}</span>
                <span className="text-sm text-slate-700">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Back to category ── */}
      <section className="border-t border-slate-100 px-6 py-12 sm:px-12 lg:px-20 bg-slate-900">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Pahlén Reservdelar</p>
            <p className="text-white font-black text-xl">Se fler produkter i {category.label}</p>
          </div>
          <Link
            href={`/pool/tillbehor/${category.slug}`}
            className="rounded-2xl bg-white px-7 py-3.5 text-sm font-black text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
          >
            Tillbaka till {category.label}
          </Link>
        </div>
      </section>

    </main>
  );
}
