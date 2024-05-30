import { createStore } from "zustand";
import { Loader } from "./Loader";

export interface LoadingState {
  progress: number;
  loader: Loader;
}

export const createLoadingStore = () =>
  createStore<LoadingState>(() => ({
    progress: 0,
    loader: new Loader(),
  }));
