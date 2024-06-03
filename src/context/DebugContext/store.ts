import { create } from "zustand";

interface DebugState {
  isDebug: boolean;
}

export const useDebug = create<DebugState>((set) => ({
  isDebug: false,
}));
