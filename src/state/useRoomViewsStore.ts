import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RoomWaypoint {
  id: string;
  label: string;
  position: [number, number, number];
}

interface RoomViewsStore {
  waypointsByFile: Record<string, RoomWaypoint[]>;
  addWaypoint: (fileName: string, waypoint: RoomWaypoint) => void;
  removeWaypoint: (fileName: string, id: string) => void;
}

// Same pattern as useMaterialOverridesStore.ts: keyed by uploaded file name,
// zero-backend, so a design's room-view presets are set up once and reused
// whenever that same file is uploaded again.
export const useRoomViewsStore = create<RoomViewsStore>()(
  persist(
    (set) => ({
      waypointsByFile: {},
      addWaypoint: (fileName, waypoint) =>
        set((s) => ({
          waypointsByFile: {
            ...s.waypointsByFile,
            [fileName]: [...(s.waypointsByFile[fileName] ?? []), waypoint],
          },
        })),
      removeWaypoint: (fileName, id) =>
        set((s) => ({
          waypointsByFile: {
            ...s.waypointsByFile,
            [fileName]: (s.waypointsByFile[fileName] ?? []).filter((w) => w.id !== id),
          },
        })),
    }),
    { name: "gfp-room-views" }
  )
);

export function getWaypointsForFile(waypointsByFile: Record<string, RoomWaypoint[]>, fileName: string): RoomWaypoint[] {
  return waypointsByFile[fileName] ?? [];
}
