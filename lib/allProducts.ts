export type ProductOption = { label: string; values: string[] };
export type ProductPricing = { optionLabel: string; map: Record<string, number> };

export type Product = {
  slug: string;
  category: string;
  categoryHref: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  images?: string[];
  options?: ProductOption[];
  pricing?: ProductPricing;
  // Extended detail page fields
  longDescription?: string;
  features?: string[];
  specs?: Record<string, string>;
};

const allProducts: Product[] = [

  // ── Bastu ──────────────────────────────────────────────────────────────────
  {
    slug: "bst-001",
    category: "Bastu",
    categoryHref: "/bastu",
    name: "Utomhusbastu Classic",
    sku: "BST-001",
    description: "Fristående utomhusbastu i obehandlad nordic spruce. Rymmer 4–6 personer med elbastu-aggregat.",
    price: 42000,
    features: [
      "Obehandlad nordic spruce",
      "Rymmer 4–6 personer",
      "Elbastu-aggregat ingår",
      "Enkel montering",
    ],
    specs: {
      "Material": "Nordic spruce (obehandlad)",
      "Kapacitet": "4–6 personer",
      "Värme": "Elbastu-aggregat",
      "Montering": "Fristående",
    },
  },
  {
    slug: "bst-002",
    category: "Bastu",
    categoryHref: "/bastu",
    name: "Utomhusbastu Compact",
    sku: "BST-002",
    description: "Kompakt utomhusbastu för 2–3 personer. Perfekt för mindre tomter — enkel att montera.",
    price: 28000,
    features: [
      "Kompakt design för mindre tomter",
      "2–3 personer",
      "Snabb montering",
      "Inbyggt elpaket",
    ],
    specs: {
      "Material": "Nordic spruce",
      "Kapacitet": "2–3 personer",
      "Värme": "Elbastu-aggregat",
      "Montering": "Fristående",
    },
  },
  {
    slug: "bst-003",
    category: "Bastu",
    categoryHref: "/bastu",
    name: "Bastu med omklädningsrum",
    sku: "BST-003",
    description: "Rymlig bastu med separat omklädningsdel och veranda. Komplett lösning för din trädgård.",
    price: 68000,
    features: [
      "Separat omklädningsrum",
      "Veranda ingår",
      "Rymlig bastudel",
      "Komplett helhetslösning",
    ],
    specs: {
      "Material": "Nordic spruce",
      "Kapacitet": "4–6 personer",
      "Tillbehör": "Omklädningsrum + veranda",
      "Värme": "Elbastu-aggregat",
    },
  },

  // ── Pooltak ────────────────────────────────────────────────────────────────
  {
    slug: "gj-nova",
    category: "Pooltak",
    categoryHref: "/pool/pooloverdrag/pooltak",
    name: "Nova Comfort Premium",
    sku: "GJ-NOVA",
    description: "Lågt exklusivt pooltak i klarplast med fördelade sektioner, skjutdörr och förlängningsskenor. Anpassas efter din pools storlek.",
    price: 0,
    images: ["/products/nova-comfort.jpg", "/products/nova-comfort-2.jpg"],
    options: [
      { label: "Storlek (innermått)", values: ["3.20 × 6.20 m", "3.70 × 7.20 m", "4.20 × 8.20 m"] },
      { label: "Skjutdörr", values: ["Vänster sida", "Höger sida"] },
      { label: "Gavelpaneler", values: ["Utan gavel", "Fram", "Bak", "Fram & bak"] },
    ],
    pricing: {
      optionLabel: "Storlek (innermått)",
      map: { "3.20 × 6.20 m": 119900, "3.70 × 7.20 m": 166900, "4.20 × 8.20 m": 190900 },
    },
    features: [
      "Låg profil — diskret design",
      "Klarplast med UV-skydd",
      "Skjutdörr för enkel åtkomst",
      "Förlängningsskenor ingår",
      "Anpassas till poolens storlek",
    ],
    specs: {
      "Material": "Klarplast med UV-skydd",
      "Profil": "Låg",
      "Dörr": "Skjutdörr",
      "Varumärke": "Gullberg & Jansson",
    },
  },
  {
    slug: "gj-leia",
    category: "Pooltak",
    categoryHref: "/pool/pooloverdrag/pooltak",
    name: "Leia Premium",
    sku: "GJ-LEIA",
    description: "Exklusivt pooltak i klarplast med automatisk sektionslåsning och extra platta komfortskenor. Elegant låg profil.",
    price: 0,
    images: ["/products/leia-premium.jpg", "/products/leia-premium-2.jpg"],
    options: [
      { label: "Storlek (innermått)", values: ["3.20 × 6.20 m", "3.70 × 7.20 m", "4.20 × 8.20 m"] },
      { label: "Material", values: ["Klarplast"] },
      { label: "Skjutdörr", values: ["Vänster sida", "Höger sida"] },
    ],
    pricing: {
      optionLabel: "Storlek (innermått)",
      map: { "3.20 × 6.20 m": 158900, "3.70 × 7.20 m": 178900, "4.20 × 8.20 m": 199900 },
    },
    features: [
      "Automatisk sektionslåsning",
      "Extra platta komfortskenor",
      "Elegant låg profil",
      "Klarplast med UV-skydd",
    ],
    specs: {
      "Material": "Klarplast med UV-skydd",
      "Profil": "Låg",
      "Låsning": "Automatisk sektionslåsning",
      "Varumärke": "Gullberg & Jansson",
    },
  },

  // ── Lamell ─────────────────────────────────────────────────────────────────
  {
    slug: "cf-tixit-sol",
    category: "Lamell",
    categoryHref: "/pool/pooloverdrag/lamell",
    name: "Tixit Lamelltäcke med solceller",
    sku: "CF-TIXIT-SOL",
    description: "Modernt lamelltäcke med integrerade solceller och LED-belysning i fäststolparna. Solcellerna driver systemet hållbart — ett ekologiskt och energieffektivt alternativ för din pool.",
    price: 0,
    images: ["/products/tixit-sol.jpg", "/products/tixit-1.jpg", "/products/tixit-5.jpg", "/products/tixit-11.jpg"],
    options: [
      { label: "Färg", values: ["Antracit", "Silver", "Vit"] },
      { label: "Belysning", values: ["Ingår (solcellsdriven)"] },
    ],
    features: [
      "Integrerade solceller",
      "LED-belysning i fäststolparna",
      "Energieffektivt och ekologiskt",
      "Automatisk öppning och stängning",
      "Passar alla poolformer",
    ],
    specs: {
      "Drivkraft": "Solceller",
      "Belysning": "LED i fäststolpar",
      "Färgval": "Antracit, Silver, Vit",
      "Varumärke": "CF Group / Tixit",
    },
  },
  {
    slug: "cf-tixit-el",
    category: "Lamell",
    categoryHref: "/pool/pooloverdrag/lamell",
    name: "Tixit Lamelltäcke elektrisk",
    sku: "CF-TIXIT-EL",
    description: "Elektriskt lamelltäcke med inbyggd belysning i fäststolparna och möjlighet till högtalaranpassning. Modern design som kombinerar funktion och estetik.",
    price: 0,
    images: ["/products/tixit-el.jpg", "/products/tixit-2.jpg", "/products/tixit-4.jpg", "/products/tixit-7.jpg"],
    options: [
      { label: "Färg", values: ["Antracit", "Silver", "Vit"] },
      { label: "Belysning", values: ["Ingår (el-driven)"] },
      { label: "Tillval", values: ["Utan högtalare", "Med högtalare"] },
    ],
    features: [
      "Elektrisk öppning och stängning",
      "LED-belysning i fäststolpar",
      "Tillval: inbyggd högtalare",
      "Modern design",
      "Passar alla poolformer",
    ],
    specs: {
      "Drivkraft": "El",
      "Belysning": "LED i fäststolpar",
      "Tillval": "Inbyggd högtalare",
      "Varumärke": "CF Group / Tixit",
    },
  },

  // ── Thermoblock ────────────────────────────────────────────────────────────
  {
    slug: "pool-tb-001",
    category: "Thermoblock",
    categoryHref: "/pool/thermoblock",
    name: "Thermoblock Standard 8×4",
    sku: "POOL-TB-001",
    description: "Energieffektiv pool med isolerande thermoblockvägg. Håller värmen längre och sänker driftskostnaderna.",
    price: 89000,
    features: ["Isolerande thermoblockvägg", "Lägre driftskostnader", "Enkel montering", "Hög hållbarhet"],
    specs: { "Storlek": "8 × 4 m", "Väggmaterial": "Thermoblock", "Isolering": "Inbyggd" },
  },
  {
    slug: "pool-tb-002",
    category: "Thermoblock",
    categoryHref: "/pool/thermoblock",
    name: "Thermoblock Premium 10×5",
    sku: "POOL-TB-002",
    description: "Stor familjepool i thermoblock med extra isolering och inbyggd sittbänk.",
    price: 129000,
    features: ["Extra isolering", "Inbyggd sittbänk", "Stor familjepool", "Energieffektiv"],
    specs: { "Storlek": "10 × 5 m", "Väggmaterial": "Thermoblock", "Tillbehör": "Inbyggd sittbänk" },
  },
  {
    slug: "pool-tb-003",
    category: "Thermoblock",
    categoryHref: "/pool/thermoblock",
    name: "Thermoblock Compact 6×3",
    sku: "POOL-TB-003",
    description: "Kompakt thermoblock-pool perfekt för mindre trädgårdar.",
    price: 69000,
    features: ["Kompakt design", "Passar mindre tomter", "Energieffektiv", "Snabb montering"],
    specs: { "Storlek": "6 × 3 m", "Väggmaterial": "Thermoblock" },
  },

  // ── Gjuten stomme ──────────────────────────────────────────────────────────
  {
    slug: "pool-gs-001",
    category: "Gjuten stomme",
    categoryHref: "/pool/gjuten-stomme",
    name: "Gjuten Stomme Classic",
    sku: "POOL-GS-001",
    description: "Traditionell betongpool med gjuten stomme – robust och tidlös design.",
    price: 145000,
    features: ["Traditionell betongkonstruktion", "Extremt hållbar", "Tidlös design", "Anpassningsbar form"],
    specs: { "Material": "Betong (gjuten stomme)", "Hållbarhet": "50+ år", "Form": "Rektangulär" },
  },
  {
    slug: "pool-gs-002",
    category: "Gjuten stomme",
    categoryHref: "/pool/gjuten-stomme",
    name: "Gjuten Stomme Oval",
    sku: "POOL-GS-002",
    description: "Oval betongpool i gjuten stomme, perfekt för mindre trädgårdar.",
    price: 115000,
    features: ["Oval design", "Platssmart", "Betongkonstruktion", "Estetisk form"],
    specs: { "Material": "Betong (gjuten stomme)", "Form": "Oval" },
  },
  {
    slug: "pool-gs-003",
    category: "Gjuten stomme",
    categoryHref: "/pool/gjuten-stomme",
    name: "Gjuten Stomme XL",
    sku: "POOL-GS-003",
    description: "Extra stor gjuten pool för hela familjen med plats för simning.",
    price: 195000,
    features: ["Extra stor", "Simvänlig design", "Plats för hela familjen", "Hög hållbarhet"],
    specs: { "Material": "Betong (gjuten stomme)", "Storlek": "XL", "Användning": "Simning + bad" },
  },

  // ── Rostfri stomme ─────────────────────────────────────────────────────────
  {
    slug: "pool-rs-001",
    category: "Rostfri stomme",
    categoryHref: "/pool/rostfri-stomme",
    name: "Rostfri Stomme 316L",
    sku: "POOL-RS-001",
    description: "Pool i maringrade 316L rostfritt stål. Extremt hållbar och underhållsfri.",
    price: 195000,
    features: ["Maringrade 316L rostfritt stål", "Underhållsfri", "Extremt hållbar", "Modern design"],
    specs: { "Material": "316L rostfritt stål", "Grad": "Maringrade", "Underhåll": "Minimalt" },
  },
  {
    slug: "pool-rs-002",
    category: "Rostfri stomme",
    categoryHref: "/pool/rostfri-stomme",
    name: "Rostfri Stomme Premium",
    sku: "POOL-RS-002",
    description: "Premiumpool i rostfritt stål med inbyggd LED och automatisk rengöring.",
    price: 275000,
    features: ["Inbyggd LED-belysning", "Automatisk rengöring", "Rostfritt stål", "Premium finish"],
    specs: { "Material": "316L rostfritt stål", "Belysning": "Inbyggd LED", "Rengöring": "Automatisk" },
  },

  // ── Spabad ─────────────────────────────────────────────────────────────────
  {
    slug: "spa-be-001",
    category: "Black Edition",
    categoryHref: "/spabad/black-edition",
    name: "Black Edition 700",
    sku: "SPA-BE-001",
    description: "Exklusiv spabad i helsvart utförande med 40 jets och LED-belysning.",
    price: 79000,
    features: ["40 massagejets", "LED-belysning", "Helsvart design", "Energieffektiv isolering"],
    specs: { "Jets": "40 st", "Belysning": "LED", "Färg": "Svart", "Kapacitet": "4–5 personer" },
  },
  {
    slug: "spa-be-002",
    category: "Black Edition",
    categoryHref: "/spabad/black-edition",
    name: "Black Edition 900 Pro",
    sku: "SPA-BE-002",
    description: "Premiumbadkar för sex personer med vattenfallsfunktion och WiFi-styrning.",
    price: 109000,
    features: ["WiFi-styrning", "Vattenfallsfunktion", "6 personer", "Premium jets"],
    specs: { "Kapacitet": "6 personer", "Styrning": "WiFi", "Tillbehör": "Vattenfall", "Jets": "60 st" },
  },
  {
    slug: "spa-be-003",
    category: "Black Edition",
    categoryHref: "/spabad/black-edition",
    name: "Black Edition 500 Compact",
    sku: "SPA-BE-003",
    description: "Kompakt black edition för mindre utrymmen, utan att kompromissa med stil.",
    price: 59000,
    features: ["Kompakt design", "Passar på terrassen", "Helsvart finish", "Energieffektiv"],
    specs: { "Kapacitet": "2–3 personer", "Färg": "Svart", "Design": "Kompakt" },
  },
  {
    slug: "spa-ss-001",
    category: "Swimspa",
    categoryHref: "/spabad/swimspa",
    name: "Swimspa Duo 550",
    sku: "SPA-SS-001",
    description: "Kombinerad swimspa och spabad. Simma och koppla av i samma enhet.",
    price: 155000,
    features: ["Motström för simning", "Inbyggd spabad-zon", "LED-belysning", "Energieffektiv"],
    specs: { "Längd": "550 cm", "Zoner": "Simning + spa", "Motström": "Ingår" },
  },
  {
    slug: "spa-ss-002",
    category: "Swimspa",
    categoryHref: "/spabad/swimspa",
    name: "Swimspa Pro 750",
    sku: "SPA-SS-002",
    description: "Professionell swimspa med kraftfull motström för riktigt simträning.",
    price: 210000,
    features: ["Kraftfull motström", "Professionell träning", "Stor yta", "Inbyggd spa-zon"],
    specs: { "Längd": "750 cm", "Motström": "Kraftfull", "Zoner": "Simning + spa" },
  },
  {
    slug: "spa-vs-001",
    category: "Vildmarksspa",
    categoryHref: "/spabad/vildmarksspa",
    name: "Vildmarksspa Vedeldad",
    sku: "SPA-VS-001",
    description: "Klassisk vedeldad vildmarksspa i cederträ. Ingen el behövs.",
    price: 28000,
    features: ["Vedeldad — ingen el", "Cederträ", "Naturlig uppvärmning", "Rustik design"],
    specs: { "Material": "Cederträ", "Uppvärmning": "Ved", "El": "Krävs ej" },
  },
  {
    slug: "spa-vs-002",
    category: "Vildmarksspa",
    categoryHref: "/spabad/vildmarksspa",
    name: "Vildmarksspa Stor",
    sku: "SPA-VS-002",
    description: "Större vedeldad vildmarksspa för upp till 8 personer.",
    price: 42000,
    features: ["Upp till 8 personer", "Vedeldad", "Cederträ", "Stor diameter"],
    specs: { "Material": "Cederträ", "Kapacitet": "8 personer", "Uppvärmning": "Ved" },
  },
  {
    slug: "spa-fs-001",
    category: "Family Spa",
    categoryHref: "/spabad/family-spa",
    name: "Family Spa 6-sits",
    sku: "SPA-FS-001",
    description: "Rymlig familjespa för upp till 6 personer med barnvänliga funktioner.",
    price: 69000,
    features: ["Barnvänlig design", "6 sittplatser", "Lågtemperaturjets", "Enkel drift"],
    specs: { "Kapacitet": "6 personer", "Målgrupp": "Familj", "Jets": "Barnvänliga" },
  },
  {
    slug: "spa-fs-002",
    category: "Family Spa",
    categoryHref: "/spabad/family-spa",
    name: "Family Spa 8-sits",
    sku: "SPA-FS-002",
    description: "Extra stor familjespa för upp till 8 personer med lekfulla jets.",
    price: 89000,
    features: ["8 sittplatser", "Lekfulla jets", "Barnvänlig", "Stor yta"],
    specs: { "Kapacitet": "8 personer", "Målgrupp": "Familj" },
  },

  // ── Spabad tillbehör ───────────────────────────────────────────────────────
  {
    slug: "spa-tl-001",
    category: "Spabad tillbehör",
    categoryHref: "/spabad/tillbehor",
    name: "Spa Cover Lyft",
    sku: "SPA-TL-001",
    description: "Hydraulisk lock-lyftare för enklare hantering av spa-locket.",
    price: 3200,
    features: ["Hydraulisk lyftmekanism", "Enkel montering", "Passar de flesta lock", "Förlänger lock-livslängd"],
    specs: { "Typ": "Hydraulisk", "Kompatibilitet": "Universell" },
  },
  {
    slug: "spa-tl-002",
    category: "Spabad tillbehör",
    categoryHref: "/spabad/tillbehor",
    name: "Spa Kemikaliepaket Start",
    sku: "SPA-TL-002",
    description: "Komplett startpaket med alla kemikalier för din nya spabad.",
    price: 890,
    features: ["Alla startchemikalier ingår", "Enkel instruktion", "Passar nyinstallation", "Balanserat paket"],
    specs: { "Innehåll": "Klor, pH+, pH-, chock, algmedel", "Räcker": "Ca 3 månader" },
  },
  {
    slug: "spa-tl-003",
    category: "Spabad tillbehör",
    categoryHref: "/spabad/tillbehor",
    name: "Spa Stege",
    sku: "SPA-TL-003",
    description: "Säker och slitstark stege i rostfritt stål för enkel in- och urstigning.",
    price: 2400,
    features: ["Rostfritt stål", "Halkfria steg", "Justerbar höjd", "Enkel montering"],
    specs: { "Material": "Rostfritt stål", "Steg": "Halkfria", "Höjd": "Justerbar" },
  },
];

export default allProducts;

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find(p => p.slug === slug);
}

export function getProductsByCategory(categoryHref: string): Product[] {
  return allProducts.filter(p => p.categoryHref === categoryHref);
}
