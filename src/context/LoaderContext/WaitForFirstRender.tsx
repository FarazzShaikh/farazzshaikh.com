import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import { useLoader } from "./store";

interface WaitForFirstRenderProps {
  preloadTextures?: string[];
  preloadGLTF?: string[];
  preloadAudio?: string[];
}

export function WaitForFirstRender({
  children,
  preloadAudio,
  preloadGLTF,
  preloadTextures,
}: React.PropsWithChildren<WaitForFirstRenderProps>) {
  const advance = useThree((s) => s.advance);
  const isFirstRender = React.useRef(true);

  const loader = useLoader((s) => s.loader);

  React.useEffect(() => {
    (async () => {
      try {
        await loader.preloadGLTF(preloadGLTF ?? []);
        await loader.preloadTextures(preloadTextures ?? []);
        await loader.preloadAudio(preloadAudio ?? []);
        useLoader.setState({ loadedAssets: true });
        advance(Date.now());
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  useFrame(() => {
    if (isFirstRender.current) {
      useLoader.setState({ loaded: true });
      isFirstRender.current = false;
    }
  });

  return <>{children}</>;
}
