import PageShell from "../../../Components/PageShell";
export const metadata = { title: "Pooltak | PoolPro" };
export default function Page() {
  return <PageShell title="Pooltak" description="Teleskoptak för säsongsförlängning och ökad säkerhet." breadcrumbs={[{ label: "Pool", href: "/pool" }, { label: "Poolöverdrag", href: "/pool/pooloverdrag" }, { label: "Pooltak" }]} badge="Poolöverdrag" />;
}
