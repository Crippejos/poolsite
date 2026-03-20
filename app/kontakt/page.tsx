"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Send, CheckCircle2, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Page() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Serverfel");
      setSubmitted(true);
    } catch {
      alert("Något gick fel. Försök igen eller ring oss direkt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen">
      <section className="border-b border-slate-200 bg-slate-900 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-6 flex items-center gap-1 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Hem</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="text-white font-medium">Kontakt</span>
          </nav>
          <span className="mb-4 inline-block rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/70">Kontakta oss</span>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Kontakt</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300 leading-relaxed">Har du frågor eller vill ha en offert? Vi hör av oss inom 24 timmar.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <h2 className="text-xl font-bold text-slate-900">Kontaktuppgifter</h2>
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden">
              {[
                { icon: Phone, label: "Telefon", value: "+46 08-123 45 67" },
                { icon: Mail, label: "E-post", value: "info@poolpro.se" },
                { icon: MapPin, label: "Adress", value: "Poolvägen 12, Stockholm" },
                { icon: Clock, label: "Öppettider", value: "Mån–Fre 08–17" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><Icon className="h-5 w-5" /></div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                    <p className="mt-0.5 text-sm font-medium text-slate-700">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600"><CheckCircle2 className="h-8 w-8" /></div>
                  <h3 className="text-xl font-bold text-slate-900">Tack för ditt meddelande!</h3>
                  <p className="mt-2 text-slate-500">Vi återkommer inom 1–2 arbetsdagar.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="mt-6 rounded-xl border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-[#f5f5f5]">
                    Skicka ett nytt meddelande
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-slate-900">Skicka ett meddelande</h2>
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Namn *</label>
                        <input name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Anna Svensson"
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Telefon</label>
                        <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+46 70 123 45 67"
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">E-post *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="anna@example.com"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">Ärende *</label>
                      <select name="subject" required value={form.subject} onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100">
                        <option value="" disabled>Välj ärende...</option>
                        <option value="offert-pool">Offert – Pool</option>
                        <option value="offert-spabad">Offert – Spabad</option>
                        <option value="offert-bastu">Offert – Bastu</option>
                        <option value="helentreprenad">Helentreprenad</option>
                        <option value="service">Service & underhåll</option>
                        <option value="ovrigt">Övrigt</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">Meddelande *</label>
                      <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Berätta om ditt projekt..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 resize-none" />
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" disabled={loading}
                        className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-700 disabled:opacity-60">
                        {loading ? "Skickar..." : <><Send className="h-4 w-4" /> Skicka meddelande</>}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}