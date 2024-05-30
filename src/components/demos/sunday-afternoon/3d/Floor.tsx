import { useLoader } from "@/context/LoaderContext";
import { useEffect } from "react";
import { RepeatWrapping, Texture } from "three";
import { ASSETS } from "../assets";

export function Floor() {
  const loader = useLoader((s) => s.loader);
  const maps = {
    map: loader.loadTexture(ASSETS.WODDDEN_FLOOR.TEXTURES.FLOOR_ALBEDO),
    normalMap: loader.loadTexture(ASSETS.WODDDEN_FLOOR.TEXTURES.FLOOR_NORMAL),
    aoMap: loader.loadTexture(ASSETS.WODDDEN_FLOOR.TEXTURES.FLOOR_AO),
    roughnessMap: loader.loadTexture(
      ASSETS.WODDDEN_FLOOR.TEXTURES.FLOOR_ROUGHNESS
    ),
  };

  useEffect(() => {
    for (const map in maps) {
      // @ts-ignore
      const tex = maps[map] as Texture;

      tex.wrapS = tex.wrapT = RepeatWrapping;
      tex.repeat.set(120, 120);
      tex.offset.set(0.4, 0.4);
    }
  }, []);

  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial {...maps} />
    </mesh>
  );
}
