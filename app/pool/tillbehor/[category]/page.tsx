import { notFound } from "next/navigation";
import PageShell from "@/app/Components/PageShell";
import ProductSearch from "@/app/Components/ProductSearch";
import {
  bassangutrustning,
  cirkulation,
  poolkonstruktion,
  uppvarmning,
  vattenrening,
  type PahlenProduct,
} from "@/lib/pahlenProducts";

const categoryMap: Record<string, { label: string; desc: string; products: PahlenProduct[] }> = {
  bassangutrustning: {
    label: "Bassängutrustning",
    desc: "Originalreservdelar från Pahlén — skimmers, munstycken, belysning, Jet Swim och tillbehör.",
    products: bassangutrustning,
  },
  cirkulation: {
    label: "Cirkulation",
    desc: "Originalreservdelar från Pahlén — filter, pumpar, pumphus, motorer och ventiler.",
    products: cirkulation,
  },
  poolkonstruktion: {
    label: "Poolkonstruktion",
    desc: "Originalreservdelar från Pahlén — poolduk, upprullning, vajrar, PoolGuard och Aqua Roll.",
    products: poolkonstruktion,
  },
  uppvarmning: {
    label: "Uppvärmning",
    desc: "Originalreservdelar från Pahlén — elpatroner, värmepumpar, styrkort och kompressorer.",
    products: uppvarmning,
  },
  vattenrening: {
    label: "Vattenrening",
    desc: "Originalreservdelar från Pahlén — UV-anläggningar, doseringssystem, elektroder och poolrobotar.",
    products: vattenrening,
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
      <ProductSearch products={cat.products} />
    </PageShell>
  );
}
