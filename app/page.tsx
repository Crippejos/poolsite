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
  { title: "Infinity Pool", category: "Pool", href: "/pool", color: "bg-slate-500" },
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
              <div ref={yearsRef} className="rounded-2xl bg-slate-100 p-6 text-center">
                <div className="text-4xl font-black text-slate-900">{years}+</div>
                <div className="mt-1 text-sm text-slate-400">Års erfarenhet</div>
              </div>
              <div ref={customersRef} className="rounded-2xl bg-slate-100 p-6 text-center">
                <div className="text-4xl font-black text-slate-900">{customers}+</div>
                <div className="mt-1 text-sm text-slate-400">Nöjda kunder</div>
              </div>
            </div>

            {/* Logo carousel — same height as stat boxes */}
            <div className="rounded-2xl bg-slate-100 overflow-hidden flex items-center" style={{ height: "100px" }}>
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

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* ── Hero ── */}
      <section className="pt-4 pb-0 flex justify-center">
        <div className="w-[90%]">
          <div className="relative overflow-hidden rounded-3xl" style={{ height: "90vh", minHeight: "520px" }}>
            <img src="/hero.png" alt="Pool hero" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-8 left-8 z-20 w-72 sm:w-80 rounded-2xl bg-white p-7 shadow-2xl">
              <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Sveriges nya standard för pool & spa.
              </h1>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Designade vattenmiljöer för moderna hem.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/pool" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-700 transition-all">
                  Se våra produkter
                </Link>
                <Link href="/kontakt" className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
                  Kontakta oss
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartnersSection />

      {/* ── Services ── */}
      <section className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">Våra tjänster</p>
          <div className="flex gap-2 mb-8 flex-wrap">
            {services.map((s, i) => (
              <div key={s.tab}
                className={`rounded-full px-5 py-2 text-sm font-semibold cursor-default transition-all ${i === 0 ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-500 hover:text-slate-900"}`}>
                {s.tab}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              {services[0].description.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-slate-500 leading-relaxed">{para}</p>
              ))}
              <div className="pt-2">
                <Link href="/helentreprenad"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                  Tjänster <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-slate-100 min-h-72"
              style={{ backgroundImage: "radial-gradient(ellipse at 40% 60%, #cbd5e1 0%, #94a3b8 100%)" }}>
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs uppercase tracking-widest">
                Pool bild här
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20 bg-slate-50">
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
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20 bg-slate-50">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Redo att börja?</h2>
          <p className="mt-4 text-sm text-slate-500 max-w-md mx-auto">Kontakta oss för en kostnadsfri konsultation. Vi svarar inom 24 timmar.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/kontakt" className="rounded-full bg-slate-900 px-7 py-3 font-bold text-white hover:bg-slate-700 transition-all">
              Kontakta oss
            </Link>
            <Link href="/showroom" className="rounded-full border border-slate-200 px-7 py-3 font-bold text-slate-700 hover:bg-slate-100 transition-all">
              Besök showroom
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}