import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SelectionState, SelectionValue } from "../types";
import { catalogue } from "../data/catalogue";
import type { ParsedFootprint } from "../utils/dxf";

export interface PlanFile {
  name: string;
  dataUrl: string;
  kind: "pdf" | "image" | "dwg" | "other";
}

interface SelectionStore {
  clientName: string;
  jobNumber: string;
  selections: SelectionState;
  planFile: PlanFile | null;
  planOutline: ParsedFootprint | null;
  setClientName: (v: string) => void;
  setJobNumber: (v: string) => void;
  setPlanFile: (f: PlanFile | null) => void;
  setPlanOutline: (o: ParsedFootprint | null) => void;
  chooseSingle: (subsectionId: string, optionId: string) => void;
  toggleMultiple: (subsectionId: string, optionId: string) => void;
  setOtherText: (subsectionId: string, text: string) => void;
  setNote: (subsectionId: string, note: string) => void;
  setQty: (subsectionId: string, lineItemId: string, qty: number) => void;
  toggleLineItem: (subsectionId: string, lineItemId: string) => void;
  setItemNote: (subsectionId: string, lineItemId: string, note: string) => void;
  reset: () => void;
}

function getOrInit(state: SelectionState, id: string): SelectionValue {
  return state[id] ? { ...state[id] } : {};
}

export const useSelectionStore = create<SelectionStore>()(
  persist(
    (set) => ({
      clientName: "",
      jobNumber: "",
      selections: {},
      planFile: null,
      planOutline: null,
      setClientName: (v) => set({ clientName: v }),
      setJobNumber: (v) => set({ jobNumber: v }),
      setPlanFile: (f) => set({ planFile: f }),
      setPlanOutline: (o) => set({ planOutline: o }),
      chooseSingle: (subsectionId, optionId) =>
        set((s) => {
          const cur = getOrInit(s.selections, subsectionId);
          cur.optionId = cur.optionId === optionId ? undefined : optionId;
          return { selections: { ...s.selections, [subsectionId]: cur } };
        }),
      toggleMultiple: (subsectionId, optionId) =>
        set((s) => {
          const cur = getOrInit(s.selections, subsectionId);
          const ids = new Set(cur.optionIds ?? []);
          if (ids.has(optionId)) ids.delete(optionId);
          else ids.add(optionId);
          cur.optionIds = Array.from(ids);
          return { selections: { ...s.selections, [subsectionId]: cur } };
        }),
      setOtherText: (subsectionId, text) =>
        set((s) => {
          const cur = getOrInit(s.selections, subsectionId);
          cur.otherText = text;
          return { selections: { ...s.selections, [subsectionId]: cur } };
        }),
      setNote: (subsectionId, note) =>
        set((s) => {
          const cur = getOrInit(s.selections, subsectionId);
          cur.note = note;
          return { selections: { ...s.selections, [subsectionId]: cur } };
        }),
      setQty: (subsectionId, lineItemId, qty) =>
        set((s) => {
          const cur = getOrInit(s.selections, subsectionId);
          cur.qty = { ...(cur.qty ?? {}), [lineItemId]: qty };
          const ids = new Set(cur.optionIds ?? []);
          if (qty > 0) ids.add(lineItemId);
          else ids.delete(lineItemId);
          cur.optionIds = Array.from(ids);
          return { selections: { ...s.selections, [subsectionId]: cur } };
        }),
      toggleLineItem: (subsectionId, lineItemId) =>
        set((s) => {
          const cur = getOrInit(s.selections, subsectionId);
          const ids = new Set(cur.optionIds ?? []);
          if (ids.has(lineItemId)) ids.delete(lineItemId);
          else ids.add(lineItemId);
          cur.optionIds = Array.from(ids);
          return { selections: { ...s.selections, [subsectionId]: cur } };
        }),
      setItemNote: (subsectionId, lineItemId, note) =>
        set((s) => {
          const cur = getOrInit(s.selections, subsectionId);
          cur.itemNotes = { ...(cur.itemNotes ?? {}), [lineItemId]: note };
          return { selections: { ...s.selections, [subsectionId]: cur } };
        }),
      reset: () => set({ selections: {}, planFile: null, planOutline: null, clientName: "", jobNumber: "" }),
    }),
    { name: "gfp-prestart-selections" }
  )
);

export function totalSubsectionCount(): number {
  return catalogue.reduce((n, cat) => n + cat.subsections.length, 0);
}

export function completedSubsectionCount(selections: SelectionState): number {
  return Object.values(selections).filter((v) => {
    if (v.optionId) return true;
    if (v.optionIds && v.optionIds.length > 0) return true;
    if (v.otherText && v.otherText.trim().length > 0) return true;
    return false;
  }).length;
}
