import * as THREE from "three";
import type { VisualiserTarget } from "../types";

// Real roofs face mostly upward; real walls face mostly sideways. World-space
// normal.y is bucketed per triangle into "up" / "down" / "side" — a material
// qualifies for a bucket when it's the *largest* of the three, not an
// absolute majority. That distinction matters for roofs modelled as solid
// slabs (a top face plus an underside/soffit plus edges): the top alone is
// rarely over 50% of the material's total area, but it's still clearly the
// dominant orientation. Since names alone collide across roof and wall
// products (e.g. "Trimdek" is both, in the client's own catalogue), geometry
// is the tie-breaker, not the only signal.
const UP_NORMAL_Y = 0.5;
const DOWN_NORMAL_Y = -0.5;

// A second wall material only counts as the "contrasting" wall if it's a
// meaningful area, not a stray trim strip that happens to face sideways.
const MIN_SECONDARY_WALL_AREA_FRACTION = 0.05;

// Interior joinery/fixtures can present large flat side-facing surfaces too
// (a run of kitchen cabinet doors, a wardrobe) — exclude anything that reads
// as interior fit-out from wall-colour candidacy, even if unnamed otherwise.
const NOT_A_WALL = /cabinet|bench|kitchen|wardrobe|robe|shelf|vanity|counter|ceramic|\btiles?\b|glass|stainless|chrome|floor|carpet|ceiling|splashback/i;

const NAME_RULES: [VisualiserTarget, RegExp][] = [
  ["roof", /\broof\b|trim.?deck|corrugat/i],
  ["fascia", /fascia|gutter/i],
  ["windowFrame", /window.*(frame|sash)|\bsash\b/i],
  ["frontDoor", /door.*(panel|laminate)|front.*door/i],
];

interface MaterialStats {
  name: string;
  totalArea: number;
  upFacingArea: number;
  downFacingArea: number;
  sideFacingArea: number;
}

export interface MaterialInfo {
  name: string;
  area: number;
}

export interface ModelMaterialAnalysis {
  autoAssignments: Record<string, VisualiserTarget | null>;
  materials: MaterialInfo[];
}

const triA = new THREE.Vector3();
const triB = new THREE.Vector3();
const triC = new THREE.Vector3();
const edge1 = new THREE.Vector3();
const edge2 = new THREE.Vector3();
const normal = new THREE.Vector3();

function accumulateTriangleStats(stats: MaterialStats, a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) {
  edge1.subVectors(b, a);
  edge2.subVectors(c, a);
  normal.crossVectors(edge1, edge2);
  const area = normal.length() / 2;
  if (area === 0) return;
  normal.normalize();

  stats.totalArea += area;
  if (normal.y > UP_NORMAL_Y) stats.upFacingArea += area;
  else if (normal.y < DOWN_NORMAL_Y) stats.downFacingArea += area;
  else stats.sideFacingArea += area;
}

function dominantOrientation(stats: MaterialStats): "up" | "down" | "side" {
  if (stats.upFacingArea >= stats.downFacingArea && stats.upFacingArea >= stats.sideFacingArea) return "up";
  if (stats.downFacingArea >= stats.sideFacingArea) return "down";
  return "side";
}

/**
 * One-time analysis of a loaded model's geometry, run once at load time (not
 * on every colour change). Combines keyword hints with actual face-normal
 * orientation to disambiguate roof vs. wall materials, and ranks wall-like
 * materials by surface area to tell the primary wall from a contrasting one.
 */
export function analyzeModelMaterials(scene: THREE.Group): ModelMaterialAnalysis {
  const statsByMaterial = new Map<string, MaterialStats>();

  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const geometry = mesh.geometry;
    const position = geometry.attributes.position;
    if (!position) return;

    mesh.updateWorldMatrix(true, false);

    const groups = geometry.groups.length > 0 ? geometry.groups : [{ start: 0, count: geometry.index ? geometry.index.count : position.count, materialIndex: 0 }];

    for (const group of groups) {
      const material = materials[group.materialIndex ?? 0] as THREE.MeshStandardMaterial | undefined;
      if (!material?.name) continue;

      let stats = statsByMaterial.get(material.name);
      if (!stats) {
        stats = { name: material.name, totalArea: 0, upFacingArea: 0, downFacingArea: 0, sideFacingArea: 0 };
        statsByMaterial.set(material.name, stats);
      }

      const index = geometry.index;
      const start = group.start;
      const end = group.start + group.count;
      for (let i = start; i < end; i += 3) {
        const ia = index ? index.getX(i) : i;
        const ib = index ? index.getX(i + 1) : i + 1;
        const ic = index ? index.getX(i + 2) : i + 2;
        triA.fromBufferAttribute(position, ia).applyMatrix4(mesh.matrixWorld);
        triB.fromBufferAttribute(position, ib).applyMatrix4(mesh.matrixWorld);
        triC.fromBufferAttribute(position, ic).applyMatrix4(mesh.matrixWorld);
        accumulateTriangleStats(stats, triA, triB, triC);
      }
    }
  });

  const allStats = [...statsByMaterial.values()];
  const autoAssignments: Record<string, VisualiserTarget | null> = {};

  for (const stats of allStats) {
    autoAssignments[stats.name] = null;
    for (const [target, pattern] of NAME_RULES) {
      if (!pattern.test(stats.name)) continue;
      if (target === "roof" && dominantOrientation(stats) !== "up") {
        // Name says roof, geometry says otherwise (e.g. a wall clad in
        // "Trimdek") — don't trust the name, let wall ranking below decide.
        continue;
      }
      autoAssignments[stats.name] = target;
      break;
    }
  }

  const wallCandidates = allStats
    .filter((s) => autoAssignments[s.name] === null && !NOT_A_WALL.test(s.name) && dominantOrientation(s) === "side")
    .sort((a, b) => b.sideFacingArea - a.sideFacingArea);

  if (wallCandidates[0]) {
    autoAssignments[wallCandidates[0].name] = "wallPrimary";
    const primaryArea = wallCandidates[0].sideFacingArea;
    if (wallCandidates[1] && wallCandidates[1].sideFacingArea >= primaryArea * MIN_SECONDARY_WALL_AREA_FRACTION) {
      autoAssignments[wallCandidates[1].name] = "wallSecondary";
    }
  }

  const materials: MaterialInfo[] = allStats.map((s) => ({ name: s.name, area: s.totalArea })).sort((a, b) => b.area - a.area);

  return { autoAssignments, materials };
}
