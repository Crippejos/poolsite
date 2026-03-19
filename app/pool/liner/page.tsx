import PageShell from "../../Components/PageShell";
export const metadata = { title: "Liner | PoolPro" };
export default function Page() {
  return <PageShell title="Liner" description="Högkvalitativa poolliners i standardmått och specialbeställning." breadcrumbs={[{ label: "Pool", href: "/pool" }, { label: "Liner" }]} badge="Pool" />;
}
