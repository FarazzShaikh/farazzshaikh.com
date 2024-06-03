import { create } from "zustand";

interface AppState {
  isRecordingMode: boolean;
}

export const useApp = create<AppState>((set) => ({
  isRecordingMode: false,
}));
