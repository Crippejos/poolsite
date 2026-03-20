import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Tjänster | Elite Pool & Spa" };

const services = [
  {
    num: "01",
    title: "Poolbyggnation",
    href: "/pool",
    description:
      "Vi erbjuder kompletta helhetslösningar inom pool — både nybyggnationer och renoveringar. Från första idé till färdig pool tar vi ansvar för hela projektet och samordnar alla yrkesgrupper.",
    tags: ["Nybyggnation", "Renovering", "Alla pooltyper"],
  },
  {
    num: "02",
    title: "Helentreprenad",
    href: "/helentreprenad",
    description:
      "Som helentreprenör hanterar vi allt från markarbete till nyckelfärdig anläggning. Du har en kontaktpunkt — vi koordinerar grävare, elektriker, snickare och pooltekniker.",
    tags: ["En kontaktpunkt", "Fast pris", "Komplett ansvar"],
  },
  {
    num: "03",
    title: "Service & underhåll",
    href: "/kontakt",
    description:
      "Vi erbjuder löpande underhåll, felsökning, reparationer samt öppning och stängning inför säsongen. Serviceavtal eller enstaka uppdrag — vi anpassar oss efter dina behov.",
    tags: ["Serviceavtal", "Reparationer", "Vattenkvalitet"],
  },
  {
    num: "04",
    title: "Renovering",
    href: "/kontakt",
    description:
      "Har du en befintlig pool som behöver fräschas upp? Vi renoverar äldre anläggningar — ny liner, nytt tekniskt system, ny kakel eller full ombyggnation.",
    tags: ["Liner-byte", "Tekniksystem", "Ombyggnation"],
  },
  {
    num: "05",
    title: "Projektering & design",
    href: "/kontakt",
    description:
      "Vi hjälper dig ta fram ritningar, schematiska designer och konstruktionshandlingar. Oavsett om det är ett enklare poolprojekt eller en komplex anläggning med spa och bastu.",
    tags: ["Ritningar", "3D-design", "Konstruktionshandlingar"],
  },
  {
    num: "06",
    title: "Spa & bastu-installation",
    href: "/spabad",
    description:
      "Vi installerar spabad och bastur från grunden — inklusive el, VVS och inbyggnad. Vi hjälper dig välja rätt modell och placering för din tomt och livsstil.",
    tags: ["Spabad", "Bastu", "Installation"],
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="pt-4 flex justify-center">
        <div className="w-[90%]">
          <div className="relative overflow-hidden rounded-3xl h-[90vh] bg-slate-700">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">Elite Pool & Spa</p>
              <div className="inline-block bg-white rounded-2xl px-6 py-3">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tjänster</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Vad vi erbjuder</p>
              <h2 className="text-4xl font-black text-slate-900 leading-tight sm:text-5xl">
                Allt från idé till färdig anläggning.
              </h2>
            </div>
            <div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Vi är en komplett partner för pool, spa, bastu och utomhusmiljö. Oavsett om du behöver ett enskilt serviceuppdrag eller ett helhetsprojekt med full koordinering — vi tar ansvar från start till mål.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services list ── */}
      <section className="px-6 pb-24 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="divide-y divide-slate-100">
            {services.map((service) => (
              <Link
                key={service.num}
                href={service.href}
                className="group flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-10 hover:bg-[#fafafa] -mx-6 px-6 sm:-mx-12 sm:px-12 lg:-mx-20 lg:px-20 transition-colors"
              >
                {/* Number */}
                <span className="font-mono text-xs font-bold text-slate-300 sm:w-10 shrink-0 mt-1">{service.num}</span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-slate-700 transition-colors">{service.title}</h3>
                    <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-1 transition-all mt-0.5" />
                  </div>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-2xl">{service.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20 bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-black text-slate-900">Redo att starta ditt projekt?</h2>
          <p className="mt-4 text-sm text-slate-500 max-w-md mx-auto">
            Kontakta oss för en kostnadsfri konsultation. Vi svarar inom 24 timmar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/kontakt" className="rounded-full bg-slate-900 px-7 py-3 font-bold text-white hover:bg-slate-700 transition-all">
              Kontakta oss
            </Link>
            <Link href="/helentreprenad" className="rounded-full border border-slate-200 px-7 py-3 font-bold text-slate-700 hover:bg-white transition-all">
              Om helentreprenad
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
