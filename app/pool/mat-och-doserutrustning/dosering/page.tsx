import PageShell from "@/app/Components/PageShell";
import ProductSearch from "@/app/Components/ProductSearch";
import { vattenrening, pahlenPrice } from "@/lib/pahlenProducts";

const products = vattenrening
  .filter(p => p.group === "ASEKO" || p.group === "MiniMaster" || p.group === "Autodos")
  .map(p => ({ ...p, price: pahlenPrice(p.price) }));

const descriptions: Record<string, string> = {
  "415400": "Mäter och styr pH och redox. Nätverksansluten via WiFi, fjärrstyrd via ASIN Cloud-app.",
  "415401": "Mäter och doserar pH och fritt klor. Idealisk för pooler med klorgasdosering.",
  "415403": "Helautomatisk dosering av pH och klor med VS-pump inkluderad.",
  "415405": "Kombinerar pH-dosering med redox-styrning. VS-pump inkluderad.",
  "415407": "Anpassad för saltvattenspooler — mäter pH och redox med saltklorinator-integration.",
  "415433": "NET-enhet med saltvatten pH/REDOX-mätning för saltklorinatorsystem.",
  "415434": "Mäter och justerar redox-värdet för optimal desinfektion utan klordosering.",
  "415435": "Automatisk klordosering baserat på kontinuerlig CLF-mätning.",
  "416710": "Avancerat poolautomationssystem med fullständig processtyrning och fjärrövervakning.",
  "33060": "Komplett doseringssystem med Aseko NET CLF/pH — pump, armatur och kontroller monterade.",
  "33061": "Komplett system för redox/pH-dosering. Allt monterat och testat.",
  "33062": "Premium+ system med Aseko Home VS för CLF/pH. VS-pump ger tyst och energieffektiv drift.",
  "33063": "Premium+ system med Aseko Home VS för redox/pH. VS-pump inkluderad.",
  "33066": "Helautomatiskt system med Aseko Home VS för redox/pH — allt monterat och klart.",
  "33067": "Helautomatiskt system med Aseko Home VS för CLF/pH — redo att köras.",
  "33069": "Premium+ system anpassat för saltvattenspooler med ASEKO Salt VS Redox/pH.",
  "416600": "Mäter och doserar fritt klor automatiskt. Enkel installation och drift.",
  "416610": "Automatisk pH-mätning och dosering. Kompakt enhet för pooler upp till 80 m³.",
  "416620": "Kombinerar pH- och klordosering i ett kompakt system.",
  "416630": "pH + redox-styrning för optimalt desinfektionsresultat utan klordosering.",
  "33038": "MiniMaster monterad med pH + fritt klor — komplett och klar att installera.",
  "416601": "Reservelektrod för fritt klor till MiniMaster. Enkel att byta.",
  "416611": "pH-elektrod till MiniMaster. Enkel att byta.",
  "416621": "Kombinerat elektrodkit för pH och fritt klor.",
  "416631": "Kombinerat elektrodkit för pH och redox.",
  "416510": "Enparametersystem för pH-styrning. Professionell precision för stora pooler.",
  "416520": "Redox-baserad doseringsenhet. Hög precision för ozonbaserade system.",
  "416530": "Mäter och doserar totalt klorinnehåll. Idealisk för offentliga anläggningar.",
  "416540": "Tvåparametersystem — fritt klor + pH i en enhet.",
  "416550": "Redox + pH i ett system.",
  "416560": "Trekanalsystem — fritt klor, redox och pH. Maximal kontroll.",
};

export const metadata = { title: "Dosering & vattenanalys | Elite Pool & Spa" };

export default function DoseringPage() {
  return (
    <PageShell
      title="Dosering & vattenanalys"
      description="ASEKO ASIN Aqua-serien, MiniMaster och Autodos — intelligenta system för automatisk kemikaliedosering och realtidsövervakning av poolvatten."
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Mät- & doserutrustning", href: "/pool/mat-och-doserutrustning" },
        { label: "Dosering & vattenanalys" },
      ]}
      badge="Pahlén / ASEKO"
      count={products.length}
    >
      <ProductSearch products={products} descriptions={descriptions} />
    </PageShell>
  );
}
