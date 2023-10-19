import { initScene, render, initHelpers } from "./setup.js";
import lights from "../lights.js";

import waves from "./waves.js";
import cloud from "./cloud.js";
import plane from "./plane.js";
import { fps } from "../fps.js";

const scene = initScene(1);

//   initHelpers();

lights(scene);

const animate_cloud = cloud(scene);
const displace = waves(scene);
const animate = plane(scene);

let ID;
const callback = (dt, _ID) => {
  displace(dt * 0.00015);
  animate(dt * 0.0005);
  animate_cloud(dt * 0.00005);
  ID = _ID;

  fps.tick();
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
    render(0, callback);
  }
}, options);
const c = document.querySelector(".ThreeD-Container.plane canvas");
observer.observe(c);
