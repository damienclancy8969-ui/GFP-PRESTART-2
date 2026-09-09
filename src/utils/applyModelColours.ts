import * as THREE from "three";
import type { VisualiserTarget } from "../types";
import { getCladdingStyle, getCladdingTexture } from "./claddingTextures";
import type { VisualiserPattern } from "./visualiser";
import type { MaterialInfo } from "./analyzeModelMaterials";

export type MaterialOverride = VisualiserTarget | "none";

// Painted-steel Colorbond finishes (roof/fascia) and powder-coated aluminium
// (window frames) behave differently under light than a rendered wall —
// same tuning as the parametric HouseModel, applied here so a recoloured
// roof on an uploaded model reads as steel rather than as flat plastic.
// Wall targets aren't listed here — those follow the selected cladding
// profile's own roughness/metalness (see claddingTextures.ts) instead.
const TARGET_STYLE: Partial<Record<VisualiserTarget, { roughness: number; metalness: number }>> = {
  roof: { roughness: 0.4, metalness: 0.12 },
  fascia: { roughness: 0.4, metalness: 0.12 },
  windowFrame: { roughness: 0.4, metalness: 0.2 },
  frontDoor: { roughness: 0.75, metalness: 0 },
};

/**
 * Recolours a loaded model's materials using a precomputed auto-assignment
 * map (see analyzeModelMaterials.ts, run once at load time) plus any manual
 * per-material overrides from the click-to-correct tool — overrides always
 * win. Runs on every colour selection change, so geometry work is limited to
 * a fast lookup (material areas are precomputed too, passed in via
 * `materials`) — no re-walking triangles here.
 */
export function applyModelColours(
  scene: THREE.Group,
  colours: Record<VisualiserTarget, string>,
  pattern: VisualiserPattern,
  autoAssignments: Record<string, VisualiserTarget | null>,
  overrides: Record<string, MaterialOverride>,
  materials: MaterialInfo[]
): void {
  const areaByName = new Map(materials.map((m) => [m.name, m.area]));
  const seen = new Set<THREE.Material>();

  // Detect if multiple targets map to the same material (possible sync issue)
  const targetsByMaterial = new Map<string, VisualiserTarget[]>();
  for (const [materialName, override] of Object.entries(overrides)) {
    if (override === "none") continue;
    const target = override as VisualiserTarget;
    const existing = targetsByMaterial.get(materialName) ?? [];
    existing.push(target);
    targetsByMaterial.set(materialName, existing);
  }
  // Warn if two roof/wall/fascia targets point to the same material
  const structuralTargets = new Set(["roof", "wallPrimary", "wallSecondary", "fascia"]);
  for (const [material, targets] of targetsByMaterial) {
    const structural = targets.filter((t) => structuralTargets.has(t));
    if (structural.length > 1) {
      console.warn(
        `Material '${material}' is assigned to multiple structural targets: ${structural.join(", ")}. ` +
          `This may cause unexpected colour sync. Consider using "Don't recolour" on one of them.`
      );
    }
  }

  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    const meshMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const material of meshMaterials as THREE.MeshStandardMaterial[]) {
      if (!material?.name || seen.has(material)) continue;
      seen.add(material);

      const override = overrides[material.name];
      const target = override !== undefined ? (override === "none" ? null : override) : autoAssignments[material.name];
      if (!target) continue;

      material.color = new THREE.Color(colours[target]);

      if (target === "wallPrimary" || target === "wallSecondary") {
        const profile = target === "wallPrimary" ? pattern.primary : pattern.secondary;
        const style = getCladdingStyle(profile);
        const approxSide = Math.sqrt(areaByName.get(material.name) ?? 9);
        material.roughness = style.roughness;
        material.metalness = style.metalness;
        material.bumpMap = getCladdingTexture(profile, approxSide, approxSide);
        material.bumpScale = style.bumpScale;
        material.needsUpdate = true;
      } else {
        const style = TARGET_STYLE[target];
        if (style) {
          material.roughness = style.roughness;
          material.metalness = style.metalness;
        }
      }
    }
  });
}
