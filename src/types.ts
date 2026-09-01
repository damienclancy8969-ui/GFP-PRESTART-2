export type Tier = "standard" | "upgrade";

export type SelectionMode = "single" | "multiple" | "lineItems" | "text";

export type IconKey =
  | "cladding"
  | "roof"
  | "paint"
  | "window"
  | "door"
  | "handle"
  | "robe"
  | "downlight"
  | "switch"
  | "gpo"
  | "tap"
  | "shower"
  | "toilet"
  | "basin"
  | "bath"
  | "mirror"
  | "sink"
  | "laundry"
  | "stone"
  | "vanity"
  | "cabinet"
  | "oven"
  | "cooktop"
  | "rangehood"
  | "tile"
  | "cornice"
  | "niche"
  | "skylight"
  | "skirting"
  | "paver"
  | "towel";

export interface SwatchOption {
  id: string;
  name: string;
  hex?: string;
  code?: string;
  description?: string;
  priceNote?: string;
  icon?: IconKey;
  image?: string;
}

export interface LineItem {
  id: string;
  label: string;
  priceNote?: string;
  hasQty?: boolean;
}

export interface SubSection {
  id: string;
  heading?: string;
  body?: string;
  tier: Tier;
  mode: SelectionMode;
  options?: SwatchOption[];
  lineItems?: LineItem[];
  allowOther?: boolean;
  otherLabel?: string;
  allowNote?: boolean;
}

export type VisualiserTarget =
  | "wallPrimary"
  | "wallSecondary"
  | "roof"
  | "fascia"
  | "frontDoor"
  | "windowFrame";

export interface CategorySection {
  id: string;
  group: string;
  title: string;
  intro?: string;
  upgradeIntro?: string;
  brand?: string;
  subsections: SubSection[];
  visualiserTarget?: Partial<Record<VisualiserTarget, string>>;
  heroImage?: string;
}

export interface SelectionValue {
  optionId?: string;
  optionIds?: string[];
  otherText?: string;
  qty?: Record<string, number>;
  note?: string;
}

export type SelectionState = Record<string, SelectionValue>;
