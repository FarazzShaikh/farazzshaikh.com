import * as THREE from "https://cdn.skypack.dev/three";
import { Common } from "../../../lib/glNoise/build/glNoise.m.js";
import { CustomShaderMaterial, TYPES } from "../../../lib/three-csm.module.js";

export default function waves(scene, mobile) {
  let material;
  material = new CustomShaderMaterial({
    baseMaterial: TYPES.TOON,
    vShader: {
      defines: ` `,
      header: `
      varying vec3 vPosition;
      `,
      main: `
      vec3 newPos = position;
      vPosition = position;
      vec3 newNormal = normal;
      `,
    },
    fShader: {
      defines: ` `,
      header: `
      ${Common}
      varying vec3 vPosition;

      vec3 calcColor() {

      vec3 diffuseColor;

      float mask;
      mask = mix(0.0, 1.0, gln_map(vPosition.z, -5.0, 5.0, 0.0, 1.0));
      mask = pow(mask, 8.0);

      diffuseColor =vec3(0.941,0.894,0.843);

      diffuseColor *= mask ;

      return diffuseColor;
      }

      `,
      main: `
      vec4 newColor = vec4(calcColor(), 1.0);
      `,
    },
    uniforms: {},
    passthrough: {},
  });

  const geometry = new THREE.BoxGeometry(7, 7, 10, 1, 1, 1);
  const plane = new THREE.Mesh(geometry, material);
  plane.rotateX(-Math.PI / 2);
  plane.position.y = -10;
  plane.receiveShadow = true;

  if (!mobile) scene.add(plane);

  function displace(dt) {}

  return displace;
}
