"use client";

import { useState, useCallback } from "react";
import { ArrowRight, ArrowLeft, Check, Waves, Wrench, Building2, Sun } from "lucide-react";
import Breadcrumb from "@/app/Components/Breadcrumb";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type Category = "pool" | "spabad" | "helentreprenad" | "renovering";

interface FormData {
  category: Category | "";
  poolType: string; poolSize: string; poolShape: string; poolFeatures: string[];
  spadbadType: string; spadbadSize: string; spadbadPlacement: string; spadbadFeatures: string[];
  heServices: string[]; projectSize: string; budgetRange: string;
  serviceType: string; currentProduct: string; issueDescription: string; preferredDate: string;
  location: string; siteDescription: string; timeline: string;
  name: string; email: string; phone: string; message: string; gdpr: boolean;
}

const INIT: FormData = {
  category: "",
  poolType: "", poolSize: "", poolShape: "", poolFeatures: [],
  spadbadType: "", spadbadSize: "", spadbadPlacement: "", spadbadFeatures: [],
  heServices: [], projectSize: "", budgetRange: "",
  serviceType: "", currentProduct: "", issueDescription: "", preferredDate: "",
  location: "", siteDescription: "", timeline: "",
  name: "", email: "", phone: "", message: "", gdpr: false,
};

/* ─── Price logic ────────────────────────────────────────────────────────── */
function calcPrice(d: FormData): { min: number; max: number } | null {
  if (d.category === "pool" && d.poolType && d.poolSize) {
    const base: Record<string, Record<string, [number, number]>> = {
      thermoblock: { small: [60000, 90000],   medium: [90000, 130000],  large: [130000, 200000] },
      gjuten:      { small: [100000, 145000], medium: [145000, 200000], large: [200000, 300000] },
      rostfri:     { small: [150000, 200000], medium: [200000, 275000], large: [275000, 400000] },
    };
    let [min, max] = base[d.poolType]?.[d.poolSize] ?? [0, 0];
    if (d.poolFeatures.includes("Pooltak"))    { min += 30000; max += 60000; }
    if (d.poolFeatures.includes("Cover Seal")) { min += 20000; max += 30000; }
    if (d.poolFeatures.includes("Värmepump"))  { min += 25000; max += 40000; }
    return { min, max };
  }
  if (d.category === "spabad" && d.spadbadType) {
    const base: Record<string, [number, number]> = {
      vildmarksspa:    [25000, 45000],
      "black-edition": [55000, 110000],
      "family-spa":    [65000, 90000],
      swimspa:         [130000, 220000],
    };
    const [min, max] = base[d.spadbadType] ?? [0, 0];
    return { min, max };
  }
  return null;
}

function fmt(n: number) { return n.toLocaleString("sv-SE"); }

/* ─── UI helpers ─────────────────────────────────────────────────────────── */
function CategoryCard({ selected, onClick, icon, title, desc }: {
  selected: boolean; onClick: () => void;
  icon: React.ReactNode; title: string; desc: string;
}) {
  return (
    <button type="button" onClick={onClick}
      className={`relative flex flex-col gap-3 rounded-2xl border p-5 text-left transition-all duration-200 ${
        selected
          ? "border-slate-900 bg-slate-900 text-white shadow-lg scale-[1.02]"
          : "border-slate-100 bg-[#f8f8f8] text-slate-700 hover:border-slate-300 hover:bg-white"
      }`}
    >
      {selected && (
        <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-white">
          <Check className="h-3 w-3 text-slate-900" strokeWidth={3} />
        </span>
      )}
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${selected ? "bg-white/15" : "bg-white"}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold leading-snug">{title}</p>
        <p className={`mt-0.5 text-xs leading-relaxed ${selected ? "text-white/70" : "text-slate-400"}`}>{desc}</p>
      </div>
    </button>
  );
}

function RadioCards({ options, value, onChange }: {
  options: { id: string; label: string; sub?: string }[];
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <button key={o.id} type="button" onClick={() => onChange(o.id)}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold border transition-all ${
            value === o.id
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
          }`}
        >
          {o.label}
          {o.sub && <span className={`block text-[11px] font-normal ${value === o.id ? "text-white/70" : "text-slate-400"}`}>{o.sub}</span>}
        </button>
      ))}
    </div>
  );
}

function MultiSelect({ options, values, onChange }: {
  options: string[]; values: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (o: string) =>
    onChange(values.includes(o) ? values.filter(x => x !== o) : [...values, o]);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => {
        const sel = values.includes(o);
        return (
          <button key={o} type="button" onClick={() => toggle(o)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium border transition-all ${
              sel ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
            }`}
          >
            {sel && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}{required && <span className="ml-1 text-slate-300">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none transition-colors";

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function KontaktPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [animDir, setAnimDir] = useState<"right" | "left">("right");
  const [animKey, setAnimKey] = useState(0);
  const [data, setData] = useState<FormData>(INIT);

  const set = useCallback(<K extends keyof FormData>(key: K, val: FormData[K]) =>
    setData(d => ({ ...d, [key]: val })), []);

  function go(to: 1 | 2 | 3 | 4, dir: "right" | "left") {
    setAnimDir(dir);
    setAnimKey(k => k + 1);
    setStep(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submit() {
    go(4, "right");
  }

  const step1Ok = !!data.category;
  const step2Ok = (() => {
    if (data.category === "pool")           return !!(data.poolType && data.poolSize && data.location);
    if (data.category === "spabad")         return !!(data.spadbadType && data.location);
    if (data.category === "helentreprenad") return !!(data.heServices.length && data.location);
    if (data.category === "renovering")     return !!(data.serviceType && data.location);
    return false;
  })();
  const step3Ok = !!(data.name && data.email && data.phone && data.gdpr);

  const catLabel: Record<string, string> = {
    pool: "Pool", spabad: "Spabad", helentreprenad: "Helentreprenad", renovering: "Renovering & Service",
  };
  const price = calcPrice(data);

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 pt-4 pb-20">
      <div className="mx-auto max-w-xl">

        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb crumbs={[{ label: "Kontakt" }]} />
        </div>

        {/* Header */}
        {step < 4 && (
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Kostnadsfri offert</p>
            <h1 className="text-4xl font-black text-slate-900">Begär offert</h1>
            <p className="mt-2 text-sm text-slate-500">Svar inom 24 timmar på vardagar</p>
          </div>
        )}

        {/* Progress bar */}
        {step < 4 && (
          <div className="mb-8 flex items-center justify-center gap-3">
            {([1, 2, 3] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    step > s ? "bg-slate-900 text-white" : step === s ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-400"
                  }`}>
                    {step > s ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : s}
                  </div>
                  <span className={`hidden text-xs font-semibold sm:block ${step >= s ? "text-slate-700" : "text-slate-400"}`}>
                    {s === 1 ? "Kategori" : s === 2 ? "Detaljer" : "Kontakt"}
                  </span>
                </div>
                {i < 2 && <div className={`h-px w-8 ${step > s ? "bg-slate-900" : "bg-slate-200"}`} />}
              </div>
            ))}
          </div>
        )}

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <div key={animKey} className={animDir === "right" ? "step-in-right" : "step-in-left"}>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="p-7">
                <h2 className="mb-1 text-lg font-black text-slate-900">Vad kan vi hjälpa dig med?</h2>
                <p className="mb-6 text-sm text-slate-400">Välj det alternativ som bäst beskriver ditt projekt.</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <CategoryCard selected={data.category === "pool"} onClick={() => set("category", "pool")}
                    icon={<Waves className="h-5 w-5 text-slate-600" />} title="Pool" desc="Nybyggnation av pool" />
                  <CategoryCard selected={data.category === "spabad"} onClick={() => set("category", "spabad")}
                    icon={<Sun className="h-5 w-5 text-slate-600" />} title="Spabad" desc="Hot tub & spa installation" />
                  <CategoryCard selected={data.category === "helentreprenad"} onClick={() => set("category", "helentreprenad")}
                    icon={<Building2 className="h-5 w-5 text-slate-600" />} title="Helentreprenad" desc="Nyckelfärdigt projekt — vi hanterar allt" />
                  <CategoryCard selected={data.category === "renovering"} onClick={() => set("category", "renovering")}
                    icon={<Wrench className="h-5 w-5 text-slate-600" />} title="Renovering & Service" desc="Renovering och underhåll" />
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-7 p-7">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                    <span className="text-xs font-bold text-slate-600">{catLabel[data.category]}</span>
                  </div>
                  <h2 className="text-lg font-black text-slate-900">Berätta om projektet</h2>
                </div>

                {data.category === "pool" && <>
                  <Field label="Pooltyp" required>
                    <RadioCards value={data.poolType} onChange={v => set("poolType", v)} options={[
                      { id: "thermoblock", label: "Thermoblock" },
                      { id: "gjuten",      label: "Gjuten stomme" },
                      { id: "rostfri",     label: "Rostfri stomme" },
                    ]} />
                  </Field>
                  <Field label="Storlek" required>
                    <RadioCards value={data.poolSize} onChange={v => set("poolSize", v)} options={[
                      { id: "small",  label: "Liten",  sub: "upp till 20 m²" },
                      { id: "medium", label: "Medel",  sub: "20–40 m²" },
                      { id: "large",  label: "Stor",   sub: "40 m²+" },
                    ]} />
                  </Field>
                  <Field label="Form">
                    <RadioCards value={data.poolShape} onChange={v => set("poolShape", v)} options={[
                      { id: "rectangular", label: "Rektangulär" },
                      { id: "freeform",    label: "Friform" },
                      { id: "custom",      label: "Anpassad" },
                    ]} />
                  </Field>
                  <Field label="Tillval (välj flera)">
                    <MultiSelect values={data.poolFeatures} onChange={v => set("poolFeatures", v)}
                      options={["Pooltak", "Cover Seal", "Liner", "LED-belysning", "Värmepump"]} />
                  </Field>
                  <Field label="Platsbeskrivning">
                    <RadioCards value={data.siteDescription} onChange={v => set("siteDescription", v)} options={[
                      { id: "granite", label: "Bergigt" },
                      { id: "garden",  label: "Trädgård" },
                      { id: "decking", label: "Altan" },
                      { id: "other",   label: "Annat" },
                    ]} />
                  </Field>
                  <Field label="Tidslinje">
                    <RadioCards value={data.timeline} onChange={v => set("timeline", v)} options={[
                      { id: "this-season", label: "Denna säsong" },
                      { id: "next-season", label: "Nästa säsong" },
                      { id: "flexible",    label: "Flexibel" },
                    ]} />
                  </Field>
                </>}

                {data.category === "spabad" && <>
                  <Field label="Typ" required>
                    <RadioCards value={data.spadbadType} onChange={v => set("spadbadType", v)} options={[
                      { id: "black-edition", label: "Black Edition" },
                      { id: "swimspa",       label: "Swimspa" },
                      { id: "vildmarksspa",  label: "Vildmarksspa" },
                      { id: "family-spa",    label: "Family Spa" },
                    ]} />
                  </Field>
                  <Field label="Antal personer">
                    <RadioCards value={data.spadbadSize} onChange={v => set("spadbadSize", v)} options={[
                      { id: "2-3", label: "2–3 pers" },
                      { id: "4-5", label: "4–5 pers" },
                      { id: "6+",  label: "6+ pers" },
                    ]} />
                  </Field>
                  <Field label="Placering">
                    <RadioCards value={data.spadbadPlacement} onChange={v => set("spadbadPlacement", v)} options={[
                      { id: "indoors",  label: "Inomhus" },
                      { id: "outdoors", label: "Utomhus" },
                      { id: "deck",     label: "Integrerad i altan" },
                    ]} />
                  </Field>
                  <Field label="Tillval">
                    <MultiSelect values={data.spadbadFeatures} onChange={v => set("spadbadFeatures", v)}
                      options={["LED-belysning", "WiFi-styrning", "Täckliftar", "Kemikaliestart"]} />
                  </Field>
                  <Field label="Tidslinje">
                    <RadioCards value={data.timeline} onChange={v => set("timeline", v)} options={[
                      { id: "this-season", label: "Denna säsong" },
                      { id: "next-season", label: "Nästa säsong" },
                      { id: "flexible",    label: "Flexibel" },
                    ]} />
                  </Field>
                </>}

                {data.category === "helentreprenad" && <>
                  <Field label="Tjänster som önskas" required>
                    <MultiSelect values={data.heServices} onChange={v => set("heServices", v)}
                      options={["Poolbyggnation", "Spa-installation", "Markarbete", "El-installation", "Altan/Deck", "Trädgårdsanläggning"]} />
                  </Field>
                  <Field label="Projektstorlek">
                    <RadioCards value={data.projectSize} onChange={v => set("projectSize", v)} options={[
                      { id: "small",  label: "Litet" },
                      { id: "medium", label: "Medel" },
                      { id: "large",  label: "Stort" },
                      { id: "unsure", label: "Osäker" },
                    ]} />
                  </Field>
                  <Field label="Budget">
                    <RadioCards value={data.budgetRange} onChange={v => set("budgetRange", v)} options={[
                      { id: "under500", label: "Under 500 000 kr" },
                      { id: "500-1M",   label: "500k–1 Mkr" },
                      { id: "1M-2M",    label: "1–2 Mkr" },
                      { id: "2M+",      label: "2 Mkr+" },
                    ]} />
                  </Field>
                  <Field label="Platsbeskrivning">
                    <RadioCards value={data.siteDescription} onChange={v => set("siteDescription", v)} options={[
                      { id: "granite", label: "Bergigt" },
                      { id: "garden",  label: "Trädgård" },
                      { id: "decking", label: "Altan" },
                      { id: "other",   label: "Annat" },
                    ]} />
                  </Field>
                  <Field label="Tidslinje">
                    <RadioCards value={data.timeline} onChange={v => set("timeline", v)} options={[
                      { id: "this-season", label: "Denna säsong" },
                      { id: "next-season", label: "Nästa säsong" },
                      { id: "flexible",    label: "Flexibel" },
                    ]} />
                  </Field>
                </>}

                {data.category === "renovering" && <>
                  <Field label="Typ av tjänst" required>
                    <RadioCards value={data.serviceType} onChange={v => set("serviceType", v)} options={[
                      { id: "one-time",   label: "Engångsservice" },
                      { id: "season",     label: "Säsongsöppning/stängning" },
                      { id: "agreement",  label: "Serviceavtal" },
                      { id: "renovation", label: "Renovering" },
                    ]} />
                  </Field>
                  <Field label="Befintlig pool/spa">
                    <input className={inputCls} placeholder="T.ex. Thermoblock pool 8×4m, Jacuzzi J-375..."
                      value={data.currentProduct} onChange={e => set("currentProduct", e.target.value)} />
                  </Field>
                  <Field label="Beskriv problemet/önskemålet">
                    <textarea className={`${inputCls} h-24 resize-none`}
                      placeholder="Beskriv vad du behöver hjälp med..."
                      value={data.issueDescription} onChange={e => set("issueDescription", e.target.value)} />
                  </Field>
                  <Field label="Önskat datum">
                    <input className={inputCls} type="date"
                      value={data.preferredDate} onChange={e => set("preferredDate", e.target.value)} />
                  </Field>
                </>}

                <Field label="Postnummer / Ort" required>
                  <input className={inputCls} placeholder="T.ex. 134 40 Gustavsberg"
                    value={data.location} onChange={e => set("location", e.target.value)} />
                </Field>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6 p-7">
                <div>
                  <h2 className="mb-1 text-lg font-black text-slate-900">Dina kontaktuppgifter</h2>
                  <p className="text-sm text-slate-400">Vi återkommer inom 24 timmar på vardagar.</p>
                </div>

                {price && (
                  <div className="rounded-2xl border border-slate-100 bg-[#f8f8f8] p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Estimerat prisintervall</p>
                    <p className="text-3xl font-black text-slate-900">{fmt(price.min)} – {fmt(price.max)} kr</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                      Slutpriset beror på platsförhållanden och slutgiltiga specifikationer. Detta är en uppskattning.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="För- och efternamn" required>
                    <input className={inputCls} placeholder="Anna Svensson"
                      value={data.name} onChange={e => set("name", e.target.value)} />
                  </Field>
                  <Field label="Telefon" required>
                    <input className={inputCls} type="tel" placeholder="070-000 00 00"
                      value={data.phone} onChange={e => set("phone", e.target.value)} />
                  </Field>
                </div>
                <Field label="E-postadress" required>
                  <input className={inputCls} type="email" placeholder="anna@exempel.se"
                    value={data.email} onChange={e => set("email", e.target.value)} />
                </Field>
                <Field label="Övriga önskemål">
                  <textarea className={`${inputCls} h-24 resize-none`}
                    placeholder="Ytterligare information eller frågor..."
                    value={data.message} onChange={e => set("message", e.target.value)} />
                </Field>

                <label className="flex cursor-pointer items-start gap-3 group">
                  <div onClick={() => set("gdpr", !data.gdpr)}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 transition-all ${
                      data.gdpr ? "border-slate-900 bg-slate-900" : "border-slate-300 group-hover:border-slate-500"
                    }`}
                  >
                    {data.gdpr && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-xs leading-relaxed text-slate-500">
                    Jag godkänner att Elite Pool & Spa kontaktar mig angående min offertförfrågan i enlighet med GDPR.{" "}
                    <span className="text-slate-400">*</span>
                  </span>
                </label>
              </div>
            )}

            {/* STEP 4 — Success */}
            {step === 4 && (
              <div className="flex flex-col items-center gap-5 px-7 py-16 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900">
                  <Check className="h-10 w-10 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="mb-2 text-2xl font-black text-slate-900">
                    Tack, {data.name.split(" ")[0]}!
                  </h2>
                  <p className="max-w-sm text-sm leading-relaxed text-slate-500">
                    Vi har tagit emot din offertförfrågan för <strong>{catLabel[data.category]}</strong> och
                    återkommer till dig inom 24 timmar på vardagar.
                  </p>
                </div>
                <p className="text-xs text-slate-400">
                  En bekräftelse skickas till{" "}
                  <span className="font-semibold text-slate-600">{data.email}</span>
                </p>
                {price && (
                  <div className="w-full max-w-xs rounded-2xl bg-[#f8f8f8] px-6 py-4 text-center">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Estimerat pris</p>
                    <p className="text-xl font-black text-slate-900">{fmt(price.min)} – {fmt(price.max)} kr</p>
                  </div>
                )}
                <button onClick={() => { setData(INIT); go(1, "left"); }}
                  className="mt-2 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-[#f5f5f5] transition-colors">
                  Ny förfrågan
                </button>
              </div>
            )}
          </div>

          {/* Footer nav */}
          {step < 4 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-7 py-5">
              {step > 1 ? (
                <button type="button" onClick={() => go((step - 1) as 1 | 2 | 3, "left")}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                  <ArrowLeft className="h-4 w-4" /> Tillbaka
                </button>
              ) : <div />}

              {step < 3 && (
                <button type="button" onClick={() => go((step + 1) as 2 | 3, "right")}
                  disabled={step === 1 ? !step1Ok : !step2Ok}
                  className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40 transition-all">
                  Fortsätt <ArrowRight className="h-4 w-4" />
                </button>
              )}

              {step === 3 && (
                <button type="button" onClick={submit} disabled={!step3Ok}
                  className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40 transition-all">
                  Se prisuppskattning
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {step < 4 && (
          <p className="mt-6 text-center text-xs text-slate-400">
            Kostnadsfri rådgivning · Svar inom 24 h · Nacka/Värmdö med omnejd
          </p>
        )}
      </div>
    </div>
  );
}
