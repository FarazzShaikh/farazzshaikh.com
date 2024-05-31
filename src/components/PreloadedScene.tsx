import { useLoader } from "@/context/LoaderContext/store";
import { Canvas, CanvasProps } from "@react-three/fiber";
import { useEffect } from "react";
import { WaitForFirstRender } from "../context/LoaderContext/WaitForFirstRender";

interface LoaderProviderProps {
  scene: React.ReactElement;
  ui: React.ReactElement;
  canvasProps: Omit<CanvasProps, "children">;

  preloadTextures?: string[];
  preloadGLTF?: string[];
  preloadAudio?: string[];
  fonts?: string[];
}

export function PreloadedScene({
  scene,
  ui,
  canvasProps,
  preloadTextures,
  preloadGLTF,
  preloadAudio,
}: LoaderProviderProps) {
  const loaded = useLoader((s) => s.loaded);
  const loadedAssets = useLoader((s) => s.loadedAssets);

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

  return (
    <>
      {ui}
      <Canvas
        {...canvasProps}
        frameloop={loaded ? "always" : "never"}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <WaitForFirstRender
          preloadTextures={preloadTextures}
          preloadGLTF={preloadGLTF}
          preloadAudio={preloadAudio}
        >
          {loadedAssets && scene}
        </WaitForFirstRender>
      </Canvas>
    </>
  );
}
