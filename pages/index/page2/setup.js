import * as THREE from "https://cdn.skypack.dev/three";
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js";

let renderer, scene, camera, controls;

function deviceType() {
  if (window.innerWidth <= 1024) return "mobile";
  else return "desktop";
}

/**
 *
 * @returns {THREE.Scene}
 */
export function initScene() {
  // Creating a scene
  scene = new THREE.Scene();

  const canvas = document.querySelector(".ThreeD-Container.sub canvas");

  // Defining options
  const fov = 45;
  const aspectRatio = canvas.clientWidth / canvas.clientHeight;
  const nearPlane = 0.1;
  const farPlane = 1000;

  // Creating a camera
  camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);

  if (deviceType() === "mobile") {
    console.log("A");
    const s = 15;
    camera.position.set(s + 1, 0, s + 1);
    camera.lookAt(0, 0, 0);
  } else {
    const s = 10;
    camera.position.set(s + 1, 0, s + 1);
    camera.lookAt(0, 0, 0);
  }

  // Creating a Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  //   controls = new OrbitControls(camera, renderer.domElement);
  //   controls.enableDamping = true;
  //   controls.dampingFactor = 0.25;

  return scene;
}

export function initHelpers() {
  const size = 10;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
}

let ID;

/**
 *
 * @param {number} dt
 * @param {Function} callback
 */
export function render(dt, callback) {
  renderer.render(scene, camera);
  ID = requestAnimationFrame((dt) => render(dt, callback));

  //   console.log(renderer.info.render.calls);
  //   renderer.info.reset();

  //   controls.update();
  callback(dt, ID);
}
