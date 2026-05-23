import { create } from "zustand";

type ActiveProjectState = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

export const useActiveProject = create<ActiveProjectState>((set) => ({
  activeId: null,
  setActiveId: (id) => set({ activeId: id }),
}));