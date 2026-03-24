export type PoolpaketItem = { sku: string; name: string };

export type PoolpaketVariant = {
  label: string;
  sku: string;
  price: number;
  items: PoolpaketItem[];
};

export type Poolpaket = {
  slug: string;
  name: string;
  tier: "Bas" | "Premium";
  tagline: string;
  color: string;
  badge: string;
  variants: PoolpaketVariant[];
};

export const poolpaket: Poolpaket[] = [
  {
    slug: "poolpaket-bas",
    name: "Poolpaket Bas",
    tier: "Bas",
    tagline: "Komplett poolinstallation med värmepump, sandfilter, belysning och automatisk pH-dosering.",
    color: "bg-blue-50",
    badge: "Bas",
    variants: [
      {
        label: "3×6 m",
        sku: "PAKET-BAS-3x6",
        price: 197990,
        items: [
          { sku: "123974",   name: "Poolstege fällbar 4-steg, båge 510 mm" },
          { sku: "14950181", name: "Bypass-kit värmepump c-c 250-390 mm" },
          { sku: "14983330", name: "Calidi VP10" },
          { sku: "14983520", name: "Stativ mark till värmepump" },
          { sku: "34116",    name: "Linertillbehörspaket FORTE" },
          { sku: "34213",    name: "RF Premium Classic, tjock vägg, lång hals" },
          { sku: "34312S",   name: "Filtrering Eco Bas 1-fas" },
          { sku: "34500",    name: "Poolvård Bas" },
          { sku: "34905",    name: "Belysning Bas+ Classic LED RGB" },
          { sku: "412863",   name: "Advantage 3×6 m Antracitgrå" },
          { sku: "8530060",  name: "Poolstomme 3×6 m Thermoblock FORTE" },
          { sku: "34320",    name: "Anslutningspaket PEM/PVC" },
          { sku: "33038",    name: "MiniMaster monterad pH+fritt klor" },
        ],
      },
      {
        label: "4×8 m",
        sku: "PAKET-BAS-4x8",
        price: 228990,
        items: [
          { sku: "123974",   name: "Poolstege fällbar 4-steg, båge 510 mm" },
          { sku: "14950181", name: "Bypass-kit värmepump c-c 250-390 mm" },
          { sku: "14983333", name: "Calidi VP13" },
          { sku: "14983520", name: "Stativ mark till värmepump" },
          { sku: "34118",    name: "Linertillbehörspaket FORTE" },
          { sku: "34213",    name: "RF Premium Classic, tjock vägg, lång hals" },
          { sku: "34312S",   name: "Filtrering Eco Bas 1-fas" },
          { sku: "34500",    name: "Poolvård Bas" },
          { sku: "34905",    name: "Belysning Bas+ Classic LED RGB" },
          { sku: "412869",   name: "Advantage 4×8 m Antracitgrå" },
          { sku: "8540080",  name: "Poolstomme 4×8 m Thermoblock FORTE" },
          { sku: "34320",    name: "Anslutningspaket PEM/PVC" },
          { sku: "33038",    name: "MiniMaster monterad pH+fritt klor" },
        ],
      },
    ],
  },
  {
    slug: "poolpaket-premium",
    name: "Poolpaket Premium",
    tier: "Premium",
    tagline: "Vår mest kompletta poolinstallation — med premiumkomponenter, gaveltrappa och avancerad doseringsutrustning.",
    color: "bg-amber-50",
    badge: "Premium",
    variants: [
      {
        label: "3×6 m",
        sku: "PAKET-PREMIUM-3x6",
        price: 279990,
        items: [
          { sku: "14950181", name: "Bypass-kit värmepump c-c 250-390 mm" },
          { sku: "14983346", name: "Calidi ZP13" },
          { sku: "14983520", name: "Stativ mark till värmepump" },
          { sku: "34116",    name: "Linertillbehörspaket FORTE 3×6 m" },
          { sku: "34218",    name: "RF Premium+ Classic Wide, tjock vägg" },
          { sku: "34342S",   name: "Filtrering Eco Premium+ 1-fas" },
          { sku: "34502",    name: "Poolvård Premium" },
          { sku: "34910",    name: "Belysning Premium Classic LED RGB" },
          { sku: "412863",   name: "Advantage 3×6 m Antracitgrå" },
          { sku: "830730",   name: "Gaveltrappa 3 m komplett" },
          { sku: "8530060",  name: "Poolstomme 3×6 m Thermoblock FORTE" },
          { sku: "34320",    name: "Anslutningspaket PEM/PVC" },
          { sku: "33061",    name: "Dosering Premium Aseko NET Redox/pH" },
        ],
      },
      {
        label: "4×8 m",
        sku: "PAKET-PREMIUM-4x8",
        price: 324990,
        items: [
          { sku: "14950181", name: "Bypass-kit värmepump c-c 250-390 mm" },
          { sku: "14983347", name: "Calidi ZP17" },
          { sku: "14983520", name: "Stativ mark till värmepump" },
          { sku: "34118",    name: "Linertillbehörspaket FORTE" },
          { sku: "34218",    name: "RF Premium+ Classic Wide, tjock vägg" },
          { sku: "34342S",   name: "Filtrering Eco Premium+ 1-fas" },
          { sku: "34502",    name: "Poolvård Premium" },
          { sku: "34910",    name: "Belysning Premium Classic LED RGB" },
          { sku: "412869",   name: "Advantage 4×8 m Antracitgrå" },
          { sku: "830740",   name: "Gaveltrappa 4 m komplett" },
          { sku: "8540080",  name: "Poolstomme 4×8 m Thermoblock FORTE" },
          { sku: "34320",    name: "Anslutningspaket PEM/PVC" },
          { sku: "33061",    name: "Dosering Premium Aseko NET Redox/pH" },
        ],
      },
    ],
  },
];
