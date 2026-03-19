export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: "pool" | "spabad" | "bastu" | "helentreprenad";
  subcategory:
    | "thermoblock"
    | "gjuten-stomme"
    | "rostfri-stomme"
    | "pooloverdrag"
    | "pooltak"
    | "cover-seal"
    | "liner"
    | "standardmatt"
    | "svetsad-liner"
    | "black-edition"
    | "swimspa"
    | "vildmarksspa"
    | "family-spa"
    | "tillbehor"
    | "bastu"
    | "helentreprenad"
    | null;
};

export const mockProducts: Product[] = [
  { id: "pool-tb-1", name: "Thermoblock Standard 8×4", description: "Energieffektiv pool med isolerande thermoblockvägg.", price: 89000, imageUrl: "/images/pool-thermoblock.jpg", category: "pool", subcategory: "thermoblock" },
  { id: "pool-tb-2", name: "Thermoblock Premium 10×5", description: "Stor familjepol i thermoblock med extra isolering.", price: 129000, imageUrl: "/images/pool-thermoblock-premium.jpg", category: "pool", subcategory: "thermoblock" },
  { id: "pool-gs-1", name: "Gjuten Stomme Classic", description: "Traditionell betongpool med gjuten stomme – robust och tidlös.", price: 145000, imageUrl: "/images/pool-gjuten.jpg", category: "pool", subcategory: "gjuten-stomme" },
  { id: "pool-gs-2", name: "Gjuten Stomme Oval", description: "Oval betongpool i gjuten stomme, perfekt för mindre trädgårdar.", price: 115000, imageUrl: "/images/pool-gjuten-oval.jpg", category: "pool", subcategory: "gjuten-stomme" },
  { id: "pool-rs-1", name: "Rostfri Stomme 316L", description: "Pool i maringrade 316L rostfritt stål. Extremt hållbar.", price: 195000, imageUrl: "/images/pool-rostfri.jpg", category: "pool", subcategory: "rostfri-stomme" },
  { id: "pool-pt-1", name: "Pooltak Teleskop Lågt", description: "Lågt teleskoptak för säsongsförlängning och ökad säkerhet.", price: 38000, imageUrl: "/images/pooltak-low.jpg", category: "pool", subcategory: "pooltak" },
  { id: "pool-pt-2", name: "Pooltak Teleskop Högt", description: "Högt teleskoptak som förvandlar poolen till ett åretruntbad.", price: 62000, imageUrl: "/images/pooltak-high.jpg", category: "pool", subcategory: "pooltak" },
  { id: "pool-cs-1", name: "Cover Seal Automatic", description: "Automatiskt poolöverdrag. Öppnar och stänger med ett knapptryck.", price: 28000, imageUrl: "/images/cover-seal.jpg", category: "pool", subcategory: "cover-seal" },
  { id: "pool-lsm-1", name: "Liner 0,75mm Standard", description: "Standardliner i 0,75 mm tjocklek. Finns i flera standardmått.", price: 4500, imageUrl: "/images/liner-standard.jpg", category: "pool", subcategory: "standardmatt" },
  { id: "pool-lsm-2", name: "Liner 1,0mm Standard", description: "Kraftigare standardliner i 1,0 mm för ökad hållbarhet.", price: 6200, imageUrl: "/images/liner-standard-1mm.jpg", category: "pool", subcategory: "standardmatt" },
  { id: "pool-lsv-1", name: "Svetsad Liner Specialmått", description: "Skräddarsydd liner svetsad efter poolens exakta mått.", price: 12000, imageUrl: "/images/liner-svetsad.jpg", category: "pool", subcategory: "svetsad-liner" },
  { id: "spa-be-1", name: "Black Edition 700", description: "Exklusiv spabad i helsvart utförande med 40 jets och LED.", price: 79000, imageUrl: "/images/spa-black-700.jpg", category: "spabad", subcategory: "black-edition" },
  { id: "spa-be-2", name: "Black Edition 900 Pro", description: "Premiumbadkar för sex personer med vattenfallsfunktion.", price: 109000, imageUrl: "/images/spa-black-900.jpg", category: "spabad", subcategory: "black-edition" },
  { id: "spa-ss-1", name: "Swimspa Duo 550", description: "Kombinerad swimspa och spabad. Simma och koppla av i samma enhet.", price: 155000, imageUrl: "/images/swimspa-550.jpg", category: "spabad", subcategory: "swimspa" },
  { id: "spa-vs-1", name: "Vildmarksspa Vedeldad", description: "Klassisk vedeldad vildmarksspa i cederträ. Ingen el behövs.", price: 28000, imageUrl: "/images/vildmarksspa.jpg", category: "spabad", subcategory: "vildmarksspa" },
  { id: "spa-fs-1", name: "Family Spa 8-sits", description: "Rymlig familjespa för upp till 8 personer med barnvänliga funktioner.", price: 89000, imageUrl: "/images/family-spa.jpg", category: "spabad", subcategory: "family-spa" },
  { id: "spa-tb-1", name: "Spa Cover Lyft", description: "Hydraulisk lock-lyftare för enklare hantering av spa-locket.", price: 3200, imageUrl: "/images/spa-cover-lift.jpg", category: "spabad", subcategory: "tillbehor" },
  { id: "spa-tb-2", name: "Spa Kemikaliepaket Start", description: "Komplett startpaket med alla kemikalier för din nya spabad.", price: 890, imageUrl: "/images/spa-kemi.jpg", category: "spabad", subcategory: "tillbehor" },
  { id: "bastu-1", name: "Utomhusbastu Classic", description: "Fristående utomhusbastu i obehandlad nordic spruce. 4–6 personer.", price: 42000, imageUrl: "/images/bastu.jpg", category: "bastu", subcategory: "bastu" },
  { id: "he-1", name: "Helentreprenad Pool & Spa", description: "Vi sköter allt från projektering till nyckelfärdig leverans.", price: 0, imageUrl: "/images/helentreprenad.jpg", category: "helentreprenad", subcategory: "helentreprenad" },
];

export function getProductsByCategory(category: Product["category"]) {
  return mockProducts.filter((p) => p.category === category);
}

export function getProductsBySubcategory(subcategory: Product["subcategory"]) {
  return mockProducts.filter((p) => p.subcategory === subcategory);
}
