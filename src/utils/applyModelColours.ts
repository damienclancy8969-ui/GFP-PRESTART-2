import * as THREE from "three";
import type { VisualiserTarget } from "../types";

export type MaterialOverride = VisualiserTarget | "none";

/**
 * Recolours a loaded model's materials using a precomputed auto-assignment
 * map (see analyzeModelMaterials.ts, run once at load time) plus any manual
 * per-material overrides from the click-to-correct tool — overrides always
 * win. Runs on every colour selection change, so it's a fast lookup only, no
 * geometry work here.
 */
export function applyModelColours(
  scene: THREE.Group,
  colours: Record<VisualiserTarget, string>,
  autoAssignments: Record<string, VisualiserTarget | null>,
  overrides: Record<string, MaterialOverride>
): void {
  const seen = new Set<THREE.Material>();
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const material of materials as THREE.MeshStandardMaterial[]) {
      if (!material?.name || seen.has(material)) continue;
      seen.add(material);

      const override = overrides[material.name];
      const target = override !== undefined ? (override === "none" ? null : override) : autoAssignments[material.name];
      if (target) material.color = new THREE.Color(colours[target]);
    }
  });
}
