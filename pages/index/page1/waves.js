import * as THREE from "https://cdn.skypack.dev/three";
import { loadShadersCSM } from "/lib/glNoise/build/glNoise.m.js";
import { CustomShaderMaterial, TYPES } from "/lib/three-csm.module.js";

export default function waves(scene) {
  let material;
  const v = {
    defines: "/pages/index/shaders/defines.glsl",
    header: "/pages/index/shaders/header.glsl",
    main: "/pages/index/shaders/main.glsl",
  };
  const f = {
    defines: "",
    header: "/pages/index/shaders/fheader.glsl",
    main: "/pages/index/shaders/fmain.glsl",
  };
  loadShadersCSM(v).then((vertex) => {
    loadShadersCSM(f).then((fragment) => {
      material = new CustomShaderMaterial({
        baseMaterial: TYPES.PHONG,
        vShader: {
          defines: vertex.defines,
          header: vertex.header,
          main: vertex.main,
        },
        fShader: {
          defines: fragment.defines,
          header: fragment.header,
          main: fragment.main,
        },
        uniforms: {
          uTime: { value: 0 },
          isSub: { value: false },
        },
        passthrough: {
          side: THREE.DoubleSide,
          flatShading: true,
          color: 0x68c3c0,
          shininess: 1,
        },
      });

      const geometry = new THREE.BoxGeometry(5, 5, 10, 32, 32, 1);
      const plane = new THREE.Mesh(geometry, material);
      plane.rotateX(-Math.PI / 2);
      plane.position.y = -5;
      plane.receiveShadow = true;
      scene.add(plane);
    });
  });

  function displace(dt) {
    if (material && material.uniforms) {
      material.uniforms.uTime.value = dt;
    }
  }

  return displace;
}
