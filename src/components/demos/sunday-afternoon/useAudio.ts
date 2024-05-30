import { useLoader } from "@/context/LoaderContext";
import { useCallback } from "react";
import { ASSETS } from "./assets";

export function useAudio() {
  const loader = useLoader((s) => s.loader);
  const bgMusic = loader.loadAudio(ASSETS.WODDDEN_FLOOR.AUDIO.BG);

  return {
    playAudio: useCallback(() => {
      bgMusic.loop(true);
      bgMusic.play();
    }, []),
    stopAudio: useCallback(() => {
      bgMusic.stop();
    }, []),
  };
}
