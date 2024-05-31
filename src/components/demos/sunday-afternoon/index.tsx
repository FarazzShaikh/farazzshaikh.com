import { SoftShadows, Sparkles } from "@react-three/drei";
import {
  BrightnessContrast,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { MultiplyBlending } from "three";
import { Camera } from "./3d/Camera";
import { Floor } from "./3d/Floor";
import { Lights } from "./3d/Lights";

import { useEffect, useState } from "react";
import { Loader } from "./ui/Loader";
import { Overlay } from "./ui/Overlay";
import { useAudio } from "./useAudio";

import { PreloadedScene } from "@/components/PreloadedScene";
import { ASSETS } from "./assets";

function WoodenFloor3D() {
  return (
    <>
      <Camera />
      <Floor />

      <Lights />

      <SoftShadows size={300} />
      {/* <Crane /> */}
      <Sparkles
        count={25}
        scale={4}
        size={0.5}
        material-blending={MultiplyBlending}
        noise={10}
        speed={0.5}
      />

      <EffectComposer>
        <BrightnessContrast contrast={0.45} />
        <Vignette eskil={false} offset={0.001} darkness={0.85} />
      </EffectComposer>
    </>
  );
}

function WoodenFloorUI() {
  const [started, setStarted] = useState(false);

  const { playAudio, stopAudio } = useAudio();

  useEffect(() => {
    if (started) {
      playAudio();
    }

    return () => {
      stopAudio();
    };
  }, [started]);

  return (
    <>
      <Loader started={started} setStarted={setStarted} />
      <Overlay started={started} />
    </>
  );
}

export function SundayAfternoon() {
  return (
    <>
      <PreloadedScene
        ui={<WoodenFloorUI />}
        scene={<WoodenFloor3D />}
        canvasProps={{ shadows: true }}
        preloadTextures={[
          ASSETS.WODDDEN_FLOOR.TEXTURES.PLANT,
          ASSETS.WODDDEN_FLOOR.TEXTURES.FLOOR_ALBEDO,
          ASSETS.WODDDEN_FLOOR.TEXTURES.FLOOR_NORMAL,
          ASSETS.WODDDEN_FLOOR.TEXTURES.FLOOR_AO,
          ASSETS.WODDDEN_FLOOR.TEXTURES.FLOOR_ROUGHNESS,
          ASSETS.WODDDEN_FLOOR.TEXTURES.ENV,
        ]}
        preloadGLTF={[ASSETS.WODDDEN_FLOOR.MODELS.CAT]}
        preloadAudio={[ASSETS.WODDDEN_FLOOR.AUDIO.BG]}
      />
    </>
  );
}
