import { notFound } from "next/navigation";
import PageShell from "@/app/Components/PageShell";
import ProductSearch from "@/app/Components/ProductSearch";
import {
  bassangutrustning,
  cirkulation,
  poolkonstruktion,
  uppvarmning,
  vattenrening,
  pahlenPrice,
  type PahlenProduct,
} from "@/lib/pahlenProducts";

// ── Derived product groups ──────────────────────────────────────────────────

const ATTRACTION_GROUPS = ["Jet Swim", "Massage", "Vattenfall & Kanoner"];
const LIGHTING_GROUPS   = ["Belysning Marine", "Belysning Classic", "Inbyggnadsdetaljer"];
const DOSING_GROUPS     = ["MiniMaster", "Autodos", "UV-rening", "Saltklorinatorer", "ASEKO"];

const komplettaPaket: PahlenProduct[] = [
  ...cirkulation.filter(p => /^343/.test(p.sku)),
  ...uppvarmning.filter(p => /^344/.test(p.sku)),
];

// ── Price-lifted wrappers (apply 1.25 markup) ──────────────────────────────

function withMarkup(products: PahlenProduct[]): PahlenProduct[] {
  return products.map(p => ({
    ...p,
    price: pahlenPrice(p.price),
    variants: p.variants?.map(v => ({ ...v, price: pahlenPrice(v.price) ?? v.price })),
  }));
}

// ── Category map ────────────────────────────────────────────────────────────

const categoryMap: Record<string, { label: string; desc: string; products: PahlenProduct[] }> = {
  "kompletta-poolpaket": {
    label: "Kompletta poolpaket",
    desc: "Färdiga filtreringslösningar och värmepumpspaket från Pahlén — allt du behöver för en komplett poolinstallation.",
    products: withMarkup(komplettaPaket),
  },
  cirkulation: {
    label: "Rening och cirkulation",
    desc: "Sandfilter, pumpar, filtermedia och Besgo-ventiler från Pahlén för ett optimalt flödessystem.",
    products: withMarkup(cirkulation),
  },
  vattenattraktioner: {
    label: "Vattenattraktioner",
    desc: "Jet Swim, massagemunstycken, vattenfall och kanoner — skapa rörelse och upplevelse i din pool.",
    products: withMarkup(bassangutrustning.filter(p => ATTRACTION_GROUPS.includes(p.group ?? ""))),
  },
  uppvarmning: {
    label: "Uppvärmning",
    desc: "Elpatroner, värmepumpar, sidokanalfläktar och tillbehör för effektiv uppvärmning av poolvatten.",
    products: withMarkup(uppvarmning),
  },
  belysning: {
    label: "Belysning & inbyggnadsdetaljer",
    desc: "LED-armaturer, skimmers, inlopp, bräddavlopp och inbyggnadsdetaljer från Pahlén Classic och Marine.",
    products: withMarkup(bassangutrustning.filter(p => LIGHTING_GROUPS.includes(p.group ?? ""))),
  },
  "mat-dosering": {
    label: "Mät- & doserutrustning",
    desc: "Autodos, MiniMaster, UV-anläggningar, elektroder och doseringssystem för kemikalier.",
    products: withMarkup(vattenrening.filter(p => DOSING_GROUPS.includes(p.group ?? ""))),
  },
  poolvard: {
    label: "Poolvård och testinstrument",
    desc: "Testutrustning, bottensugare, poolborstar och underhållsredskap för din pool.",
    products: withMarkup([]),
  },
  poolstommar: {
    label: "Poolstommar",
    desc: "Liner, SBM-stommar, PoolGuard, Aqua Roll, Isoblock, solfolie, trappor och rör för poolbygge.",
    products: withMarkup(poolkonstruktion),
  },
  kemikalier: {
    label: "Kemikalier",
    desc: "Poolkemikalier för balanserat och rent vatten under hela säsongen.",
    products: withMarkup([]),
  },
  // Legacy slugs kept for backwards compatibility
  bassangutrustning: {
    label: "Bassängutrustning",
    desc: "Originalreservdelar från Pahlén — skimmers, munstycken, belysning och tillbehör.",
    products: withMarkup(bassangutrustning),
  },
  poolkonstruktion: {
    label: "Poolkonstruktion",
    desc: "Originalreservdelar från Pahlén — poolduk, upprullning, vajrar, PoolGuard och Aqua Roll.",
    products: withMarkup(poolkonstruktion),
  },
  vattenrening: {
    label: "Vattenrening",
    desc: "Originalreservdelar från Pahlén — UV-anläggningar, doseringssystem, elektroder och poolrobotar.",
    products: withMarkup(vattenrening),
  },
};

export function generateStaticParams() {
  return Object.keys(categoryMap).map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categoryMap[category];
  if (!cat) return {};
  return { title: `${cat.label} | Elite Pool & Spa` };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categoryMap[category];
  if (!cat) notFound();

  return (
    <PageShell
      title={cat.label}
      description={cat.desc}
      badge="Pahlén Reservdelar"
      count={cat.products.length}
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Tillbehör & Reservdelar", href: "/pool/tillbehor" },
        { label: cat.label },
      ]}
    >
      {cat.products.length > 0 ? (
        <ProductSearch products={cat.products} />
      ) : (
        <div className="px-6 py-20 text-center text-slate-400 sm:px-12 lg:px-20">
          <p className="text-lg font-medium">Sortiment kommer snart</p>
          <p className="mt-2 text-sm">Vi håller på att fylla på den här kategorin. Kontakta oss för offert.</p>
        </div>
      )}
    </PageShell>
  );
}
