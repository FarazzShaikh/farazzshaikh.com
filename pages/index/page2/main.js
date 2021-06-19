import lights from "../lights.js";
import { initScene, render, initHelpers } from "./setup.js";
import waves from "./waves.js";
import fish from "./fish.js";
import sub from "./sub.js";

const scene = initScene(2);

//   initHelpers();

lights(scene);
const w = waves(scene);
const f = fish(scene);
const s = sub(scene);

let ID;
const callback = (dt, _ID) => {
  w(dt * 0.0005);
  f(dt * 0.0005);
  s(dt);
  ID = _ID;
};
//   render(0, callback);

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
const c = document.querySelector(".ThreeD-Container.sub canvas");
observer.observe(c);
