import { Component, Suspense, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { useSelectionStore } from "../../state/useSelectionStore";
import { useModelStore } from "../../state/useModelStore";
import { useMaterialOverridesStore, getOverridesForFile } from "../../state/useMaterialOverridesStore";
import { useRoomViewsStore, getWaypointsForFile, type RoomWaypoint } from "../../state/useRoomViewsStore";
import { resolveVisualiserColours, resolveVisualiserPattern } from "../../utils/visualiser";
import { HouseModel } from "./HouseModel";
import { Model3D } from "./Model3D";
import { MaterialAssignPanel } from "./MaterialAssignPanel";
import { PlanUpload } from "./PlanUpload";
import { GfpLogo } from "../GfpLogo";

const EXTERIOR_CAMERA: [number, number, number] = [10, 6, 11];
const EXTERIOR_TARGET: [number, number, number] = [0, 1.3, 0];
const EYE_HEIGHT = 1.6;

// The HDRI Environment loads from drei's CDN at runtime — if that fetch
// fails (blocked network, CDN hiccup) it throws inside the Canvas tree.
// Without this boundary that crashes the whole app to a blank page, not
// just the reflections; the scene's own lights are enough to render
// without it, so we just drop Environment and keep going.
class EnvironmentBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("3D viewer: environment reflections unavailable, continuing without them", error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function Visualiser() {
  const selections = useSelectionStore((s) => s.selections);
  const planFile = useSelectionStore((s) => s.planFile);
  const planOutline = useSelectionStore((s) => s.planOutline);
  const modelScene = useModelStore((s) => s.scene);
  const autoAssignments = useModelStore((s) => s.autoAssignments);
  const modelMaterials = useModelStore((s) => s.materials);
  const overridesByFile = useMaterialOverridesStore((s) => s.overridesByFile);
  const setOverride = useMaterialOverridesStore((s) => s.setOverride);
  const waypointsByFile = useRoomViewsStore((s) => s.waypointsByFile);
  const addWaypoint = useRoomViewsStore((s) => s.addWaypoint);
  const removeWaypoint = useRoomViewsStore((s) => s.removeWaypoint);
  const colours = useMemo(() => resolveVisualiserColours(selections), [selections]);
  const pattern = useMemo(() => resolveVisualiserPattern(selections), [selections]);

  const [width, setWidth] = useState(9);
  const [depth, setDepth] = useState(6);
  const [pitch, setPitch] = useState(1.4);
  const [pickMode, setPickMode] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [roomViewMode, setRoomViewMode] = useState(false);
  const [pendingWaypoint, setPendingWaypoint] = useState<[number, number, number] | null>(null);
  const [waypointLabel, setWaypointLabel] = useState("");

  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const hasOutline = !!planOutline;
  const hasModel = !!modelScene;
  const modelWidth = hasOutline ? planOutline.width : width;
  const modelDepth = hasOutline ? planOutline.depth : depth;
  const overrides = planFile ? getOverridesForFile(overridesByFile, planFile.name) : {};
  const waypoints = planFile ? getWaypointsForFile(waypointsByFile, planFile.name) : [];

  const jumpTo = (position: [number, number, number]) => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.object.position.set(position[0], EYE_HEIGHT, position[2]);
    controls.target.set(0, EYE_HEIGHT, 0);
    controls.update();
  };

  const resetToExterior = () => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.object.position.set(...EXTERIOR_CAMERA);
    controls.target.set(...EXTERIOR_TARGET);
    controls.update();
  };

  const saveWaypoint = () => {
    if (!planFile || !pendingWaypoint) return;
    const label = waypointLabel.trim() || `Room ${waypoints.length + 1}`;
    const waypoint: RoomWaypoint = { id: `${Date.now()}`, label, position: pendingWaypoint };
    addWaypoint(planFile.name, waypoint);
    jumpTo(pendingWaypoint);
    setPendingWaypoint(null);
    setWaypointLabel("");
  };

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
            <strong className="text-stone-800">About this preview:</strong> upload a <strong>3DS</strong> model of
            your design and this shows your actual walls, roof and windows exactly as modelled — colours update live
            as you make selections below. Upload a <strong>DXF</strong> floor plan instead and this traces your real
            footprint from it automatically. Both happen in seconds, right here in the browser — no waiting, nothing
            sent anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div className="overflow-hidden rounded-xl border border-brand-300/60 bg-gradient-to-b from-sky-100 to-stone-100" style={{ height: 420 }}>
            <Canvas
              shadows
              camera={{ position: [10, 6, 11], fov: 40 }}
              gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.25 }}
            >
              <Suspense fallback={null}>
                <color attach="background" args={["#d4e6f5"]} />
                <hemisphereLight args={["#e8f0f8", "#8fa575", 0.72]} />
                <ambientLight intensity={0.42} />
                <directionalLight
                  position={[10, 12, 8]}
                  intensity={2.1}
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                  shadow-camera-left={-16}
                  shadow-camera-right={16}
                  shadow-camera-top={16}
                  shadow-camera-bottom={-4}
                  shadow-camera-far={40}
                />
                <EnvironmentBoundary>
                  <Environment preset="city" environmentIntensity={0.55} />
                </EnvironmentBoundary>
                {hasModel ? (
                  <Model3D
                    scene={modelScene}
                    colours={colours}
                    pattern={pattern}
                    autoAssignments={autoAssignments}
                    overrides={overrides}
                    materials={modelMaterials}
                    pickMode={pickMode}
                    selectedMaterial={selectedMaterial}
                    onPick={setSelectedMaterial}
                    roomViewMode={roomViewMode}
                    onDropWaypoint={setPendingWaypoint}
                  />
                ) : (
                  <HouseModel
                    colours={colours}
                    pattern={pattern}
                    width={modelWidth}
                    depth={modelDepth}
                    wallHeight={2.7}
                    roofPitch={pitch}
                    outline={planOutline?.points}
                  />
                )}
                <OrbitControls
                  ref={controlsRef}
                  enablePan={false}
                  minDistance={0.3}
                  maxDistance={22}
                  maxPolarAngle={Math.PI / 2.1}
                  target={[0, 1.3, 0]}
                />
              </Suspense>
            </Canvas>
          </div>
          {hasModel && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setPickMode((v) => !v);
                  setSelectedMaterial(null);
                  setRoomViewMode(false);
                  setPendingWaypoint(null);
                }}
                className={`rounded-md px-3 py-1.5 text-[12px] font-semibold transition ${
                  pickMode ? "bg-gold-600 text-white" : "border border-brand-300 text-brand-700 hover:bg-brand-50"
                }`}
              >
                {pickMode ? "Done fixing colours" : "Fix colours"}
              </button>
              <button
                onClick={() => {
                  setRoomViewMode((v) => !v);
                  setPickMode(false);
                  setSelectedMaterial(null);
                  setPendingWaypoint(null);
                  if (roomViewMode) resetToExterior();
                }}
                className={`rounded-md px-3 py-1.5 text-[12px] font-semibold transition ${
                  roomViewMode ? "bg-gold-600 text-white" : "border border-brand-300 text-brand-700 hover:bg-brand-50"
                }`}
              >
                {roomViewMode ? "Done setting up room views" : "Set up room views"}
              </button>
              {pickMode && (
                <p className="text-[11px] text-stone-500">Click any part of the model to assign what it should be.</p>
              )}
              {roomViewMode && !pendingWaypoint && (
                <p className="text-[11px] text-stone-500">Click a spot on the floor to save a room view there.</p>
              )}
            </div>
          )}
          {roomViewMode && pendingWaypoint && (
            <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md border border-gold-500/40 bg-gold-500/10 px-3 py-2">
              <input
                type="text"
                value={waypointLabel}
                onChange={(e) => setWaypointLabel(e.target.value)}
                placeholder="e.g. Bedroom 1"
                autoFocus
                className="rounded border border-brand-300 px-2 py-1 text-[12px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveWaypoint();
                  if (e.key === "Escape") setPendingWaypoint(null);
                }}
              />
              <button
                onClick={saveWaypoint}
                className="rounded-md bg-brand-700 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-brand-800"
              >
                Save view
              </button>
              <button
                onClick={() => setPendingWaypoint(null)}
                className="rounded-md border border-brand-300 px-3 py-1.5 text-[12px] font-semibold text-brand-700 hover:bg-brand-50"
              >
                Cancel
              </button>
            </div>
          )}
          {hasModel && waypoints.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={resetToExterior}
                className="rounded-md border border-brand-300 px-3 py-1.5 text-[12px] font-semibold text-brand-700 hover:bg-brand-50"
              >
                Exterior view
              </button>
              {waypoints.map((w) => (
                <span
                  key={w.id}
                  className="flex items-center gap-1 rounded-md border border-brand-300 pl-3 pr-1.5 py-1.5 text-[12px] font-semibold text-brand-700"
                >
                  <button onClick={() => jumpTo(w.position)} className="hover:underline">
                    {w.label}
                  </button>
                  <button
                    onClick={() => planFile && removeWaypoint(planFile.name, w.id)}
                    aria-label={`Remove ${w.label}`}
                    className="ml-1 rounded px-1 text-stone-400 hover:bg-red-50 hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          </div>

          <div className="flex flex-col gap-5">
            <PlanUpload />

            {selectedMaterial && (
              <MaterialAssignPanel
                materialName={selectedMaterial}
                current={overrides[selectedMaterial] ?? autoAssignments[selectedMaterial] ?? null}
                autoDetected={autoAssignments[selectedMaterial] ?? null}
                onAssign={(target) => {
                  if (!planFile) return;
                  // When assigning to a structural target, remove from other structural targets to prevent sync
                  const structuralTargets = ["roof", "wallPrimary", "wallSecondary", "fascia"];
                  if (target !== "none" && structuralTargets.includes(target as string)) {
                    // Find and clear this material from other structural target assignments
                    for (const [matName, assignment] of Object.entries(overrides)) {
                      if (matName !== selectedMaterial && assignment !== "none" && structuralTargets.includes(assignment)) {
                        // Check if this material should be reassigned (if it's the same as selectedMaterial through auto-assignment)
                        if (autoAssignments[matName] === autoAssignments[selectedMaterial] && matName !== selectedMaterial) {
                          setOverride(planFile.name, matName, "none");
                        }
                      }
                    }
                  }
                  setOverride(planFile.name, selectedMaterial, target);
                  setSelectedMaterial(null);
                }}
                onClose={() => setSelectedMaterial(null)}
              />
            )}

            <div className="rounded-lg border border-brand-200/70 bg-white/60 px-4 py-3.5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-brand-700">Adjust footprint</p>
              {hasModel ? (
                <p className="text-[12px] text-stone-500">
                  Walls, roof and window shape are all real, from your uploaded 3D model — remove the file to switch
                  back to a manually adjustable footprint.
                </p>
              ) : hasOutline ? (
                <p className="mb-2.5 text-[12px] text-stone-500">
                  Footprint is traced from your uploaded DXF ({modelWidth.toFixed(1)}m × {modelDepth.toFixed(1)}m) —
                  remove the file to adjust it manually instead.
                </p>
              ) : (
                <>
                  <label className="mb-2.5 block text-[12px] text-stone-600">
                    Width {width.toFixed(1)}m
                    <input type="range" min={5} max={16} step={0.5} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="mt-1 w-full accent-brand-600" />
                  </label>
                  <label className="mb-2.5 block text-[12px] text-stone-600">
                    Depth {depth.toFixed(1)}m
                    <input type="range" min={4} max={12} step={0.5} value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="mt-1 w-full accent-brand-600" />
                  </label>
                </>
              )}
              {!hasModel && (
                <label className="block text-[12px] text-stone-600">
                  Roof pitch
                  <input type="range" min={0.6} max={2.6} step={0.1} value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="mt-1 w-full accent-brand-600" />
                </label>
              )}
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
