import { create } from "zustand";

interface LayoutStore {
  showLogo: boolean;
  setShowLogo: (show: boolean) => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  showLogo: true,
  setShowLogo: (show) => set({ showLogo: show }),
}));
