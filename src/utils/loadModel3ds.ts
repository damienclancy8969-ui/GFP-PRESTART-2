import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import assimpjsFactory from "assimpjs";

// Building elements from a real granny flat rarely exceed this in any raw file
// unit; anything bigger is treated as site/context geometry (a boundary or
// survey reference plane) and excluded from the auto-framing calculation —
// it's still rendered, just not used to size/centre the camera view.
const OUTLIER_THRESHOLD = 1500;

// 3ds files from this pipeline are authored in inches; converting directly to
// metres gives an honestly-scaled model. If a file turns out to use different
// units, the framed size will fall well outside a plausible building size —
// in that case we fall back to normalising the largest dimension instead.
const INCHES_TO_METRES = 0.0254;
const FALLBACK_TARGET_METRES = 12;
const PLAUSIBLE_MIN_METRES = 2;
const PLAUSIBLE_MAX_METRES = 60;

export interface Loaded3dsModel {
  scene: THREE.Group;
  width: number;
  depth: number;
  height: number;
}

function parseGlb(arrayBuffer: ArrayBuffer): Promise<THREE.Group> {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.parse(
      arrayBuffer,
      "",
      (gltf) => resolve(gltf.scene),
      (err) => reject(err)
    );
  });
}

function framingBox(scene: THREE.Group): THREE.Box3 {
  const box = new THREE.Box3();
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    const bb = new THREE.Box3().setFromObject(mesh);
    const size = new THREE.Vector3();
    bb.getSize(size);
    if (Math.max(size.x, size.y, size.z) < OUTLIER_THRESHOLD) box.union(bb);
  });
  return box;
}

/**
 * Converts an uploaded .3ds file to real 3D geometry entirely client-side:
 * assimpjs (a WASM build of the open-source Assimp library) converts .3ds to
 * glTF in-browser, then three.js's own GLTFLoader parses it. No backend, no
 * paid conversion service.
 */
export async function loadModel3ds(file: File): Promise<Loaded3dsModel> {
  // Fetched (rather than left to the library's own locateFile-based fetch) so
  // the packaged single-file demo can substitute a data: URI for this exact
  // request — see build-artifact.mjs. wasmBinary makes the WASM runtime skip
  // its own internal fetch entirely and use these bytes directly.
  const wasmBinary = await fetch("/assimpjs.wasm").then((r) => r.arrayBuffer());
  const ajs = await assimpjsFactory({ wasmBinary });

  const buffer = await file.arrayBuffer();
  const fileList = new ajs.FileList();
  fileList.AddFile(file.name, new Uint8Array(buffer));

  const result = ajs.ConvertFileList(fileList, "glb2");
  if (!result.IsSuccess() || result.FileCount() === 0) {
    throw new Error(`Could not convert 3ds file: ${result.GetErrorCode()}`);
  }
  const glb = result.GetFile(0).GetContent();
  const glbBuffer = new Uint8Array(glb).buffer;

  const scene = await parseGlb(glbBuffer);

  const box = framingBox(scene);
  const rawSize = new THREE.Vector3();
  box.getSize(rawSize);
  const center = new THREE.Vector3();
  box.getCenter(center);

  let scale = INCHES_TO_METRES;
  const inchesMaxDim = Math.max(rawSize.x, rawSize.y, rawSize.z) * INCHES_TO_METRES;
  if (inchesMaxDim < PLAUSIBLE_MIN_METRES || inchesMaxDim > PLAUSIBLE_MAX_METRES) {
    const rawMaxDim = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;
    scale = FALLBACK_TARGET_METRES / rawMaxDim;
  }

  scene.scale.setScalar(scale);
  scene.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);

  return {
    scene,
    width: rawSize.x * scale,
    depth: rawSize.z * scale,
    height: rawSize.y * scale,
  };
}
