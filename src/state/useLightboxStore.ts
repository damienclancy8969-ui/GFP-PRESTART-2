import { create } from "zustand";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxStore {
  image: LightboxImage | null;
  open: (image: LightboxImage) => void;
  close: () => void;
}

export const useLightboxStore = create<LightboxStore>((set) => ({
  image: null,
  open: (image) => set({ image }),
  close: () => set({ image: null }),
}));
