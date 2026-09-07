import { catalogue } from "../data/catalogue";
import type { SelectionState, VisualiserTarget } from "../types";
import type { CladdingProfile } from "./claddingTextures";

const DEFAULTS: Record<VisualiserTarget, string> = {
  wallPrimary: "#E2E3DE",
  wallSecondary: "#B6B1AD",
  roof: "#424244",
  fascia: "#424244",
  frontDoor: "#B98A55",
  windowFrame: "#515151",
};

export function resolveVisualiserColours(selections: SelectionState): Record<VisualiserTarget, string> {
  const out = { ...DEFAULTS };

  for (const section of catalogue) {
    if (!section.visualiserTarget) continue;
    for (const [target, subId] of Object.entries(section.visualiserTarget) as [VisualiserTarget, string][]) {
      const sub = section.subsections.find((s) => s.id === subId);
      const value = selections[subId];
      if (!sub || !value) continue;
      if (value.optionId) {
        const opt = sub.options?.find((o) => o.id === value.optionId);
        if (opt?.hex) out[target] = opt.hex;
      }
    }
  }

  return out;
}

const DEFAULT_PROFILE: CladdingProfile = "custom-orb";

export interface VisualiserPattern {
  primary: CladdingProfile;
  secondary: CladdingProfile;
}

/**
 * The wall cladding *profile* (Custom Orb/Trimdek/Duragrove/etc, from the
 * "External Cladding" category) is a separate selection from the wall
 * *colour* ("External Render / Cladding") — this reads the profile choice so
 * the visualiser can show a real ribbed/grooved pattern, not just a flat
 * colour swap. Primary wall follows the standard cladding-profile pick;
 * secondary/contrast wall follows the feature-wall upgrade if one was
 * chosen, else it just mirrors the primary profile.
 */
export function resolveVisualiserPattern(selections: SelectionState): VisualiserPattern {
  const primary = (selections["cladding-profile"]?.optionId as CladdingProfile | undefined) ?? DEFAULT_PROFILE;
  const secondary = (selections["cladding-feature"]?.optionId as CladdingProfile | undefined) ?? primary;
  return { primary, secondary };
}
