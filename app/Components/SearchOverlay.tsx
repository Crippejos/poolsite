"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Tag, LayoutGrid, FileText } from "lucide-react";
import { searchItems, type SearchItem } from "@/lib/searchData";

const CATEGORY_COLORS: Record<string, string> = {
  Pool:   "bg-slate-200 text-slate-700",
  Spabad: "bg-stone-200 text-stone-700",
  Bastu:  "bg-amber-100 text-amber-700",
  Sida:   "bg-zinc-100 text-zinc-600",
};

const TYPE_ICONS = {
  product:  Tag,
  category: LayoutGrid,
  page:     FileText,
};

const QUICK_LINKS: { label: string; href: string; cat: string }[] = [
  { label: "Pool",         href: "/pool",         cat: "Pool"   },
  { label: "Thermoblock",  href: "/pool/thermoblock", cat: "Pool" },
  { label: "Spabad",       href: "/spabad",        cat: "Spabad" },
  { label: "Black Edition",href: "/spabad/black-edition", cat: "Spabad" },
  { label: "Swimspa",      href: "/spabad/swimspa", cat: "Spabad" },
  { label: "Bastu",        href: "/bastu",         cat: "Bastu"  },
];

function formatPrice(price: number) {
  return price.toLocaleString("sv-SE") + " kr";
}

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery]     = useState("");
  const [active, setActive]   = useState(0);
  const inputRef              = useRef<HTMLInputElement>(null);
  const listRef               = useRef<HTMLUListElement>(null);
  const router                = useRouter();

  const results = searchItems(query);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Keyboard: Esc, Arrow Up/Down, Enter
  useEffect(() => {
    if (!open) return;
    function handle(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (results.length === 0) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      if (e.key === "Enter")     { e.preventDefault(); navigate(results[active]); }
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open, results, active]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  // Reset active index when results change
  useEffect(() => { setActive(0); }, [query]);

  function navigate(item: SearchItem) {
    router.push(item.href);
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <Search className="h-5 w-5 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sök produkter, artikelnummer, kategorier..."
            className="flex-1 bg-transparent text-base text-slate-900 placeholder:text-slate-400 outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-400 font-mono">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === "" ? (
            // Empty state — quick links
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 px-2">Snabblänkar</p>
              <ul>
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => { router.push(link.href); onClose(); }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                    >
                      <LayoutGrid className="h-4 w-4 shrink-0 text-slate-400" />
                      <span className="flex-1">{link.label}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[link.cat] ?? "bg-slate-100 text-slate-500"}`}>
                        {link.cat}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : results.length === 0 ? (
            // No results
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <p className="font-semibold text-slate-900">Inga resultat för &ldquo;{query}&rdquo;</p>
              <p className="mt-1 text-sm text-slate-400">Prova ett annat sökord eller bläddra i kategorierna.</p>
            </div>
          ) : (
            // Results list
            <ul ref={listRef} className="p-2">
              {results.map((item, i) => {
                const Icon = TYPE_ICONS[item.type];
                const isActive = i === active;
                return (
                  <li key={item.id}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => navigate(item)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                        isActive ? "bg-slate-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900 truncate">{item.name}</span>
                          {item.sku && (
                            <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-500">
                              {item.sku}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{item.description}</p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[item.category] ?? "bg-slate-100 text-slate-500"}`}>
                          {item.category}
                        </span>
                        {item.price > 0 && (
                          <span className="text-xs font-semibold text-slate-700 hidden sm:block">
                            {formatPrice(item.price)}
                          </span>
                        )}
                        {isActive && <ArrowRight className="h-3.5 w-3.5 text-slate-400" />}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        {results.length > 0 && (
          <div className="border-t border-slate-100 px-5 py-2.5 flex items-center gap-4">
            <span className="text-xs text-slate-400">
              <kbd className="font-mono">↑↓</kbd> navigera
            </span>
            <span className="text-xs text-slate-400">
              <kbd className="font-mono">↵</kbd> öppna
            </span>
            <span className="text-xs text-slate-400">
              <kbd className="font-mono">esc</kbd> stäng
            </span>
            <span className="ml-auto text-xs text-slate-400">{results.length} resultat</span>
          </div>
        )}
      </div>
    </div>
  );
}
