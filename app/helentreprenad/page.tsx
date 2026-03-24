import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/app/Components/Breadcrumb";

export const metadata = { title: "Helentreprenad | Elite Pool & Spa" };

const steps = [
  { num: "01", title: "Möte & planering",        desc: "Vi träffas på plats, går igenom dina önskemål och bedömer förutsättningarna på din tomt." },
  { num: "02", title: "Projektering",             desc: "Vi tar fram ritningar, väljer material och teknik, och sätter samman ett komplett anbud." },
  { num: "03", title: "Samordning",               desc: "Vi koordinerar alla underentreprenörer — grävare, elektriker, snickare och pooltekniker." },
  { num: "04", title: "Byggnation",               desc: "Bygget utförs med precision. Du har en kontakt och vi rapporterar löpande om framdriften." },
  { num: "05", title: "Besiktning & driftsättning", desc: "Vi besiktigar anläggningen tillsammans och utbildar dig i drift och underhåll." },
  { num: "06", title: "Löpande service",          desc: "Vi erbjuder serviceavtal så att din anläggning håller sig i toppskick år efter år." },
];

const included = [
  "Mark- och schaktarbete",
  "Poolinstallation komplett",
  "El och belysning",
  "Värme och filtreringssystem",
  "Terrassering och utemiljö",
  "Pooltak och överdrag",
  "Besiktning och driftsättning",
  "Utbildning och dokumentation",
];

const reasons = [
  { title: "En kontaktperson",   desc: "Du kommunicerar bara med oss — vi hanterar alla underleverantörer och koordinerar hela projektet." },
  { title: "Fast pris",          desc: "Vi ger ett komplett anbud utan dolda kostnader. Du vet exakt vad projektet kostar från start." },
  { title: "Beprövad process",   desc: "Vi har genomfört hundratals projekt. Vår process är inarbetad, effektiv och kvalitetssäkrad." },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Breadcrumb ── */}
      <div className="px-6 pt-4 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb crumbs={[{ label: "Helentreprenad" }]} />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="pt-4 flex justify-center">
        <div className="w-[90%]">
          <div className="relative overflow-hidden rounded-3xl h-[90vh] bg-slate-800">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">Tjänster</p>
              <div className="inline-block bg-white rounded-2xl px-6 py-3">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Helentreprenad</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Value intro ── */}
      <section className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Vad är helentreprenad?</p>
              <h2 className="text-4xl font-black text-slate-900 leading-tight">Vi tar ansvar för hela projektet — du kopplar av.</h2>
              <p className="mt-5 text-sm text-slate-500 leading-relaxed">
                Som helentreprenör hanterar vi allt från första skiss till nyckelfärdig anläggning. Du slipper koordinera hantverkare, hantera leveranser eller följa upp underentreprenörer. Vi är din enda kontaktpunkt.
              </p>
              <Link href="/kontakt"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-700 transition-all">
                Begär offert <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {reasons.map((r) => (
                <div key={r.title} className="rounded-2xl bg-[#f5f5f5] p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{r.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20 bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Processen</p>
          <h2 className="text-3xl font-black text-slate-900 mb-12">Så här arbetar vi</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-6 border border-slate-100">
                <div className="text-xs font-black font-mono text-slate-300 mb-4 text-4xl leading-none">{step.num}</div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Ingår alltid</p>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Vad ingår i helentreprenaden?</h2>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                Alla projekt är unika men nedanstående ingår alltid i vår helentreprenad. Inget extra, inga överraskningar.
              </p>
            </div>
            <div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
                    <div className="h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20 bg-slate-900">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">Redo att sätta igång?</h2>
          <p className="mt-4 text-sm text-slate-400 max-w-md mx-auto">Kontakta oss för ett kostnadsfritt möte. Vi går igenom ditt projekt och tar fram ett komplett anbud utan förpliktelser.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/kontakt" className="rounded-full bg-white px-7 py-3 font-bold text-slate-900 hover:bg-slate-100 transition-all">
              Boka möte
            </Link>
            <Link href="/om-oss" className="rounded-full border border-white/20 px-7 py-3 font-bold text-white hover:bg-white/10 transition-all">
              Om oss
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
