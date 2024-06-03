import { Bounds, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useMemo, useState } from "react";
import { MathUtils, Vector3 } from "three";

import { isDesktop, isMobile } from "react-device-detect";

export function Camera() {
  const [isVertical, setIsVertical] = useState(
    window.innerHeight > window.innerWidth
  );

  useEffect(() => {
    const onResize = () =>
      setIsVertical(window.innerHeight > window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const initialPosition: any = isVertical ? [1, 2, 2.86] : [0, 2, 2.2];
  const target = useMemo(() => new Vector3(), []);

  useFrame(({ camera, pointer }) => {
    if (isDesktop) {
      target.set(
        initialPosition[0] + Math.sin(pointer.x * 0.2),
        initialPosition[1] + Math.sin(pointer.y * 0.1),
        initialPosition[2] + Math.cos(pointer.x * 0.2)
      );
      easing.damp3(camera.position, target, 0.2);
    }

    camera.lookAt(0.037, 0, 0.23);
  });

  return (
    <>
      <PerspectiveCamera position={initialPosition} makeDefault fov={50} />
      <Bounds fit observe margin={isVertical ? 0.5 : 0.6}>
        <mesh rotation-y={Math.PI / 4}>
          <boxGeometry args={[3, 1, 4]} />
          <meshBasicMaterial color="red" visible={false} />
        </mesh>
      </Bounds>

      {isMobile && (
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          dampingFactor={0.001}
          maxPolarAngle={MathUtils.degToRad(60)}
          minPolarAngle={MathUtils.degToRad(50)}
          maxAzimuthAngle={MathUtils.degToRad(10)}
          minAzimuthAngle={MathUtils.degToRad(-10)}
        />
      )}
    </>
  );
}
