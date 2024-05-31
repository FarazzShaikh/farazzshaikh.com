import { useTextureAssets } from "@/context/LoaderContext/useAsset";
import { useEffect } from "react";
import { RepeatWrapping, Texture } from "three";
import { ASSETS } from "../assets";

export function Floor() {
  const maps = useTextureAssets({
    map: ASSETS.WODDDEN_FLOOR.TEXTURES.FLOOR_ALBEDO,
    normalMap: ASSETS.WODDDEN_FLOOR.TEXTURES.FLOOR_NORMAL,
    aoMap: ASSETS.WODDDEN_FLOOR.TEXTURES.FLOOR_AO,
    roughnessMap: ASSETS.WODDDEN_FLOOR.TEXTURES.FLOOR_ROUGHNESS,
  });

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
