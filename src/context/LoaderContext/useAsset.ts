import { Texture } from "three";
import { useLoader } from "./store";

export function useAudioAsset(src: string) {
  const loader = useLoader((s) => s.loader);
  return loader.loadAudio(src);
}

export function useTextureAsset(src: string) {
  const loader = useLoader((s) => s.loader);
  return loader.loadTexture(src);
}

export function useTextureAssets(src: { [key: string]: string }) {
  const loader = useLoader((s) => s.loader);

  if (typeof src === "object") {
    const results: { [key: string]: Texture } = {};
    for (const key in src) {
      results[key] = loader.loadTexture(src[key]);
    }
    return results;
  }
}

export function useGLTFAsset(src: string) {
  const loader = useLoader((s) => s.loader);
  return loader.loadGltf(src);
}
