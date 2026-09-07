import { useEffect, useRef } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { VisualiserTarget } from "../../types";
import { applyModelColours, type MaterialOverride } from "../../utils/applyModelColours";

interface Props {
  scene: THREE.Group;
  colours: Record<VisualiserTarget, string>;
  autoAssignments: Record<string, VisualiserTarget | null>;
  overrides: Record<string, MaterialOverride>;
  pickMode: boolean;
  selectedMaterial: string | null;
  onPick: (materialName: string) => void;
}

const HIGHLIGHT_COLOR = new THREE.Color(0xffcc00);

export function Model3D({ scene, colours, autoAssignments, overrides, pickMode, selectedMaterial, onPick }: Props) {
  useEffect(() => {
    applyModelColours(scene, colours, autoAssignments, overrides);
  }, [scene, colours, autoAssignments, overrides]);

  const highlightedRef = useRef<THREE.Material[]>([]);

  useEffect(() => {
    for (const m of highlightedRef.current) (m as THREE.MeshStandardMaterial).emissive?.setRGB(0, 0, 0);
    highlightedRef.current = [];

    if (!selectedMaterial) return;
    const highlighted: THREE.Material[] = [];
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of materials as THREE.MeshStandardMaterial[]) {
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
    if (!pickMode) return;
    e.stopPropagation();
    const hit = (e.intersections[0]?.object ?? e.object) as THREE.Mesh | undefined;
    if (!hit?.isMesh) return;
    const material = Array.isArray(hit.material) ? hit.material[0] : hit.material;
    if (material?.name) onPick(material.name);
  };

  return (
    <group>
      <primitive object={scene} onClick={pickMode ? handleClick : undefined} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#7c9066" roughness={1} />
      </mesh>
    </group>
  );
}
