import { create } from "zustand";
import type * as THREE from "three";

interface ModelStore {
  scene: THREE.Group | null;
  setScene: (scene: THREE.Group | null) => void;
}

// Deliberately not persisted: a loaded THREE.Group can't be serialised to
// localStorage (circular references), and there's no reason to keep an
// uploaded 3D model across page reloads anyway.
export const useModelStore = create<ModelStore>((set) => ({
  scene: null,
  setScene: (scene) => set({ scene }),
}));
