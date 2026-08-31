import type { CategorySection, SwatchOption } from "../types";

// Shared colour palettes, approximated from the physical Granny Flats Perth
// Pre-Start Selection Booklet. Real swatch/product photography can be dropped
// in later via the `image` field once supplied by GFP / their suppliers.

const colorbondExterior: SwatchOption[] = [
  { id: "surfmist", name: "Surfmist®", hex: "#E6E2D3" },
  { id: "shale-grey", name: "Shale Grey®", hex: "#9C9787" },
  { id: "dune", name: "Dune®", hex: "#AFA692" },
  { id: "basalt", name: "Basalt®", hex: "#4E5150" },
  { id: "monument", name: "Monument®", hex: "#323233" },
  { id: "woodland-grey", name: "Woodland Grey®", hex: "#4A4740" },
  { id: "windspray", name: "Windspray®", hex: "#97999B" },
];

const colorbondRoofFull: SwatchOption[] = [
  ...colorbondExterior,
  { id: "ironstone", name: "Ironstone®", hex: "#494F51" },
  { id: "wallaby", name: "Wallaby®", hex: "#8A7F70" },
];

const taubmanWhites: SwatchOption[] = [
  { id: "crisp-white", name: "Crisp White", hex: "#F6F4EC" },
  { id: "tahira-white", name: "Tahira White", hex: "#F1ECDE" },
  { id: "cloud-burst", name: "Cloud Burst", hex: "#C7BEAF" },
  { id: "china-doll", name: "China Doll", hex: "#F2EBDA" },
  { id: "big-white", name: "Big White", hex: "#F8F5EC" },
  { id: "miss-universe", name: "Miss Universe", hex: "#F2E9D2" },
  { id: "cradle-white", name: "Cradle White", hex: "#F1E8D2" },
  { id: "alphine-snow", name: "Alphine Snow", hex: "#F5F0E1" },
  { id: "cotton-ball", name: "Cotton Ball", hex: "#F0E8D5" },
  { id: "secret-white", name: "Secret White", hex: "#EFE9D8" },
];

const frameFinishes: SwatchOption[] = [
  { id: "black", name: "Black", hex: "#1E1E1E" },
  { id: "matt-silver", name: "Matt Silver", hex: "#AFB2B3" },
  { id: "bright-silver", name: "Bright Silver", hex: "#D9DBDC" },
];

export const catalogue: CategorySection[] = [
  // ---------------------------------------------------------------- EXTERIOR
  {
    id: "external-cladding",
    group: "Exterior",
    title: "External Cladding",
    brand: "Colorbond® / James Hardie",
    intro:
      "With its iconic uniform 'ripple', our standard corrugated and ribbed steel profiles are lightweight, durable and low-maintenance.",
    upgradeIntro:
      "Seeking a striking feature wall? Explore our range of Innova® fibre-cement upgrades for a feature panel.",
    subsections: [
      {
        id: "cladding-profile",
        heading: "Cladding profile",
        tier: "standard",
        mode: "single",
        options: [
          {
            id: "custom-orb",
            name: "Custom Orb®",
            icon: "cladding",
            hex: "#3A3A3C",
            description:
              "The original corrugated steel profile trusted by Australians for generations — lightweight, durable and versatile.",
          },
          {
            id: "trimdek",
            name: "Trimdek®",
            icon: "cladding",
            hex: "#4B4D4E",
            description:
              "A modern ribbed profile with clean, defined lines for a sleek, low-maintenance exterior.",
          },
        ],
      },
      {
        id: "cladding-feature",
        heading: "Feature wall upgrade",
        tier: "upgrade",
        mode: "single",
        allowOther: false,
        options: [
          {
            id: "duragrove",
            name: "Innova Duragrove®",
            icon: "cladding",
            hex: "#C9C6BC",
            priceNote: "POA",
            description:
              "Vertically grooved panels with the beauty of painted vertical-joint timber and the benefits of fibre cement.",
          },
          {
            id: "durascape",
            name: "Innova Durascape®",
            icon: "cladding",
            hex: "#D3D0C6",
            priceNote: "POA",
            description: "The contemporary style of a rendered finish with a clean, modern edge.",
          },
          {
            id: "stratum",
            name: "Innova Stratum®",
            icon: "cladding",
            hex: "#DAD7CC",
            priceNote: "POA",
            description: "Strong horizontal or vertical line details for modern home designs.",
          },
        ],
      },
    ],
  },
  {
    id: "external-render",
    group: "Exterior",
    title: "External Render / Cladding",
    brand: "Colorbond® / Taubmans®",
    intro:
      "The base colour is the first step to bringing your vision to life. Choose from our range of beautiful neutral base colours.",
    subsections: [
      {
        id: "wall-primary",
        heading: "Primary wall colour",
        tier: "standard",
        mode: "single",
        allowOther: true,
        otherLabel: "Other colour",
        options: colorbondExterior,
      },
      {
        id: "wall-secondary",
        heading: "Contrast / secondary wall colour (if applicable)",
        tier: "standard",
        mode: "single",
        allowOther: true,
        otherLabel: "Other colour",
        options: colorbondExterior,
      },
    ],
    visualiserTarget: { wallPrimary: "wall-primary", wallSecondary: "wall-secondary" },
  },
  {
    id: "roof",
    group: "Exterior",
    title: "Roof",
    brand: "Colorbond®",
    intro:
      "Select from our range of Colorbond® colour options — contrast or seamlessly blend the colour into your home exterior.",
    subsections: [
      {
        id: "roof-colour",
        tier: "standard",
        mode: "single",
        allowOther: true,
        otherLabel: "Other colour",
        options: colorbondRoofFull,
      },
    ],
    visualiserTarget: { roof: "roof-colour" },
  },
  {
    id: "gutter-fascia-downpipe",
    group: "Exterior",
    title: "Gutter · Fascia · Downpipe",
    brand: "Colorbond®",
    intro:
      "Select from our range of Colorbond® colour options — contrast or seamlessly blend the colour into your home exterior.",
    subsections: [
      {
        id: "fascia-colour",
        tier: "standard",
        mode: "single",
        allowOther: true,
        otherLabel: "Other (gutter / fascia / downpipe)",
        options: colorbondRoofFull,
      },
    ],
    visualiserTarget: { fascia: "fascia-colour" },
  },
  {
    id: "brick-paving",
    group: "Exterior",
    title: "Brick Paving",
    brand: "Midland Brick",
    upgradeIntro: "Choose from our premium selection of 190×190 pavers for $110/sqm.",
    subsections: [
      {
        id: "paver-colour",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "tundra", name: "Tundra", hex: "#C9C2AE", icon: "paver" },
          { id: "storm-cloud", name: "Storm Cloud", hex: "#4B4844", icon: "paver" },
          { id: "sea-mist", name: "Sea Mist", hex: "#A9A79C", icon: "paver" },
        ],
      },
    ],
  },
  {
    id: "window-frames",
    group: "Exterior",
    title: "Window Frames",
    brand: "Jason Windows",
    intro:
      "Our standard Refined Collection range of aluminium windows and doors. Choose your powder-coating colour to coordinate or contrast with your roof and walls.",
    subsections: [
      {
        id: "window-frame-colour",
        tier: "standard",
        mode: "single",
        options: [
          { id: "pearl-white", name: "Pearl White", hex: "#EDE8DD" },
          { id: "silver-lustre", name: "Silver Lustre", hex: "#A8A9AA" },
          { id: "charcoal-lustre", name: "Charcoal Lustre", hex: "#43413F" },
          { id: "night-sky", name: "Night Sky", hex: "#24211F" },
        ],
      },
    ],
    visualiserTarget: { windowFrame: "window-frame-colour" },
  },

  // --------------------------------------------------------- DOORS & HARDWARE
  {
    id: "doors",
    group: "Doors & Hardware",
    title: "Doors",
    brand: "Corinthian / Jason Windows",
    intro: "Internal doors are the Corinthian Flush Panel door as standard.",
    upgradeIntro: "Ensure space permits for the below upgrade.",
    subsections: [
      {
        id: "internal-door",
        heading: "Internal doors",
        tier: "standard",
        mode: "single",
        options: [
          { id: "corinthian-flush", name: "Corinthian Flush Panel Door", icon: "door", hex: "#F2F0E9" },
        ],
      },
      {
        id: "cavity-slider",
        heading: "Cavity slider instead of hinged door (820mm)",
        tier: "upgrade",
        mode: "lineItems",
        lineItems: [{ id: "cavity-slider-qty", label: "Cavity slider", priceNote: "+$980", hasQty: true }],
      },
      {
        id: "front-door",
        heading: "Optional front door — Benchmark Frames by Jason Windows",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "benchmark-frame", name: "Benchmark Frame Front Door", icon: "door", hex: "#B98A55", priceNote: "POA" },
        ],
      },
    ],
  },
  {
    id: "fixtures-handles",
    group: "Doors & Hardware",
    title: "Door Handles & Fixtures",
    brand: "Lockwood",
    intro:
      "Lockwood Palladium 2-Point Summit entry handle (hinged front door) with Velocity Round Rose internal door handles throughout.",
    subsections: [
      {
        id: "handle-finish",
        tier: "standard",
        mode: "single",
        options: [
          { id: "matt-black", name: "Matt Black", hex: "#232323", icon: "handle" },
          { id: "satin-chrome", name: "Satin Chrome", hex: "#C7CBCC", icon: "handle" },
        ],
      },
    ],
  },
  {
    id: "sliding-robes",
    group: "Doors & Hardware",
    title: "Sliding Robes",
    brand: "All Things Glass",
    intro: "Mirrored sliding robes to bedrooms with the option to select your frame colour.",
    upgradeIntro: "Upgrade per panel to Super White Kote glass (+$150).",
    subsections: [
      {
        id: "robe-frame",
        tier: "standard",
        mode: "single",
        options: [
          { id: "black", name: "Black", hex: "#1B1B1B", icon: "robe" },
          { id: "white", name: "White", hex: "#F4F2EC", icon: "robe" },
          { id: "matt-silver", name: "Matt Silver", hex: "#AFB2B3", icon: "robe" },
          { id: "bright-silver", name: "Bright Silver", hex: "#D9DBDC", icon: "robe" },
        ],
      },
      {
        id: "robe-upgrades",
        tier: "upgrade",
        mode: "lineItems",
        lineItems: [
          { id: "robe-height", label: "Floor-to-ceiling robes (2400mm → 2700mm)", priceNote: "+$250/robe", hasQty: true },
          { id: "robe-white-kote-all", label: "Super White Kote — all robe panels", priceNote: "+$150/panel", hasQty: true },
          { id: "robe-white-kote-half", label: "Super White Kote — half of each robe", priceNote: "+$150/panel", hasQty: true },
          { id: "robe-white-kote-laundry", label: "Upgrade laundry robe to Super White Kote" },
        ],
      },
    ],
  },

  // ------------------------------------------------------- INTERNAL FINISHES
  {
    id: "internal-wall",
    group: "Internal Finishes",
    title: "Internal Wall Colour",
    brand: "Taubmans®",
    intro:
      "Prime coat is applied and included as standard, ready for you to choose and apply your own painting. We've selected our Top 10 favourite whites.",
    subsections: [
      {
        id: "internal-wall-colour",
        tier: "upgrade",
        mode: "single",
        allowOther: true,
        otherLabel: "Other colour",
        options: taubmanWhites,
      },
    ],
  },
  {
    id: "cornice",
    group: "Internal Finishes",
    title: "Cornice / Trims",
    brand: "Aussie Plasterboard",
    intro: "Included as standard is the COVE® Cornice.",
    upgradeIntro: "Upgrade to ARIA®, SYMPHONY® or TRIO® cornice to set your home apart with the little details.",
    subsections: [
      {
        id: "cornice-standard",
        tier: "standard",
        mode: "single",
        options: [{ id: "cove", name: "COVE® Cornice", icon: "cornice", hex: "#EFEDE7" }],
      },
      {
        id: "cornice-upgrade",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "aria", name: "ARIA® Cornice", icon: "cornice", hex: "#EDEAE3", priceNote: "POA" },
          { id: "symphony", name: "SYMPHONY® Cornice", icon: "cornice", hex: "#EAE7DF", priceNote: "POA" },
          { id: "trio", name: "TRIO® Cornice", icon: "cornice", hex: "#E7E4DB", priceNote: "POA" },
        ],
      },
    ],
  },
  {
    id: "skirting",
    group: "Internal Finishes",
    title: "Skirting Board",
    intro:
      "Primed skirting is recommended for a modern, sleek look. For a more traditional, detailed skirting, opt for the Federation profile.",
    subsections: [
      {
        id: "skirting-profile",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "primed", name: "Primed Skirting", icon: "skirting", hex: "#F1EFEA" },
          { id: "federation-1", name: "Federation Skirting — Profile A", icon: "skirting", hex: "#EDEAE3", priceNote: "POA" },
          { id: "federation-2", name: "Federation Skirting — Profile B", icon: "skirting", hex: "#E9E6DE", priceNote: "POA" },
        ],
      },
    ],
  },
  {
    id: "wall-niche",
    group: "Internal Finishes",
    title: "Wall Recess Niche",
    intro:
      "Set your home apart with a wall recess niche — subtle depth in living areas, or a display shelf in bathrooms. Consult your Sales Rep.",
    subsections: [
      {
        id: "niche-dimension",
        tier: "upgrade",
        mode: "single",
        allowOther: true,
        otherLabel: "Other dimension",
        options: [
          { id: "niche-30x30", name: "30cm × 30cm", icon: "niche", hex: "#E9E6DE", priceNote: "+$500" },
          { id: "niche-60x30", name: "60cm × 30cm", icon: "niche", hex: "#E4E1D8", priceNote: "+$500" },
          { id: "niche-140x30", name: "140cm × 30cm", icon: "niche", hex: "#DFDCD2", priceNote: "+$500" },
        ],
      },
    ],
  },
  {
    id: "skylights",
    group: "Internal Finishes",
    title: "Skylights",
    intro:
      "A natural-light-filled room transforms an entire space. Consult your Sales Rep to see if a skylight can be designed into your home.",
    subsections: [
      {
        id: "skylight-add",
        tier: "upgrade",
        mode: "lineItems",
        lineItems: [{ id: "skylight-qty", label: "Add skylight", priceNote: "POA", hasQty: true }],
      },
    ],
  },

  // ---------------------------------------------------------------- ELECTRICAL
  {
    id: "electrical",
    group: "Electrical",
    title: "LED / Switches / Powerpoints",
    intro: "LED CCT downlights, light switches and power points are included as standard, in White or Black.",
    subsections: [
      {
        id: "electrical-finish",
        heading: "Downlight, switch & GPO colour",
        tier: "standard",
        mode: "single",
        options: [
          { id: "white", name: "White", hex: "#F4F2EC", icon: "downlight" },
          { id: "black", name: "Black", hex: "#232323", icon: "downlight" },
        ],
      },
      {
        id: "electrical-upgrades",
        tier: "upgrade",
        mode: "lineItems",
        lineItems: [
          { id: "led-10pack", label: "10-pack LED downlight", priceNote: "+$900", hasQty: true },
          { id: "tv-point", label: "TV point", priceNote: "+$135/each", hasQty: true },
          { id: "data-point", label: "Data point", priceNote: "+$250/each", hasQty: true },
          { id: "two-way-switch", label: "Two-way switch point", priceNote: "+$45/each", hasQty: true },
          { id: "external-gpo", label: "External GPO", priceNote: "+$145/each", hasQty: true },
          { id: "double-gpo", label: "Double GPO", priceNote: "+$73/each", hasQty: true },
          { id: "external-wall-light", label: "External wall light point", priceNote: "+$80/each", hasQty: true },
          { id: "dimmer", label: "Dimmer per light circuit", priceNote: "+$150/each", hasQty: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ KITCHEN
  {
    id: "kitchen-appliances",
    group: "Kitchen",
    title: "Kitchen Appliances",
    brand: "Haier",
    intro: "All kitchen appliances include a 600mm induction cooktop, 600mm range hood and 600mm oven.",
    subsections: [
      {
        id: "appliance-set",
        tier: "standard",
        mode: "single",
        options: [
          {
            id: "haier-standard",
            name: "Haier 300 Series set — Box Chimney Rangehood",
            icon: "cooktop",
            hex: "#2B2B2B",
            description: "Induction cooktop HCI604TB3 · Oven HWO60S4LMB3 · Rangehood HC60BLX1",
          },
        ],
      },
      {
        id: "rangehood-upgrade",
        tier: "upgrade",
        mode: "single",
        options: [
          {
            id: "integrated-rangehood",
            name: "500 Series Integrated Insert Rangehood",
            icon: "rangehood",
            hex: "#B9B6AC",
            code: "HPH60ILX2",
            priceNote: "POA",
          },
        ],
      },
    ],
  },
  {
    id: "kitchen-splashback",
    group: "Kitchen",
    title: "Kitchen Splashback",
    brand: "Bathroom City / Kantili Tiles",
    intro: "Make the kitchen yours with a tiled splashback — subway or larger format tiles.",
    subsections: [
      {
        id: "splashback-style",
        tier: "standard",
        mode: "single",
        allowOther: true,
        otherLabel: "Tile code (300×600 / 600×600)",
        options: [
          { id: "subway-white-matte", name: "Subway Tile — White, Matte", hex: "#F3F1EA", icon: "tile" },
          { id: "subway-white-gloss", name: "Subway Tile — White, Gloss", hex: "#F6F4EE", icon: "tile" },
          { id: "subway-black-matte", name: "Subway Tile — Black, Matte", hex: "#232323", icon: "tile" },
          { id: "subway-black-gloss", name: "Subway Tile — Black, Gloss", hex: "#1B1B1B", icon: "tile" },
        ],
      },
      {
        id: "splashback-grout",
        heading: "Grout colour",
        tier: "standard",
        mode: "single",
        options: [
          { id: "white", name: "White", hex: "#F1EFE8" },
          { id: "black", name: "Black", hex: "#2A2A2A" },
        ],
      },
      {
        id: "splashback-direction",
        heading: "Lay direction",
        tier: "standard",
        mode: "single",
        options: [
          { id: "horizontal", name: "Horizontal", hex: "#DAD6CB" },
          { id: "vertical", name: "Vertical", hex: "#CFCBBF" },
        ],
      },
    ],
  },
  {
    id: "stone-top",
    group: "Kitchen",
    title: "Engineered Stone Top",
    brand: "Vitrum Surfaces by Qstone",
    intro: "Included in your build is a 20mm crystalline-silica-free engineered stone benchtop.",
    subsections: [
      {
        id: "stone-colour",
        tier: "standard",
        mode: "single",
        options: [
          { id: "avalanche", name: "Avalanche", hex: "#E6E4DE", icon: "stone" },
          { id: "new-frost", name: "New Frost", hex: "#F1F0EC", icon: "stone" },
          { id: "grey-glitter", name: "Grey Glitter", hex: "#9C9C98", icon: "stone" },
          { id: "black-glitter", name: "Black Glitter", hex: "#1C1C1C", icon: "stone" },
          { id: "white-glitter", name: "White Glitter", hex: "#EDEBE6", icon: "stone" },
        ],
      },
    ],
  },
  {
    id: "sinks",
    group: "Kitchen",
    title: "Sinks & Laundry",
    brand: "Samios",
    intro: "Top-mount kitchen sink and laundry unit included as standard.",
    subsections: [
      {
        id: "kitchen-sink",
        heading: "Kitchen sink",
        tier: "standard",
        mode: "single",
        options: [{ id: "mela-triton", name: "MELA Triton 550S Stainless Steel Sink", icon: "sink", hex: "#C9CBCB" }],
      },
      {
        id: "laundry-unit",
        heading: "Laundry unit (if applicable)",
        tier: "standard",
        mode: "single",
        options: [{ id: "tilos-45l", name: "Tilos 45L 'Skinny' Laundry Unit", icon: "laundry", hex: "#F1EFEA" }],
      },
      {
        id: "sink-upgrades",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "hana-double", name: "Hana Double Kitchen Sink, top mount", icon: "sink", hex: "#C9CBCB", priceNote: "+$380" },
          { id: "tiva-175", name: "Tiva 1080 1.75 Sink with Drainer, left bowl", icon: "sink", hex: "#C9CBCB", priceNote: "+$150" },
          { id: "undermount", name: "Convert any top-mount sink to under-mount", icon: "sink", hex: "#C9CBCB", priceNote: "+$380" },
        ],
      },
    ],
  },
  {
    id: "cabinetry",
    group: "Kitchen",
    title: "Cabinetry",
    brand: "Worldwide Timber Traders",
    intro:
      "Kitchen, bathroom and laundry cabinets consist of flush cupboard doors and drawers, all fitted with soft-close hinges as standard.",
    subsections: [
      {
        id: "cabinetry-notes",
        tier: "standard",
        mode: "text",
        allowNote: true,
      },
    ],
  },

  // ------------------------------------------------------------- BATHROOM
  {
    id: "tapware",
    group: "Bathroom & Laundry",
    title: "Tapware & Plumbing Fixtures",
    brand: "Bathroom City",
    intro: "Choose from Matte Black or Chrome as standard — MELA Rondo / Palco / Bruno ranges throughout.",
    upgradeIntro: "Upgrade to Brushed Nickel or Brass finishes across the Samios FLEX / FRESCO / MAXX / WISH ranges.",
    subsections: [
      {
        id: "tapware-standard",
        tier: "standard",
        mode: "single",
        options: [
          { id: "matte-black", name: "Matte Black", hex: "#232323", icon: "tap" },
          { id: "chrome", name: "Chrome", hex: "#CDD0D1", icon: "tap" },
        ],
      },
      {
        id: "tapware-upgrade",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "brushed-nickel", name: "Brushed Nickel", hex: "#B9B6AC", icon: "tap", priceNote: "+$390" },
          { id: "brass", name: "Brass", hex: "#B8925A", icon: "tap", priceNote: "+$450" },
        ],
      },
    ],
  },
  {
    id: "toilet-basin",
    group: "Bathroom & Laundry",
    title: "Toilet & Basin",
    brand: "Bathroom City",
    intro: "Carefully selected designer sanitaryware for consistent quality throughout your home.",
    subsections: [
      {
        id: "toilet-suite",
        heading: "Toilet suite",
        tier: "standard",
        mode: "single",
        options: [{ id: "mela-elvas", name: "MELA Elvas Single-Hole Tornado Whirlpool Toilet Suite", icon: "toilet", hex: "#F4F3EF" }],
      },
      {
        id: "basin",
        heading: "Basin",
        tier: "standard",
        mode: "single",
        options: [{ id: "mela-baylee", name: "MELA Baylee Above-Counter Basin", icon: "basin", hex: "#F4F3EF" }],
      },
      {
        id: "flush-button",
        heading: "Flush button colour (in lieu of chrome)",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "flush-black", name: "Black", hex: "#232323", priceNote: "+$50" },
          { id: "flush-white", name: "White", hex: "#F1EFE8", priceNote: "+$50" },
          { id: "flush-brass", name: "Brushed Brass", hex: "#B8925A", priceNote: "+$70" },
        ],
      },
    ],
  },
  {
    id: "shower-bath",
    group: "Bathroom & Laundry",
    title: "Shower / Mirrors / Bathtub",
    brand: "Samios",
    intro: "Our signature hob-less walk-in shower forms part of the standard range.",
    subsections: [
      {
        id: "mirror-frame",
        heading: "Slimline mirror frame colour",
        tier: "standard",
        mode: "single",
        options: frameFinishes,
      },
      {
        id: "bathtub",
        heading: "Bathtub (optional, if applicable to your home)",
        tier: "upgrade",
        mode: "single",
        options: [{ id: "austin-bath", name: "Austin Freestanding Acrylic Bath, 1700mm", icon: "bath", hex: "#F4F3EF", priceNote: "POA" }],
      },
    ],
  },
  {
    id: "wet-area-tiles",
    group: "Bathroom & Laundry",
    title: "Wet Area Tiles",
    brand: "Kantili Tiles / Bathroom City",
    intro: "Select from the builder's range, or upgrade to the exclusive Rectified Tile Series Package.",
    subsections: [
      {
        id: "floor-tile",
        heading: "Floor tile (300×300)",
        tier: "standard",
        mode: "single",
        options: [
          { id: "concrete-white", name: "Concrete White", hex: "#E7E4DD", icon: "tile" },
          { id: "sand", name: "Sand", hex: "#D9CFB9", icon: "tile" },
          { id: "grey-natural", name: "Grey Natural", hex: "#B7B3AC", icon: "tile" },
          { id: "dark-grey", name: "Dark Grey", hex: "#55534F", icon: "tile" },
        ],
      },
      {
        id: "wall-tile",
        heading: "Wall tile (300×600)",
        tier: "standard",
        mode: "single",
        options: [
          { id: "gloss-white", name: "Gloss White", hex: "#F5F3EC", icon: "tile" },
          { id: "matte-white", name: "Matte White", hex: "#EFEDE6", icon: "tile" },
          { id: "concrete-white-wall", name: "Concrete White", hex: "#E7E4DD", icon: "tile" },
          { id: "sand-wall", name: "Sand", hex: "#D9CFB9", icon: "tile" },
          { id: "grey-natural-wall", name: "Grey Natural", hex: "#B7B3AC", icon: "tile" },
          { id: "dark-grey-wall", name: "Dark Grey", hex: "#55534F", icon: "tile" },
        ],
      },
      {
        id: "wet-area-upgrades",
        tier: "upgrade",
        mode: "lineItems",
        lineItems: [
          { id: "rectified-package", label: "Rectified Tile Series Package" },
          { id: "mitre-joint", label: "Mitre-joint in all wet areas", priceNote: "+$450" },
          { id: "full-height-tile", label: "Full-height bathroom wall tiled", priceNote: "POA" },
          { id: "wall-600", label: "Upgrade wall tile to 600×600", priceNote: "+$10/sqm" },
          { id: "floor-600", label: "Upgrade floor tile to 600×600 (requires 800mm shower grate)", priceNote: "+$6/sqm" },
        ],
      },
    ],
  },
  {
    id: "vanities",
    group: "Bathroom & Laundry",
    title: "Bathroom Vanities",
    intro:
      "Our wall-mounted vanity cupboards provide your bathroom with the wow factor. 900mm is standard; upgrades come in 1200mm, 1500mm and 1800mm.",
    subsections: [
      {
        id: "vanity-colour",
        tier: "standard",
        mode: "single",
        options: [
          { id: "oak", name: "Oak", hex: "#B9895A", icon: "vanity" },
          { id: "matte-white", name: "Matte White", hex: "#F1EFEA", icon: "vanity" },
          { id: "hamptons-white", name: "Hamptons White", hex: "#FBFAF7", icon: "vanity" },
        ],
      },
      {
        id: "vanity-size",
        heading: "Size upgrade",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "1200", name: "1200mm", priceNote: "POA" },
          { id: "1500", name: "1500mm", priceNote: "POA" },
          { id: "1800", name: "1800mm", priceNote: "POA" },
        ],
      },
    ],
  },
];

export const groupOrder = [
  "Exterior",
  "Doors & Hardware",
  "Internal Finishes",
  "Electrical",
  "Kitchen",
  "Bathroom & Laundry",
];
