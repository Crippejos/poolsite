export type SearchItem = {
  id: string;
  name: string;
  sku: string;
  category: string;
  categoryHref: string;
  description: string;
  price: number;
  href: string;
  type: "product" | "category" | "page";
  brand?: string;
};

export const searchData: SearchItem[] = [
  // ── Pages ────────────────────────────────────────────────────────────────
  { id: "page-pool",           name: "Pool",           sku: "",         category: "Sida",      categoryHref: "/pool",           description: "Alla pooltyper — thermoblock, gjuten, rostfri, liner och poolöverdrag.",  price: 0, href: "/pool",           type: "page" },
  { id: "page-spabad",         name: "Spabad",         sku: "",         category: "Sida",      categoryHref: "/spabad",         description: "Alla spabad — Black Edition, Swimspa, Vildmarksspa, Family Spa.",          price: 0, href: "/spabad",         type: "page" },
  { id: "page-bastu",          name: "Bastu",          sku: "",         category: "Sida",      categoryHref: "/bastu",          description: "Fristående utomhusbastur i nordisk tradition.",                            price: 0, href: "/bastu",          type: "page" },
  { id: "page-showroom",       name: "Showroom",       sku: "",         category: "Sida",      categoryHref: "/showroom",       description: "Se genomförda projekt — pooler, spabad och bastur.",                       price: 0, href: "/showroom",       type: "page" },
  { id: "page-helentreprenad", name: "Helentreprenad", sku: "",         category: "Sida",      categoryHref: "/helentreprenad", description: "Vi sköter hela projektet från idé till nyckelfärdig anläggning.",          price: 0, href: "/helentreprenad", type: "page" },
  { id: "page-om-oss",         name: "Om oss",         sku: "",         category: "Sida",      categoryHref: "/om-oss",         description: "Läs om Elite Pool & Spa och träffa vårt team.",                           price: 0, href: "/om-oss",         type: "page" },
  { id: "page-kontakt",        name: "Kontakt",        sku: "",         category: "Sida",      categoryHref: "/kontakt",        description: "Kontakta oss för offert eller rådgivning.",                               price: 0, href: "/kontakt",        type: "page" },

  // ── Category pages ───────────────────────────────────────────────────────
  { id: "cat-thermoblock",    name: "Thermoblock",     sku: "KAT-TB",   category: "Pool",      categoryHref: "/pool",           description: "Energieffektiva pooler med isolerande thermoblockvägg.",                  price: 0, href: "/pool/thermoblock",             type: "category" },
  { id: "cat-gjuten",         name: "Gjuten stomme",   sku: "KAT-GS",   category: "Pool",      categoryHref: "/pool",           description: "Traditionell betongpool med gjuten stomme.",                              price: 0, href: "/pool/gjuten-stomme",           type: "category" },
  { id: "cat-rostfri",        name: "Rostfri stomme",  sku: "KAT-RS",   category: "Pool",      categoryHref: "/pool",           description: "Pool i maringrade rostfritt stål — extremt hållbar.",                    price: 0, href: "/pool/rostfri-stomme",          type: "category" },
  { id: "cat-pooloverdrag",   name: "Poolöverdrag",    sku: "KAT-PO",   category: "Pool",      categoryHref: "/pool",           description: "Pooltak och lamell för skydd och värmebevarande.",                       price: 0, href: "/pool/pooloverdrag",            type: "category" },
  { id: "cat-liner",          name: "Liner",           sku: "KAT-LN",   category: "Pool",      categoryHref: "/pool",           description: "Standardmått och svetsad liner för alla pooltyper.",                     price: 0, href: "/pool/liner",                   type: "category" },
  { id: "cat-pooltak",        name: "Pooltak",         sku: "KAT-PT",   category: "Pool",      categoryHref: "/pool/pooloverdrag", description: "Pooltak från Gullberg & Jansson och CF Group för hela säsongen.",    price: 0, href: "/pool/pooloverdrag/pooltak",    type: "category" },
  { id: "cat-lamell",         name: "Lamell",          sku: "KAT-LM",   category: "Pool",      categoryHref: "/pool/pooloverdrag", description: "Lamelltäcken från CF Group — elektriska och solcellsdrivna modeller.", price: 0, href: "/pool/pooloverdrag/lamell",     type: "category" },
  { id: "cat-black-edition",  name: "Black Edition",   sku: "KAT-BE",   category: "Spabad",    categoryHref: "/spabad",         description: "Exklusiva spabad i helsvart utförande med LED-belysning.",                price: 0, href: "/spabad/black-edition",         type: "category" },
  { id: "cat-swimspa",        name: "Swimspa",         sku: "KAT-SS",   category: "Spabad",    categoryHref: "/spabad",         description: "Kombinerad swimspa och spabad.",                                          price: 0, href: "/spabad/swimspa",               type: "category" },
  { id: "cat-vildmarksspa",   name: "Vildmarksspa",    sku: "KAT-VS",   category: "Spabad",    categoryHref: "/spabad",         description: "Klassisk vedeldad vildmarksspa i cederträ.",                              price: 0, href: "/spabad/vildmarksspa",          type: "category" },
  { id: "cat-family-spa",     name: "Family Spa",      sku: "KAT-FS",   category: "Spabad",    categoryHref: "/spabad",         description: "Rymlig familjespa för hela familjen.",                                    price: 0, href: "/spabad/family-spa",            type: "category" },
  { id: "cat-tillbehor",      name: "Tillbehör",       sku: "KAT-TL",   category: "Spabad",    categoryHref: "/spabad",         description: "Kemikalier, lock-lyftare och spa-tillbehör.",                             price: 0, href: "/spabad/tillbehor",             type: "category" },

  // ── Brands ───────────────────────────────────────────────────────────────
  { id: "brand-gullberg", name: "Gullberg & Jansson", sku: "BRAND-GJ", category: "Pool", categoryHref: "/pool/pooloverdrag", description: "Pooltak från Gullberg & Jansson — Nova Comfort Premium och Leia Premium.", price: 0, href: "/pool/pooloverdrag/pooltak", type: "page", brand: "Gullberg & Jansson" },
  { id: "brand-cfgroup",  name: "CF Group",           sku: "BRAND-CF", category: "Pool", categoryHref: "/pool/pooloverdrag", description: "Lamelltäcken från CF Group — Tixit med solceller och elektrisk modell.",   price: 0, href: "/pool/pooloverdrag/lamell",  type: "page", brand: "CF Group" },

  // ── Pool — Pooltak ────────────────────────────────────────────────────────
  { id: "po-pt-001", name: "Nova Comfort Premium", sku: "GJ-NOVA", category: "Pool", categoryHref: "/pool/pooloverdrag/pooltak", description: "Lågt exklusivt pooltak i klarplast med fördelade sektioner, skjutdörr och förlängningsskenor. Anpassas efter din pools storlek.", price: 0, href: "/pool/pooloverdrag/pooltak", type: "product", brand: "Gullberg & Jansson" },
  { id: "po-pt-002", name: "Leia Premium",         sku: "GJ-LEIA", category: "Pool", categoryHref: "/pool/pooloverdrag/pooltak", description: "Exklusivt pooltak i klarplast med automatisk sektionslåsning och extra platta komfortskenor. Elegant låg profil.",              price: 0, href: "/pool/pooloverdrag/pooltak", type: "product", brand: "Gullberg & Jansson" },

  // ── Pool — Lamell ─────────────────────────────────────────────────────────
  { id: "po-lm-001", name: "Tixit Lamelltäcke med solceller", sku: "CF-TIXIT-SOL", category: "Pool", categoryHref: "/pool/pooloverdrag/lamell", description: "Modernt lamelltäcke med integrerade solceller och belysning i fäststolparna. Hållbart och energieffektivt alternativ.", price: 0, href: "/pool/pooloverdrag/lamell", type: "product", brand: "CF Group" },
  { id: "po-lm-002", name: "Tixit Lamelltäcke elektrisk",     sku: "CF-TIXIT-EL",  category: "Pool", categoryHref: "/pool/pooloverdrag/lamell", description: "Elektriskt lamelltäcke med inbyggd belysning i stolparna och möjlighet till högtalaranpassning. Smidigt och modernt.",  price: 0, href: "/pool/pooloverdrag/lamell", type: "product", brand: "CF Group" },

  // ── Pool — Thermoblock ────────────────────────────────────────────────────
  { id: "pool-tb-001", name: "Thermoblock Standard 8×4",  sku: "POOL-TB-001", category: "Pool",   categoryHref: "/pool/thermoblock", description: "Energieffektiv pool med isolerande thermoblockvägg. Håller värmen längre och sänker driftskostnaderna.",  price: 89000,  href: "/pool/thermoblock", type: "product" },
  { id: "pool-tb-002", name: "Thermoblock Premium 10×5",  sku: "POOL-TB-002", category: "Pool",   categoryHref: "/pool/thermoblock", description: "Stor familjepool i thermoblock med extra isolering och inbyggd sittbänk.",                                price: 129000, href: "/pool/thermoblock", type: "product" },
  { id: "pool-tb-003", name: "Thermoblock Compact 6×3",   sku: "POOL-TB-003", category: "Pool",   categoryHref: "/pool/thermoblock", description: "Kompakt thermoblock-pool perfekt för mindre trädgårdar.",                                               price: 69000,  href: "/pool/thermoblock", type: "product" },

  // ── Pool — Gjuten stomme ──────────────────────────────────────────────────
  { id: "pool-gs-001", name: "Gjuten Stomme Classic",     sku: "POOL-GS-001", category: "Pool",   categoryHref: "/pool/gjuten-stomme", description: "Traditionell betongpool med gjuten stomme – robust och tidlös design.",                              price: 145000, href: "/pool/gjuten-stomme", type: "product" },
  { id: "pool-gs-002", name: "Gjuten Stomme Oval",        sku: "POOL-GS-002", category: "Pool",   categoryHref: "/pool/gjuten-stomme", description: "Oval betongpool i gjuten stomme, perfekt för mindre trädgårdar.",                                  price: 115000, href: "/pool/gjuten-stomme", type: "product" },
  { id: "pool-gs-003", name: "Gjuten Stomme XL",          sku: "POOL-GS-003", category: "Pool",   categoryHref: "/pool/gjuten-stomme", description: "Extra stor gjuten pool för hela familjen med plats för simning.",                                  price: 195000, href: "/pool/gjuten-stomme", type: "product" },

  // ── Pool — Rostfri stomme ─────────────────────────────────────────────────
  { id: "pool-rs-001", name: "Rostfri Stomme 316L",       sku: "POOL-RS-001", category: "Pool",   categoryHref: "/pool/rostfri-stomme", description: "Pool i maringrade 316L rostfritt stål. Extremt hållbar och underhållsfri.",                       price: 195000, href: "/pool/rostfri-stomme", type: "product" },
  { id: "pool-rs-002", name: "Rostfri Stomme Premium",    sku: "POOL-RS-002", category: "Pool",   categoryHref: "/pool/rostfri-stomme", description: "Premiumpool i rostfritt stål med inbyggd LED och automatisk rengöring.",                          price: 275000, href: "/pool/rostfri-stomme", type: "product" },

  // ── Spabad — Black Edition ────────────────────────────────────────────────
  { id: "spa-be-001", name: "Black Edition 700",          sku: "SPA-BE-001",  category: "Spabad", categoryHref: "/spabad/black-edition", description: "Exklusiv spabad i helsvart utförande med 40 jets och LED-belysning.",                           price: 79000,  href: "/spabad/black-edition", type: "product" },
  { id: "spa-be-002", name: "Black Edition 900 Pro",      sku: "SPA-BE-002",  category: "Spabad", categoryHref: "/spabad/black-edition", description: "Premiumbadkar för sex personer med vattenfallsfunktion och WiFi-styrning.",                     price: 109000, href: "/spabad/black-edition", type: "product" },
  { id: "spa-be-003", name: "Black Edition 500 Compact",  sku: "SPA-BE-003",  category: "Spabad", categoryHref: "/spabad/black-edition", description: "Kompakt black edition för mindre utrymmen, utan att kompromissa med stil.",                    price: 59000,  href: "/spabad/black-edition", type: "product" },

  // ── Spabad — Swimspa ──────────────────────────────────────────────────────
  { id: "spa-ss-001", name: "Swimspa Duo 550",            sku: "SPA-SS-001",  category: "Spabad", categoryHref: "/spabad/swimspa", description: "Kombinerad swimspa och spabad. Simma och koppla av i samma enhet.",                                  price: 155000, href: "/spabad/swimspa", type: "product" },
  { id: "spa-ss-002", name: "Swimspa Pro 750",            sku: "SPA-SS-002",  category: "Spabad", categoryHref: "/spabad/swimspa", description: "Professionell swimspa med kraftfull motström för riktigt simträning.",                              price: 210000, href: "/spabad/swimspa", type: "product" },

  // ── Spabad — Vildmarksspa ─────────────────────────────────────────────────
  { id: "spa-vs-001", name: "Vildmarksspa Vedeldad",      sku: "SPA-VS-001",  category: "Spabad", categoryHref: "/spabad/vildmarksspa", description: "Klassisk vedeldad vildmarksspa i cederträ. Ingen el behövs.",                                  price: 28000,  href: "/spabad/vildmarksspa", type: "product" },
  { id: "spa-vs-002", name: "Vildmarksspa Stor",          sku: "SPA-VS-002",  category: "Spabad", categoryHref: "/spabad/vildmarksspa", description: "Större vedeldad vildmarksspa för upp till 8 personer.",                                        price: 42000,  href: "/spabad/vildmarksspa", type: "product" },

  // ── Spabad — Family Spa ───────────────────────────────────────────────────
  { id: "spa-fs-001", name: "Family Spa 6-sits",          sku: "SPA-FS-001",  category: "Spabad", categoryHref: "/spabad/family-spa", description: "Rymlig familjespa för upp till 6 personer med barnvänliga funktioner.",                          price: 69000,  href: "/spabad/family-spa", type: "product" },
  { id: "spa-fs-002", name: "Family Spa 8-sits",          sku: "SPA-FS-002",  category: "Spabad", categoryHref: "/spabad/family-spa", description: "Extra stor familjespa för upp till 8 personer med lekfulla jets.",                              price: 89000,  href: "/spabad/family-spa", type: "product" },

  // ── Spabad — Tillbehör ────────────────────────────────────────────────────
  { id: "spa-tl-001", name: "Spa Cover Lyft",             sku: "SPA-TL-001",  category: "Spabad", categoryHref: "/spabad/tillbehor", description: "Hydraulisk lock-lyftare för enklare hantering av spa-locket.",                                   price: 3200,   href: "/spabad/tillbehor", type: "product" },
  { id: "spa-tl-002", name: "Spa Kemikaliepaket Start",   sku: "SPA-TL-002",  category: "Spabad", categoryHref: "/spabad/tillbehor", description: "Komplett startpaket med alla kemikalier för din nya spabad.",                                     price: 890,    href: "/spabad/tillbehor", type: "product" },
  { id: "spa-tl-003", name: "Spa Stege",                  sku: "SPA-TL-003",  category: "Spabad", categoryHref: "/spabad/tillbehor", description: "Säker och slitstark stege i rostfritt stål för enkel in- och urstigning.",                       price: 2400,   href: "/spabad/tillbehor", type: "product" },

  // ── Bastu ─────────────────────────────────────────────────────────────────
  { id: "bst-001", name: "Utomhusbastu Classic",          sku: "BST-001",     category: "Bastu",  categoryHref: "/bastu", description: "Fristående utomhusbastu i obehandlad nordic spruce. Rymmer 4–6 personer med elbastu-aggregat.",             price: 42000,  href: "/bastu", type: "product" },
  { id: "bst-002", name: "Utomhusbastu Compact",          sku: "BST-002",     category: "Bastu",  categoryHref: "/bastu", description: "Kompakt utomhusbastu för 2–3 personer. Perfekt för mindre tomter.",                                         price: 28000,  href: "/bastu", type: "product" },
  { id: "bst-003", name: "Bastu med omklädningsrum",      sku: "BST-003",     category: "Bastu",  categoryHref: "/bastu", description: "Rymlig bastu med separat omklädningsdel och veranda. Komplett lösning.",                                    price: 68000,  href: "/bastu", type: "product" },
];

export function searchItems(query: string): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return searchData.filter((item) => {
    return (
      item.name.toLowerCase().includes(q) ||
      item.sku.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.brand !== undefined && item.brand.toLowerCase().includes(q))
    );
  });
}
