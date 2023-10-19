import { createLangTags, getTimeSince, isDebug } from "/pages/utils.js";

function deviceType() {
  if (window.innerWidth <= 800) return "mobile";
  else if (window.innerWidth <= 1024) return "tablet";
  else return "desktop";
}

(async () => {
  let url, url2;

  if (!isDebug()) {
    url = "https://api.github.com/users/FarazzShaikh/repos?sort=created";
    url2 = "https://api.github.com/users/Farazzshaikh/events/public";
  } else {
    url = "/temp3.json";
    url2 = "/temp2.json";
  }

  let colors;
  let lastRepos;
  let data;
  try {
    colors = await (await fetch("/colors.json")).json();
    lastRepos = (await (await fetch(url)).json())[0];
    if (!lastRepos) throw "Rate Limit reached. Using local data.";
    data = await (await fetch(url2)).json();
    if (!data) throw "Rate Limit reached. Using local data.";
  } catch (error) {
    console.error(error);
    lastRepos = (await (await fetch("/temp3.json")).json())[0];
    data = await (await fetch("/temp2.json")).json();

    document.querySelector(".warning-tag-container").innerHTML = `
    <p class="tag warning" style="background-color: #cccc06;">GitHub API rate limit exceeded. Using cached data.</p>
    `;
  }

  const lastCommits = [];
  let prevMsg;

  let n;
  if (deviceType() === "mobile") {
    n = 2;
  } else {
    n = 4;
  }

  data.forEach((event) => {
    if (event.type !== "PushEvent") {
      return false;
    }

    // Ensure the commit is authored by me and I'm not just a "committer"
    event.payload.commits.reverse().forEach((commit) => {
      if (commit.author.email === "farazzshaikh@gmail.com" && lastCommits.length < n) {
        if (commit.message !== prevMsg && !commit.message.toLowerCase().includes("readme")) {
          lastCommits.push({ ...commit, createdAt: event.created_at, repo: event.repo });
          prevMsg = commit.message;
        }
      }
    });
  });

  const dom = {
    select: document.querySelector.bind(document),
    selectAll: document.querySelectorAll.bind(document),
  };

  let template = dom.select("#page-2 #latest-repos-template2");
  let container = dom.select("#page-2 .latest-container #latest-commit");

  let content = template.cloneNode(true).content;
  let title = content.querySelector(".latest-repos-title");

  title.href = `https://github.com/${lastRepos.owner.login}/${lastRepos.name}`;
  title.innerHTML = `
      ${lastRepos.name}
      `;

  let eTime = content.querySelector(".latest-repos-timeago");
  let date = new Date(lastRepos.created_at);
  eTime.textContent = getTimeSince(date);

  const langs = [lastRepos.language];
  content.querySelector(".langs").innerHTML = createLangTags(langs, colors).join("\n");

  content.querySelector(".latest-repos-description").textContent = lastRepos.description;
  container.appendChild(document.importNode(content, true));

  template = dom.select("#page-2 #latest-repos-template");
  container = dom.select("#page-2 .latest-container #latest-repos");

  lastCommits.forEach((c) => {
    let commit = c;

    content = template.cloneNode(true).content;
    title = content.querySelector(".latest-repos-title");

    title.href = `https://github.com/${commit.repo.name}`;
    title.innerHTML = `
      <div class="latest-repos-owner is-size-7">${commit.repo.name.split("/")[0]}/</div>${commit.repo.name.split("/")[1]}
      `;

    eTime = content.querySelector(".latest-repos-timeago");
    date = new Date(commit.createdAt);
    eTime.textContent = getTimeSince(date);

    content.querySelector(".latest-repos-description").textContent = commit.message;
    container.appendChild(document.importNode(content, true));
  });

  dom.select("#page-2 ").style.opacity = 1;

  if (deviceType() !== "mobile") {
    const b = document.querySelectorAll("#page-1 .button-title");
    b[0].textContent = "Blog";
    b[1].textContent = "LinkedIN";
    b[2].textContent = "GitHub";
  }

  {
    const knownlangs = ["JavaScript", "TypeScript", "GLSL", "C", "C++", "HTML", "CSS", "SCSS", "Shell", "Python", "Java", "Assembly", "Liquid"];
    document.querySelector("#page-3 .langs").innerHTML = createLangTags(knownlangs, colors, true).join("\n") + "\n<br /><br />";
  }
  {
    const knownlangs = ["React", "React Native", "ThreeJS", "Regl", "Git", "GitHub Actions", "GitLab CI", "Jekyll"];
    document.querySelector("#page-3 .frameworks").innerHTML = createLangTags(knownlangs, colors, true, true).join("\n") + "\n<br /><br />";
  }

  const buttons = document.querySelectorAll("footer .button");
  const tooltip = document.querySelector("#tooltip");

  const txt = ["Go to Paypal", "Click to ETH address", "Click to BTC address", "GitHub", "LinkedIn", "Blog", "Artwork", "Reddit", "farazzshaikh@gmail.com"];

  const addr = ["Thanks!", "0x1A12e003D805e39f73Dd1596eeAFDfde79Ce61D2", "17qLgjRrRQy6vy3WBzHdcnApCYQ98gVQZh"];

  let popperInstance = [];
  buttons.forEach((button, i) => {
    popperInstance.push(
      Popper.createPopper(button, tooltip, {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      })
    );

    const showEvents = ["mouseenter", "focus"];
    const hideEvents = ["mouseleave", "blur"];

    button.addEventListener("mousedown", () => {
      navigator.clipboard.writeText(addr[i]);
      show(i, "Thank You!");
    });

    showEvents.forEach((event) => {
      button.addEventListener(event, () => {
        show(i);
      });
    });

    hideEvents.forEach((event) => {
      button.addEventListener(event, () => {
        hide(i);
      });
    });
  });

  function show(ind, t) {
    tooltip.setAttribute("data-show", "");
    tooltip.textContent = t || txt[ind];

    // We need to tell Popper to update the tooltip position
    // after we show the tooltip, otherwise it will be incorrect
    popperInstance[ind].update();
  }

  function hide(ind) {
    tooltip.removeAttribute("data-show");
  }
})();
