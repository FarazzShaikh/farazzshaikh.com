import { useEffect } from "react";

export function useInitialLoader() {
  useEffect(() => {
    const staticLoader = document.querySelector(
      ".loader-container"
    ) as HTMLDivElement;
    if (staticLoader) {
      staticLoader.style.opacity = "0";
      setTimeout(() => {
        staticLoader.remove();
      }, 200);
    }
  }, []);
}
