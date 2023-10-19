import * as THREE from "https://cdn.skypack.dev/three";
import { GLTFLoader } from "https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js";
import { Boid3D } from "./boid.js";

const origin = new THREE.Vector3(0, 0, 0);
const nBoids = 100;
const options = {
  /* accelerationVector: new THREE.Vector3(),
      velocityVector: new THREE.Vector3(), */
  maxForce: 0.02 / 7,
  maxSpeed: 0.3 / 7,
  seperationDist: 1.1 / 5,
  allignDist: 1,
  cohesionDist: 0.5,
  homeDist: 4,
  seperationWeight: 2,
  allignmentWeight: 0.5,
  cohesionWeight: 1.0,
  homeWeight: 3.1,
  home: new THREE.Vector3(0, 0, 0),
};

function map(x, in_min, in_max, out_min, out_max) {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

export default function fish(scene) {
  const loader = new GLTFLoader();
  let boidsGroup;
  loader.load(
    // resource URL
    "/Assets/fish/scene.gltf",
    // called when the resource is loaded
    function (gltf) {
      const o = gltf.scene;
      o.scale.set(0.01, 0.01, 0.01);
      o.rotateX(-Math.PI / 2);
      o.position.set(-8, 0, 0);

      boidsGroup = new THREE.Group();

      for (let i = 0; i < nBoids; i++) {
        const material = new THREE.MeshNormalMaterial();
        const geometry = new THREE.ConeGeometry(1, 3, 1);

        const boid = new Boid3D(geometry, material);

        const r = map(Math.random(), 0, 1, 0.06, 0.1);

        boid.scale.set(r, r, r);
        boid.add(o.clone());
        boid.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
        boidsGroup.add(boid);
      }

      scene.add(boidsGroup);
    }
  );

  function animate() {
    if (boidsGroup && boidsGroup.children[0]) {
      for (let i = 0; i < nBoids; i++) {
        boidsGroup.children[i].update(boidsGroup.children, options);

        if (boidsGroup.children[i].position.distanceTo(origin) <= options.homeDist - 1) {
          boidsGroup.children[i].visible = true;
        } else {
          boidsGroup.children[i].visible = false;
        }
      }
    }
  }

  return animate;
}
