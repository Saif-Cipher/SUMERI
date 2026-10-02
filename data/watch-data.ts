/**
 * SUMERI WATCH CATALOG DATA
 * Source of Truth: E:\project 2\watch_catalog.md & images_nobg\
 * Zero fabricated facts or imaginary reviews.
 */

export interface WatchRecord {
  id: string;
  slug: string;
  store: "Watch Zone" | "TIME ZONE";
  brand: string;
  name: string;
  model: string;
  price: string;
  rawPrice: number;
  image: string;
  category: "DIVER" | "AUTOMATIC" | "CHRONO" | "TITANIUM" | "HERITAGE" | "CERAMIC";
  waterResistance: string;
  crystal: string;
  caseMaterial: string;
  bezel: string;
  strap: string;
  movement: string;
  description: string;
  palette: {
    bgColor: string;
    colorA: string;
    colorB: string;
    colorC: string;
    colorD: string;
    accent: string;
    tag: string;
  };
}

export const WATCH_CATALOG: WatchRecord[] = [
  {
    id: "01-marlin-batman",
    slug: "casio-duro-marlin-batman",
    store: "Watch Zone",
    brand: "Casio",
    name: "Casio Duro Marlin Diver's Batman Black Dial",
    model: "MDV-106B-1A1V",
    price: "৳14,500",
    rawPrice: 14500,
    image: "/images_nobg/01_watchzone_Casio_Duro_Marlin_Diver_s_Batman_Black_Dial_Men_s_Watch.png",
    category: "DIVER",
    waterResistance: "200M (20 ATM)",
    crystal: "Mineral Glass",
    caseMaterial: "Stainless Steel",
    bezel: "Rotary Black & Deep Blue Split Bezel",
    strap: "Black Resin Band",
    movement: "Japanese Quartz with Date Window",
    description: "200-meter water resistance for diving reliability. Unidirectional rotating bezel, screw-down crown, and sunburst black dial with luminous indices.",
    palette: {
      bgColor: "#c8cff0",
      colorA: "#d4c8e8",
      colorB: "#dcdcf3",
      colorC: "#e0e4f5",
      colorD: "#f5f5fd",
      accent: "#2a4bd7",
      tag: "BATMAN 200M"
    }
  },
  {
    id: "02-edifice-carbon",
    slug: "casio-edifice-forged-carbon",
    store: "Watch Zone",
    brand: "Casio Edifice",
    name: "Casio Edifice Automatic Forged Carbon Black Dial",
    model: "EFK-200CD-1A",
    price: "৳40,500",
    rawPrice: 40500,
    image: "/images_nobg/02_watchzone_Casio_Edifice_Automatic_Forged_Carbon_Black_Dial_Men_s_.png",
    category: "AUTOMATIC",
    waterResistance: "100M (10 ATM)",
    crystal: "Scratch-resistant Sapphire Crystal",
    caseMaterial: "Solid 316L Stainless Steel",
    bezel: "Octagonal Polished Steel Bezel",
    strap: "Solid Stainless Steel Bracelet",
    movement: "Mechanical Automatic (42-Hour Power Reserve)",
    description: "Forged carbon composite dial with exposed mechanical indices, sapphire crystal, and 42-hour automatic movement.",
    palette: {
      bgColor: "#d9dcf2",
      colorA: "#e3d9ee",
      colorB: "#ececf7",
      colorC: "#f1f3fa",
      colorD: "#fbfbff",
      accent: "#7b3fd9",
      tag: "FORGED CARBON"
    }
  },
  {
    id: "03-victorinox-alliance",
    slug: "victorinox-alliance-grey",
    store: "Watch Zone",
    brand: "Victorinox",
    name: "Victorinox Alliance Grey Dial Men's Watch",
    model: "241804.1",
    price: "৳65,000",
    rawPrice: 65000,
    image: "/images_nobg/03_watchzone_Victorinox_Alliance_Grey_Dial_Men_s_Watch_with_Swiss_Ar.png",
    category: "HERITAGE",
    waterResistance: "100M (10 ATM)",
    crystal: "Triple-coated Anti-reflective Sapphire",
    caseMaterial: "High-grade 316L Stainless Steel",
    bezel: "Polished Fixed Stainless Steel",
    strap: "Genuine Black Leather Strap",
    movement: "Swiss Quartz Caliber",
    description: "Swiss-made horology with refined grey sunray dial, anti-reflective sapphire crystal, and genuine leather craftsmanship.",
    palette: {
      bgColor: "#cfd3e8",
      colorA: "#d8dceb",
      colorB: "#e2e5f1",
      colorC: "#eaeef7",
      colorD: "#f6f8fd",
      accent: "#4b5563",
      tag: "SWISS ALLIANCE"
    }
  },
  {
    id: "04-citizen-zenshin",
    slug: "citizen-zenshin-60-titanium",
    store: "Watch Zone",
    brand: "Citizen",
    name: "Citizen Zenshin 60 Automatic Copper Dial Super Titanium",
    model: "NK5020-58P",
    price: "৳68,000",
    rawPrice: 68000,
    image: "/images_nobg/04_watchzone_Citizen_Zenshin_60_Automatic_Copper_Dial_Super_Titanium.png",
    category: "TITANIUM",
    waterResistance: "100M (10 ATM)",
    crystal: "Sapphire Crystal",
    caseMaterial: "Super Titanium™ with Duratect Hardening",
    bezel: "Integrated Super Titanium Bezel",
    strap: "Solid Super Titanium Bracelet",
    movement: "Citizen Caliber 8322 Automatic (60-Hour Reserve)",
    description: "Ultralight Super Titanium construction with stunning textured copper dial, 60-hour Caliber 8322 automatic movement, and small seconds.",
    palette: {
      bgColor: "#ecdacf",
      colorA: "#f1e2d8",
      colorB: "#f6ece4",
      colorC: "#fbf4ef",
      colorD: "#fdfbf9",
      accent: "#c25e2e",
      tag: "SUPER TITANIUM"
    }
  },
  {
    id: "05-fossil-campbell",
    slug: "fossil-campbell-day-date",
    store: "Watch Zone",
    brand: "Fossil",
    name: "Fossil Campbell Day-Date Blue Dial",
    model: "FS6140",
    price: "৳12,500",
    rawPrice: 12500,
    image: "/images_nobg/05_watchzone_Fossil_Campbell_Day_Date_Blue_Dial_Men_s_Watch_FS6140.png",
    category: "HERITAGE",
    waterResistance: "50M (5 ATM)",
    crystal: "Hardened Mineral Crystal",
    caseMaterial: "Brushed Stainless Steel",
    bezel: "Classic Fluted Bezel",
    strap: "Stainless Steel Jubilee-style Bracelet",
    movement: "Japanese Quartz Day-Date",
    description: "Deep azure blue dial with full weekday display at 12 o'clock and date magnification at 3 o'clock.",
    palette: {
      bgColor: "#cddcf4",
      colorA: "#d7e4f7",
      colorB: "#e2ecfa",
      colorC: "#edf4fd",
      colorD: "#f7faff",
      accent: "#1e40af",
      tag: "CAMPBELL BLUE"
    }
  },
  {
    id: "06-casio-enticer-marine",
    slug: "casio-enticer-marine-black",
    store: "Watch Zone",
    brand: "Casio",
    name: "Casio Enticer Marine Inspired Black Dial",
    model: "MRW-230H-1E1",
    price: "৳5,800",
    rawPrice: 5800,
    image: "/images_nobg/06_watchzone_Casio_Enticer_Marine_Inspired_Black_Dial_Resin_Band_Wat.png",
    category: "DIVER",
    waterResistance: "100M (10 ATM)",
    crystal: "Resin Glass",
    caseMaterial: "Lightweight High-density Resin",
    bezel: "Rotary Diver Bezel with Aluminum Reflective Ring",
    strap: "Durable Flexible Resin Band",
    movement: "Quartz Movement with Day & Date",
    description: "Marine-inspired sport horology with rotating diver bezel, reflective aluminum accent ring, and reliable 100M water resistance.",
    palette: {
      bgColor: "#ccd4df",
      colorA: "#d6dde6",
      colorB: "#e0e6ee",
      colorC: "#ebf0f5",
      colorD: "#f6f8fb",
      accent: "#0b0b14",
      tag: "ENTICER MARINE"
    }
  },
  {
    id: "07-timex-1983-tv",
    slug: "timex-1983-e-line-reissue-tv",
    store: "Watch Zone",
    brand: "Timex",
    name: "Timex® 1983 E Line Reissue TV Dial Automatic",
    model: "TW2W70800",
    price: "৳30,500",
    rawPrice: 30500,
    image: "/images_nobg/07_watchzone_Timex_1983_E_Line_Reissue_TV_Dial_Automatic_Men_s_Watch.png",
    category: "AUTOMATIC",
    waterResistance: "50M (5 ATM)",
    crystal: "Domed Acrylic Crystal",
    caseMaterial: "Stainless Steel TV-Case Geometry",
    bezel: "Brushed TV-Screen Integrated Bezel",
    strap: "Tapered Stainless Steel Mesh Bracelet",
    movement: "Miyota 8215 Japanese Automatic (21 Jewels)",
    description: "Retro-futuristic 1983 reissue with iconic rounded-square TV case, sunburst silver dial, and exposed mechanical Miyota automatic movement.",
    palette: {
      bgColor: "#d5d5db",
      colorA: "#dedee3",
      colorB: "#e7e7eb",
      colorC: "#f0f0f3",
      colorD: "#f8f8fa",
      accent: "#475569",
      tag: "TV DIAL 1983"
    }
  },
  {
    id: "08-timex-marlin-gmt",
    slug: "timex-marlin-gmt-automatic",
    store: "Watch Zone",
    brand: "Timex",
    name: "Timex Marlin® GMT 40mm Blue Dial",
    model: "TW2Y47600",
    price: "৳26,500",
    rawPrice: 26500,
    image: "/images_nobg/08_watchzone_Timex_Marlin_GMT_40mm_Blue_Dial_Men_s_Watch_TW2Y47600.png",
    category: "AUTOMATIC",
    waterResistance: "50M (5 ATM)",
    crystal: "Domed Acrylic Crystal",
    caseMaterial: "40mm Polished Stainless Steel",
    bezel: "Dual-tone 24-Hour Navigation Bezel",
    strap: "Stainless Steel Milanese Mesh Bracelet",
    movement: "Automatic GMT Caliber with Independent 24H Hand",
    description: "40mm maritime horology featuring independent red 24-hour GMT hand, domed acrylic glass, and full exhibition caseback display.",
    palette: {
      bgColor: "#c8d4f0",
      colorA: "#c8d8e8",
      colorB: "#dce6f3",
      colorC: "#e0eaf5",
      colorD: "#f5f8fd",
      accent: "#1c64f2",
      tag: "GMT MARLIN"
    }
  },
  {
    id: "09-regent-chrono",
    slug: "regent-rg6021zl-chrono",
    store: "TIME ZONE",
    brand: "Regent",
    name: "Regent Maison Chronograph Stainless Steel",
    model: "RG6021ZL ST BK MT",
    price: "৳5,350",
    rawPrice: 5350,
    image: "/images_nobg/09_timezone_RG6021ZL_ST_BK_MT.png",
    category: "CHRONO",
    waterResistance: "30M (3 ATM)",
    crystal: "Sapphire Coated Crystal",
    caseMaterial: "44mm Stainless Steel Case",
    bezel: "Tachymeter Fixed Steel Bezel",
    strap: "Stainless Steel Chain with Double Push Fold Buckle",
    movement: "Multi-dial Chronograph Quartz",
    description: "44mm stainless steel masculine chronograph with tri-register sub-dials, sapphire-coated crystal, and brushed steel bracelet.",
    palette: {
      bgColor: "#cbd0d8",
      colorA: "#d5d9e0",
      colorB: "#dfe3e8",
      colorC: "#e9ecf0",
      colorD: "#f5f6f8",
      accent: "#334155",
      tag: "MAISON CHRONO"
    }
  },
  {
    id: "10-titan-two-tone",
    slug: "titan-1775bm02-two-tone",
    store: "TIME ZONE",
    brand: "Titan",
    name: "Titan Golden-Silver Two-Tone Classic",
    model: "1775BM02",
    price: "৳9,200",
    rawPrice: 9200,
    image: "/images_nobg/10_timezone_1775BM02.png",
    category: "HERITAGE",
    waterResistance: "30M (3 ATM)",
    crystal: "Mineral Glass",
    caseMaterial: "Polished Stainless Steel & Gold Ion-Plating",
    bezel: "Gold-accented Bezel",
    strap: "Golden-Silver Bi-color Chain Bracelet",
    movement: "Precision Quartz Caliber",
    description: "Bi-color architectural dress watch pairing golden fluted accents with cold silver dial and linked bracelet.",
    palette: {
      bgColor: "#ebe4d5",
      colorA: "#f1ece0",
      colorB: "#f6f3eb",
      colorC: "#faf8f4",
      colorD: "#fdfdfb",
      accent: "#b48c36",
      tag: "TWO-TONE DRESS"
    }
  },
  {
    id: "11-titan-karisma",
    slug: "titan-1580sm03-karisma",
    store: "TIME ZONE",
    brand: "Titan",
    name: "Titan Karisma Minimal Silver Dial",
    model: "1580SM03",
    price: "৳6,750",
    rawPrice: 6750,
    image: "/images_nobg/11_timezone_1580SM03.png",
    category: "HERITAGE",
    waterResistance: "30M (3 ATM)",
    crystal: "Mineral Glass",
    caseMaterial: "35mm Slim Profile Metal Case",
    bezel: "Polished Minimal Bezel",
    strap: "Interlocking Metal Mesh Strap",
    movement: "Calibrated Quartz Movement",
    description: "35mm restrained proportion watch with silver sunray dial, minimalist stick indices, and sleek metal bracelet.",
    palette: {
      bgColor: "#d9d9de",
      colorA: "#e2e2e6",
      colorB: "#ebebee",
      colorC: "#f3f3f5",
      colorD: "#fafafb",
      accent: "#64748b",
      tag: "KARISMA SLIM"
    }
  },
  {
    id: "12-titan-ceramic",
    slug: "titan-1841nc01-ceramic",
    store: "TIME ZONE",
    brand: "Titan",
    name: "Titan Stealth High-Tech Ceramic",
    model: "1841NC01",
    price: "৳80,250",
    rawPrice: 80250,
    image: "/images_nobg/12_timezone_1841NC01.png",
    category: "CERAMIC",
    waterResistance: "50M (5 ATM)",
    crystal: "Scratch-proof Sapphire Crystal",
    caseMaterial: "Zirconia High-Tech Ceramic Case",
    bezel: "Polished Black Ceramic Bezel",
    strap: "Solid Black Ceramic Link Bracelet with Butterfly Clasp",
    movement: "Premium Swiss-grade Quartz Caliber",
    description: "Pure stealth luxury crafted entirely from diamond-hardened zirconia ceramic, scratchproof sapphire glass, and midnight black dial.",
    palette: {
      bgColor: "#1e1e24",
      colorA: "#2b2b33",
      colorB: "#383842",
      colorC: "#454552",
      colorD: "#525261",
      accent: "#e2e8f0",
      tag: "STEALTH CERAMIC"
    }
  }
];

// 7 Selected watches for the Signature Waterfall Deck (§9A in projectplan.md)
export const WATERFALL_WATCHES = WATCH_CATALOG.slice(0, 7);

// Hero 3 Colorways (§8 H2 in projectplan.md)
export const HERO_COLORWAYS = [
  WATCH_CATALOG[0], // Casio Duro Batman 200M
  WATCH_CATALOG[1], // Casio Edifice Forged Carbon
  WATCH_CATALOG[7], // Timex Marlin GMT Blue
];
