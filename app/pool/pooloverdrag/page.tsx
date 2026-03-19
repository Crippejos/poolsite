import PageShell from "../../Components/PageShell";
export const metadata = { title: "Poolöverdrag | PoolPro" };
export default function Page() {
  return <PageShell title="Poolöverdrag" description="Skydda din pool med våra högkvalitativa överdrag." breadcrumbs={[{ label: "Pool", href: "/pool" }, { label: "Poolöverdrag" }]} badge="Pool" />;
}
