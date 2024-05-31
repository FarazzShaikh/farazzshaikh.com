import { useAudioAsset } from "@/context/LoaderContext/useAsset";
import { useCallback } from "react";
import { ASSETS } from "./assets";

export function useAudio() {
  const bgMusic = useAudioAsset(ASSETS.WODDDEN_FLOOR.AUDIO.BG);

  return {
    playAudio: useCallback(() => {
      if (bgMusic) {
        bgMusic.loop(true);
        bgMusic.play();
      }
    }, [bgMusic]),
    stopAudio: useCallback(() => {
      if (bgMusic) {
        bgMusic.stop();
      }
    }, [bgMusic]),
  };
}
