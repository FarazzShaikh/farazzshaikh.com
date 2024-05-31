import { create } from "zustand";
import { Loader } from "./Loader";

export interface LoadingState {
  loadedAssets: boolean;
  loaded: boolean;
  loader: Loader;
}

export const useLoader = create<LoadingState>(() => ({
  loadedAssets: false,
  loaded: false,
  loader: new Loader(),
}));
