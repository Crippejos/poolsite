import Link from "next/link";

export const metadata = { title: "Om oss | PoolPro" };

const team = [
  {
    name: "Christian Svengard",
    role: "Grundare och VD",
    email: "christian@poolpro.se",
    bg1: "bg-slate-200",
    bg2: "bg-slate-400",
  },
  {
    name: "Jonas Kalms",
    role: "Administration, beställningar och projektering",
    email: "jonas@poolpro.se",
    bg1: "bg-stone-200",
    bg2: "bg-stone-400",
  },
  {
    name: "John Rickfält",
    role: "Pool- och spatekniker, försäljning",
    email: "john@poolpro.se",
    bg1: "bg-zinc-200",
    bg2: "bg-zinc-400",
  },
  {
    name: "Tobias Jönsson",
    role: "Pool- och spatekniker, försäljning",
    email: "tobias@poolpro.se",
    bg1: "bg-neutral-200",
    bg2: "bg-neutral-400",
  },
  {
    name: "Anders Svengard",
    role: "Telefonist och kundmottagning",
    email: "anders@poolpro.se",
    bg1: "bg-slate-300",
    bg2: "bg-[#f5f5f5]0",
  },
  {
    name: "Kristoffer Svensson",
    role: "Fotograf / Marknadsföring / Webbredaktör",
    email: "kristoffer@poolpro.se",
    bg1: "bg-stone-300",
    bg2: "bg-stone-500",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── About section ── */}
      <section className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">

            {/* Left — text */}
            <div>
              <h1 className="text-4xl font-black text-slate-900 sm:text-5xl">Om Elite pool & spa</h1>
              <div className="mt-6 space-y-4 text-sm text-slate-500 leading-relaxed">
                <p>Elite Pool & Spa Sverige AB har sin grund i NV Poolservice, som startades redan 2012 som enskild firma av Christian Svengard. Efter flera års arbete med poolservice, underhåll och tekniska lösningar byggdes den gedigen erfarenheten och en stadig kundbas upp i Stockholmsområdet.</p>
                <p>När efterfrågan på mer omfattande och sammanhållna lösningar ökade, växte Elite Pool & Spa fram. År 2020 togs nästa steg och verksamheten utvecklades till Elite Pool & Spa Sverige AB — med ett tydligt fokus på helhetslösningar inom pool och spa, där kvalitet, personlig service och långsiktiga relationer står i centrum.</p>
                <p>Vi utgår från <strong className="text-slate-900">Nacka och Värmdö</strong>, men arbetar med kunder i <strong className="text-slate-900">hela Stockholmsområdet</strong>. Som erfarna poolbyggare i Stockholm hjälper vi både nya och befintliga poolägare med allt från idé och planering till färdig anläggning och löpande poolservice.</p>
                <p>Elite Pool & Spa erbjuder helhetslösningar för pool och spa, vilket innebär att vi tar ansvar för hela processen, oavsett om det gäller nybyggnation med arkitektur, renovering, installation eller service och underhåll av pooler. Vi arbetar med alla typer av anläggningar och anpassar varje projekt efter kundens behov, förutsättningar och önskemål.</p>
                <p>För oss är personlig kontakt och tydlig kommunikation en självklar del av arbetet. Vi vill att du som kund ska känna dig trygg genom hela projektet, från första mötet till färdig anläggning och vidare i det löpande underhållet.</p>
              </div>
            </div>

            {/* Right — image */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-200 aspect-[4/5]"
              style={{ backgroundImage: "radial-gradient(ellipse at 40% 40%, #94a3b8 0%, #64748b 100%)" }}>
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs uppercase tracking-widest">
                Företagsbild här
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Team section ── */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black text-slate-900 mb-10">Team</h2>

          <style>{`
            .team-card .img2 { opacity: 0; transition: opacity 0.4s ease; }
            .team-card:hover .img2 { opacity: 1; }
            .team-card:hover .img1 { opacity: 0; }
            .img1 { transition: opacity 0.4s ease; }
          `}</style>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="team-card group relative overflow-hidden rounded-2xl cursor-pointer">
                {/* Image 1 */}
                <div className={`img1 absolute inset-0 ${member.bg1}`}
                  style={{ backgroundImage: `radial-gradient(ellipse at 30% 40%, white 0%, transparent 70%)` }} />
                {/* Image 2 */}
                <div className={`img2 absolute inset-0 ${member.bg2}`}
                  style={{ backgroundImage: `radial-gradient(ellipse at 70% 60%, white 0%, transparent 70%)` }} />

                {/* Content */}
                <div className="relative aspect-[4/3]" />
                <div className="relative bg-white px-5 py-4">
                  <h3 className="font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{member.role}</p>
                  <a href={`mailto:${member.email}`} className="text-xs text-slate-400 hover:text-slate-700 transition-colors mt-1 block">
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}