import PageShell from "@/app/Components/PageShell";
import ProductSearch from "@/app/Components/ProductSearch";
import { cirkulation, poolkonstruktion, pahlenPrice, type PahlenProduct } from "@/lib/pahlenProducts";

function subgroup(p: PahlenProduct): string {
  if (p.name.includes("P2000") || p.name.includes("P85")) return "Bronspumpar";
  if (p.name.toUpperCase().includes("VISE")) return "VISE-serien";
  if (p.name.includes("BADU")) return "BADU";
  if (p.name.includes("InverWhisper") || p.name.includes("InverPilot")) return "Agenturpumpar";
  return "Tillbehör";
}

const products = [
  ...cirkulation
    .filter(p => p.group === "Pumpar")
    .map(p => ({ ...p, group: subgroup(p), price: pahlenPrice(p.price), variants: p.variants?.map(v => ({ ...v, price: pahlenPrice(v.price) ?? v.price })) })),
  ...poolkonstruktion
    .filter(p => p.group === "SBM stommar")
    .map(p => ({ ...p, group: "SBM", price: pahlenPrice(p.price) })),
];

const descriptions: Record<string, string> = {
  "112201": "Klassisk bronspump för pooler upp till 55 m³/h. Välj motorstorlek T150, T220 eller T400.",
  "115201": "P2000FLO — förbättrad hydraulik och lägre energiförbrukning. T150/T220/T400.",
  "11224": "P85 T550 — kraftpump för stora anläggningar upp till 85 m³/h. Robust bronspump.",
  "11524": "P85FLO T550 — energioptimerad FLO-version för höga flöden.",
  "117303": "MiniVISE vs 0.6 kW — variabelvarvspump för pooler upp till 30 m³. Tyst och energisnål.",
  "117304": "MidiVISE vs 1.1 kW — nästa steg i VISE-serien, för pooler upp till 50 m³.",
  "118103": "WaterVISE HS75 — högtrycksvariant för vattenfall och attraktioner.",
  "118104": "WaterVISE HS110 — kraftfull högtryckspump.",
  "118123": "WaterVISE HT75 — högtempvärdig pump för värmesystemintegration.",
  "118124": "WaterVISE HT110 — kraftfull högtempump.",
  "119104": "FloVISE TS110 — toppventil-variant med flödesoptimerad hydraulik.",
  "119122": "FloVISE TT55 — kompakt direktkopplad pump med topptillflöde.",
  "119123": "FloVISE TT75 — mellanstorlek i FloVISE-serien.",
  "119124": "FloVISE TT110 — full effekt med direkttillflöde.",
  "119303": "MiniVISE Flo vs 0.6 kW — flödesoptimerad variabelvarvspump.",
  "119304": "MidiVISE Flo vs 1.1 kW — energisnål VS-pump med FLO-hydraulik.",
  "115635": "BADU Top25 — pålitlig cirkulationspump för standardpooler.",
  "115645": "BADU Profi Eco VS 1.40 kW — variabel hastighet med A++-energiklass.",
  "14992001": "InverWhisper 1.5 kW — ultratyss inverterpump.",
  "14992002": "InverPilot 1.1 kW — kompakt inverterpump med låg startström.",
  "14992003": "InverPilot 1.5 kW — högre effekt i InverPilot-serien.",
  "112330": "Styrbox för pumpar 1.1–1.6 A. Skyddar och styr pumpmotorn.",
  "112331": "Styrbox 1.4–2.0 A.",
  "112332": "Styrbox 1.8–2.5 A.",
  "112333": "Styrbox 2.2–3.2 A.",
  "112335": "Styrbox 3.5–5.0 A.",
  "112336": "Styrbox 4.5–6.3 A.",
  "112337": "Styrbox 5.5–8.0 A.",
  "112338": "Styrbox 7.0–10.0 A.",
  "1303000": "Piezo-kontroll för manuell pumpstyrning.",
  "117100": "Extern vridbrytare för VISE-pumpar.",
  "115820": "Pump Micro 33 — liten cirkulationspump för spabad och mindre system.",
  "1156601": "SBM S8 — 8 m³/h kapacitet, enkelfas.",
  "1156603": "SBM T8 — trefasad, 8 m³/h.",
  "1156611": "SBM S12 — 12 m³/h kapacitet, enkelfas.",
  "1156613": "SBM T12 — trefas, 12 m³/h.",
  "1156621": "SBM S14 — 14 m³/h enkelfas.",
  "1156623": "SBM T14 — trefas, 14 m³/h.",
  "1156651": "SBM Eco — energioptimerad SBM-pump med lägre driftkostnad.",
};

export const metadata = { title: "Pumpar | Elite Pool & Spa" };

export default function PumparPage() {
  return (
    <PageShell
      title="Pumpar"
      description="Bronspump P2000 och P85, VISE-serien, BADU, SBM och agenturpumpar från Pahlén — med styrboxar och tillbehör för komplett installation."
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Tillbehör & Reservdelar", href: "/pool/tillbehor" },
        { label: "Rening och cirkulation", href: "/pool/tillbehor/cirkulation" },
        { label: "Pumpar" },
      ]}
      badge="Pahlén"
      count={products.length}
    >
      <ProductSearch products={products} descriptions={descriptions} />
    </PageShell>
  );
}
