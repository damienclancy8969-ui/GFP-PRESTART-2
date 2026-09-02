import DxfParser from "dxf-parser";
import type { ILwpolylineEntity, IPolylineEntity, ILineEntity, IEntity } from "dxf-parser";

export interface FootprintPoint {
  x: number;
  z: number;
}

export interface ParsedFootprint {
  points: FootprintPoint[];
  width: number;
  depth: number;
}

function shoelaceArea(points: { x: number; y: number }[]): number {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    sum += a.x * b.y - b.x * a.y;
  }
  return Math.abs(sum) / 2;
}

function isClosedPolyline(e: IEntity): e is ILwpolylineEntity | IPolylineEntity {
  return (e.type === "LWPOLYLINE" || e.type === "POLYLINE") && (e as ILwpolylineEntity | IPolylineEntity).shape === true;
}

/**
 * Traces the building footprint from a DXF's 2D geometry: the largest closed
 * polyline (the exterior wall envelope, in the common case) or, failing
 * that, the bounding box of every line/vertex in the drawing. Arcs/bulges on
 * polyline segments are treated as straight for this — good enough for a
 * footprint outline, not a full CAD reconstruction.
 */
export function parseDxfFootprint(text: string): ParsedFootprint | null {
  const parser = new DxfParser();
  const dxf = parser.parseSync(text);
  if (!dxf || !dxf.entities || dxf.entities.length === 0) return null;

  let best: { x: number; y: number }[] | null = null;
  let bestArea = 0;

  for (const entity of dxf.entities) {
    if (!isClosedPolyline(entity)) continue;
    const raw = "vertices" in entity ? entity.vertices : [];
    const pts = raw.map((v) => ({ x: v.x, y: v.y }));
    if (pts.length < 3) continue;
    const area = shoelaceArea(pts);
    if (area > bestArea) {
      bestArea = area;
      best = pts;
    }
  }

  if (!best) {
    const all: { x: number; y: number }[] = [];
    for (const entity of dxf.entities) {
      if (entity.type === "LINE") {
        for (const v of (entity as ILineEntity).vertices) all.push({ x: v.x, y: v.y });
      } else if (entity.type === "LWPOLYLINE" || entity.type === "POLYLINE") {
        const raw = "vertices" in entity ? (entity as ILwpolylineEntity | IPolylineEntity).vertices : [];
        for (const v of raw) all.push({ x: v.x, y: v.y });
      }
    }
    if (all.length < 2) return null;
    const xs = all.map((p) => p.x);
    const ys = all.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    best = [
      { x: minX, y: minY },
      { x: maxX, y: minY },
      { x: maxX, y: maxY },
      { x: minX, y: maxY },
    ];
  }

  const xs = best.map((p) => p.x);
  const ys = best.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const rawWidth = maxX - minX;
  const rawDepth = maxY - minY;
  if (rawWidth <= 0 || rawDepth <= 0) return null;

  // Most CAD floor plans are drawn in millimetres; a plan whose largest
  // dimension is already a plausible metre count (a granny flat footprint is
  // roughly 5-16m) is assumed to already be in metres.
  const maxDim = Math.max(rawWidth, rawDepth);
  const scale = maxDim > 100 ? 0.001 : 1;

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  const points: FootprintPoint[] = best.map((p) => ({
    x: (p.x - cx) * scale,
    z: (p.y - cy) * scale,
  }));

  return { points, width: rawWidth * scale, depth: rawDepth * scale };
}
