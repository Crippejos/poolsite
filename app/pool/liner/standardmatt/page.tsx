import PageShell from "@/app/Components/PageShell";
import ProductSearch from "@/app/Components/ProductSearch";
import { poolkonstruktion, pahlenPrice } from "@/lib/pahlenProducts";

const ACCESSORY_SKUS = ["43189","1820920","431431","431432","43144","43146","43148","43188","431890","431993","431994"];

function subgroup(name: string, sku: string): string {
  if (name.includes("Linerpaket")) return "Linerpaket";
  if (name.includes("Linertillbehörspaket")) return "Linertillbehörspaket";
  if (ACCESSORY_SKUS.includes(sku)) return "Tillbehör";
  return "Standardliner";
}

const products = poolkonstruktion
  .filter(p =>
    p.group === "Liner" &&
    !p.name.includes("Persia") &&
    !p.name.includes("gaveltrappa") &&
    !p.name.includes("tilläggskostnad")
  )
  .map(p => ({
    ...p,
    group: subgroup(p.name, p.sku),
    price: pahlenPrice(p.price),
  }));

const descriptions: Record<string, string> = {
  "482136": "Liner 3×6 m, enfärgad. Robust PVC-liner för standardpool. Montera med linerlist eller snap-in.",
  "482137": "Liner 3,5×7 m, enfärgad. Passar poolstommar i standard 3,5×7-mått.",
  "482148": "Liner 4×8 m, enfärgad. Vanligaste storleken för villapooler.",
  "482151": "Liner 5×10 m, enfärgad. För större pooler — robust och tålig.",
  "482336": "Liner 3×6 m, mönstrad. Dekorativt mönster som ger poolen karaktär.",
  "482337": "Liner 3,5×7 m, mönstrad. Stilfullt mönster i standard 3,5×7-mått.",
  "482348": "Liner 4×8 m, mönstrad. Populär kombination — standardstorlek med mönster.",
  "482351": "Liner 5×10 m, mönstrad. Stort format med dekorativt mönster.",
  "34104":  "Linerpaket Mönstrad 3×6 m, pooldjup 1,45–1,65 m. Liner + kanttejp + monteringstillbehör.",
  "34105":  "Linerpaket Mönstrad 3,5×7 m, pooldjup 1,45–1,65 m. Komplett paket för enkel montering.",
  "34106":  "Linerpaket Mönstrad 4×8 m, pooldjup 1,45–1,65 m. Allt du behöver för linerbytet.",
  "34107":  "Linerpaket Mönstrad 5×10 m, pooldjup 1,45–1,65 m. Komplett paket för stora pooler.",
  "34112":  "Linertillbehörspaket 3×6 m — kanttejp, genomföringstätningar och monteringsskruvar.",
  "34113":  "Linertillbehörspaket 3,5×7 m — komplett med all infästning för smidig montering.",
  "34114":  "Linertillbehörspaket 4×8 m — standard tillbehörskit för 4×8-poolen.",
  "34115":  "Linertillbehörspaket 5×10 m — komplett kit för den stora poolen.",
  "34116":  "Linertillbehörspaket FORTE 3×6 m — anpassat för Thermoblock FORTE-stommar.",
  "34117":  "Linertillbehörspaket FORTE 3,5×7 m — FORTE-version med förstärkt infästning.",
  "34118":  "Linertillbehörspaket FORTE 4×8 m — för FORTE-stommar i standardpoolstorlek.",
  "34119":  "Linertillbehörspaket FORTE 5×10 m — komplett kit för stora FORTE-pooler.",
  "43189":  "Lagningsset poolduk, turkos 0,5 mm. Reparera hål och skador direkt under vatten.",
  "1820920":"Linerlock vit, 50 m. Profil för att fixera linerkanten längs poolkanten.",
  "431431": "Spraylim Nr.74, 500 ml. För limmning av filtmatta mot poolvägg och botten.",
  "431432": "Spraylim Nr.77, 500 ml. Speciellt för limmning mot isoblock/EPS-isolering.",
  "43144":  "Bottenmatta 4×8 m, t=4,8 mm, grön. Skyddsmatta under linern för mjukare golv och längre livslängd.",
  "43146":  "Väggmatta filt 50×2 m, t=4,5 mm. Filtmatta för poolväggarna — skyddar linern.",
  "43148":  "Väggmatta filt 50×1,5 m, t=4,5 mm. Smalare rulle för lägre pooler.",
  "43188":  "Undervattenslim, 50 g. Lim för linerlagning under vatten.",
  "431890": "Lagningsset poolduk lim 30 ml. Kompakt lagningskit med lim och patchmaterial.",
  "431993": "Upphängningslist vit, b=90 mm, L=2,5 m. Monteras på poolkanten för att hålla linern på plats.",
  "431994": "Linerlist Forte Snap-in, L=2 m. Snabbmontering av liner i FORTE-stommar.",
};

export const metadata = { title: "Standardmått liner | Elite Pool & Spa" };

export default function StandardmattPage() {
  return (
    <PageShell
      title="Standardmått"
      description="Poolliners i standardstorlekar — enfärgade och mönstrade, kompletta linerpaket, linertillbehör och bottenskydd från Pahlén."
      breadcrumbs={[
        { label: "Pool", href: "/pool" },
        { label: "Liner", href: "/pool/liner" },
        { label: "Standardmått" },
      ]}
      badge="Pahlén"
      count={products.length}
    >
      <ProductSearch products={products} descriptions={descriptions} />
    </PageShell>
  );
}
