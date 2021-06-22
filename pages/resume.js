import { createLangTags } from "/pages/utils.js";

(async () => {
  const data = await (await fetch("/data/resume.json")).json();
  const colors = await (await fetch("/colors.json")).json();

  const expContainer = document.querySelector(".exp-container");
  const projectsContainer = document.querySelector(".projects-container");
  const expTemplate = document.querySelector("#exp-template");
  const projectsTemplate = document.querySelector("#projects-template");

  data.exp.forEach((e) => {
    const content = expTemplate.cloneNode(true).content;

    const title = content.querySelector(".title");
    title.textContent = e.title;

    const date = content.querySelector(".tag.date");
    date.textContent = `${e.start}${e.end ? ` - ${e.end}` : ""}`;

    const disc = content.querySelector(".disc");
    disc.textContent = e.disc;

    expContainer.appendChild(document.importNode(content, true));
  });

  data.projects.forEach((e) => {
    const content = projectsTemplate.cloneNode(true).content;

    const title = content.querySelector(".title");
    title.textContent = e.title;

    const date = content.querySelector(".tag.date");
    date.textContent = `${e.start}${e.end ? ` - ${e.end}` : ""}`;

    const disc = content.querySelector(".disc");
    disc.textContent = e.disc;

    const link = content.querySelector(".tag.link");
    if (e.link) {
      const a = link.querySelector("a");
      a.textContent = e.link.text;
      a.setAttribute("href", e.link.href);
    } else {
      link.style.display = "none";
    }

    const repo = content.querySelector(".tag.repo");
    if (e.repo) {
      const a = repo.querySelector("a");
      a.textContent = "GitHub";
      a.setAttribute("href", e.repo);
    } else {
      repo.style.display = "none";
    }

    projectsContainer.appendChild(document.importNode(content, true));
  });

  {
    const knownlangs = ["JavaScript", "TypeScript", "GLSL", "C", "C++", "HTML", "CSS", "SCSS", "Shell", "Python", "Java", "Assembly", "Liquid"];
    document.querySelector(".side-bar .langs").innerHTML = createLangTags(knownlangs, colors, true).join("\n") + "\n<br /><br />";
  }
  {
    const knownlangs = ["React", "React Native", "ThreeJS", "Regl", "Git", "GitHub Actions", "GitLab CI", "Jekyll"];
    document.querySelector(".side-bar .frameworks").innerHTML = createLangTags(knownlangs, colors, true, true).join("\n") + "\n<br /><br />";
  }

  document.querySelector(".download-container a").addEventListener("click", () => {
    window.print();
  });
})();
