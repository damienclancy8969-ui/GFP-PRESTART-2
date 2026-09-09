import { useCallback, useRef, useState } from "react";
import { useSelectionStore, type PlanFile } from "../../state/useSelectionStore";
import { useModelStore } from "../../state/useModelStore";
import { renderFirstPageToDataUrl } from "../../utils/pdfPreview";
import { parseDxfFootprint } from "../../utils/dxf";
import { loadModel3ds } from "../../utils/loadModel3ds";

function kindFor(name: string): PlanFile["kind"] {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "pdf";
  if (ext === "3ds") return "3ds";
  if (ext === "dwg" || ext === "dxf") return "dwg";
  if (ext && ["png", "jpg", "jpeg", "webp"].includes(ext)) return "image";
  return "other";
}

export function PlanUpload() {
  const planFile = useSelectionStore((s) => s.planFile);
  const setPlanFile = useSelectionStore((s) => s.setPlanFile);
  const planOutline = useSelectionStore((s) => s.planOutline);
  const setPlanOutline = useSelectionStore((s) => s.setPlanOutline);
  const modelScene = useModelStore((s) => s.scene);
  const setModel = useModelStore((s) => s.setModel);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setLoading(true);
      setPlanOutline(null);
      setModel(null);
      try {
        const kind = kindFor(file.name);
        const isDxf = file.name.toLowerCase().endsWith(".dxf");
        if (kind === "3ds") {
          try {
            const model = await loadModel3ds(file);
            setModel(model);
            setPlanFile({ name: file.name, dataUrl: "", kind });
          } catch (err) {
            const detail = err instanceof Error ? err.message : String(err);
            setError(`Couldn't load that 3D model (${detail}) — attached as a reference file instead.`);
            setPlanFile({ name: file.name, dataUrl: "", kind: "other" });
          }
        } else if (kind === "pdf") {
          try {
            const dataUrl = await renderFirstPageToDataUrl(file);
            setPlanFile({ name: file.name, dataUrl, kind });
          } catch {
            // PDF page preview unavailable (e.g. no worker in this environment) — still attach the file.
            setPlanFile({ name: file.name, dataUrl: "", kind: "other" });
          }
        } else if (kind === "image") {
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          setPlanFile({ name: file.name, dataUrl, kind });
        } else if (isDxf) {
          const text = await file.text();
          const footprint = parseDxfFootprint(text);
          setPlanFile({ name: file.name, dataUrl: "", kind });
          if (footprint) {
            setPlanOutline(footprint);
          } else {
            setError("Read the file, but couldn't find a usable outline in it — the model below is a placeholder.");
          }
        } else {
          setPlanFile({ name: file.name, dataUrl: "", kind });
        }
      } catch {
        setError("Couldn't read that file — try a PDF export or an image of your plan.");
      } finally {
        setLoading(false);
      }
    },
    [setPlanFile, setPlanOutline, setModel]
  );

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition
          ${dragOver ? "border-brand-500 bg-brand-100/50" : "border-brand-300 bg-white/50 hover:border-brand-400"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.dwg,.dxf,.3ds,.png,.jpg,.jpeg,.webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-brand-500" fill="none" stroke="currentColor" strokeWidth={1.4}>
          <path d="M12 16V4M12 4 7 9M12 4l5 5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-[13px] font-medium text-brand-700">
          {loading ? "Reading your file…" : "Drop your 3DS model or floor plan here"}
        </p>
        <p className="text-[11px] text-stone-500">or click to browse — 3DS, DXF, JPG or PNG</p>
        {error && <p className="text-[11px] font-medium text-red-600">{error}</p>}
      </div>

      {planFile && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-brand-200/70 bg-white/60 px-3 py-2.5">
          {planFile.kind === "pdf" || planFile.kind === "image" ? (
            <img src={planFile.dataUrl} alt={planFile.name} className="h-14 w-14 rounded-md border border-brand-200 object-cover" />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-brand-200 bg-brand-50 text-brand-500">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.4}>
                <path d="M6 3h9l5 5v13H6zM14 3v6h6" strokeLinejoin="round" />
              </svg>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-medium text-stone-800">{planFile.name}</p>
            <p className="text-[11px] text-stone-500">
              {modelScene
                ? "Full 3D model loaded — showing your actual walls, roof and windows below"
                : planOutline
                  ? "Real footprint traced from this file — the 3D model below now matches its shape"
                  : planFile.kind === "dwg"
                    ? planFile.name.toLowerCase().endsWith(".dxf")
                      ? "Couldn't find a usable outline in this file — used as a design reference instead"
                      : "DWG files can't be read for real geometry for free — attached as a design reference. Export DXF from your CAD software to get a live 3D footprint."
                    : "Reference plan attached"}
            </p>
          </div>
          <button
            onClick={() => {
              setPlanFile(null);
              setPlanOutline(null);
              setModel(null);
            }}
            className="shrink-0 rounded-md px-2 py-1 text-[11px] font-medium text-stone-500 hover:bg-stone-100"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
