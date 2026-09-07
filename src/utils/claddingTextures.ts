import * as THREE from "three";

// Real product photos can't be fetched in this environment, so cladding
// profiles are told apart with a procedurally-drawn greyscale height pattern
// used as a bump map — three.js derives surface perturbation from it, which
// is enough to read as ribbed/grooved under the scene's lighting even
// without a true photo texture.
export type CladdingProfile = "custom-orb" | "trimdek" | "duragrove" | "durascape" | "stratum";

interface ProfileStyle {
  bumpScale: number;
  roughness: number;
  metalness: number;
  // How many times the pattern tiles per metre of wall — steel profiles tile
  // tighter (narrower ribs) than fibre-cement board grooves.
  repeatPerMetre: number;
}

// bumpScale/repeatPerMetre were originally tuned far too fine (e.g. 3
// tile-repeats/metre from a 256px texture works out to ~28 repeats across a
// whole wall face — each rib ends up sub-pixel on screen and gets smoothed
// away entirely by mipmap filtering). Fewer, chunkier repeats with a bigger
// bumpScale actually read as a visible profile instead of flat grey.
const STYLES: Record<CladdingProfile, ProfileStyle> = {
  "custom-orb": { bumpScale: 0.22, roughness: 0.45, metalness: 0.15, repeatPerMetre: 0.7 },
  trimdek: { bumpScale: 0.26, roughness: 0.4, metalness: 0.15, repeatPerMetre: 0.4 },
  duragrove: { bumpScale: 0.22, roughness: 0.75, metalness: 0, repeatPerMetre: 0.3 },
  durascape: { bumpScale: 0.015, roughness: 0.85, metalness: 0, repeatPerMetre: 1 },
  stratum: { bumpScale: 0.16, roughness: 0.8, metalness: 0, repeatPerMetre: 0.35 },
};

const SIZE = 256;

function drawPattern(profile: CladdingProfile): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgb(140,140,140)";
  ctx.fillRect(0, 0, SIZE, SIZE);

  if (profile === "custom-orb") {
    // Tight sine-wave corrugation — the classic rippled-iron look.
    const ribWidth = SIZE / 16;
    for (let x = 0; x < SIZE; x++) {
      const v = Math.sin((x / ribWidth) * Math.PI * 2);
      const grey = Math.round(140 + v * 90);
      ctx.fillStyle = `rgb(${grey},${grey},${grey})`;
      ctx.fillRect(x, 0, 1, SIZE);
    }
  } else if (profile === "trimdek") {
    // Wider trapezoidal box ribs — flat-topped, sharper edges.
    const period = SIZE / 8;
    for (let x = 0; x < SIZE; x++) {
      const t = (x % period) / period;
      const grey = t < 0.12 || t > 0.88 ? 220 : t < 0.5 ? 90 : 150;
      ctx.fillStyle = `rgb(${grey},${grey},${grey})`;
      ctx.fillRect(x, 0, 1, SIZE);
    }
  } else if (profile === "duragrove") {
    // Evenly spaced vertical grooves on an otherwise flat fibre-cement panel.
    const period = SIZE / 6;
    for (let x = 0; x < SIZE; x += period) {
      ctx.fillStyle = "rgb(50,50,50)";
      ctx.fillRect(x, 0, 4, SIZE);
    }
  } else if (profile === "stratum") {
    // Variable-width horizontal line details, per the catalogue's own description.
    let y = 0;
    let i = 0;
    while (y < SIZE) {
      const h = 10 + (i % 3) * 8;
      ctx.fillStyle = i % 2 === 0 ? "rgb(110,110,110)" : "rgb(175,175,175)";
      ctx.fillRect(0, y, SIZE, h);
      y += h;
      i++;
    }
  }
  // durascape: leave as flat mid-grey — its whole pitch is "rendered look".

  return canvas;
}

const baseTextures = new Map<CladdingProfile, THREE.Texture>();

function getBaseTexture(profile: CladdingProfile): THREE.Texture {
  let base = baseTextures.get(profile);
  if (!base) {
    base = new THREE.CanvasTexture(drawPattern(profile));
    base.wrapS = base.wrapT = THREE.RepeatWrapping;
    baseTextures.set(profile, base);
  }
  return base;
}

/**
 * A fresh clone per call so callers can set independent .repeat values (the
 * same profile is often applied to differently-sized wall surfaces at once)
 * without fighting over one shared texture instance.
 */
export function getCladdingTexture(profile: CladdingProfile, widthMetres: number, heightMetres: number): THREE.Texture {
  const tex = getBaseTexture(profile).clone();
  const style = STYLES[profile];
  tex.repeat.set(Math.max(1, Math.round(widthMetres * style.repeatPerMetre)), Math.max(1, Math.round(heightMetres * style.repeatPerMetre)));
  tex.needsUpdate = true;
  return tex;
}

export function getCladdingStyle(profile: CladdingProfile): ProfileStyle {
  return STYLES[profile];
}
