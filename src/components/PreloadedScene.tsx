import { Canvas, CanvasProps } from "@react-three/fiber";
import { useState } from "react";
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
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {loaded && ui}
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
          setLoaded={setLoaded}
        >
          {loaded && scene}
        </WaitForFirstRender>
      </Canvas>
    </>
  );
}
