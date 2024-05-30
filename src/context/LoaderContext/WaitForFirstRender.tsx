import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import { useLoader } from ".";

interface WaitForFirstRenderProps {
  preloadTextures?: string[];
  preloadGLTF?: string[];
  preloadAudio?: string[];
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export function WaitForFirstRender({
  children,
  preloadAudio,
  preloadGLTF,
  preloadTextures,
  setLoaded,
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
      } catch (error) {
        console.error(error);
      }

      advance(Date.now());
    })();
  }, []);

  useFrame(() => {
    if (isFirstRender.current) {
      setLoaded(true);
      isFirstRender.current = false;
    }
  });

  return <>{children}</>;
}
