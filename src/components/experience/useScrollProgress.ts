import { create } from "zustand";

type ScrollState = {
  progress: number;
  setProgress: (v: number) => void;
};

export const useScrollProgress = create<ScrollState>((set) => ({
  progress: 0,
  setProgress: (v) => set({ progress: v }),
}));