import { useLoader } from "@/context/LoaderContext";
import { ShadowAlpha } from "@react-three/drei";
import { ASSETS } from "../assets";

export function Plant() {
  const loader = useLoader((s) => s.loader);
  const map = loader.loadTexture(ASSETS.WODDDEN_FLOOR.TEXTURES.PLANT);

  return (
    <mesh castShadow position={[0, 0.3, 0]} scale={0.7}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial opacity={0.0001} transparent />
      <ShadowAlpha alphaMap={map} opacity={1} />
    </mesh>
  );
}
