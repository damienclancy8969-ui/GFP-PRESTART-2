import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MaterialOverride } from "../utils/applyModelColours";

interface MaterialOverridesStore {
  overridesByFile: Record<string, Record<string, MaterialOverride>>;
  setOverride: (fileName: string, materialName: string, target: MaterialOverride) => void;
}

// Keyed by uploaded file name (GFP's design files are individually named, so
// re-uploading the same design later reuses its corrections) rather than a
// content hash — simple, and zero-backend, consistent with staying static
// until the content itself is finalised.
export const useMaterialOverridesStore = create<MaterialOverridesStore>()(
  persist(
    (set) => ({
      overridesByFile: {},
      setOverride: (fileName, materialName, target) =>
        set((s) => ({
          overridesByFile: {
            ...s.overridesByFile,
            [fileName]: { ...s.overridesByFile[fileName], [materialName]: target },
          },
        })),
    }),
    { name: "gfp-material-overrides" }
  )
);

export function getOverridesForFile(
  overridesByFile: Record<string, Record<string, MaterialOverride>>,
  fileName: string
): Record<string, MaterialOverride> {
  return overridesByFile[fileName] ?? {};
}
