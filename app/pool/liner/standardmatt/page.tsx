import PageShell from "../../../Components/PageShell";
export const metadata = { title: "Standardmått | PoolPro" };
export default function Page() {
  return <PageShell title="Standardmått" description="Poolliners i standardmått – finns i flera tjocklekar." breadcrumbs={[{ label: "Pool", href: "/pool" }, { label: "Liner", href: "/pool/liner" }, { label: "Standardmått" }]} badge="Liner" />;
}
