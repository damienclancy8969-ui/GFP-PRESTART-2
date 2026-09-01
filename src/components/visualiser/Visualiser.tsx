import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSelectionStore } from "../../state/useSelectionStore";
import { resolveVisualiserColours } from "../../utils/visualiser";
import { HouseModel } from "./HouseModel";
import { PlanUpload } from "./PlanUpload";
import { GfpLogo } from "../GfpLogo";

export function Visualiser() {
  const selections = useSelectionStore((s) => s.selections);
  const planFile = useSelectionStore((s) => s.planFile);
  const colours = useMemo(() => resolveVisualiserColours(selections), [selections]);

  const [width, setWidth] = useState(9);
  const [depth, setDepth] = useState(6);
  const [pitch, setPitch] = useState(1.4);

  return (
    <section id="visualiser" className="page-card scroll-mt-24">
      <header className="flex items-stretch justify-between bg-brand-700">
        <div className="flex flex-col justify-center px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-200">Step One</p>
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Design Visualiser</h2>
        </div>
        <div className="flex w-40 shrink-0 items-center justify-center bg-white/95 px-3 py-3 sm:w-48">
          <GfpLogo className="h-16 w-16" />
        </div>
      </header>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <p className="mb-5 max-w-3xl text-[14px] leading-relaxed text-stone-700">
          Upload your working drawings and watch your exterior selections come to life. As you choose your wall,
          roof, fascia and window colours through the book below, this 3D model updates live.
        </p>

        <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-gold-500/40 bg-gold-500/10 px-4 py-3 text-[12.5px] leading-relaxed text-stone-700">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path d="M12 9v4M12 16.5v.01M10.3 4.5 2.9 17.2a1.8 1.8 0 0 0 1.56 2.7h15.1a1.8 1.8 0 0 0 1.56-2.7L13.7 4.5a1.8 1.8 0 0 0-3.4 0Z" strokeLinejoin="round" />
          </svg>
          <p>
            <strong className="text-stone-800">About this preview:</strong> this is an interactive massing model in
            accurate colours and materials — not a photorealistic render of your uploaded drawing. A true
            photoreal render from a DWG/PDF needs a server-side CAD-processing and rendering pipeline; this upload
            slot is built ready to plug one in for production.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="overflow-hidden rounded-xl border border-brand-300/60 bg-gradient-to-b from-sky-100 to-stone-100" style={{ height: 420 }}>
            <Canvas shadows camera={{ position: [10, 6, 11], fov: 40 }}>
              <Suspense fallback={null}>
                <color attach="background" args={["#cfe3ee"]} />
                <hemisphereLight args={["#cfe3ee", "#7c9066", 0.65]} />
                <ambientLight intensity={0.35} />
                <directionalLight
                  position={[8, 10, 6]}
                  intensity={1.8}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <HouseModel colours={colours} width={width} depth={depth} wallHeight={2.7} roofPitch={pitch} />
                <OrbitControls
                  enablePan={false}
                  minDistance={6}
                  maxDistance={22}
                  maxPolarAngle={Math.PI / 2.1}
                  target={[0, 1.3, 0]}
                />
              </Suspense>
            </Canvas>
          </div>

          <div className="flex flex-col gap-5">
            <PlanUpload />

            <div className="rounded-lg border border-brand-200/70 bg-white/60 px-4 py-3.5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-brand-700">Adjust footprint</p>
              <label className="mb-2.5 block text-[12px] text-stone-600">
                Width {width.toFixed(1)}m
                <input type="range" min={5} max={16} step={0.5} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="mt-1 w-full accent-brand-600" />
              </label>
              <label className="mb-2.5 block text-[12px] text-stone-600">
                Depth {depth.toFixed(1)}m
                <input type="range" min={4} max={12} step={0.5} value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="mt-1 w-full accent-brand-600" />
              </label>
              <label className="block text-[12px] text-stone-600">
                Roof pitch
                <input type="range" min={0.6} max={2.6} step={0.1} value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="mt-1 w-full accent-brand-600" />
              </label>
            </div>

            <div className="rounded-lg border border-brand-200/70 bg-white/60 px-4 py-3.5">
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-brand-700">Live materials</p>
              <ul className="flex flex-col gap-1.5 text-[12px] text-stone-600">
                <SwatchRow label="Primary wall" hex={colours.wallPrimary} />
                <SwatchRow label="Secondary wall" hex={colours.wallSecondary} />
                <SwatchRow label="Roof" hex={colours.roof} />
                <SwatchRow label="Fascia / gutter" hex={colours.fascia} />
                <SwatchRow label="Window frames" hex={colours.windowFrame} />
              </ul>
              <p className="mt-3 text-[11px] text-stone-400">
                Updates automatically as you make selections below.
              </p>
            </div>
          </div>
        </div>

        {planFile && (planFile.kind === "pdf" || planFile.kind === "image") && (
          <div className="mt-6">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-brand-700">Uploaded reference plan</p>
            <img src={planFile.dataUrl} alt="Uploaded plan" className="max-h-96 w-full rounded-lg border border-brand-200 object-contain bg-white" />
          </div>
        )}
      </div>
    </section>
  );
}

function SwatchRow({ label, hex }: { label: string; hex: string }) {
  return (
    <li className="flex items-center justify-between gap-2">
      <span>{label}</span>
      <span className="flex items-center gap-1.5">
        <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ backgroundColor: hex }} />
        <span className="font-mono text-[11px] text-stone-400">{hex}</span>
      </span>
    </li>
  );
}
