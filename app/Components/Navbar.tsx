"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X, Search, ShoppingCart } from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import { useCart } from "./CartContext";

const poolLinks = [
  { label: "Alla pooler", href: "/pool" },
  { label: "Thermoblock", href: "/pool/thermoblock" },
  { label: "Gjuten stomme", href: "/pool/gjuten-stomme" },
  { label: "Rostfri stomme", href: "/pool/rostfri-stomme" },
  { label: "Poolöverdrag", href: "/pool/pooloverdrag", children: [
    { label: "Pooltak", href: "/pool/pooloverdrag/pooltak" },
    { label: "Lamell", href: "/pool/pooloverdrag/lamell" },
  ]},
  { label: "Liner", href: "/pool/liner", children: [
    { label: "Standardmått", href: "/pool/liner/standardmatt" },
    { label: "Svetsad liner", href: "/pool/liner/svetsad-liner" },
  ]},
];

const spadbadLinks = [
  { label: "Alla spabadkar", href: "/spabad" },
  { label: "Black Edition", href: "/spabad/black-edition" },
  { label: "Swimspa", href: "/spabad/swimspa" },
  { label: "Vildmarksspa", href: "/spabad/vildmarksspa" },
  { label: "Family Spa", href: "/spabad/family-spa" },
  { label: "Tillbehör", href: "/spabad/tillbehor" },
];

const grillarLinks = [
  { label: "Alla grillar", href: "/grillar" },
  { label: "Kolgrillar",   href: "/grillar/kolgrillar" },
  { label: "Gasolgrillar", href: "/grillar/gasolgrillar" },
  { label: "Kamado",       href: "/grillar/kamado" },
  { label: "Utekök",       href: "/grillar/utekök" },
  { label: "Pelletsrök",   href: "/grillar/pellets" },
];

const tjansterLinks = [
  { label: "Alla tjänster",         href: "/tjanster" },
  { label: "Helentreprenad",        href: "/helentreprenad" },
  { label: "Poolbyggnation",        href: "/pool" },
  { label: "Service & underhåll",   href: "/kontakt" },
  { label: "Renovering",            href: "/kontakt" },
  { label: "Projektering & design", href: "/kontakt" },
];

type DropdownItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

function Dropdown({ items, onClose }: { label: string; items: DropdownItem[]; onClose: () => void }) {
  const pathname = usePathname();
  return (
    <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl border border-slate-100 bg-white shadow-xl z-50 overflow-hidden py-1">
      {items.map((item) => (
        <div key={item.href}>
          <Link href={item.href} onClick={onClose}
            className={`flex items-center px-4 py-2.5 text-sm transition-colors hover:bg-[#f5f5f5] ${pathname === item.href ? "text-slate-900 font-semibold" : "text-slate-600"}`}>
            {item.label}
          </Link>
          {item.children && (
            <div className="border-t border-slate-50">
              {item.children.map((child) => (
                <Link key={child.href} href={child.href} onClick={onClose}
                  className={`block pl-7 pr-4 py-2 text-sm transition-colors hover:bg-[#f5f5f5] ${pathname === child.href ? "text-slate-900 font-semibold" : "text-slate-400"}`}>
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function DropdownTrigger({ label, href, items }: { label: string; href: string; items: DropdownItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-0.5 px-3 py-2 text-sm transition-colors ${isActive ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-900"}`}>
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Invisible bridge to prevent gap closing dropdown */}
      {open && <div className="absolute top-full left-0 w-full h-2" />}
      {open && <Dropdown label={label} items={items} onClose={() => setOpen(false)} />}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePool, setMobilePool] = useState(false);
  const [mobileSpabad, setMobileSpabad] = useState(false);
  const [mobileGrillar, setMobileGrillar] = useState(false);
  const [mobileTjanster, setMobileTjanster] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { count: cartCount, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    setMobileOpen(false);
    setMobilePool(false);
    setMobileSpabad(false);
    setMobileGrillar(false);
    setMobileTjanster(false);
  }, [pathname]);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  return (
    <>
    <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100">
      <div className="flex h-14 w-full items-center justify-between px-6 lg:px-12">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-white opacity-80" />
          </div>
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className={`relative px-3 py-2 text-sm transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-slate-900 after:transition-opacity ${pathname === "/" ? "text-slate-900 font-semibold after:opacity-100" : "text-slate-500 hover:text-slate-900 after:opacity-0"}`}>
            Hem
          </Link>
          <DropdownTrigger label="Pool" href="/pool" items={poolLinks} />
          <DropdownTrigger label="Spabad" href="/spabad" items={spadbadLinks} />
          <DropdownTrigger label="Grillar" href="/grillar" items={grillarLinks} />
          <Link href="/bastu" className={`relative px-3 py-2 text-sm transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-slate-900 after:transition-opacity ${pathname === "/bastu" ? "text-slate-900 font-semibold after:opacity-100" : "text-slate-500 hover:text-slate-900 after:opacity-0"}`}>
            Bastu
          </Link>
          <Link href="/tillbehor" className={`relative px-3 py-2 text-sm transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-slate-900 after:transition-opacity ${pathname === "/tillbehor" ? "text-slate-900 font-semibold after:opacity-100" : "text-slate-500 hover:text-slate-900 after:opacity-0"}`}>
            Tillbehör
          </Link>
          <DropdownTrigger label="Tjänster" href="/tjanster" items={tjansterLinks} />
          <Link href="/showroom" className={`relative px-3 py-2 text-sm transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-slate-900 after:transition-opacity ${pathname === "/showroom" ? "text-slate-900 font-semibold after:opacity-100" : "text-slate-500 hover:text-slate-900 after:opacity-0"}`}>
            Showroom
          </Link>
          <Link href="/om-oss" className={`relative px-3 py-2 text-sm transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-slate-900 after:transition-opacity ${pathname === "/om-oss" ? "text-slate-900 font-semibold after:opacity-100" : "text-slate-500 hover:text-slate-900 after:opacity-0"}`}>
            Om oss
          </Link>
          <Link href="/kontakt" className={`relative px-3 py-2 text-sm transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-slate-900 after:transition-opacity ${pathname === "/kontakt" ? "text-slate-900 font-semibold after:opacity-100" : "text-slate-500 hover:text-slate-900 after:opacity-0"}`}>
            Kontakt
          </Link>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          {/* Search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-500 hover:bg-[#f5f5f5] hover:text-slate-700 transition-all"
            aria-label="Sök"
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline text-sm">Sök</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-xs font-mono text-slate-400">⌘K</kbd>
          </button>

          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-full text-slate-600 hover:bg-[#f5f5f5] transition-all"
            aria-label="Varukorg"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] font-bold text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          <Link href="/kontakt"
            className="hidden sm:inline-flex rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5] transition-all">
            Begär offert
          </Link>
          <button className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-[#efefef]" onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1 animate-slide-down">
          <Link href="/" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5]">Hem</Link>

          <button onClick={() => setMobilePool((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5]">
            Produkter <ChevronDown className={`w-4 h-4 transition-transform ${mobilePool ? "rotate-180" : ""}`} />
          </button>
          {mobilePool && (
            <div className="ml-4 space-y-1 border-l-2 border-slate-100 pl-3">
              {poolLinks.map((item) => (
                <div key={item.href}>
                  <Link href={item.href} className="block py-2 text-sm font-medium text-slate-600 hover:text-slate-900">{item.label}</Link>
                  {item.children?.map((child) => (
                    <Link key={child.href} href={child.href} className="block py-1.5 pl-4 text-sm text-slate-400 hover:text-slate-900">{child.label}</Link>
                  ))}
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setMobileSpabad((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5]">
            Spabad <ChevronDown className={`w-4 h-4 transition-transform ${mobileSpabad ? "rotate-180" : ""}`} />
          </button>
          {mobileSpabad && (
            <div className="ml-4 space-y-1 border-l-2 border-slate-100 pl-3">
              {spadbadLinks.map((item) => (
                <Link key={item.href} href={item.href} className="block py-2 text-sm font-medium text-slate-600 hover:text-slate-900">{item.label}</Link>
              ))}
            </div>
          )}

          <button onClick={() => setMobileGrillar((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5]">
            Grillar <ChevronDown className={`w-4 h-4 transition-transform ${mobileGrillar ? "rotate-180" : ""}`} />
          </button>
          {mobileGrillar && (
            <div className="ml-4 space-y-1 border-l-2 border-slate-100 pl-3">
              {grillarLinks.map((item) => (
                <Link key={item.href} href={item.href} className="block py-2 text-sm font-medium text-slate-600 hover:text-slate-900">{item.label}</Link>
              ))}
            </div>
          )}

          <Link href="/bastu" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5]">Bastu</Link>
          <Link href="/tillbehor" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5]">Tillbehör</Link>

          <button onClick={() => setMobileTjanster((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5]">
            Tjänster <ChevronDown className={`w-4 h-4 transition-transform ${mobileTjanster ? "rotate-180" : ""}`} />
          </button>
          {mobileTjanster && (
            <div className="ml-4 space-y-1 border-l-2 border-slate-100 pl-3">
              {tjansterLinks.map((item) => (
                <Link key={item.label} href={item.href} className="block py-2 text-sm font-medium text-slate-600 hover:text-slate-900">{item.label}</Link>
              ))}
            </div>
          )}

          <Link href="/showroom" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5]">Showroom</Link>
          <Link href="/om-oss" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5]">Om oss</Link>
          <Link href="/kontakt" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5]">Kontakt</Link>

          <div className="pt-2">
            <Link href="/kontakt" className="flex w-full items-center justify-center rounded-full bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-700 transition-colors">
              Begär offert
            </Link>
          </div>
        </div>
      )}
    </header>
    </>
  );
}