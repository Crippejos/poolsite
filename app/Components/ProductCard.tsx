"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Zap } from "lucide-react";
import { useCart } from "./CartContext";

type Option = { label: string; values: string[] };

type Pricing = {
  optionLabel: string;
  map: Record<string, number>;
};

type Props = {
  name: string;
  description: string;
  price: number;
  sku?: string;
  href?: string;
  images?: string[];
  options?: Option[];
  pricing?: Pricing;
};

function formatPrice(n: number) {
  return n.toLocaleString("sv-SE") + " kr";
}

export default function ProductCard({
  name,
  description,
  price,
  sku = "",
  href,
  images = [],
  options = [],
  pricing,
}: Props) {
  const [imgIndex, setImgIndex] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(options.map((o) => [o.label, o.values[0]]))
  );
  const [added, setAdded] = useState(false);
  const { addItem, setOpen } = useCart();

  const displayPrice = pricing
    ? (pricing.map[selected[pricing.optionLabel]] ?? price)
    : price;

  function handleAddToCart() {
    addItem({ name, sku, price: displayPrice, image: images[0], options: selected });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    addItem({ name, sku, price: displayPrice, image: images[0], options: selected });
    setOpen(true);
  }

  const hasImages = images.length > 0;
  const multi = images.length > 1;

  function prev(e: React.MouseEvent) {
    e.preventDefault();
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  }
  function next(e: React.MouseEvent) {
    e.preventDefault();
    setImgIndex((i) => (i + 1) % images.length);
  }

  // Image area — wrapped in Link if href is provided
  const imageInner = (
    <>
      {hasImages ? (
        images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-300 ${
              i === imgIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image src={src} alt={`${name} — bild ${i + 1}`} fill className="object-cover" />
          </div>
        ))
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 35% 35%, #ffffff 0%, #e8e8e8 100%)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/70 shadow-sm">
              <div className="h-6 w-6 rounded-full border-2 border-slate-300" />
            </div>
          </div>
        </>
      )}

      {multi && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
            aria-label="Föregående bild"
          >
            <ChevronLeft className="h-4 w-4 text-slate-700" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
            aria-label="Nästa bild"
          >
            <ChevronRight className="h-4 w-4 text-slate-700" />
          </button>
        </>
      )}

      {multi && (
        <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); setImgIndex(i); }}
              className={`rounded-full transition-all duration-200 ${
                i === imgIndex ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Bild ${i + 1}`}
            />
          ))}
        </div>
      )}

      {multi && (
        <div className="absolute top-2.5 right-2.5 z-10 rounded-full bg-black/30 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-white">
          {imgIndex + 1}/{images.length}
        </div>
      )}

      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300 pointer-events-none" />
    </>
  );

  return (
    <div className="group flex flex-col rounded-2xl bg-white border border-slate-100 overflow-hidden hover:shadow-lg hover:border-slate-200 transition-[box-shadow,border-color] duration-150">

      {/* ── Image carousel ── */}
      {href ? (
        <Link href={href} className="relative block aspect-square overflow-hidden bg-[#f2f2f2]">
          {imageInner}
        </Link>
      ) : (
        <div className="relative aspect-square overflow-hidden bg-[#f2f2f2]">
          {imageInner}
        </div>
      )}

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col p-5 gap-3">

        {/* SKU + name */}
        <div>
          {sku && (
            <p className="font-mono text-[10px] tracking-widest text-slate-400 uppercase mb-1">{sku}</p>
          )}
          <h3 className="text-sm font-bold text-slate-900 leading-snug">{name}</h3>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{description}</p>

        {/* Options */}
        {options.length > 0 && (
          <div className="space-y-3 border-t border-slate-100 pt-3">
            {options.map((opt) => (
              <div key={opt.label}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  {opt.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {opt.values.map((val) => (
                    <button
                      key={val}
                      onClick={() => setSelected((s) => ({ ...s, [opt.label]: val }))}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors duration-100 ${
                        selected[opt.label] === val
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700"
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

        {/* Price + CTA */}
        <div className="pt-3 border-t border-slate-100 space-y-2 mt-auto">
          <div className="flex items-center justify-between">
            {displayPrice > 0 ? (
              <span className="text-base font-black text-slate-900">{formatPrice(displayPrice)}</span>
            ) : (
              <span className="text-xs font-semibold text-slate-400">Pris på begäran</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-colors duration-100 ${
              added
                ? "bg-green-600 text-white"
                : "bg-slate-900 text-white hover:bg-slate-700"
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {added ? "Tillagd i varukorg!" : "Lägg i varukorg"}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700 hover:bg-[#f5f5f5] transition-colors duration-100"
          >
            <Zap className="h-3.5 w-3.5" />
            Köp nu
          </button>
        </div>

      </div>
    </div>
  );
}
