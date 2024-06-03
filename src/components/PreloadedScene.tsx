import { useApp } from "@/context/AppContext/store";
import { Debug, DebugTunnel } from "@/context/DebugContext";
import { useDebug } from "@/context/DebugContext/store";
import { useLoader } from "@/context/LoaderContext/store";
import { Box } from "@chakra-ui/react";
import { Canvas, CanvasProps } from "@react-three/fiber";
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

  const isDebug = useDebug((s) => s.isDebug);
  const isRecordingMode = useApp((s) => s.isRecordingMode);

  return (
    <>
      <DebugTunnel.Out />

      <Box
        opacity={Number(!isDebug && !isRecordingMode)}
        transition="opacity 0.2s ease-in-out"
      >
        {ui}
      </Box>

      <Canvas
        {...canvasProps}
        frameloop={loaded ? "always" : "never"}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {isDebug && <Debug />}

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
