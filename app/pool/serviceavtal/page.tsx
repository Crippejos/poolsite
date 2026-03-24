"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus, MapPin, Info } from "lucide-react";
import ServiceSignupModal, { type ServicePlan } from "@/app/Components/ServiceSignupModal";
import Breadcrumb from "@/app/Components/Breadcrumb";

const plans: ServicePlan[] = [
  { id: "brons",    name: "Brons",    price: 2595,  visits: 1, pricePerVisit: 2595, color: "#b87333" },
  { id: "silver",   name: "Silver",   price: 4790,  visits: 2, pricePerVisit: 2395, color: "#94a3b8" },
  { id: "guld",     name: "Guld",     price: 8780,  visits: 4, pricePerVisit: 2195, color: "#d4a853" },
  { id: "platinum", name: "Platinum", price: 16760, visits: 8, pricePerVisit: 2095, color: "#e2e8f0" },
];

type Feature = { text: string; brons: boolean; silver: boolean; guld: boolean; platinum: boolean };

const features: Feature[] = [
  { text: "Vattenkontroll & fotoanalys",              brons: true,  silver: true,  guld: true,  platinum: true  },
  { text: "Rengöring av vattenlinje",                 brons: true,  silver: true,  guld: true,  platinum: true  },
  { text: "Dammsugning av botten",                    brons: true,  silver: true,  guld: true,  platinum: true  },
  { text: "Hovning av löv",                           brons: true,  silver: true,  guld: true,  platinum: true  },
  { text: "Tömning av korgar & backspolning",         brons: true,  silver: true,  guld: true,  platinum: true  },
  { text: "Borsta väggar",                            brons: false, silver: false, guld: true,  platinum: true  },
  { text: "Funktionskontroll av maskineri",           brons: false, silver: true,  guld: true,  platinum: true  },
  { text: "Kontroll av läckage & systemöversyn",      brons: false, silver: false, guld: true,  platinum: true  },
  { text: "Kalibrering doseringssystem",              brons: false, silver: true,  guld: true,  platinum: true  },
  { text: "BlueConnect inkluderad",                   brons: false, silver: false, guld: true,  platinum: true  },
  { text: "Kemikalieleverans vid besök",              brons: false, silver: false, guld: false, platinum: true  },
  { text: "Rabatt på kemikalier",                     brons: false, silver: true,  guld: true,  platinum: true  },
];

const rabatt: Record<string, string> = {
  silver: "10 %", guld: "15 %", platinum: "18 %",
};

const addons = [
  { title: "Poolöppning & vinterstängning",      desc: "Professionell start och stängning av poolen för säsongen." },
  { title: "Akutservice",                         desc: "Snabb hjälp vid maskinhaveri, läckage eller obalans i vattenkvalitet." },
  { title: "Rengöring av pooltäcke & lameller",  desc: "Specialrengöring av automatiska täcken och lameller." },
  { title: "Spa-service",                         desc: "Rengöring och underhåll av spabad, jets, filter och vattenbalansering. 1 295 kr/gång (ord. 2 595 kr)." },
  { title: "Smart övervakning & energiopt.",      desc: "Installation av smarta poolsystem och energisnåla lösningar." },
  { title: "Barnsäkerhetskontroll",              desc: "Genomgång och installation av säkerhetsanordningar." },
  { title: "Renovering & nybyggnation",           desc: "Helentreprenad från planering till nyckelfärdig anläggning." },
];

function formatPrice(n: number) { return n.toLocaleString("sv-SE"); }

function FeatureDot({ active, extra }: { active: boolean; extra?: string }) {
  if (!active) return <Minus className="h-4 w-4 text-slate-200 mx-auto" />;
  return (
    <div className="flex flex-col items-center gap-0.5">
      <Check className="h-4 w-4 text-slate-900 mx-auto" strokeWidth={2.5} />
      {extra && <span className="text-[9px] font-bold text-slate-500">{extra}</span>}
    </div>
  );
}

export default function PoolServiceavtalPage() {
  const [selectedPlan, setSelectedPlan] = useState<ServicePlan | null>(null);

  return (
    <>
      <ServiceSignupModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />

      {/* ── Breadcrumb ── */}
      <div className="px-6 pt-4 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb crumbs={[{ label: "Pool", href: "/pool" }, { label: "Serviceavtal" }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-slate-900 pt-20 pb-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Service & underhåll</p>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-none mb-6">
            Serviceavtal<br />
            <span className="text-slate-400">för pool 2026</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
            Fyra nivåer — från grundläggande underhåll till helautomatisk skötsel. Alla besök på vardagar inom 5 mils radie från Nacka/Värmdö.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-xs text-slate-400">
            <Info className="h-3.5 w-3.5 shrink-0" />
            Kemikalier ingår ej om inget annat avtalas
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <section className="bg-[#f5f5f5] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan, i) => {
              const popular = i === 2; // Guld = most popular
              const featureList = features.filter(f =>
                plan.id === "brons" ? f.brons :
                plan.id === "silver" ? f.silver :
                plan.id === "guld" ? f.guld : f.platinum
              );

              return (
                <div key={plan.id}
                  className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 ${
                    popular ? "bg-slate-900 shadow-2xl scale-[1.02]" : "bg-white shadow-sm hover:shadow-md"
                  }`}
                >
                  {popular && (
                    <div className="absolute top-0 inset-x-0 flex justify-center">
                      <span className="rounded-b-full bg-white px-4 py-1 text-[10px] font-black uppercase tracking-widest text-slate-900">
                        Mest populär
                      </span>
                    </div>
                  )}

                  <div className="p-7 pt-10 flex flex-col flex-1">
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ background: plan.color }} />
                      <span className="text-sm font-black uppercase tracking-widest" style={{ color: plan.color }}>
                        {plan.name}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-1">
                      <span className={`text-4xl font-black ${popular ? "text-white" : "text-slate-900"}`}>
                        {formatPrice(plan.price)}
                      </span>
                      <span className={`text-sm ml-1 ${popular ? "text-slate-400" : "text-slate-400"}`}>kr/mån</span>
                    </div>
                    <p className={`text-xs mb-7 ${popular ? "text-slate-500" : "text-slate-400"}`}>
                      {plan.visits} besök/mån · {formatPrice(plan.pricePerVisit)} kr/besök
                    </p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {featureList.map(f => (
                        <li key={f.text} className="flex items-start gap-2.5">
                          <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${popular ? "bg-white/10" : "bg-slate-100"}`}>
                            <Check className={`h-2.5 w-2.5 ${popular ? "text-white" : "text-slate-700"}`} strokeWidth={3} />
                          </div>
                          <span className={`text-xs leading-snug ${popular ? "text-slate-300" : "text-slate-600"}`}>{f.text}</span>
                        </li>
                      ))}
                      {rabatt[plan.id] && (
                        <li className="flex items-start gap-2.5">
                          <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${popular ? "bg-white/10" : "bg-slate-100"}`}>
                            <Check className={`h-2.5 w-2.5 ${popular ? "text-white" : "text-slate-700"}`} strokeWidth={3} />
                          </div>
                          <span className={`text-xs leading-snug ${popular ? "text-slate-300" : "text-slate-600"}`}>
                            {rabatt[plan.id]} rabatt på kemikalier
                          </span>
                        </li>
                      )}
                    </ul>

                    <button onClick={() => setSelectedPlan(plan)}
                      className={`w-full rounded-2xl py-3 text-sm font-black tracking-wide transition-all ${
                        popular ? "bg-white text-slate-900 hover:bg-slate-100" : "bg-slate-900 text-white hover:bg-slate-700"
                      }`}
                    >
                      Teckna avtal
                    </button>
                    <p className={`text-center text-[10px] mt-2.5 ${popular ? "text-slate-600" : "text-slate-400"}`}>
                      Extra besök {formatPrice(plan.pricePerVisit)} kr/besök
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 text-center">Jämförelse</p>
          <h2 className="text-3xl font-black text-slate-900 text-center mb-12">Vad ingår i varje avtal?</h2>

          <div className="rounded-3xl overflow-hidden border border-slate-100">
            {/* Header */}
            <div className="grid grid-cols-5 bg-slate-50 border-b border-slate-100">
              <div className="p-4 col-span-1" />
              {plans.map(p => (
                <div key={p.id} className="p-4 text-center">
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: p.color }}>{p.name}</span>
                </div>
              ))}
            </div>

            {features.map((f, i) => (
              <div key={f.text} className={`grid grid-cols-5 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"} border-b border-slate-50 last:border-0`}>
                <div className="p-4 col-span-1 flex items-center">
                  <span className="text-xs text-slate-600">{f.text}</span>
                </div>
                <div className="p-4 flex items-center justify-center"><FeatureDot active={f.brons} /></div>
                <div className="p-4 flex items-center justify-center"><FeatureDot active={f.silver} extra={f.text.includes("Rabatt") ? rabatt.silver : undefined} /></div>
                <div className="p-4 flex items-center justify-center"><FeatureDot active={f.guld} extra={f.text.includes("Rabatt") ? rabatt.guld : undefined} /></div>
                <div className="p-4 flex items-center justify-center"><FeatureDot active={f.platinum} extra={f.text.includes("Rabatt") ? rabatt.platinum : undefined} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-[#f5f5f5] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Tilläggstjänster</p>
          <h2 className="text-3xl font-black text-slate-900 mb-3">Komplettera ditt avtal</h2>
          <p className="text-slate-500 text-sm mb-10 max-w-lg">
            Välj tilläggstjänster direkt i kassan. Vi kontaktar dig för prisuppgift baserat på dina behov.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map(a => (
              <div key={a.title} className="bg-white rounded-2xl p-5 border border-slate-100">
                <p className="text-sm font-bold text-slate-900 mb-1">{a.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hourly rates + CTA */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-slate-900 p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Priser utöver avtal 2026</p>
              <h3 className="text-2xl font-black text-white mb-4">Timdebitering</h3>
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-white">2 495 kr</span>
                  <span className="text-slate-400 text-sm">inkl. moms · 1:a timme inkl. framkörning</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-white">995 kr</span>
                  <span className="text-slate-400 text-sm">inkl. moms · kommande timmar</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500 italic">
                P.S. Boka din poolöppning tidigt för att få bästa möjliga datum!
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/kontakt"
                className="rounded-2xl bg-white px-7 py-3.5 text-sm font-black text-slate-900 hover:bg-slate-100 transition-colors text-center">
                Kontakta oss
              </Link>
              <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                <MapPin className="h-3.5 w-3.5" />
                Inom 5 mil från Nacka/Värmdö
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
