"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./CartContext";

function formatPrice(n: number) {
  return n.toLocaleString("sv-SE") + " kr";
}

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, subtotal, count, clearCart, checkoutUrl } = useCart();

  const hasPriceOnRequest = items.some((i) => i.price === 0);
  const allPriced = items.length > 0 && items.every((i) => i.price > 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-slate-700" />
            <h2 className="text-sm font-bold text-slate-900">Varukorg</h2>
            {count > 0 && (
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-[#f5f5f5] hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-slate-300" />
              </div>
              <p className="text-sm font-bold text-slate-500">Din varukorg är tom</p>
              <p className="mt-1 text-xs text-slate-400">Lägg till produkter för att komma igång.</p>
              <button
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full border border-slate-200 px-5 py-2 text-xs font-semibold text-slate-600 hover:bg-[#f5f5f5] transition-colors"
              >
                Fortsätt handla
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f5]">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-6 w-6 rounded-full border-2 border-slate-200" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col min-w-0 gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-mono text-[9px] tracking-widest text-slate-400 uppercase">{item.sku}</p>
                        <p className="text-xs font-bold text-slate-900 leading-snug">{item.name}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 rounded p-0.5 text-slate-300 hover:text-red-400 transition-colors"
                        aria-label="Ta bort"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Selected options */}
                    {Object.keys(item.options).length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(item.options).map(([k, v]) => (
                          <span
                            key={k}
                            className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price + qty */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900">
                        {item.price > 0
                          ? formatPrice(item.price * item.quantity)
                          : "Pris på begäran"}
                      </span>
                      <div className="flex items-center gap-1 rounded-lg border border-slate-200 p-0.5">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-md text-slate-600 hover:bg-[#f5f5f5] transition-colors"
                          aria-label="Minska antal"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-md text-slate-600 hover:bg-[#f5f5f5] transition-colors"
                          aria-label="Öka antal"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 px-6 py-5 space-y-4 shrink-0">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Delsumma</span>
              <span className="text-base font-black text-slate-900">
                {allPriced ? formatPrice(subtotal) : hasPriceOnRequest ? "Inkl. produkter på offert" : formatPrice(subtotal)}
              </span>
            </div>

            {/* Primary CTA */}
            <div className="space-y-2">
              {hasPriceOnRequest || !checkoutUrl ? (
                <Link
                  href="/kontakt"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-700 transition-all"
                >
                  {hasPriceOnRequest ? "Begär offert" : "Gå till kassan"}
                </Link>
              ) : (
                <a
                  href={checkoutUrl}
                  className="flex w-full items-center justify-center rounded-full bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-700 transition-all"
                >
                  Gå till kassan
                </a>
              )}
              <button
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full border border-slate-200 py-3 text-sm font-semibold text-slate-600 hover:bg-[#f5f5f5] transition-all"
              >
                Fortsätt handla
              </button>
            </div>

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="flex w-full items-center justify-center gap-1.5 text-xs text-slate-300 hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              Töm varukorg
            </button>
          </div>
        )}
      </div>
    </>
  );
}
