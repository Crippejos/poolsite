"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import ProductCard from "./ProductCard";
import { type PahlenProduct } from "@/lib/pahlenProducts";

export default function ProductSearch({ products }: { products: PahlenProduct[] }) {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const groups = useMemo(() => {
    const seen = new Set<string>();
    for (const p of products) if (p.group) seen.add(p.group);
    return Array.from(seen);
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = activeGroup ? products.filter(p => p.group === activeGroup) : products;
    if (!q) return result;
    return result.filter(
      p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
    );
  }, [query, activeGroup, products]);

  return (
    <>
      {groups.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveGroup(null)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              activeGroup === null
                ? "bg-slate-900 text-white"
                : "border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700"
            }`}
          >
            Alla
          </button>
          {groups.map(g => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                activeGroup === g
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      )}
      <div className="relative mb-8 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Sök på namn eller artikelnr..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
          >
            Rensa
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-[#f5f5f5] py-24 text-center">
          <p className="text-sm font-semibold text-slate-500">Inga produkter matchar &ldquo;{query}&rdquo;</p>
          <button onClick={() => setQuery("")} className="mt-4 text-xs text-slate-400 underline underline-offset-2">
            Rensa sökning
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(p => (
              <ProductCard
                key={p.sku}
                sku={p.sku}
                name={p.name}
                description="Pahlén originalreservdel"
                price={p.price ?? 0}
                href={`/produkt/pahlen/${encodeURIComponent(p.sku)}`}
                options={p.variants ? [{ label: "Modell", values: p.variants.map(v => v.label) }] : []}
                pricing={p.variants ? { optionLabel: "Modell", map: Object.fromEntries(p.variants.map(v => [v.label, v.price])) } : undefined}
              />
            ))}
          </div>
          {query && (
            <p className="mt-4 text-xs text-slate-400">
              {filtered.length} av {products.length} artiklar visas
            </p>
          )}
        </>
      )}
    </>
  );
}
