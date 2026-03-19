import PageShell from "../../../Components/PageShell";
export const metadata = { title: "Cover Seal | PoolPro" };
export default function Page() {
  return <PageShell title="Cover Seal" description="Automatiskt poolöverdrag som öppnar med ett knapptryck." breadcrumbs={[{ label: "Pool", href: "/pool" }, { label: "Poolöverdrag", href: "/pool/pooloverdrag" }, { label: "Cover Seal" }]} badge="Poolöverdrag" />;
}
