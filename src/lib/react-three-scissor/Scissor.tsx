import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo } from "react";
import { Object3D, PerspectiveCamera, Vector4 } from "three";
import ScissorTunnel from "./ScissorTunnel";
import useScissorEvents from "./useScissorEvents";

export default function Scissor() {
  const gl = useThree((s) => s.gl);

  const prevScissor = useMemo(() => new Vector4(), []);
  const prevViewport = useMemo(() => new Vector4(), []);

  useScissorEvents();
  useFrame((state) => {
    const { gl, camera: _camera } = state;
    const camera = _camera as PerspectiveCamera;

    gl.clear(true, true);
    gl.setScissorTest(true);

    const children = state.scene.children;
    children.forEach((child: Object3D) => {
      if (child.userData.__Scissor) {
        // console.log(child.userData.__Scissor);
        const element = child.userData.__Scissor as HTMLDivElement;
        const rect = element.getBoundingClientRect();
        const { left, right, top, bottom, width, height } = rect;

        const isOffscreen =
          bottom < 0 ||
          top > gl.domElement.clientHeight ||
          right < 0 ||
          left > gl.domElement.clientWidth;

        if (!isOffscreen) {
          gl.getScissor(prevScissor);
          gl.getViewport(prevViewport);

          const positiveYUpBottom = gl.domElement.clientHeight - bottom;
          gl.setScissor(left, positiveYUpBottom, width, height);
          gl.setViewport(left, positiveYUpBottom, width, height);

          const prevAspect = camera.aspect;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();

          gl.render(child, camera);

          gl.setScissor(...prevScissor.toArray());
          gl.setViewport(...prevViewport.toArray());
          camera.aspect = prevAspect;
          camera.updateProjectionMatrix();
        }
      }
    });

    gl.setScissorTest(false);
  });

  useLayoutEffect(() => {
    if (gl.domElement.parentElement) {
      gl.domElement.parentElement.style.position = "fixed";
      gl.domElement.parentElement.style.top = "0";
      gl.domElement.parentElement.style.left = "0";
      gl.domElement.parentElement.style.width = "100%";
      gl.domElement.parentElement.style.height = "100%";
    }
  }, [gl]);

  return <ScissorTunnel.Out />;
}
