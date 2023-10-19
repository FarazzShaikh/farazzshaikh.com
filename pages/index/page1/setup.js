import * as THREE from "https://cdn.skypack.dev/three";

let renderer, scene, camera;

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

  const canvas = document.querySelector(".ThreeD-Container.plane canvas");

  // Defining options
  const fov = 45;
  const aspectRatio = canvas.clientWidth / canvas.clientHeight;
  const nearPlane = 0.1;
  const farPlane = 1000;

  // Creating a camera
  camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);

  let s;
  if (deviceType() === "mobile") {
    s = 7;
    camera.position.set(s, s + 2, s);
    camera.lookAt(0, 0, 0);
    camera.position.y += 2;
  } else {
    s = 6.5;
    camera.position.set(s, s + 2, s);
    camera.lookAt(0, 0, 0);
  }

  // Creating a Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true, // 👈 Enable Antialiasing
    alpha: true,
    canvas: canvas,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  // Setting the Renderer's size to the entire window
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Append Renderer to the body
  //   document.body.appendChild(renderer.domElement);

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

  callback(dt, ID);
}

// window.addEventListener("resize", onWindowResize, false);

// function onWindowResize() {
//   const canvas = document.querySelector(".three canvas");
//   camera.aspect = canvas.clientWidth / canvas.clientHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(canvas.clientWidth, canvas.clientHeight);
// }
