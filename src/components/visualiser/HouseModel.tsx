import { useMemo } from "react";
import * as THREE from "three";
import type { VisualiserTarget } from "../../types";
import type { FootprintPoint } from "../../utils/dxf";

interface Props {
  colours: Record<VisualiserTarget, string>;
  width: number;
  depth: number;
  wallHeight: number;
  roofPitch: number;
  outline?: FootprintPoint[] | null;
}

function FootprintWalls({ outline, wallHeight, color }: { outline: FootprintPoint[]; wallHeight: number; color: string }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape(outline.map((p) => new THREE.Vector2(p.x, -p.z)));
    const geo = new THREE.ExtrudeGeometry(shape, { depth: wallHeight, bevelEnabled: false });
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, [outline, wallHeight]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} side={THREE.DoubleSide} />
    </mesh>
  );
}

const OVERHANG = 0.35;

function RoofSlopes({ width, depth, wallHeight, pitch, color }: { width: number; depth: number; wallHeight: number; pitch: number; color: string }) {
  const halfDepth = depth / 2 + OVERHANG;
  const rise = pitch;
  const slopeLength = Math.sqrt(halfDepth * halfDepth + rise * rise);
  const angle = Math.atan2(rise, halfDepth);
  const panelWidth = width + OVERHANG * 2;
  const ridgeY = wallHeight + rise;

  return (
    <group>
      <mesh position={[0, wallHeight + rise / 2, halfDepth / 2]} rotation={[angle, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[panelWidth, 0.07, slopeLength]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.15} />
      </mesh>
      <mesh position={[0, wallHeight + rise / 2, -halfDepth / 2]} rotation={[-angle, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[panelWidth, 0.07, slopeLength]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.15} />
      </mesh>
      <mesh position={[0, ridgeY, 0]} castShadow>
        <boxGeometry args={[panelWidth, 0.1, 0.14]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.15} />
      </mesh>
    </group>
  );
}

export function HouseModel({ colours, width, depth, wallHeight, roofPitch, outline }: Props) {
  const secondaryStart = width * 0.62;
  const secondaryWidth = width - secondaryStart;
  const hasOutline = !!outline && outline.length >= 3;

  return (
    <group>
      {hasOutline ? (
        <FootprintWalls outline={outline!} wallHeight={wallHeight} color={colours.wallPrimary} />
      ) : (
        <>
          {/* Primary wall block */}
          <mesh position={[0, wallHeight / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[width, wallHeight, depth]} />
            <meshStandardMaterial color={colours.wallPrimary} roughness={0.85} metalness={0.05} />
          </mesh>

          {/* Secondary/contrast wall block, offset to read as a feature end */}
          <mesh position={[width / 2 - secondaryWidth / 2 + 0.01, wallHeight / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[secondaryWidth, wallHeight - 0.02, depth + 0.02]} />
            <meshStandardMaterial color={colours.wallSecondary} roughness={0.85} metalness={0.05} />
          </mesh>
        </>
      )}

      <RoofSlopes width={width} depth={depth} wallHeight={wallHeight} pitch={roofPitch} color={colours.roof} />

      {/* Fascia trim strip along both eaves */}
      <mesh position={[0, wallHeight + 0.02, depth / 2 + OVERHANG]}>
        <boxGeometry args={[width + OVERHANG * 2, 0.09, 0.05]} />
        <meshStandardMaterial color={colours.fascia} roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, wallHeight + 0.02, -depth / 2 - OVERHANG]}>
        <boxGeometry args={[width + OVERHANG * 2, 0.09, 0.05]} />
        <meshStandardMaterial color={colours.fascia} roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Front door */}
      <mesh position={[-width / 4, 1.05, depth / 2 + 0.02]} castShadow>
        <boxGeometry args={[0.9, 2.1, 0.06]} />
        <meshStandardMaterial color={colours.frontDoor} roughness={0.6} />
      </mesh>

      {/* Window with frame colour */}
      <mesh position={[width / 4, wallHeight / 2 + 0.2, depth / 2 + 0.015]}>
        <boxGeometry args={[1.6, 1.2, 0.05]} />
        <meshStandardMaterial color={colours.windowFrame} roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[width / 4, wallHeight / 2 + 0.2, depth / 2 + 0.045]}>
        <boxGeometry args={[1.44, 1.04, 0.02]} />
        <meshPhysicalMaterial color="#9fc3d8" roughness={0.05} metalness={0.1} transmission={0.55} transparent opacity={0.75} />
      </mesh>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#7c9066" roughness={1} />
      </mesh>
    </group>
  );
}
