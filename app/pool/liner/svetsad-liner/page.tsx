import PageShell from "../../../Components/PageShell";
export const metadata = { title: "Svetsad liner | PoolPro" };
export default function Page() {
  return <PageShell title="Svetsad liner" description="Skräddarsydd liner svetsad efter poolens exakta mått." breadcrumbs={[{ label: "Pool", href: "/pool" }, { label: "Liner", href: "/pool/liner" }, { label: "Svetsad liner" }]} badge="Liner" />;
}
