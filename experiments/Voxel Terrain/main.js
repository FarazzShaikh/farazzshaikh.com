import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js";
import { OutlineEffect } from "https://cdn.skypack.dev/three/examples/jsm/effects/OutlineEffect.js";

const { FBM } = THREE_Noise;

const size = {
  w: 50,
  h: 50,
  l: 5,
};

let mesh;
const dummy = new THREE.Object3D();
const count = size.w * size.h * size.l;

const fbm = new FBM({
  seed: Math.random(),
  scale: 0.06,
  octaves: 6,
  persistance: 0.5,
  lacunarity: 2,
  redistribution: 1,
  height: 0,
});

function genCubes(scene) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshToonMaterial();
  mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
  scene.add(mesh);

  let i = 0;
  for (let x = 0; x < size.w; x++) {
    for (let y = 0; y < size.h; y++) {
      dummy.position.x = x - size.w / 2;
      dummy.position.z = y - size.h / 2;

      const pos = new THREE.Vector2(x, y);
      let n = fbm.get2(pos);
      n = n * 0.5 + 0.5;

      const color = new THREE.Color();
      for (let z = 0; z < size.l; z++) {
        dummy.position.y = n * 15 - z;

        const c = n;
        color.setRGB(c, c, c);

        switch (z) {
          case 0:
            if (n < 0.35) {
              color.setHex(0x046582);
              dummy.position.y = 0.4 * 15 - z;
            } else if (n < 0.4) {
              color.setHex(0xa7d0cd);
              dummy.position.y = 0.4 * 15 - z;
            } else if (n < 0.45) {
              color.setHex(0xffd3b4);
            } else if (n < 0.6) {
              if (1 < 0) color.setHex(0x8db596);
              else color.setHex(0xbedbbb);
            } else if (n < 0.8) {
              color.setHex(0xaaaaaa);
            }
            break;

          case 1:
            color.setHex(0x92817a);
            break;

          case 2:
            color.setHex(0xaa8976);
            break;

          default:
            color.setHex(0x555555);
            break;
        }

        dummy.position.y *= 1.5;

        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, color);

        i++;
      }
    }
  }

  mesh.instanceMatrix.needsUpdate = true;
}

setTimeout(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  document.body.appendChild(renderer.domElement);

  const effect = new OutlineEffect(renderer);

  const controls = new OrbitControls(camera, renderer.domElement);

  camera.position.set(45, 45, 45);

  const gridHelper = new THREE.GridHelper(60, 20);
  scene.add(gridHelper);

  const alight = new THREE.AmbientLight(0x404040);
  scene.add(alight);

  const light = new THREE.DirectionalLight(0xffffff, 0.7);
  light.position.set(30, 20, 10);
  scene.add(light);

  genCubes(scene);

  let ID;
  const animate = function (dt) {
    console.log("A");
    effect.render(scene, camera);

    controls.update();
    ID = requestAnimationFrame(animate);
  };

  animate();

  const html = document.querySelector("html");
  let playing = html.getAttribute("playing") || "false";

  if (playing === "false") {
    cancelAnimationFrame(ID);
  } else {
    requestAnimationFrame(animate);
  }

  const observer = new MutationObserver(function (mutations) {
    playing = html.getAttribute("playing") || "false";

    if (playing === "false") {
      cancelAnimationFrame(ID);
    } else {
      requestAnimationFrame(animate);
    }
  });

  observer.observe(html, {
    attributes: true, //configure it to listen to attribute changes
  });
}, 1000);
