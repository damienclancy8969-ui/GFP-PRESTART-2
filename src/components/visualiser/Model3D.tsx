import { useEffect } from "react";
import type * as THREE from "three";
import type { VisualiserTarget } from "../../types";
import { applyModelColours } from "../../utils/applyModelColours";

interface Props {
  scene: THREE.Group;
  colours: Record<VisualiserTarget, string>;
}

export function Model3D({ scene, colours }: Props) {
  useEffect(() => {
    applyModelColours(scene, colours);
  }, [scene, colours]);

  return (
    <group>
      <primitive object={scene} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#7c9066" roughness={1} />
      </mesh>
    </group>
  );
}
