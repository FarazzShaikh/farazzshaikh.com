import { useLoader } from "@/context/LoaderContext";
import { useAnimations } from "@react-three/drei";
import { useEffect } from "react";
import { LoopOnce, MathUtils } from "three";
import { ASSETS } from "../assets";

export function Cat() {
  const loader = useLoader((s) => s.loader);
  const { scene, animations } = loader.loadGltf(
    ASSETS.WODDDEN_FLOOR.MODELS.CAT
  );
  const { actions, mixer } = useAnimations(animations, scene);

  useEffect(() => {
    let animationsIndex = 0;
    let animations = [
      actions["Arm_Cat|Sit_loop_1"],
      actions["Arm_Cat|Sit_loop_2"],
      actions["Arm_Cat|Sit_loop_1"],
      actions["Arm_Cat|Sit_loop_3"],
    ];

    const animation = animations[animationsIndex];
    let previousAnimation: any = animation;

    if (animation) {
      const onEnd = () => {
        animationsIndex = (animationsIndex + 1) % animations.length;
        const nextAnimation = animations[animationsIndex];

        if (nextAnimation) {
          previousAnimation.stop();
          previousAnimation = nextAnimation;

          nextAnimation.setLoop(LoopOnce, 0);
          nextAnimation.clampWhenFinished = true;

          nextAnimation.reset();
          nextAnimation.play();
        }
      };

      mixer.addEventListener("finished", onEnd);

      animation.setLoop(LoopOnce, 0);
      animation.clampWhenFinished = true;
      animation.play();
    }

    scene.traverse((object) => {
      // @ts-ignore
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        // @ts-ignore
        object.material.transparent = true;
        // @ts-ignore
        object.material.opacity = 0.00001;
      }
    });
  }, []);

  return (
    <primitive
      position={[-0.1, -1.2, 0]}
      rotation={[0, MathUtils.degToRad(70), 0]}
      object={scene}
      scale={0.5}
    />
  );
}
