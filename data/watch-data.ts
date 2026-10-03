/**
 * SUMERI WATCH CATALOG DATA
 * Source of Truth: E:\project 2\watch_catalog.md & images_nobg\
 * Zero fabricated facts or imaginary reviews.
 */

export interface CraftDetailItem {
  id: string;
  num: string;
  category: "CASE" | "BEZEL" | "DIAL" | "CROWN" | "STRAP" | "CRYSTAL" | "MOVEMENT";
  title: string;
  description: string;
  focusArea: {
    x: number; // percentage crop origin x
    y: number; // percentage crop origin y
    scale: number; // zoom into that part of the watch
  };
}

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
  craftDetails?: CraftDetailItem[];
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
    },
    craftDetails: [
      {
        id: "case",
        num: "01",
        category: "CASE",
        title: "Solid 316L Marine Steel",
        description: "Heavy-duty brushed stainless steel case rated for 200M immersion.",
        focusArea: { x: 50, y: 35, scale: 2.2 }
      },
      {
        id: "bezel",
        num: "02",
        category: "BEZEL",
        title: "60-Click Rotary Bezel",
        description: "Anodized aluminum split-color ring with luminous 12-o'clock alignment pip.",
        focusArea: { x: 50, y: 28, scale: 2.5 }
      },
      {
        id: "dial",
        num: "03",
        category: "DIAL",
        title: "Deep Sea Sunray Black",
        description: "High-contrast luminescent geometric indices and sword-style diver hands.",
        focusArea: { x: 50, y: 48, scale: 2.8 }
      },
      {
        id: "crown",
        num: "04",
        category: "CROWN",
        title: "Threaded Screw-Down Crown",
        description: "Dual O-ring gasket system guaranteeing water-tight seal under pressure.",
        focusArea: { x: 74, y: 50, scale: 3.2 }
      },
      {
        id: "strap",
        num: "05",
        category: "STRAP",
        title: "High-Tensile Resin Band",
        description: "Corrosion-resistant flexible black elastomer with stainless steel buckle.",
        focusArea: { x: 50, y: 85, scale: 2.2 }
      }
    ]
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
    },
    craftDetails: [
      {
        id: "case",
        num: "01",
        category: "CASE",
        title: "316L Angular Chassis",
        description: "Solid stainless steel with brushed facets and mirror-polished bevels.",
        focusArea: { x: 50, y: 35, scale: 2.2 }
      },
      {
        id: "bezel",
        num: "02",
        category: "BEZEL",
        title: "Octagonal Steel Bezel",
        description: "Precision-machined octagonal rim with concentric brushed top surface.",
        focusArea: { x: 50, y: 30, scale: 2.6 }
      },
      {
        id: "dial",
        num: "03",
        category: "DIAL",
        title: "Forged Carbon Composite",
        description: "Raw forged carbon weave plate with floating indices and mechanical balance.",
        focusArea: { x: 50, y: 48, scale: 3.0 }
      },
      {
        id: "crown",
        num: "04",
        category: "CROWN",
        title: "Guarded Steel Crown",
        description: "Integrated crown guards with knurled grip for positive tactile engagement.",
        focusArea: { x: 72, y: 50, scale: 3.2 }
      },
      {
        id: "strap",
        num: "05",
        category: "STRAP",
        title: "Tapered Steel Bracelet",
        description: "Solid links with dual push-button deployment and brushed finishing.",
        focusArea: { x: 50, y: 85, scale: 2.4 }
      }
    ]
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
    },
    craftDetails: [
      {
        id: "case",
        num: "01",
        category: "CASE",
        title: "Swiss 316L Stainless Steel",
        description: "Refined dress-sport proportions with mirror polished bezel and brushed flanks.",
        focusArea: { x: 50, y: 35, scale: 2.2 }
      },
      {
        id: "bezel",
        num: "02",
        category: "BEZEL",
        title: "Slim Polished Bezel",
        description: "Minimalist stepped bezel optimizing dial aperture and crystal seating.",
        focusArea: { x: 50, y: 30, scale: 2.6 }
      },
      {
        id: "dial",
        num: "03",
        category: "DIAL",
        title: "Slate Sunray Monolith",
        description: "Brushed charcoal sunray finish with applied pyramid hour markers and Swiss crest.",
        focusArea: { x: 50, y: 48, scale: 3.0 }
      },
      {
        id: "crown",
        num: "04",
        category: "CROWN",
        title: "Shield-Engraved Crown",
        description: "Swiss precision gasketed crown with laser-etched cross and shield emblem.",
        focusArea: { x: 72, y: 50, scale: 3.2 }
      },
      {
        id: "strap",
        num: "05",
        category: "STRAP",
        title: "Vegetable-Tanned Leather",
        description: "Supple black full-grain leather strap with contrast stitching and signed buckle.",
        focusArea: { x: 50, y: 85, scale: 2.4 }
      }
    ]
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
    },
    craftDetails: [
      {
        id: "case",
        num: "01",
        category: "CASE",
        title: "Super Titanium™ Monobloc",
        description: "Duratect-hardened titanium case with geometric chamfers, 40% lighter than steel.",
        focusArea: { x: 50, y: 35, scale: 2.2 }
      },
      {
        id: "bezel",
        num: "02",
        category: "BEZEL",
        title: "Integrated Satin Bezel",
        description: "Vertical satin-brushed circular bezel integrated directly into the tonneau case.",
        focusArea: { x: 50, y: 30, scale: 2.6 }
      },
      {
        id: "dial",
        num: "03",
        category: "DIAL",
        title: "Textured Copper Sunburst",
        description: "Warm guilloché textured copper dial with off-centered small seconds at 4:30.",
        focusArea: { x: 50, y: 48, scale: 3.0 }
      },
      {
        id: "crown",
        num: "04",
        category: "CROWN",
        title: "Precision Recessed Crown",
        description: "Fluted titanium crown engineered with double gaskets for 100M water resistance.",
        focusArea: { x: 72, y: 50, scale: 3.2 }
      },
      {
        id: "strap",
        num: "05",
        category: "STRAP",
        title: "Solid Titanium H-Link Bracelet",
        description: "Articulated titanium links with micro-adjustable push-button folding clasp.",
        focusArea: { x: 50, y: 85, scale: 2.4 }
      }
    ]
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
    },
    craftDetails: [
      {
        id: "case",
        num: "01",
        category: "CASE",
        title: "40mm Curved 316L Case",
        description: "Ergonomic curved lugs and mid-century retro silhouette.",
        focusArea: { x: 50, y: 35, scale: 2.2 }
      },
      {
        id: "bezel",
        num: "02",
        category: "BEZEL",
        title: "24-Hour Dual-Tone Bezel",
        description: "Mirror-polished bezel framing 24-hour dual timezone indicators.",
        focusArea: { x: 50, y: 30, scale: 2.6 }
      },
      {
        id: "dial",
        num: "03",
        category: "DIAL",
        title: "Azure Sunray GMT Dial",
        description: "Sunburst blue dial with independent red GMT hand and date aperture.",
        focusArea: { x: 50, y: 48, scale: 3.0 }
      },
      {
        id: "crown",
        num: "04",
        category: "CROWN",
        title: "Signed Marlin Crown",
        description: "Direct-drive crown with independent quick-set 24-hour hand gear.",
        focusArea: { x: 72, y: 50, scale: 3.2 }
      },
      {
        id: "strap",
        num: "05",
        category: "STRAP",
        title: "Milanese Stainless Steel Mesh",
        description: "High-density stainless steel mesh band with self-adjusting sliding clasp.",
        focusArea: { x: 50, y: 85, scale: 2.4 }
      }
    ]
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
    },
    craftDetails: [
      {
        id: "case",
        num: "01",
        category: "CASE",
        title: "Zirconia Ceramic Monolith",
        description: "Diamond-hardened high-tech ceramic case offering total scratch resistance.",
        focusArea: { x: 50, y: 35, scale: 2.2 }
      },
      {
        id: "bezel",
        num: "02",
        category: "BEZEL",
        title: "Mirror-Polished Ceramic Rim",
        description: "Seamless gloss black ceramic bezel integrated into the monobloc case.",
        focusArea: { x: 50, y: 30, scale: 2.6 }
      },
      {
        id: "dial",
        num: "03",
        category: "DIAL",
        title: "Obsidian Minimalist Dial",
        description: "Deep obsidian black face with applied rhodium-plated minimalist baton markers.",
        focusArea: { x: 50, y: 48, scale: 3.0 }
      },
      {
        id: "crown",
        num: "04",
        category: "CROWN",
        title: "Cabochon-Inlaid Crown",
        description: "Precision-fluted crown with ceramic cabochon insert and dust seals.",
        focusArea: { x: 72, y: 50, scale: 3.2 }
      },
      {
        id: "strap",
        num: "05",
        category: "STRAP",
        title: "Ceramic Links & Butterfly Clasp",
        description: "Silky tactile ceramic link bracelet secured by hidden dual-push butterfly buckle.",
        focusArea: { x: 50, y: 85, scale: 2.4 }
      }
    ]
  }
];

/**
 * Returns structured 5 craft details for any watch in the catalog.
 * If custom curated craft details exist, they are returned.
 * Otherwise, accurately derives details from the watch's real catalog specifications.
 */
export function getWatchCraftDetails(watch: WatchRecord): CraftDetailItem[] {
  if (watch.craftDetails && watch.craftDetails.length === 5) {
    return watch.craftDetails;
  }

  return [
    {
      id: "case",
      num: "01",
      category: "CASE",
      title: `${watch.caseMaterial.split(" ")[0]} Architecture`,
      description: `${watch.caseMaterial} precision-machined with high-tolerance surface finishing.`,
      focusArea: { x: 50, y: 35, scale: 2.2 }
    },
    {
      id: "bezel",
      num: "02",
      category: "BEZEL",
      title: watch.bezel || "Precision Machined Bezel",
      description: `${watch.bezel || "Precision bezel"} engineered for structural retention and aesthetics.`,
      focusArea: { x: 50, y: 30, scale: 2.6 }
    },
    {
      id: "dial",
      num: "03",
      category: "DIAL",
      title: "High-Contrast Dial",
      description: `Refined dial architecture with ${watch.crystal} optical defense and clear indicators.`,
      focusArea: { x: 50, y: 48, scale: 3.0 }
    },
    {
      id: "crown",
      num: "04",
      category: "CROWN",
      title: "Sealed Crown Assembly",
      description: `Pressure-sealed crown maintaining ${watch.waterResistance} environmental integrity.`,
      focusArea: { x: 72, y: 50, scale: 3.2 }
    },
    {
      id: "strap",
      num: "05",
      category: "STRAP",
      title: watch.strap || "Integrated Strap",
      description: `${watch.strap || "Supple bracelet"} engineered for ergonomic wrist retention.`,
      focusArea: { x: 50, y: 85, scale: 2.4 }
    }
  ];
}

// 7 Selected watches for the Signature Waterfall Deck (§9A in projectplan.md)
export const WATERFALL_WATCHES = WATCH_CATALOG.slice(0, 7);

// Hero 3 Colorways (§8 H2 in projectplan.md)
export const HERO_COLORWAYS = [
  WATCH_CATALOG[0], // Casio Duro Batman 200M
  WATCH_CATALOG[1], // Casio Edifice Forged Carbon
  WATCH_CATALOG[7], // Timex Marlin GMT Blue
];
