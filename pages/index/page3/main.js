import * as THREE from "https://cdn.skypack.dev/three";
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js";

import { CustomShaderMaterial, TYPES } from "/lib/three-csm.module.js";
import { loadShadersCSM, Common, Simplex } from "/lib/glNoise/build/glNoise.m.js";

import waves from "./waves.js";

function lights(scene) {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5, 100);
  const light = new THREE.HemisphereLight(0xffffff, 0xf7d9aa, 0.5);

  scene.add(light);
  scene.add(directionalLight);

  directionalLight.position.set(0, 1, 0); //default; light shining from top
  directionalLight.castShadow = true;

  directionalLight.shadow.mapSize.width = 512; // default
  directionalLight.shadow.mapSize.height = 512; // default
  directionalLight.shadow.camera.near = 0.5; // default
  directionalLight.shadow.camera.far = 500;
}

function deviceType() {
  if (window.innerWidth <= 1024) return "mobile";
  else return "desktop";
}

function map(x, in_min, in_max, out_min, out_max) {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

function rand(min, max) {
  return map(Math.random(), 0, 1, min, max);
}

const v = {
  defines: "pages/index/page3/shaders/particle_defines.glsl",
  header: "pages/index/page3/shaders/particle_header.glsl",
  main: "pages/index/page3/shaders/particle_main.glsl",
};

loadShadersCSM(v, [Common, Simplex]).then(({ defines, header, main }) => {
  const canvas = document.querySelector(".ThreeD-Container.particle canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  const fov = 60;
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const near = 0.1;
  const far = 200;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  let s2;
  if (deviceType() === "mobile") {
    s2 = 7;
    camera.position.set(s2, s2, s2);
    camera.lookAt(0, 0, 0);
    camera.position.y += 1;
  } else {
    s2 = 9;
    camera.position.set(s2, s2, s2);
    camera.lookAt(0, 0, 0);
    camera.position.y -= 3;
  }

  const scene = new THREE.Scene();

  //   const controls = new OrbitControls(camera, renderer.domElement);
  //   controls.target.y -= 3;

  const numSpheres = 9000;

  const s = new THREE.SphereBufferGeometry(0.3, 2, 2);
  const geometry = new THREE.InstancedBufferGeometry().copy(s);

  const center = new Array(numSpheres * 3).fill(0).map(() => rand(-2, 2));
  geometry.setAttribute("center", new THREE.InstancedBufferAttribute(new Float32Array(center), 3));

  const color = new Array(numSpheres * 4).fill(0).map((a, i) => 1);
  geometry.setAttribute("color", new THREE.InstancedBufferAttribute(new Float32Array(color), 4));

  const material = new CustomShaderMaterial({
    baseMaterial: TYPES.TOON,
    vShader: {
      defines: ` `,
      header: header,
      main: main,
    },
    fShader: {
      defines: ` `,
      header: `
      varying vec3 vnoise;
      uniform float isDark;
      uniform bool isDarkMode;
      vec3 rgb2hsv(vec3 c)
      {
          vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
          vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
          vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
      
          float d = q.x - min(q.w, q.y);
          float e = 1.0e-10;
          return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
      }
  
      vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
      `,
      main: `
    //   vec4 newColor = vec4(mix(vec3(0.988,0.82,0.82), vec3(0.69,0.965,1.), vnoise.g + vnoise.r + vnoise.b), 1.0);

    vec3 hsv = rgb2hsv(vnoise);
    if(isDarkMode) hsv.b *= isDark + 0.2;
    vec3 reg = hsv2rgb(hsv);

    vec4 newColor = vec4(reg, 1.0);
    newColor.a *= isDark;
        `,
    },
    uniforms: {
      uTime: { value: 0 },
      targetPos: { value: new THREE.Vector2(0) },
      isDark: { value: 1.0 },
      isDarkMode: { value: !!window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches },
    },
    passthrough: {
      blending: THREE.NormalBlending,
      depthTest: true,
      shading: THREE.FlatShading,
    },
  });

  const points = new THREE.InstancedMesh(geometry, material, numSpheres);

  points.customDepthMaterial = new CustomShaderMaterial({
    baseMaterial: TYPES.DEPTH,
    vShader: {
      defines: `#define DEPTH_PACKING 3201`,
      header: header,
      main: main,
    },
    uniforms: {
      uTime: { value: 0 },
      targetPos: { value: new THREE.Vector2(0) },
    },
    passthrough: {
      blending: THREE.NormalBlending,
      depthTest: true,
      depthPacking: THREE.RGBADepthPacking,
    },
  });

  points.castShadow = true;
  scene.add(points);

  const size = 10;
  const divisions = 10;
  const gridHelper = new THREE.GridHelper(size, divisions);
  //   scene.add(gridHelper);

  const axesHelper = new THREE.AxesHelper(5);
  //   scene.add(axesHelper);

  const targetPos = new THREE.Vector2(0, 1);

  const ele = canvas;
  function onMove(e) {
    let target = e.target;
    let _x = e.clientX;
    let _y = e.clientY;
    if (e.type === "deviceorientation") {
      _x = e.beta;
      _y = e.gamma;
      target = ele;
    }

    const rect = target.getBoundingClientRect();
    const x = _x - rect.left - rect.width / 2;
    const y = _y - rect.top - rect.height / 2;

    let final_x = map(x, -rect.width / 2, rect.width / 2, -2, 2);
    let final_y = map(y, rect.height / 2, -rect.height / 2, 1.2, 3);

    if (e.type === "deviceorientation") {
      final_x = map(_x, 0, 360, -2, 2);
      final_y = map(_y, 0, 360, 0.7, 3);
    }

    targetPos.x = -final_x;
    targetPos.y = final_y;
  }

  document.getScroll = function () {
    if (window.pageYOffset != undefined) {
      return new THREE.Vector2(pageXOffset, pageYOffset);
    } else {
      var sx,
        sy,
        d = document,
        r = d.documentElement,
        b = d.body;
      sx = r.scrollLeft || b.scrollLeft || 0;
      sy = r.scrollTop || b.scrollTop || 0;
      return new THREE.Vector2(sx, sy);
    }
  };

  window.addEventListener("scroll", () => {
    const scroll = document.getScroll();
    targetPos.y = scroll.y / 100;

    let y = scroll.y / window.innerHeight;

    if (y >= 1 && y <= 2 && deviceType() !== "desktop") {
      y = Math.abs(map(y, 1, 2, -1, 1));

      if (material && material.uniforms) {
        material.uniforms.isDark.value = 1 - y;
      }
    }
  });

  ele.addEventListener("mousemove", onMove);

  lights(scene);

  waves(scene, deviceType() === "mobile");

  let ID;
  const render = (time) => {
    ID = requestAnimationFrame(render);
    renderer.render(scene, camera);

    if (material && material.uniforms) {
      material.uniforms.uTime.value = time * 0.01;
      //   material.uniforms.targetPos.value = targetPos;
      const p = new THREE.Vector2(targetPos.x, targetPos.y).sub(material.uniforms.targetPos.value).multiplyScalar(0.05);
      material.uniforms.targetPos.value.add(p);
    }

    if (points.customDepthMaterial && points.customDepthMaterial.uniforms) {
      points.customDepthMaterial.uniforms.uTime.value = time * 0.01;
      points.customDepthMaterial.uniforms.targetPos.value = targetPos;
    }

    // console.log(renderer.info.render.calls);
    // renderer.info.reset();

    // controls.update();
  };

  let options = {
    root: null,
    rootMargin: "-5px",
    threshold: 0,
  };

  const observer = new IntersectionObserver(([{ isIntersecting }]) => {
    if (!isIntersecting) {
      cancelAnimationFrame(ID);
    } else {
      render(0);
    }
  }, options);
  const c = document.querySelector(".ThreeD-Container.particle canvas");
  observer.observe(c);
});
