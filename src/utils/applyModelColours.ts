import * as THREE from "three";
import type { VisualiserTarget } from "../types";

// Best-effort keyword matching against material names pulled from an
// uploaded 3D model. Naming conventions vary between drafting jobs (e.g.
// "Window - Frame *" vs "!S1_Window Frame"), so this matches on keywords
// rather than exact names — some materials in a given file may not match
// anything and will keep whatever colour they were originally modelled
// with. wallSecondary has no reliable signal in material names, so
// cladding/render materials are all driven by wallPrimary's colour.
const RULES: [VisualiserTarget, RegExp][] = [
  ["roof", /\broof\b|trim.?deck|corrugat/i],
  ["fascia", /fascia|gutter/i],
  ["windowFrame", /window.*(frame|sash)|\bsash\b/i],
  ["frontDoor", /door.*(panel|laminate)|front.*door/i],
  ["wallPrimary", /render|cladding|\baxon\b|weatherboard|\bbwk\b|plaster|\bbrick\b/i],
];

export function applyModelColours(scene: THREE.Group, colours: Record<VisualiserTarget, string>): void {
  const seen = new Set<THREE.Material>();
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const material of materials as THREE.MeshStandardMaterial[]) {
      if (!material?.name || seen.has(material)) continue;
      for (const [target, pattern] of RULES) {
        if (pattern.test(material.name)) {
          material.color = new THREE.Color(colours[target]);
          seen.add(material);
          break;
        }
      }
    }
  });
}
