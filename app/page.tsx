"use client";
import Link from "next/link";
import Image from "next/image";
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

const steps = [
  { number: "01", title: "Schematisk design", description: "Vi tar fram en preliminär design utifrån dina önskemål och tomtens förutsättningar." },
  { number: "02", title: "Designutveckling", description: "Detaljerna i designen arbetas fram – material, teknik, färg och form." },
  { number: "03", title: "Konstruktionshandlingar", description: "Detaljerade ritningar och specifikationer tas fram inför byggnation." },
  { number: "04", title: "Byggledarskap", description: "Vi övervakar bygget och säkerställer att allt utförs enligt den godkända designen." },
];

const products = [
  { title: "Pool",       category: "Pool",       href: "/pool",           color: "bg-slate-500"   },
  { title: "Spabad",     category: "Spabad",     href: "/spabad",         color: "bg-stone-500"   },
  { title: "Swimspa",    category: "Spabad",     href: "/spabad/swimspa", color: "bg-slate-600"   },
  { title: "Bastu",      category: "Bastu",      href: "/bastu",          color: "bg-amber-900"   },
  { title: "Grillar",    category: "Grillar",    href: "/grillar",        color: "bg-stone-700"   },
  { title: "Tillbehör",  category: "Tillbehör",  href: "/tillbehor",      color: "bg-zinc-600"    },
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

            {/* Logo carousel */}
            <div className="rounded-2xl bg-[#efefef] overflow-hidden flex items-center h-[100px]">
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
    bg: "bg-slate-700",
    image: "/services/poolbyggnation.jpg",
  },
  {
    title: "Helentreprenad",
    href: "/helentreprenad",
    description: "Som helentreprenör tar vi ansvar för hela din poolanläggning — från mark till färdig pool. Vi koordinerar alla underentreprenörer och leverantörer. Du får en enda kontaktpunkt för hela projektet.",
    bg: "bg-stone-700",
    image: "/services/helentreprenad.jpg",
  },
  {
    title: "Service",
    href: "/kontakt",
    description: "Vi erbjuder professionell service för pool och spabad i hela Stockholmsområdet. Vår service omfattar allt från löpande underhåll till felsökning, reparationer samt öppning och stängning inför säsongen. Med regelbunden service säkerställer du att din anläggning fungerar optimalt, håller längre och ger en trygg badmiljö. Vi arbetar både med enstaka serviceuppdrag och återkommande serviceavtal, anpassade efter anläggningens behov och användning.",
    bg: "bg-zinc-700",
    image: "/services/service.jpg",
  },
];

function ServiceSection() {
  const [active, setActive] = useState(0);
  const current = serviceData[active];

  return (
    <section className="px-6 py-20 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Våra tjänster</p>
          <Link href="/tjanster" className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-900 transition-colors">
            Se alla <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {serviceData.map((s, i) => (
            <button
              key={s.title}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`w-full sm:flex-1 h-[110px] rounded-2xl font-bold text-lg cursor-pointer border-none transition-colors ${
                active === i ? "bg-slate-900 text-white" : "bg-[#f5f5f5] text-slate-700"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Image panel */}
        <Link href={current.href}>
          <div className={`relative overflow-hidden rounded-3xl ${current.bg} h-[260px] sm:h-[380px] lg:h-[500px] transition-all duration-300`}>
            {/* Background image */}
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover transition-opacity duration-500"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            {/* Cinematic overlay matching hero style */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
            {/* Info card */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto rounded-2xl bg-white/90 backdrop-blur-md p-6 max-w-sm shadow-xl">
              <h3 className="text-lg font-bold text-slate-900">{current.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-3 sm:line-clamp-none">{current.description}</p>
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
          <div className="relative overflow-hidden rounded-3xl h-[90vh] min-h-[520px]">
            <Image src="/hero.png" alt="Pool hero" fill className="object-cover" priority />
            <div className="absolute bottom-8 left-8 right-8 z-20 rounded-2xl bg-white p-8 shadow-2xl max-w-[420px]">
              <h1 className="font-black leading-tight text-slate-900 text-[2.2rem]">
                Sveriges nya standard för pool & spa.
              </h1>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Designade vattenmiljöer för moderna hem.
              </p>
              <div className="mt-5 flex gap-3">
                <Link href="/pool" className="rounded-2xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-700 transition-all px-6 py-4">
                  Se våra produkter
                </Link>
                <Link href="/kontakt" className="rounded-2xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all px-6 py-4">
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
