"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";

export type ServicePlan = {
  id: string;
  name: string;
  price: number;
  visits: number;
  pricePerVisit: number;
  color: string;
};

type Props = {
  plan: ServicePlan | null;
  onClose: () => void;
};

const ADDONS = [
  { id: "opening",   label: "Spaöppning och vinterstängning",       desc: "Professionell start och stängning av spabadet för säsongen" },
  { id: "emergency", label: "Akutservice",                           desc: "Snabb hjälp vid läckage, pumpfel eller vattenkvalitet" },
  { id: "filter",    label: "Rengöring och byte av filter",          desc: "Specialrengöring (pipe-cleaning) eller byte av filter vid behov" },
  { id: "smart",     label: "Smart övervakning & energioptimering",  desc: "Installation av smarta system för övervakning och dosering" },
  { id: "safety",    label: "Barnsäkerhetskontroll",                 desc: "Installation och kontroll av säkerhetsanordningar" },
];

type FormData = {
  firstName: string; lastName: string; email: string; phone: string;
  address: string; zip: string; city: string; spaModel: string; notes: string;
};

const EMPTY_FORM: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  address: "", zip: "", city: "", spaModel: "", notes: "",
};

function formatPrice(n: number) {
  return n.toLocaleString("sv-SE") + " kr";
}

export default function ServiceSignupModal({ plan, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [addons, setAddons] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Reset when plan changes
  useEffect(() => {
    setStep(1);
    setForm(EMPTY_FORM);
    setAddons([]);
    setDone(false);
  }, [plan]);

  // Esc to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = plan ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [plan]);

  if (!plan) return null;

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const toggleAddon = (id: string) =>
    setAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);

  const step1Valid = !!(form.firstName && form.lastName && form.email && form.phone && form.address && form.zip && form.city);

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await fetch("/api/serviceavtal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plan?.name, price: plan?.price, form, addons }),
      });
    } catch {}
    setSubmitting(false);
    setDone(true);
  }

  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none transition-colors";
  const labelClass = "block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5";

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-7 pt-7 pb-0">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: plan.color }}>
                  {plan.name}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-400">{formatPrice(plan.price)}/mån</span>
              </div>
              <h2 className="text-lg font-black text-slate-900">
                {done ? "Ansökan mottagen!" : step === 1 ? "Dina uppgifter" : "Välj tillval & bekräfta"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Step indicator */}
          {!done && (
            <div className="flex items-center gap-2 px-7 pt-4 pb-5">
              {[1, 2].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    step > s ? "bg-slate-900 text-white" : step === s ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
                  }`}>
                    {step > s ? <Check className="h-3 w-3" /> : s}
                  </div>
                  <span className={`text-xs ${step >= s ? "text-slate-700 font-medium" : "text-slate-400"}`}>
                    {s === 1 ? "Uppgifter" : "Bekräfta"}
                  </span>
                  {s < 2 && <div className="h-px w-6 bg-slate-200" />}
                </div>
              ))}
            </div>
          )}

          <div className="h-px bg-slate-100" />

          {/* Body */}
          <div className="overflow-y-auto max-h-[60vh] px-7 py-6">

            {/* DONE state */}
            {done && (
              <div className="flex flex-col items-center text-center py-6 gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Tack, {form.firstName}!</p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Vi har tagit emot din ansökan för <strong>{plan.name}-avtalet</strong>.<br />
                    En av oss återkommer till dig inom 24 timmar för att bekräfta och boka in ett startdatum.
                  </p>
                </div>
                <p className="text-xs text-slate-400">
                  Bekräftelse skickas till <span className="font-medium text-slate-600">{form.email}</span>
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-slate-700 transition-colors"
                >
                  Stäng
                </button>
              </div>
            )}

            {/* STEP 1 */}
            {!done && step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Förnamn *</label>
                    <input className={inputClass} placeholder="Anna" value={form.firstName} onChange={set("firstName")} />
                  </div>
                  <div>
                    <label className={labelClass}>Efternamn *</label>
                    <input className={inputClass} placeholder="Svensson" value={form.lastName} onChange={set("lastName")} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>E-postadress *</label>
                  <input className={inputClass} type="email" placeholder="anna@exempel.se" value={form.email} onChange={set("email")} />
                </div>
                <div>
                  <label className={labelClass}>Telefonnummer *</label>
                  <input className={inputClass} type="tel" placeholder="070-000 00 00" value={form.phone} onChange={set("phone")} />
                </div>
                <div>
                  <label className={labelClass}>Gatuadress *</label>
                  <input className={inputClass} placeholder="Storgatan 1" value={form.address} onChange={set("address")} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Postnummer *</label>
                    <input className={inputClass} placeholder="134 40" value={form.zip} onChange={set("zip")} />
                  </div>
                  <div>
                    <label className={labelClass}>Ort *</label>
                    <input className={inputClass} placeholder="Gustavsberg" value={form.city} onChange={set("city")} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Spamodell / märke</label>
                  <input className={inputClass} placeholder="T.ex. Jacuzzi J-375, Softub 300..." value={form.spaModel} onChange={set("spaModel")} />
                </div>
                <div>
                  <label className={labelClass}>Övriga önskemål</label>
                  <textarea
                    className={`${inputClass} resize-none h-20`}
                    placeholder="Eventuella frågor eller önskemål..."
                    value={form.notes}
                    onChange={set("notes")}
                  />
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {!done && step === 2 && (
              <div className="space-y-6">
                {/* Plan summary */}
                <div className="rounded-2xl bg-[#f8f8f8] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Valt avtal</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">{plan.name} — {plan.visits} besök/mån</p>
                      <p className="text-xs text-slate-500 mt-0.5">{formatPrice(plan.pricePerVisit)}/besök · Vardagar</p>
                    </div>
                    <span className="text-lg font-black text-slate-900">{formatPrice(plan.price)}<span className="text-xs font-normal text-slate-400">/mån</span></span>
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Tilläggstjänster (valfritt)</p>
                  <div className="space-y-2">
                    {ADDONS.map(a => (
                      <button
                        key={a.id}
                        onClick={() => toggleAddon(a.id)}
                        className={`w-full flex items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                          addons.includes(a.id)
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                          addons.includes(a.id) ? "border-white bg-white" : "border-slate-300"
                        }`}>
                          {addons.includes(a.id) && <Check className="h-2.5 w-2.5 text-slate-900" />}
                        </div>
                        <div>
                          <p className={`text-xs font-bold ${addons.includes(a.id) ? "text-white" : "text-slate-900"}`}>{a.label}</p>
                          <p className={`text-[11px] mt-0.5 ${addons.includes(a.id) ? "text-white/70" : "text-slate-400"}`}>{a.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer summary */}
                <div className="rounded-2xl bg-[#f8f8f8] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Dina uppgifter</p>
                    <button onClick={() => setStep(1)} className="text-[11px] font-semibold text-slate-500 underline hover:text-slate-900">Ändra</button>
                  </div>
                  <div className="space-y-0.5 text-sm text-slate-700">
                    <p className="font-semibold">{form.firstName} {form.lastName}</p>
                    <p>{form.email}</p>
                    <p>{form.phone}</p>
                    <p>{form.address}, {form.zip} {form.city}</p>
                    {form.spaModel && <p className="text-slate-500">Spa: {form.spaModel}</p>}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Kemikalier ingår ej. Avtalet gäller inom 5 mils radie från Nacka/Värmdö. Vi bekräftar och bokar in startdatum via e-post.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {!done && (
            <>
              <div className="h-px bg-slate-100" />
              <div className="flex items-center justify-between px-7 py-5">
                {step === 2 ? (
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Tillbaka
                  </button>
                ) : <div />}

                {step === 1 && (
                  <button
                    onClick={() => setStep(2)}
                    disabled={!step1Valid}
                    className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Fortsätt
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}

                {step === 2 && (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-700 disabled:opacity-60 transition-all"
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {submitting ? "Skickar..." : "Teckna avtal"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
