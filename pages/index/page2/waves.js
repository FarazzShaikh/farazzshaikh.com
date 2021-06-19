import * as THREE from "https://cdn.skypack.dev/three";
import { loadShadersCSM } from "/lib/glNoise/build/glNoise.m.js";
import { CustomShaderMaterial, TYPES } from "/lib/three-csm.module.js";

function hex(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

var hex2rgb = (str) => {
  return hex(str).map((x) => x / 255);
};

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
          isSub: { value: true },
        },
        passthrough: {
          side: THREE.DoubleSide,
          flatShading: true,
          color: 0x68c3c0,
          shininess: 1,
        },
      });

      const d = 4.8;

      const geometry = new THREE.BoxGeometry(5, 5, 5, 32, 32, 1);
      const plane = new THREE.Mesh(geometry, material);
      plane.rotateX(-Math.PI / 2);
      plane.position.y = -d;
      plane.receiveShadow = true;
      scene.add(plane);

      const plane2 = plane.clone();
      plane2.position.y = d;
      plane2.rotateY(-Math.PI);
      scene.add(plane2);

      const material2 = new THREE.MeshPhongMaterial({
        transparent: true,
        opacity: 0.4,
        color: 0x00509c,
      });
      const plane3 = new THREE.Mesh(geometry, material2);
      plane3.scale.set(0.9, 1, 0.9);
      scene.add(plane3);
    });
  });

  function displace(dt) {
    if (material && material.uniforms) {
      material.uniforms.uTime.value = dt;
    }
  }

  return displace;
}
