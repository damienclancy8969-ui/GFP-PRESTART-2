import { catalogue } from "../data/catalogue";
import type { SelectionState } from "../types";

export interface AddendumLine {
  label: string;
  value: string;
  priceNote?: string;
  tier: "standard" | "upgrade";
}

export interface AddendumCategory {
  group: string;
  title: string;
  lines: AddendumLine[];
}

export function buildAddendum(selections: SelectionState): AddendumCategory[] {
  const result: AddendumCategory[] = [];

  for (const section of catalogue) {
    const lines: AddendumLine[] = [];

    for (const sub of section.subsections) {
      const value = selections[sub.id];
      if (!value) continue;

      if ((sub.mode === "single" || sub.mode === "multiple") && sub.options) {
        if (value.optionId) {
          const opt = sub.options.find((o) => o.id === value.optionId);
          if (opt) {
            lines.push({
              label: sub.heading ?? section.title,
              value: opt.code ? `${opt.name} (${opt.code})` : opt.name,
              priceNote: opt.priceNote,
              tier: sub.tier,
            });
          }
        }
        if (value.otherText && value.otherText.trim()) {
          lines.push({
            label: sub.otherLabel ?? sub.heading ?? section.title,
            value: value.otherText.trim(),
            tier: sub.tier,
          });
        }
      }

      if (sub.mode === "lineItems" && sub.lineItems) {
        for (const li of sub.lineItems) {
          const included = value.optionIds?.includes(li.id);
          if (!included) continue;
          const qty = value.qty?.[li.id];
          const note = value.itemNotes?.[li.id]?.trim();
          let text = qty ? `${li.label} × ${qty}` : li.label;
          if (note) text += ` — ${note}`;
          lines.push({
            label: sub.heading ?? section.title,
            value: text,
            priceNote: li.priceNote,
            tier: sub.tier,
          });
        }
      }

      if (sub.mode === "text" && value.note && value.note.trim()) {
        lines.push({ label: "Note", value: value.note.trim(), tier: sub.tier });
      }
    }

    if (lines.length > 0) {
      result.push({ group: section.group, title: section.title, lines });
    }
  }

  return result;
}

export function estimateUpgradeTotal(categories: AddendumCategory[]): { total: number; hasPoa: boolean } {
  let total = 0;
  let hasPoa = false;
  for (const cat of categories) {
    for (const line of cat.lines) {
      if (!line.priceNote) continue;
      if (/poa/i.test(line.priceNote)) {
        hasPoa = true;
        continue;
      }
      const match = line.priceNote.match(/-?\$([\d,]+(?:\.\d+)?)/);
      if (match) {
        const amount = Number(match[1].replace(/,/g, ""));
        total += line.priceNote.trim().startsWith("-") ? -amount : amount;
      }
    }
  }
  return { total, hasPoa };
}
