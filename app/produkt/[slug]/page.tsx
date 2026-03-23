"use client";

import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Zap, ArrowLeft, Check } from "lucide-react";
import { useCart } from "@/app/Components/CartContext";
import allProducts from "@/lib/allProducts";
import { use } from "react";

function formatPrice(n: number) {
  return n.toLocaleString("sv-SE") + " kr";
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = allProducts.find(p => p.slug === slug);

  if (!product) notFound();

  const {
    name, sku, description, longDescription, price, images = [],
    options = [], pricing, features = [], specs = {},
    category, categoryHref,
  } = product;

  const [imgIndex, setImgIndex] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>(
    () => Object.fromEntries(options.map(o => [o.label, o.values[0]]))
  );
  const [added, setAdded] = useState(false);
  const { addItem, setOpen } = useCart();

  const displayPrice = pricing
    ? (pricing.map[selected[pricing.optionLabel]] ?? price)
    : price;

  function handleAddToCart() {
    addItem({ name, sku, price: displayPrice, image: images[0], options: selected });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    addItem({ name, sku, price: displayPrice, image: images[0], options: selected });
    setOpen(true);
  }

  const hasImages = images.length > 0;
  const multi = images.length > 1;

  return (
    <main className="min-h-screen bg-white">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-slate-100 px-6 py-4 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl flex items-center gap-1 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-700 transition-colors">Hem</Link>
          <span className="mx-1 opacity-40">/</span>
          <Link href={categoryHref} className="hover:text-slate-700 transition-colors">{category}</Link>
          <span className="mx-1 opacity-40">/</span>
          <span className="text-slate-700 font-medium">{name}</span>
        </div>
      </div>

      {/* ── Main product section ── */}
      <section className="px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left: image gallery */}
            <div className="space-y-4">
              {/* Main image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#f2f2f2] group">
                {hasImages ? (
                  images.map((src, i) => (
                    <div
                      key={src}
                      className={`absolute inset-0 transition-opacity duration-300 ${i === imgIndex ? "opacity-100" : "opacity-0"}`}
                    >
                      <Image src={src} alt={`${name} — bild ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))
                ) : (
                  <>
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 35% 35%, #ffffff 0%, #e8e8e8 100%)" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/70 shadow-sm">
                        <div className="h-8 w-8 rounded-full border-2 border-slate-300" />
                      </div>
                    </div>
                  </>
                )}

                {multi && (
                  <>
                    <button
                      onClick={() => setImgIndex(i => (i - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="h-5 w-5 text-slate-700" />
                    </button>
                    <button
                      onClick={() => setImgIndex(i => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="h-5 w-5 text-slate-700" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {multi && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setImgIndex(i)}
                      className={`relative flex-shrink-0 h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                        i === imgIndex ? "border-slate-900" : "border-transparent hover:border-slate-300"
                      }`}
                    >
                      <Image src={src} alt={`Miniatyr ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: product info */}
            <div className="flex flex-col">
              {/* Badge + back link */}
              <div className="flex items-center justify-between mb-4">
                <Link href={categoryHref} className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors font-semibold uppercase tracking-widest">
                  <ArrowLeft className="h-3.5 w-3.5" /> {category}
                </Link>
                {sku && <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{sku}</span>}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4">{name}</h1>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{description}</p>

              {/* Price */}
              <div className="mb-6">
                {displayPrice > 0 ? (
                  <div>
                    <span className="text-4xl font-black text-slate-900">{formatPrice(displayPrice)}</span>
                    <span className="text-sm text-slate-400 ml-2">inkl. moms</span>
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-slate-400">Pris på begäran — kontakta oss för offert</p>
                )}
              </div>

              {/* Options */}
              {options.length > 0 && (
                <div className="space-y-5 mb-8 pb-8 border-b border-slate-100">
                  {options.map(opt => (
                    <div key={opt.label}>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5">{opt.label}</p>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.map(val => (
                          <button
                            key={val}
                            onClick={() => setSelected(s => ({ ...s, [opt.label]: val }))}
                            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                              selected[opt.label] === val
                                ? "bg-slate-900 text-white"
                                : "border border-slate-200 text-slate-600 hover:border-slate-400"
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA buttons */}
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

              {/* Features quick list */}
              {features.length > 0 && (
                <ul className="space-y-2">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-slate-400 shrink-0" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Extended description ── */}
      {longDescription && (
        <section className="border-t border-slate-100 px-6 py-16 sm:px-12 lg:px-20 bg-[#f5f5f5]">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Om produkten</h2>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{longDescription}</p>
          </div>
        </section>
      )}

      {/* ── Specs table ── */}
      {Object.keys(specs).length > 0 && (
        <section className="border-t border-slate-100 px-6 py-16 sm:px-12 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Specifikationer</h2>
            <div className="rounded-2xl border border-slate-100 overflow-hidden">
              {Object.entries(specs).map(([key, val], i) => (
                <div key={key} className={`grid grid-cols-2 px-6 py-4 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"} border-b border-slate-50 last:border-0`}>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{key}</span>
                  <span className="text-sm text-slate-700">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back to category CTA ── */}
      <section className="border-t border-slate-100 px-6 py-12 sm:px-12 lg:px-20 bg-slate-900">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{category}</p>
            <p className="text-white font-black text-xl">Se fler produkter i samma kategori</p>
          </div>
          <Link
            href={categoryHref}
            className="rounded-2xl bg-white px-7 py-3.5 text-sm font-black text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
          >
            Tillbaka till {category}
          </Link>
        </div>
      </section>

    </main>
  );
}
