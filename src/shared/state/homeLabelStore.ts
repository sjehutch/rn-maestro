import { create } from "zustand";

export type HomeLabelState = {
  label: string;
  setLabel: (nextLabel: string) => void;
  resetLabel: () => void;
};

const defaultHomeLabel = "Hello from Zustand + MVVM";

export const useHomeLabelStore = create<HomeLabelState>((set) => ({
  label: defaultHomeLabel,
  setLabel: (nextLabel) => {
    set({ label: nextLabel });
  },
  resetLabel: () => {
    set({ label: defaultHomeLabel });
  },
}));
