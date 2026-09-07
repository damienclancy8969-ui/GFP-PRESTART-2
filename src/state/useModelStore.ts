import { create } from "zustand";
import type * as THREE from "three";
import type { VisualiserTarget } from "../types";
import type { MaterialInfo } from "../utils/analyzeModelMaterials";

interface LoadedModel {
  scene: THREE.Group;
  autoAssignments: Record<string, VisualiserTarget | null>;
  materials: MaterialInfo[];
}

interface ModelStore {
  scene: THREE.Group | null;
  autoAssignments: Record<string, VisualiserTarget | null>;
  materials: MaterialInfo[];
  setModel: (model: LoadedModel | null) => void;
}

// Deliberately not persisted: a loaded THREE.Group can't be serialised to
// localStorage (circular references), and there's no reason to keep an
// uploaded 3D model across page reloads anyway.
export const useModelStore = create<ModelStore>((set) => ({
  scene: null,
  autoAssignments: {},
  materials: [],
  setModel: (model) =>
    set({
      scene: model?.scene ?? null,
      autoAssignments: model?.autoAssignments ?? {},
      materials: model?.materials ?? [],
    }),
}));
