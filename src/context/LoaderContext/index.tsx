import { createContext, useContext, useEffect, useRef } from "react";
import { useStore } from "zustand";
import { LoadingState, createLoadingStore } from "./store";

type LoadingStore = ReturnType<typeof createLoadingStore>;
const loadingContext = createContext<LoadingStore | null>(null);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const loadingStore = useRef(createLoadingStore()).current;

  useEffect(() => {
    (async () => {
      const loader = loadingStore.getState().loader;

      loader.onProgress = (_, itemsLoaded, itemsTotal) => {
        const loadingProgress = itemsLoaded / itemsTotal;
        loadingStore.setState({ progress: loadingProgress });
      };
    })();
  }, []);

  return (
    <loadingContext.Provider value={loadingStore}>
      {children}
    </loadingContext.Provider>
  );
}

export function useLoader<T = unknown>(
  selector: (store: LoadingState) => T
): T {
  const store = useContext(loadingContext);
  if (!store) throw new Error("useLoader must be used within a LoaderProvider");
  return useStore(store, selector);
}
