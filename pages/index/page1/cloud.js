import * as THREE from "https://cdn.skypack.dev/three";

function rand(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function map(x, in_min, in_max, out_min, out_max) {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

/**
 *
 * @param {THREE.Scene} scene
 */
export default function cloud(scene, position, scale) {
  const minTuff = 3;
  const maxTuff = 7;

  const nTuff = Math.floor(rand(minTuff, maxTuff));

  const nCloud = 20;
  const clouds = [];

  const dummy = new THREE.Object3D();
  const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0xd8d0d1, transparent: true });
  for (let j = 0; j < nCloud; j++) {
    const cloud = new THREE.InstancedMesh(geometry, material.clone(), nTuff);
    cloud.position.set(rand(-2, 2), rand(1.5, 1.7), rand(5, -5));
    cloud.scale.set(0.15, 0.15, 0.15);

    for (let i = 0; i < nTuff; i++) {
      const scale = rand(0.5, 1);
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(scale, scale, scale);

      dummy.position.x = rand(-1, 1);
      dummy.position.y = rand(-1, 1);
      dummy.position.z = rand(-1, 1);

      dummy.castShadow = true;

      dummy.updateMatrix();
      cloud.setMatrixAt(i, dummy.matrix);
    }

    cloud.castShadow = true;

    if (position) cloud.position.set(position);
    if (scale) cloud.scale.set(position);

    scene.add(cloud);
    clouds.push(cloud);
  }

  function animate(dt) {
    clouds.forEach((c) => {
      c.position.z += 0.02;
      c.material.opacity = 1 - Math.pow(Math.abs(c.position.z / 5.5) * 2, 2);

      if (c.material.opacity == 0) c.visible = false;
      else c.visible = true;

      if (c.position.z > 5.5) {
        c.position.set(rand(-2, 2), rand(1.2, 1.5), -5.5);
      }
    });
  }
  return animate;
}
