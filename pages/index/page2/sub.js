import { GLTFLoader } from "https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js";
import particles from "./particles.js";

export default function sub(scene) {
  const loader = new GLTFLoader();
  let sub, particles_anim;
  loader.load(
    // resource URL
    "pages/index/Assets/sub/scene.gltf",
    // called when the resource is loaded
    function (gltf) {
      const o = gltf.scene;
      o.scale.set(0.5, 0.5, 0.5);
      o.position.set(0, -0.5, 0);
      sub = o;

      particles_anim = particles(o);

      scene.add(o);
    }
  );

  function animate(dt) {
    if (sub && particles_anim) {
      const p = Math.sin(dt * 0.001) * 0.3 - 0.5;
      const r = Math.cos(dt * 0.001) * 0.2 - 0.5;

      sub.rotation.x = -r - 0.5;
      sub.position.y = p;

      particles_anim(sub);
    }
  }

  return animate;
}
