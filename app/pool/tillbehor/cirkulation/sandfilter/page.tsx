import PageShell from "@/app/Components/PageShell";
import ProductSearch from "@/app/Components/ProductSearch";
import { cirkulation, pahlenPrice } from "@/lib/pahlenProducts";

const products = cirkulation
  .filter(p => p.group === "Sandfilter" || p.group === "Filter tillbehör")
  .map(p => ({
    ...p,
    price: pahlenPrice(p.price),
    variants: p.variants?.map(v => ({ ...v, price: pahlenPrice(v.price) ?? v.price })),
  }));

const descriptions: Record<string, string> = {
  "2120156": "Komplett sandfilter 400 mm med 6-vägsventil. Perfekt för mindre pooler upp till 20 m³.",
  "215000": "Purgo Top 400 med toppmonterad ventil. Tyst och effektiv filtrering för pooler upp till 30 m³.",
  "215001": "Purgo Top 510 — kompakt toppspolfilter för pooler upp till 45 m³. Enkel betjäning.",
  "215002": "Purgo Top 620 — klarar pooler upp till 65 m³. Robust konstruktion med 1½-tums anslutning.",
  "215011": "Mundo 510 med sidoventil för pooler upp till 45 m³. Glasfiberarmerad tank.",
  "215012": "Mundo 620 med sidoventil för pooler upp till 65 m³. Tålig och driftssäker.",
  "215013": "Mundo 750 med 2-tums sidoventil för pooler upp till 90 m³. Hög kapacitet.",
  "215022": "Altus 620 med 1,2 m hög tank och rak-diffusor. Idealisk för krävande installationer.",
  "215023": "Altus 750 — hög tank med rak-diffusor, 2-tums ventil. För pooler upp till 120 m³.",
  "215024": "Altus 900 — stor kapacitet, 1,2 m tank med rak-diffusor. För pooler upp till 180 m³.",
  "215032": "Altus 620 FDB — toppprestanda med bottenanslutning för diskret rörinstallation.",
  "215033": "Altus 750 FDB med bottenanslutning. Hög genomströmning och minimalt underhåll.",
  "215034": "Altus 900 FDB — maxkapacitet med bottenanslutning för stora anläggningar.",
  "215040": "Altus 620 med 1,0 m tank och rak-diffusor. Kompaktare alternativ med hög prestanda.",
  "215041": "Altus 750 med 1,0 m tank. Bra balans mellan storlek och kapacitet.",
  "215042": "Altus 900 med 1,0 m tank för pooler upp till 180 m³.",
  "215051": "Mundo Plus 510 — uppgraderad version med förbättrad diffusor och ventil.",
  "215052": "Mundo Plus 620 med förbättrad hydraulik för effektivare rening.",
  "215053": "Mundo Plus 750 — hög kapacitet med Mundo Plus-teknik.",
  "215054": "Mundo Plus 900 — störst i Mundo Plus-serien, för pooler upp till 200 m³.",
  "216000": "Sandfilter Tech Pro Ø 500 — professionellt filter med glasfibertank och 6-vägsventil.",
  "216001": "Sandfilter Tech Pro Ø 610 för medelstora pooler. Robust och lättskött.",
  "216002": "Sandfilter Tech Pro Ø 765 — maxkapacitet i Tech Pro-serien.",
  "219345": "Manometerpanel med 2 manometrar för tryckövervakning före och efter filtret.",
  "12220": "Filtersand 0.6–0.8 mm, 25 kg. Standard filtersand för de flesta sandfilter.",
  "122201": "Filtersand 1.2–2 mm, 25 kg. Grövre sand för ökad genomströmning.",
  "122203": "Filtersand 3–5 mm, 20 kg. Bottenskikt för förbättrad dränering i filtret.",
  "122205": "AFM® filtermedia grade 1 (0.4–0.8 mm), 21 kg. Aktiverat glasmedia — renare vatten än sand.",
  "122206": "AFM® filtermedia grade 2 (0.7–2.0 mm), 21 kg. Grovt skikt i kombination med grade 1.",
  "122207": "AFM® filtermedia grade 3 (2.0–4.0 mm), 21 kg. Bottenskikt för maximalt flöde.",
  "122208": "Aktivt kol 50 liter (1.18–2.36 mm). Tar bort kloramin och organiska föroreningar.",
  "122209": "AFM® DIN 0.7–1.2 mm, 25 kg. Certifierad enligt DIN-standard för kommunala anläggningar.",
  "33070": "Besgo automatisk backspolningsenhet, vattendrift. Sporlar filtret automatiskt.",
  "33071": "Besgo automatisk backspolning, tryckluftdrift. Effektivare backspolning med luft och vatten.",
  "33072": "Besgo 63 mm automatisk backspolning, vattendrift. För större rördiametrar.",
  "33073": "Besgo 63 mm automatisk backspolning, tryckluft. Maxkapacitet för stora filter.",
  "415500": "ZPM DN50 2-tums poolventil. Manuell flödeskontroll i cirkulationssystemet.",
  "415502": "Dryden floc-pump för APF-flockningsmedel (3.2–240 ml/h). Håller vattnet kristallklart.",
  "415505": "Besgo 3/2-ventil DN40 (50 mm). Pneumatiskt manövrerad 3-vägsventil.",
  "415506": "Besgo 3/2-ventil DN50 (63 mm). Standard för de flesta poolinstallationer.",
  "415507": "Installationsenhet 3/8 tum för Besgo-system.",
  "415508": "Anslutningssats för 1 kompressor till Besgo (1/4-tum).",
  "415509": "Magnetventil 3/2 230V för Besgo-system. Automatisk styrning.",
  "415510": "ZPM DN40 1.5-tums poolventil.",
  "415512": "Besgo 3-vägsventil DN40 (50 mm) — fördelar flödet i tre riktningar.",
  "415513": "Besgo 3-vägsventil DN50 (63 mm). Vanligast i privata poolsystem.",
  "415514": "Besgo 3-vägsventil DN65 (75 mm) för höga flöden.",
  "415517": "Besgo 2.5-tums ventil DN65 (75 mm), 250 mm lång.",
  "415518": "Besgo 5-vägsventil DN50 (63 mm) — för komplexa rörsystem.",
  "415520": "Kompressor Einhell 8 bar 230V för pneumatisk Besgo-drift.",
  "415541": "Besgo 4-tums ventil DN100 (110 mm) för stora anläggningar.",
  "415542": "Besgo 3-tums ventil DN80 (90 mm).",
  "415523": "FlowVis flödesmätare 63 mm (2.4–24 m³/h) SPACE-modell. Mät exakt flöde direkt i röret.",
  "415524": "FlowVis flödesmätare 75 mm (7.0–45 m³/h) SPACE-modell.",
  "415526": "FlowVis Digital Flow kit — komplett digital flödesmätning med display.",
  "415540": "FlowVis flödesmätare 75 mm (7.0–45 m³/h) standard.",
  "516401": "Förbindelserör med termostatanslutning för värmesystem.",
};

export const metadata = { title: "Sandfilter | Elite Pool & Spa" };

export default function SandfilterPage() {
  return (
    <PageShell
      title="Sandfilter"
      description="Sandfilter från Purgo, Mundo, Altus och Tech Pro-serien — kompletta med filtersand, AFM-media, Besgo-ventiler och FlowVis-flödesmätare."
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Tillbehör & Reservdelar", href: "/pool/tillbehor" },
        { label: "Rening och cirkulation", href: "/pool/tillbehor/cirkulation" },
        { label: "Sandfilter" },
      ]}
      badge="Pahlén"
      count={products.length}
    >
      <ProductSearch products={products} descriptions={descriptions} />
    </PageShell>
  );
}
