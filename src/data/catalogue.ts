import type { CategorySection, SwatchOption } from "../types";

// Shared colour palettes. Hex values are sampled directly from the swatch
// chips embedded in the physical Granny Flats Perth Pre-Start Selection
// Booklet PDF, so they match the booklet exactly rather than being approximated.
const P = `${import.meta.env.BASE_URL}products/`;

const colorbondExterior: SwatchOption[] = [
  { id: "surfmist", name: "Surfmist®", hex: "#E2E3DE" },
  { id: "shale-grey", name: "Shale Grey®", hex: "#C1BDBA" },
  { id: "dune", name: "Dune®", hex: "#B6B1AD" },
  { id: "basalt", name: "Basalt®", hex: "#6D6C71" },
  { id: "monument", name: "Monument®", hex: "#424244" },
  { id: "woodland-grey", name: "Woodland Grey®", hex: "#5F5C57" },
  { id: "windspray", name: "Windspray®", hex: "#93989B" },
];

const colorbondRoofFull: SwatchOption[] = [
  { id: "surfmist", name: "Surfmist®", hex: "#E2E3DE" },
  { id: "shale-grey", name: "Shale Grey®", hex: "#C1BDBA" },
  { id: "dune", name: "Dune®", hex: "#B6B1AD" },
  { id: "monument", name: "Monument®", hex: "#424244" },
  { id: "woodland-grey", name: "Woodland Grey®", hex: "#5F5C57" },
  { id: "ironstone", name: "Ironstone®", hex: "#585B60" },
  { id: "windspray", name: "Windspray®", hex: "#93989B" },
  { id: "basalt", name: "Basalt®", hex: "#6D6C71" },
  { id: "wallaby", name: "Wallaby®", hex: "#807D78" },
];

const taubmanWhites: SwatchOption[] = [
  { id: "crisp-white", name: "Crisp White", hex: "#F6F3E9" },
  { id: "tahira-white", name: "Tahira White", hex: "#F0EDE3" },
  { id: "cloud-burst", name: "Cloud Burst", hex: "#DFD8CF" },
  { id: "china-doll", name: "China Doll", hex: "#EEEBE1" },
  { id: "big-white", name: "Big White", hex: "#F9F2E9" },
  { id: "miss-universe", name: "Miss Universe", hex: "#EFEDE7" },
  { id: "cradle-white", name: "Cradle White", hex: "#F9F3E7" },
  { id: "alphine-snow", name: "Alphine Snow", hex: "#EDEAE0" },
  { id: "cotton-ball", name: "Cotton Ball", hex: "#F0EDE3" },
  { id: "secret-white", name: "Secret White", hex: "#F1EBDB" },
];

const frameFinishes: SwatchOption[] = [
  { id: "black", name: "Black", image: P + "robe-black.png" },
  { id: "matt-silver", name: "Matt Silver", image: P + "robe-matt-silver.png" },
  { id: "bright-silver", name: "Bright Silver", image: P + "robe-bright-silver.png" },
];

// Colour arrays like colorbondExterior/colorbondRoofFull are reused across
// several sections (e.g. the same 7 Colorbond colours apply to both the
// primary and secondary wall) — this attaches a section-specific inspo
// search query per use, without needing separate copies of each array.
function withInspo(options: SwatchOption[], contextLabel: string, brand = "Colorbond"): SwatchOption[] {
  return options.map((o) => ({ ...o, inspoQuery: `${brand} ${o.name.replace(/®/g, "")} ${contextLabel}` }));
}

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
            image: P + "cladding-custom-orb.jpg",
            hex: "#3A3A3C",
            description:
              "The original corrugated steel profile trusted by Australians for generations — lightweight, durable and versatile.",
            inspoQuery: "Colorbond Custom Orb cladding house",
          },
          {
            id: "trimdek",
            name: "Trimdek®",
            image: P + "cladding-trimdek.jpg",
            hex: "#4B4D4E",
            description:
              "A modern ribbed profile with clean, defined lines for a sleek, low-maintenance exterior.",
            inspoQuery: "Colorbond Trimdek cladding house",
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
            image: P + "cladding-duragrove.jpg",
            priceNote: "POA",
            description:
              "Vertically grooved panels with the beauty of painted vertical-joint timber and the benefits of fibre cement.",
            inspoQuery: "James Hardie Axon cladding vertical groove",
            inspoNote:
              "Innova® panels are visually very similar to James Hardie Axon® cladding — a search for Axon often turns up more real-world installation photos of this style.",
          },
          {
            id: "durascape",
            name: "Innova Durascape®",
            image: P + "cladding-durascape.jpg",
            priceNote: "POA",
            description: "The contemporary style of a rendered finish with a clean, modern edge.",
            inspoQuery: "James Hardie Axon cladding rendered look",
            inspoNote:
              "Innova® panels are visually very similar to James Hardie Axon® cladding — a search for Axon often turns up more real-world installation photos of this style.",
          },
          {
            id: "stratum",
            name: "Innova Stratum®",
            image: P + "cladding-stratum.jpg",
            priceNote: "POA",
            description: "Strong horizontal or vertical line details for modern home designs.",
            inspoQuery: "James Hardie Axon cladding horizontal lines",
            inspoNote:
              "Innova® panels are visually very similar to James Hardie Axon® cladding — a search for Axon often turns up more real-world installation photos of this style.",
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
        options: withInspo(colorbondExterior, "wall cladding house"),
      },
      {
        id: "wall-secondary",
        heading: "Contrast / secondary wall colour (if applicable)",
        tier: "standard",
        mode: "single",
        allowOther: true,
        otherLabel: "Other colour",
        options: withInspo(colorbondExterior, "wall cladding house"),
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
        options: withInspo(colorbondRoofFull, "roof"),
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
        options: withInspo(colorbondRoofFull, "fascia gutter"),
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
          { id: "tundra", name: "Tundra", image: P + "paver-tundra.jpg" },
          { id: "storm-cloud", name: "Storm Cloud", image: P + "paver-storm-cloud.jpg" },
          { id: "sea-mist", name: "Sea Mist", image: P + "paver-sea-mist.jpg" },
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
    heroImage: P + "window-frames-hero.jpg",
    subsections: [
      {
        id: "window-frame-colour",
        tier: "standard",
        mode: "single",
        options: withInspo(
          [
            { id: "pearl-white", name: "Pearl White", hex: "#F0F2F0" },
            { id: "silver-lustre", name: "Silver Lustre", hex: "#B4B4B4" },
            { id: "charcoal-lustre", name: "Charcoal Lustre", hex: "#515151" },
            { id: "night-sky", name: "Night Sky", hex: "#2C2D2D" },
          ],
          "window frame",
          "Jason Windows"
        ),
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
    heroImage: P + "door-front-hero.jpg",
    subsections: [
      {
        id: "internal-door",
        heading: "Internal doors",
        tier: "standard",
        mode: "single",
        options: [
          { id: "corinthian-flush", name: "Corinthian Flush Panel Door", image: P + "door-internal-corinthian.jpg" },
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
        id: "front-door-style",
        heading: "Optional front door — Benchmark Frames by Jason Windows",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "benchmark-frame", name: "Benchmark Frame Front Door", image: P + "door-front-glass.jpg", priceNote: "POA" },
        ],
      },
      {
        id: "front-door-colour",
        heading: "Benchmark door colour",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "white-lustre", name: "White Lustre", hex: "#EFEBE2" },
          { id: "pearl-white", name: "Pearl White", hex: "#EDE8DD" },
          { id: "night-sky", name: "Night Sky", hex: "#24211F" },
          { id: "storm-front", name: "Storm Front", hex: "#6E6E6E" },
          { id: "silver-lustre", name: "Silver Lustre", hex: "#A8A9AA" },
          { id: "charcoal-lustre", name: "Charcoal Lustre", hex: "#43413F" },
          { id: "charcoal-ebony", name: "Charcoal Ebony", hex: "#2E2A26" },
        ],
      },
      {
        id: "front-door-sentry",
        heading: "Upgrade to Sentry Door — 5 Lite EHS (+$800 on top of Benchmark)",
        tier: "upgrade",
        mode: "single",
        body: "Double-upgrade from the standard Benchmark hinged door to a Jason Windows Sentry door — shown here in the 5 Lite EHS glazed panel style — for an extra $800.",
        options: [
          {
            id: "sentry-5lite",
            name: "Jason Windows Sentry Door — 5 Lite EHS",
            image: P + "door-sentry-5lite.svg",
            priceNote: "+$800",
          },
        ],
      },
      {
        id: "front-door-sentry-colour",
        heading: "Sentry timber-look colours (in addition to all Benchmark colours)",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "jarrah-rose-mahogany", name: "Jarrah Rose Mahogany", hex: "#5B3A2E" },
          { id: "western-red-cedar", name: "Western Red Cedar", hex: "#8C5A3C" },
        ],
      },
    ],
    visualiserTarget: { frontDoor: "front-door-colour" },
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
          { id: "matt-black", name: "Matt Black", image: P + "handle-matt-black.jpg" },
          { id: "satin-chrome", name: "Satin Chrome", image: P + "handle-satin-chrome.jpg" },
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
    heroImage: P + "robe-hero.jpg",
    subsections: [
      {
        id: "robe-frame",
        tier: "standard",
        mode: "single",
        options: [
          { id: "black", name: "Black", image: P + "robe-black.png" },
          { id: "white", name: "White", image: P + "robe-white.png" },
          { id: "matt-silver", name: "Matt Silver", image: P + "robe-matt-silver.png" },
          { id: "bright-silver", name: "Bright Silver", image: P + "robe-bright-silver.png" },
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
        options: [{ id: "cove", name: "COVE® Cornice", image: P + "cornice-cove.jpg" }],
      },
      {
        id: "cornice-upgrade",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "aria", name: "ARIA® Cornice", image: P + "cornice-aria.jpg", priceNote: "POA" },
          { id: "symphony", name: "SYMPHONY® Cornice", image: P + "cornice-symphony.jpg", priceNote: "POA" },
          { id: "trio", name: "TRIO® Cornice", image: P + "cornice-trio.jpg", priceNote: "POA" },
        ],
      },
    ],
  },
  {
    id: "skirting",
    group: "Internal Finishes",
    title: "Skirting Board",
    intro:
      "Primed skirting is recommended for a modern, sleek look. For a more traditional, detailed skirting, opt for one of the Federation profiles.",
    subsections: [
      {
        id: "skirting-profile",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "primed", name: "Primed Skirting", image: P + "skirting-primed.jpg" },
          { id: "federation-1", name: "Federation Skirting — Profile A", image: P + "skirting-federation-1.jpg", priceNote: "POA" },
          { id: "federation-2", name: "Federation Skirting — Profile B", image: P + "skirting-federation-2.jpg", priceNote: "POA" },
          { id: "federation-3", name: "Federation Skirting — Profile C", image: P + "skirting-federation-3.jpg", priceNote: "POA" },
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
    heroImage: P + "skylight-hero.jpg",
    subsections: [
      {
        id: "skylight-add",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "velux", name: "Velux Skylight", icon: "skylight", hex: "#DCE6EC", priceNote: "+$4,000 each" },
          {
            id: "flush-mount-electric",
            name: "Square Flush Mount Electric Skylight (Alternative)",
            icon: "skylight",
            hex: "#E3E0D6",
            priceNote: "+$850 each",
          },
        ],
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
          { id: "white", name: "White", image: P + "electrical-white.jpg" },
          { id: "black", name: "Black", image: P + "electrical-black.jpg" },
        ],
      },
      {
        id: "electrical-upgrades",
        tier: "upgrade",
        mode: "lineItems",
        allowNotes: true,
        warning:
          "These upgrades are for anything additional to your current drawings — please check your drawings before deciding what to add below.",
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
    intro:
      "All kitchen appliances are supplied by Haier, a leading Australian appliance brand — including a 600mm induction cooktop, 600mm range hood and 600mm oven.",
    subsections: [
      {
        id: "appliance-cooktop",
        heading: "Induction cooktop",
        tier: "standard",
        mode: "single",
        options: [{ id: "haier-cooktop", name: "60cm 300 Series Induction Cooktop", code: "HCI604TB3", image: P + "appliance-cooktop.jpg" }],
      },
      {
        id: "appliance-oven",
        heading: "Built-in oven",
        tier: "standard",
        mode: "single",
        options: [{ id: "haier-oven", name: "60cm 300 Series Built-In Oven", code: "HWO60S4LMB3", image: P + "appliance-oven.jpg" }],
      },
      {
        id: "appliance-rangehood",
        heading: "Rangehood",
        tier: "standard",
        mode: "single",
        options: [{ id: "haier-rangehood", name: "60cm 500 Series Box Chimney Wall Rangehood", code: "HC60BLX1", image: P + "appliance-rangehood-integrated.jpg" }],
      },
      {
        id: "rangehood-upgrade",
        tier: "upgrade",
        mode: "single",
        options: [
          {
            id: "integrated-rangehood",
            name: "500 Series Integrated Insert Rangehood",
            image: P + "appliance-rangehood.jpg",
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
          { id: "standard-tile", name: "Tiles (300×600 / 600×600)", image: P + "splashback-tile-photo.jpg" },
          { id: "subway-white-matte", name: "Subway Tile — White, Matte", image: P + "splashback-white.jpg" },
          { id: "subway-white-gloss", name: "Subway Tile — White, Gloss", image: P + "splashback-white.jpg" },
          { id: "subway-black-matte", name: "Subway Tile — Black, Matte", image: P + "splashback-black.jpg" },
          { id: "subway-black-gloss", name: "Subway Tile — Black, Gloss", image: P + "splashback-black.jpg" },
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
    intro:
      "Included in your build is a 20mm crystalline-silica-free engineered stone benchtop for the kitchen — and for the laundry too, if it has a proper cabinet and benchtop rather than the standard pedestal unit. Bathroom vanities are not included here: they come with a standard White Pearl stone top (see Bathroom Vanities).",
    subsections: [
      {
        id: "stone-colour",
        tier: "standard",
        mode: "single",
        options: [
          { id: "avalanche", name: "Avalanche", image: P + "stone-avalanche.png" },
          { id: "new-frost", name: "New Frost", image: P + "stone-new-frost.png" },
          { id: "grey-glitter", name: "Grey Glitter", image: P + "stone-grey-glitter.png" },
          { id: "black-glitter", name: "Black Glitter", image: P + "stone-black-glitter.png" },
          { id: "white-glitter", name: "White Glitter", image: P + "stone-white-glitter.png" },
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
        options: [{ id: "mela-triton", name: "MELA Triton 550S Stainless Steel Sink", image: P + "sink-triton.jpg" }],
      },
      {
        id: "laundry-unit",
        heading: "Laundry unit (if applicable)",
        tier: "standard",
        mode: "single",
        options: [{ id: "tilos-45l", name: "Tilos 45L 'Skinny' Laundry Unit", image: P + "sink-tilos-laundry.jpg" }],
      },
      {
        id: "sink-upgrades",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "hana-double", name: "Hana Double Kitchen Sink, top mount", image: P + "sink-hana-double.jpg", priceNote: "+$380" },
          { id: "tiva-175", name: "Tiva 1080 1.75 Sink with Drainer, left bowl", image: P + "sink-tiva.jpg", priceNote: "+$150" },
          { id: "undermount", name: "Convert any top-mount sink to under-mount", icon: "sink", hex: "#C9CBCB", priceNote: "+$380" },
        ],
      },
      {
        id: "laundry-sink-upgrade",
        heading: "Laundry sink upgrade (if benchtop applicable)",
        tier: "upgrade",
        mode: "single",
        body: "If your laundry has a proper cabinet and benchtop rather than the standard Tilos pedestal unit, this is the matching upgrade sink.",
        options: [
          { id: "mela-triton-45l", name: "MELA Triton 45L Polished Stainless Steel Sink", icon: "sink", hex: "#C9CBCB", priceNote: "POA" },
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
        id: "cabinetry-shaker",
        heading: "Door profile",
        tier: "standard",
        mode: "single",
        options: [
          { id: "flush-white", name: "Flush, White (standard)", icon: "cabinet", hex: "#F1EFE8" },
          {
            id: "shaker-white",
            name: "Shaker Profile, White",
            icon: "cabinet",
            hex: "#F1EFE8",
            priceNote: "Included",
            description: "Free upgrade — same white finish, shaker-style panelled doors and drawers.",
          },
        ],
      },
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
          { id: "matte-black", name: "Matte Black", image: P + "tap-matte-black.jpg" },
          { id: "chrome", name: "Chrome", image: P + "tap-chrome.jpg" },
        ],
      },
      {
        id: "tapware-upgrade",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "brushed-nickel", name: "Brushed Nickel", image: P + "tap-brushed-nickel.jpg", priceNote: "+$390" },
          { id: "brass", name: "Brass", image: P + "tap-brass.jpg", priceNote: "+$450" },
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
        options: [{ id: "mela-elvas", name: "MELA Elvas Single-Hole Tornado Whirlpool Toilet Suite", image: P + "toilet-elvas.jpg" }],
      },
      {
        id: "basin",
        heading: "Basin",
        tier: "standard",
        mode: "single",
        options: [{ id: "mela-baylee", name: "MELA Baylee Above-Counter Basin", image: P + "basin-baylee.jpg" }],
      },
      {
        id: "flush-button",
        heading: "Flush button colour (in lieu of chrome)",
        tier: "upgrade",
        mode: "single",
        options: [
          { id: "flush-black", name: "Black", image: P + "flush-button-black.jpg", priceNote: "+$50" },
          { id: "flush-white", name: "White", image: P + "flush-button-white.jpg", priceNote: "+$50" },
          { id: "flush-brass", name: "Brushed Brass", image: P + "flush-button-brass.jpg", priceNote: "+$70" },
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
    heroImage: P + "shower-hero.jpg",
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
        options: [{ id: "austin-bath", name: "Austin Freestanding Acrylic Bath, 1700mm", image: P + "bath-austin.jpg", priceNote: "POA" }],
      },
    ],
  },
  {
    id: "wall-niche",
    group: "Bathroom & Laundry",
    title: "Wall Recess Niche",
    intro:
      "Set your home apart with a wall recess niche — subtle depth in living areas, or a display shelf in bathrooms. Consult your Sales Rep.",
    heroImage: P + "niche-hero.jpg",
    subsections: [
      {
        id: "niche-dimension",
        tier: "upgrade",
        mode: "single",
        allowOther: true,
        otherLabel: "Other dimension",
        options: [
          { id: "niche-365x600", name: "365mm × 600mm", icon: "niche", hex: "#E9E6DE", priceNote: "+$500" },
          { id: "niche-365x320", name: "365mm × 320mm", icon: "niche", hex: "#E4E1D8", priceNote: "+$500" },
          { id: "niche-365x900", name: "365mm × 900mm", icon: "niche", hex: "#DFDCD2", priceNote: "+$500" },
        ],
      },
    ],
  },
  {
    id: "wet-area-tiles",
    group: "Bathroom & Laundry",
    title: "Wet Area Tiles",
    brand: "Kantili Tiles / Bathroom City",
    intro: "Select from the builder's range, or upgrade to the exclusive Rectified Tile Series Package.",
    heroImage: P + "wet-area-hero.jpg",
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
      "Our wall-mounted vanity cupboards provide your bathroom with the wow factor. 900mm is standard; upgrades come in 1200mm, 1500mm and 1800mm. All vanities include a standard White Pearl stone top (not the Engineered Stone Top colour range).",
    subsections: [
      {
        id: "vanity-colour",
        tier: "standard",
        mode: "single",
        options: [
          {
            id: "oak",
            name: "MELA Brittany 900 Oak Fluted Wall Hung Vanity",
            code: "One side curved, 2 drawers",
            image: P + "vanity-oak.jpg",
          },
          {
            id: "matte-white",
            name: "MELA Brittany 900 Matt White Fluted Wall Hung Vanity",
            code: "One side curved, 2 drawers",
            image: P + "vanity-matte-white.jpg",
          },
          {
            id: "hamptons-white",
            name: "MELA Hampton 900 Matt White Wall Hung Vanity",
            code: "Door & drawers",
            image: P + "vanity-hamptons-white.jpg",
          },
        ],
      },
      {
        id: "vanity-size-1200",
        heading: "Size upgrade — 1200mm",
        tier: "upgrade",
        mode: "single",
        options: [
          {
            id: "oak",
            name: "MELA Brittany 1200 Oak Fluted Curved Wall Hung Vanity",
            code: "2 drawers",
            image: P + "vanity-oak.jpg",
            priceNote: "POA",
          },
          {
            id: "matte-white",
            name: "MELA Brittany 1200 Matt White Fluted Wall Hung Vanity",
            code: "4 drawers",
            image: P + "vanity-matte-white.jpg",
            priceNote: "POA",
          },
          {
            id: "hamptons-white",
            name: "MELA Hampton 1200 Matt White Wall Hung Vanity",
            code: "With drawers",
            image: P + "vanity-hamptons-white.jpg",
            priceNote: "POA",
          },
        ],
      },
      {
        id: "vanity-size-1500",
        heading: "Size upgrade — 1500mm",
        tier: "upgrade",
        mode: "single",
        options: [
          {
            id: "oak",
            name: "MELA Brittany 1500 Oak Fluted Curved Wall Hung Vanity",
            code: "2 drawers",
            image: P + "vanity-oak.jpg",
            priceNote: "POA",
          },
          {
            id: "matte-white",
            name: "MELA Brittany 1500 Matt White Fluted Curved Wall Hung Vanity",
            code: "2 drawers",
            image: P + "vanity-matte-white.jpg",
            priceNote: "POA",
          },
          {
            id: "hamptons-white",
            name: "MELA Hampton 1500 Matt White Wall Hung Vanity",
            code: "2 doors & drawers",
            image: P + "vanity-hamptons-white.jpg",
            priceNote: "POA",
          },
        ],
      },
      {
        id: "vanity-size-1800",
        heading: "Size upgrade — 1800mm",
        tier: "upgrade",
        mode: "single",
        options: [
          {
            id: "oak",
            name: "MELA Brittany 1800 Oak Fluted Wall Hung Vanity",
            code: "4 drawers",
            image: P + "vanity-oak.jpg",
            priceNote: "POA",
          },
          {
            id: "matte-white",
            name: "MELA Brittany 1800 Matt White Fluted Wall Hung Vanity",
            code: "4 drawers",
            image: P + "vanity-matte-white.jpg",
            priceNote: "POA",
          },
          {
            id: "hamptons-white",
            name: "MELA Hampton 1800 Matt White Wall Hung Vanity",
            code: "Door & 4 drawers",
            image: P + "vanity-hamptons-white.jpg",
            priceNote: "POA",
          },
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
