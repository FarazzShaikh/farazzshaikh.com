import waves from "./waves.js";

import { initScene, render, initHelpers } from "./setup.js";
import cloud from "./cloud.js";
import lights from "./lights.js";
import plane from "./plane.js";

setTimeout(() => {
  const scene = initScene();

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
  };
  render(0, callback);

  const html = document.querySelector("html");
  let playing = html.getAttribute("playing") || "false";

  if (playing === "false") {
    cancelAnimationFrame(ID);
  } else {
    requestAnimationFrame((dt) => render(dt, callback));
  }

  const observer = new MutationObserver(function (mutations) {
    playing = html.getAttribute("playing") || "false";

    if (playing === "false") {
      cancelAnimationFrame(ID);
    } else {
      requestAnimationFrame((dt) => render(dt, callback));
    }
  });

  observer.observe(html, {
    attributes: true, //configure it to listen to attribute changes
  });
}, 1000);
