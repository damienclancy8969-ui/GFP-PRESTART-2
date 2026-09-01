import { catalogue } from "../data/catalogue";
import type { SelectionState, VisualiserTarget } from "../types";

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
