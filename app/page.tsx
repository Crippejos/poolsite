"use client";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const timer = setInterval(() => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress === 1) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const services = [
  {
    tab: "Poolbyggnation",
    description: "Vi levererar kompletta poolanläggningar för moderna hem. Från den inledande projekteringen till den färdiga poolen — vi hanterar hela byggprocessen med precision och kvalitet.\n\nVi arbetar med beprövade metoder och samarbetspartners inom branschen. Vår erfarenhet säkerställer att varje projekt levereras i tid och inom budget.\n\nGenom att erbjuda ett brett utbud av pooltyper kan vi skräddarsy varje projekt efter kundens önskemål.",
  },
  { tab: "Helentreprenad", description: "Som helentreprenör tar vi ansvar för hela din poolanläggning." },
  { tab: "Service", description: "Vi erbjuder komplett service och underhåll för pooler och spabad." },
];

const steps = [
  { number: "01", title: "Schematic Design", description: "Where a preliminary design is conceived." },
  { number: "02", title: "Design Development", description: "Where details of the design are fleshed out." },
  { number: "03", title: "Construction Documents", description: "Where detailed drawings and specifications are created." },
  { number: "04", title: "Construction Administration", description: "Where the building is overseen during construction to ensure it is built according to the design." },
];

const products = [
  { title: "Utomhuspool", category: "Pool", href: "/pool", color: "bg-stone-400" },
  { title: "Infinity Pool", category: "Pool", href: "/pool", color: "bg-[#f5f5f5]0" },
  { title: "Spabad", category: "Spabad", href: "/spabad", color: "bg-zinc-400" },
  { title: "Swimspa", category: "Spabad", href: "/spabad/swimspa", color: "bg-neutral-500" },
  { title: "Vildmarksspa", category: "Spabad", href: "/spabad/vildmarksspa", color: "bg-stone-500" },
  { title: "Bastu", category: "Bastu", href: "/bastu", color: "bg-slate-400" },
];

const partners = [
  { name: "Pahlen", logo: "/Pahlen.png" },
  { name: "Gullberg & Jansson", logo: "/gullberg.png" },
  { name: "CF Group", logo: "/CFgroup.png" },
  { name: "Fluidra", logo: "/Fluidra.png" },
];

function PartnersSection() {
  const { count: years, ref: yearsRef } = useCountUp(15);
  const { count: customers, ref: customersRef } = useCountUp(1000, 2500);

  return (
    <section className="border-b border-slate-100 px-6 py-16 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Våra samarbetspartners</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div ref={yearsRef} className="rounded-2xl bg-[#efefef] p-6 text-center">
                <div className="text-4xl font-black text-slate-900">{years}+</div>
                <div className="mt-1 text-sm text-slate-400">Års erfarenhet</div>
              </div>
              <div ref={customersRef} className="rounded-2xl bg-[#efefef] p-6 text-center">
                <div className="text-4xl font-black text-slate-900">{customers}+</div>
                <div className="mt-1 text-sm text-slate-400">Nöjda kunder</div>
              </div>
            </div>

            {/* Logo carousel — same height as stat boxes */}
            <div className="rounded-2xl bg-[#efefef] overflow-hidden flex items-center" style={{ height: "100px" }}>
              <style>{`
                @keyframes marquee {
                  from { transform: translateX(0); }
                  to { transform: translateX(-50%); }
                }
                .animate-marquee {
                  animation: marquee 20s linear infinite;
                  will-change: transform;
                }
              `}</style>
              <div className="flex animate-marquee whitespace-nowrap items-center">
                {[...partners, ...partners].map((partner, i) => (
                  <div key={i} className="inline-flex items-center mx-10 shrink-0">
                    <img src={partner.logo} alt={partner.name} className="h-8 max-w-[120px] object-contain opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const serviceData = [
  {
    title: "Poolbyggnation",
    href: "/pool",
    description: "Vi erbjuder kompletta helhetslösningar inom pool, både för nybyggnationer och renoveringar av befintliga poolanläggningar. Hos Elite Pool & Spa får du en trygg partner som tar ansvar för hela projektet - från första idé till färdig pool. Vi hjälper till med planering, utformning och teknikval samt samordnar vid behov underentreprenörer såsom elektriker, snickare och andra yrkesgrupper. På så sätt får du en smidig process med en tydlig kontakt genom hela projektet.",
    bg: "bg-slate-400",
  },
  {
    title: "Helentreprenad",
    href: "/helentreprenad",
    description: "Som helentreprenör tar vi ansvar för hela din poolanläggning — från mark till färdig pool. Vi koordinerar alla underentreprenörer och leverantörer. Du får en enda kontaktpunkt för hela projektet.",
    bg: "bg-stone-400",
  },
  {
    title: "Service",
    href: "/kontakt",
    description: "Vi erbjuder professionell service för pool och spabad i hela Stockholmsområdet. Vår service omfattar allt från löpande underhåll till felsökning, reparationer samt öppning och stängning inför säsongen. Med regelbunden service säkerställer du att din anläggning fungerar optimalt, håller längre och ger en trygg badmiljö. Vi arbetar både med enstaka serviceuppdrag och återkommande serviceavtal, anpassade efter anläggningens behov och användning. Genom vår breda tekniska kompetens kan vi snabbt identifiera problem och föreslå hållbara lösningar, alltid med fokus på driftsäkerhet, vattenkvalitet och långsiktig funktion.",
    bg: "bg-zinc-400",
  },
];

function ServiceSection() {
  const [active, setActive] = useState(0);
  const current = serviceData[active];

  return (
    <section className="px-6 py-20 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">Våra tjänster</p>

       {/* Buttons */}
        <div style={{ display: "flex", gap: "24px", marginBottom: "24px", flexWrap: "wrap" }}>
          <button onMouseEnter={() => setActive(0)} onClick={() => setActive(0)}
            style={{ flex: 1, height: "110px", borderRadius: "16px", fontWeight: "bold", fontSize: "18px", cursor: "pointer", border: "none", background: active === 0 ? "#0f172a" : "#f5f5f5", color: active === 0 ? "white" : "#334155" }}>
            Poolbyggnation
          </button>
          <button onMouseEnter={() => setActive(1)} onClick={() => setActive(1)}
            style={{ flex: 1, height: "110px", borderRadius: "16px", fontWeight: "bold", fontSize: "18px", cursor: "pointer", border: "none", background: active === 1 ? "#0f172a" : "#f5f5f5", color: active === 1 ? "white" : "#334155" }}>
            Helentreprenad
          </button>
          <button onMouseEnter={() => setActive(2)} onClick={() => setActive(2)}
            style={{ flex: 1, height: "110px", borderRadius: "16px", fontWeight: "bold", fontSize: "18px", cursor: "pointer", border: "none", background: active === 2 ? "#0f172a" : "#f5f5f5", color: active === 2 ? "white" : "#334155" }}>
            Service
          </button>
        </div>

        {/* Image panel */}
        <Link href={current.href}>
          <div className={`relative overflow-hidden rounded-3xl ${current.bg} transition-all duration-300`} style={{ height: "500px" }}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs uppercase tracking-widest">
              Tjänst bild här
            </div>
            <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 backdrop-blur p-6 max-w-sm">
              <h3 className="text-lg font-bold text-slate-900">{current.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{current.description}</p>
            </div>
          </div>
        </Link>

      </div>
    </section>
  );
}
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

    {/* ── Hero ── */}
      <section className="pt-4 pb-0 flex justify-center">
        <div className="w-[90%]">
          <div className="relative overflow-hidden rounded-3xl" style={{ height: "90vh", minHeight: "520px" }}>
            <img src="/hero.png" alt="Pool hero" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-8 left-8 right-8 z-20 rounded-2xl bg-white p-8 shadow-2xl" style={{ maxWidth: "420px" }}>
              <h1 className="font-black leading-tight text-slate-900" style={{ fontSize: "2.2rem" }}>
                Sveriges nya standard för pool & spa.
              </h1>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Designade vattenmiljöer för moderna hem.
              </p>
              <div className="mt-5 flex gap-3">
                <Link href="/pool" className="rounded-2xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-700 transition-all" style={{ padding: "16px 24px" }}>
                  Se våra produkter
                </Link>
                <Link href="/kontakt" className="rounded-2xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all" style={{ padding: "16px 24px" }}>
                  Kontakta oss
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartnersSection />

    {/* ── Services ── */}
      <ServiceSection />

      {/* ── Why us ── */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20 bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black leading-tight text-slate-900">Varför elite pool & spa?</h2>
              <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-sm">
                Elite Pool & Spa är ett modernt poolbyggarföretag med inriktning på moderna hem. Vi kombinerar hantverksskicklighet med innovativ design.
              </p>
              <Link href="/om-oss"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-white transition-all">
                Om oss <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="space-y-5">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-4 border-b border-slate-200 pb-5 last:border-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{step.title}</h3>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Products grid ── */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl font-black text-slate-900">Våra produkter</h2>
            <Link href="/pool" className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-900 transition-colors">
              Se alla <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <Link key={product.title} href={product.href}
                className={`group relative overflow-hidden rounded-2xl ${product.color} aspect-[4/3] flex flex-col justify-end p-5 hover:opacity-90 transition-all`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="relative">
                  <p className="text-xs text-white/70 uppercase tracking-widest">{product.category}</p>
                  <h3 className="text-sm font-bold text-white">{product.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20 bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Redo att börja?</h2>
          <p className="mt-4 text-sm text-slate-500 max-w-md mx-auto">Kontakta oss för en kostnadsfri konsultation. Vi svarar inom 24 timmar.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/kontakt" className="rounded-full bg-slate-900 px-7 py-3 font-bold text-white hover:bg-slate-700 transition-all">
              Kontakta oss
            </Link>
            <Link href="/showroom" className="rounded-full border border-slate-200 px-7 py-3 font-bold text-slate-700 hover:bg-[#efefef] transition-all">
              Besök showroom
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}