import type { VisualiserTarget } from "../../types";
import type { MaterialOverride } from "../../utils/applyModelColours";

const TARGET_LABELS: Record<VisualiserTarget, string> = {
  wallPrimary: "Primary wall",
  wallSecondary: "Secondary wall",
  roof: "Roof",
  fascia: "Fascia / gutter",
  windowFrame: "Window frames",
  frontDoor: "Front door",
};

const TARGETS = Object.keys(TARGET_LABELS) as VisualiserTarget[];

interface Props {
  materialName: string;
  current: MaterialOverride | null;
  autoDetected?: VisualiserTarget | null;
  onAssign: (target: MaterialOverride) => void;
  onClose: () => void;
}

export function MaterialAssignPanel({ materialName, current, autoDetected, onAssign, onClose }: Props) {
  const isOverridden = autoDetected !== null && current !== autoDetected && current !== "none";
  const currentLabel = current === "none" ? "Don't recolour" : current ? TARGET_LABELS[current] : "Unassigned";
  const autoLabel = autoDetected ? TARGET_LABELS[autoDetected] : "Unassigned";

  return (
    <div className="rounded-lg border border-gold-500/50 bg-gold-500/10 px-4 py-3.5">
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-700">Assign this part</p>
        <button onClick={onClose} className="text-[11px] text-stone-500 hover:text-stone-700">
          Close
        </button>
      </div>
      <p className="mb-3 truncate text-[12.5px] font-medium text-stone-800" title={materialName}>
        {materialName}
      </p>
      {autoDetected && (
        <p className="mb-2 text-[11px] text-stone-600">
          System detected: <span className="font-medium text-brand-700">{autoLabel}</span>
        </p>
      )}
      <p className="mb-3 text-[11px] text-stone-500">
        Current: <span className={`font-medium ${isOverridden ? "text-gold-700" : "text-brand-700"}`}>{currentLabel}</span>
        {isOverridden && <span className="ml-1 text-[10px] text-gold-600">(overridden)</span>}
      </p>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {TARGETS.map((target) => (
          <button
            key={target}
            onClick={() => onAssign(target)}
            className={`rounded-md border px-2.5 py-1.5 text-[11px] font-medium transition ${
              current === target
                ? "border-brand-600 bg-brand-600 text-white"
                : target === autoDetected
                  ? "border-brand-300 bg-brand-50 text-brand-700 hover:bg-brand-100"
                  : "border-brand-200 bg-white text-brand-700 hover:bg-brand-50"
            }`}
          >
            {TARGET_LABELS[target]}
          </button>
        ))}
      </div>
      <button
        onClick={() => onAssign("none")}
        className={`w-full rounded-md border px-3 py-2 text-[11px] font-medium transition ${
          current === "none"
            ? "border-stone-500 bg-stone-500 text-white"
            : "border-stone-300 bg-white text-stone-600 hover:bg-stone-100"
        }`}
      >
        Don't recolour this material
      </button>
    </div>
  );
}
