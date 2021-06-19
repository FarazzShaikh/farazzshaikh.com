(async () => {
  //   const url = "https://api.github.com/users/Farazzshaikh/events/public";
  //   const url2 = "https://api.github.com/users/FarazzShaikh/repos?sort=pushed";
  const url2 = "/temp3.json";
  const url = "/temp2.json";
  const data = await (await fetch(url)).json();

  const lastCommits = [];
  const lastPush = [];
  let prevMsg;

  function deviceType() {
    if (window.innerWidth <= 800) return "mobile";
    else if (window.innerWidth <= 1024) return "tablet";
    else return "desktop";
  }

  console.log(deviceType());

  let n;
  if (deviceType() === "mobile") {
    n = 2;
  } else {
    n = 4;
  }

  const latestPushEvent = data.forEach((event) => {
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

  function getTimeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  function brightnessByColor(color) {
    var color = "" + color,
      isHEX = color.indexOf("#") == 0,
      isRGB = color.indexOf("rgb") == 0;
    if (isHEX) {
      const hasFullSpec = color.length == 7;
      var m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
      if (m)
        var r = parseInt(m[0] + (hasFullSpec ? "" : m[0]), 16),
          g = parseInt(m[1] + (hasFullSpec ? "" : m[1]), 16),
          b = parseInt(m[2] + (hasFullSpec ? "" : m[2]), 16);
    }
    if (isRGB) {
      var m = color.match(/(\d+){3}/g);
      if (m)
        var r = m[0],
          g = m[1],
          b = m[2];
    }
    if (typeof r != "undefined") return (r * 299 + g * 587 + b * 114) / 1000;
  }

  function createLangTags(langs, colors, large, rand) {
    return langs.map((l, i) => {
      if (rand) {
        l = Object.keys(colors)[Math.floor(Math.random() * 100) % Object.keys(colors).length];
      }

      const color = colors[l] ? colors[l].color : null;
      const textColor = brightnessByColor(color) < 150 && color ? "white" : "black";
      return `
                                    <div class="tag ${large ? "" : "is-small"}"
                                        style="
                                            background-color: ${color || "#cccccc"}; 
                                            color: ${textColor};
                                            ${large ? "margin: 5px 0px;" : ""}
                                        "
                                    >${rand ? langs[i] : l}</div>
                                    `;
    });
  }

  const colors = await (await fetch("/colors.json")).json();
  const dom = {
    select: document.querySelector.bind(document),
    selectAll: document.querySelectorAll.bind(document),
  };

  const lastRepos = (await (await fetch(url2)).json())[0];

  let template = dom.select("#page-2 #latest-repos-template2");
  let container = dom.select("#page-2 .latest-container #latest-commit");

  let content = template.cloneNode(true).content;
  let title = content.querySelector(".latest-repos-title");
  let owner = content.querySelector(".latest-repos-owner");

  title.href = `https://github.com/${lastRepos.owner.login}/${lastRepos.name}`;
  title.innerHTML = `
      ${lastRepos.name}
      `;

  let eTime = content.querySelector(".latest-repos-timeago");
  let date = new Date(lastRepos.updated_at);
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
    owner = content.querySelector(".latest-repos-owner");

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
