import { useEffect, useRef } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { VisualiserTarget } from "../../types";
import { applyModelColours, type MaterialOverride } from "../../utils/applyModelColours";
import { NOT_ASSIGNABLE, type MaterialInfo } from "../../utils/analyzeModelMaterials";
import type { VisualiserPattern } from "../../utils/visualiser";

interface Props {
  scene: THREE.Group;
  colours: Record<VisualiserTarget, string>;
  pattern: VisualiserPattern;
  autoAssignments: Record<string, VisualiserTarget | null>;
  overrides: Record<string, MaterialOverride>;
  materials: MaterialInfo[];
  pickMode: boolean;
  selectedMaterial: string | null;
  onPick: (materialName: string) => void;
  roomViewMode: boolean;
  onDropWaypoint: (point: [number, number, number]) => void;
}

const HIGHLIGHT_COLOR = new THREE.Color(0xffcc00);

export function Model3D({
  scene,
  colours,
  pattern,
  autoAssignments,
  overrides,
  materials,
  pickMode,
  selectedMaterial,
  onPick,
  roomViewMode,
  onDropWaypoint,
}: Props) {
  useEffect(() => {
    applyModelColours(scene, colours, pattern, autoAssignments, overrides, materials);
  }, [scene, colours, pattern, autoAssignments, overrides, materials]);

  const highlightedRef = useRef<THREE.Material[]>([]);

  useEffect(() => {
    for (const m of highlightedRef.current) (m as THREE.MeshStandardMaterial).emissive?.setRGB(0, 0, 0);
    highlightedRef.current = [];

    if (!selectedMaterial) return;
    const highlighted: THREE.Material[] = [];
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const meshMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of meshMaterials as THREE.MeshStandardMaterial[]) {
        if (material?.name === selectedMaterial && !highlighted.includes(material)) {
          material.emissive?.copy(HIGHLIGHT_COLOR);
          material.emissiveIntensity = 0.5;
          highlighted.push(material);
        }
      }
    });
    highlightedRef.current = highlighted;
  }, [scene, selectedMaterial]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (roomViewMode) {
      e.stopPropagation();
      onDropWaypoint([e.point.x, e.point.y, e.point.z]);
      return;
    }
    if (!pickMode) return;
    e.stopPropagation();
    const hit = (e.intersections[0]?.object ?? e.object) as THREE.Mesh | undefined;
    if (!hit?.isMesh) return;
    const material = Array.isArray(hit.material) ? hit.material[0] : hit.material;
    if (material?.name && !NOT_ASSIGNABLE.test(material.name)) onPick(material.name);
  };

  const clickable = pickMode || roomViewMode;

  return (
    <group>
      <primitive object={scene} onClick={clickable ? handleClick : undefined} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#7c9066" roughness={1} />
      </mesh>
    </group>
  );
}
