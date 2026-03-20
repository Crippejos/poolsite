"use client";
import Link from "next/link";
import { useState } from "react";

function MapModal({ onClose }: { onClose: () => void }) {
  const lat = 59.3293;
  const lng = 17.8419;
  const address = "Stockholm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <h3 className="text-base font-bold text-slate-900 mb-1">Öppna i kartapp</h3>
        <p className="text-xs text-slate-400 mb-5">{address}</p>
        <div className="space-y-2">
          <a href={`https://www.google.com/maps/search/${address}/@${lat},${lng},12z`}
            target="_blank" rel="noopener noreferrer" onClick={onClose}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5] transition-all">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Google Maps
          </a>
          <a href={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`}
            target="_blank" rel="noopener noreferrer" onClick={onClose}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5] transition-all">
            <svg className="h-5 w-5 text-cyan-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            Waze
          </a>
          <a href={`https://maps.apple.com/?q=${address}&ll=${lat},${lng}`}
            target="_blank" rel="noopener noreferrer" onClick={onClose}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#f5f5f5] transition-all">
            <svg className="h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Apple Maps
          </a>
        </div>
        <button onClick={onClose}
          className="mt-4 w-full rounded-2xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-500 hover:bg-[#f5f5f5] transition-all">
          Avbryt
        </button>
      </div>
    </div>
  );
}

export default function Footer() {
  const [showMap, setShowMap] = useState(false);

  return (
    <footer className="bg-white py-8">
      {showMap && <MapModal onClose={() => setShowMap(false)} />}

      <div className="mx-auto flex justify-center">
        <div className="w-[90%] rounded-3xl bg-[#efefef] p-10">

          {/* Top — 4 columns */}
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center mb-4">
                <div className="h-5 w-5 rounded-full bg-white opacity-80" />
              </div>
              <p className="text-sm font-semibold text-slate-900 mb-3">Elite Pool & Spa</p>
              <div className="space-y-1 text-sm text-slate-500 mb-6">
                <p>Stockholm</p>
                <p>+46 08-123 45 67</p>
                <p>info@poolpro.se</p>
              </div>

              {/* Map */}
              <button onClick={() => setShowMap(true)}
                className="w-full rounded-2xl overflow-hidden border border-slate-200 hover:opacity-90 transition-opacity text-left">
                <div className="relative h-40 bg-slate-200 flex items-center justify-center"
                  style={{ backgroundImage: "radial-gradient(ellipse at 50% 50%, #cbd5e1 0%, #94a3b8 100%)" }}>
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <p className="text-xs font-semibold text-slate-600">Stockholm</p>
                    <p className="text-xs text-slate-400 mt-0.5">Tryck för vägbeskrivning</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Pool */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Pool</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Thermoblock", href: "/pool/thermoblock" },
                  { label: "Gjuten stomme", href: "/pool/gjuten-stomme" },
                  { label: "Rostfri stomme", href: "/pool/rostfri-stomme" },
                  { label: "Poolöverdrag", href: "/pool/pooloverdrag" },
                  { label: "Liner", href: "/pool/liner" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-500 hover:text-slate-900 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spabad */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Spabad</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Black Edition", href: "/spabad/black-edition" },
                  { label: "Swimspa", href: "/spabad/swimspa" },
                  { label: "Vildmarksspa", href: "/spabad/vildmarksspa" },
                  { label: "Family Spa", href: "/spabad/family-spa" },
                  { label: "Tillbehör", href: "/spabad/tillbehor" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-500 hover:text-slate-900 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Företaget */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Företaget</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Om oss", href: "/om-oss" },
                  { label: "Showroom", href: "/showroom" },
                  { label: "Helentreprenad", href: "/helentreprenad" },
                  { label: "Bastu", href: "/bastu" },
                  { label: "Kontakt", href: "/kontakt" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-500 hover:text-slate-900 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom — social + copyright */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-5">
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} Elite Pool & Spa. Alla rättigheter förbehållna.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}