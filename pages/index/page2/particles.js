import * as THREE from "https://cdn.skypack.dev/three";

function map(x, in_min, in_max, out_min, out_max) {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

function rand(min, max) {
  return map(Math.random(), 0, 1, min, max);
}

export default function particles(scene) {
  const nparticles = 40;
  const dummy = new THREE.Object3D();

  const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1, 1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0x7dfff4 });
  const particleSystem = new THREE.InstancedMesh(geometry, material, nparticles);
  particleSystem.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(particleSystem);

  for (let i = 0; i < nparticles; i++) {
    dummy.position.x = rand(0, 1) - 0.5;
    dummy.position.z = (i / nparticles) * 5;
    dummy.position.y = 1.5;

    const scale = rand(1, 2);
    dummy.scale.set(scale, scale, scale);
    dummy.rotation.set(scale, scale, scale);

    const color = new THREE.Color(1, 1, 1);

    dummy.updateMatrix();
    particleSystem.setMatrixAt(i, dummy.matrix);
    particleSystem.setColorAt(i, color);
  }

  particleSystem.instanceMatrix.needsUpdate = true;

  function animate(plane) {
    for (let i = 0; i < particleSystem.count; i++) {
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3();
      const scale = new THREE.Vector3();
      particleSystem.getMatrixAt(i, matrix);

      position.setFromMatrixPosition(matrix);
      scale.setFromMatrixScale(matrix);

      position.z -= 0.05;
      scale.x = 1 - Math.pow(position.z / 5.5, 2) + 1;
      scale.y = 1 - Math.pow(position.z / 5.5, 2) + 1;
      scale.z = 1 - Math.pow(position.z / 5.5, 2) + 1;

      //   console.log(scale);

      if (position.z < -5.5) {
        if (plane.position.y < 1.5) {
          position.x = plane.position.x + rand(0, 0.8) - 0.4;
          position.z = plane.position.z - 1;
          position.y = plane.position.y + 1.5;

          const s = rand(1, 2);
          scale.x = s;
          scale.y = s;
          scale.z = s;
        } else {
          position.y = 10000;

          const s = rand(1, 2);
          scale.x = s;
          scale.y = s;
          scale.z = s;
        }
      }

      dummy.position.x = position.x;
      dummy.position.y = position.y;
      dummy.position.z = position.z;
      dummy.scale.x = scale.x;
      dummy.scale.y = scale.y;
      dummy.scale.z = scale.z;
      dummy.updateMatrix();
      particleSystem.setMatrixAt(i, dummy.matrix);
    }
    particleSystem.instanceMatrix.needsUpdate = true;
  }

  return animate;
}
