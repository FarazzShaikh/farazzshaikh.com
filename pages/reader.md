---
layout: markdown
permalink: /reader/
---



<div class="heading-container" align="center">
    <img id="profile-pic" src="/Assets/profile.jpg" width="160" height="160" itemprop="image" />
    <h1 class="title is-2 m-0" itemprop="name">Faraz Shaikh</h1>
    <h2 class="subtitle is-4 mb-3 mt-1" itemprop="description">Open-Source Developer</h2>
    <p>I make Libraries, CLIs, Games and Demos.</p>
    <br />
</div>

Hello! I am Faraz, a 20-year-old Open-Source developer, and student who loves to create just about anything fascinating, interesting, or fun.

Currently, I do Web Development and 3D Graphics on the web. I love Procedural Generation and so, am working on many projects related to it.

<div>
    <p class="subtitle is-6 has-text-weight-bold m-0 mb-2">Languages I speak</p>
    <div class="langs"></div>
    <p class="subtitle is-6 has-text-weight-bold m-0 mb-2">Technologies I use</p>
    <div class="frameworks"></div>
    <script type="module" defer>
        import { createLangTags } from "/pages/utils.js";
        (async () => {
            const colors = await (await fetch("/colors.json")).json();
            const langs = ["JavaScript", "TypeScript", "GLSL", "C", "C++", "HTML", "CSS", "SCSS", "Shell", "Python", "Java", "Assembly", "Liquid"];
            document.querySelector(".langs").innerHTML = createLangTags(langs, colors, true).join("\n") + "\n<br /><br />";
            const frames = ["React", "React Native", "ThreeJS", "Regl", "Git", "GitHub Actions", "GitLab CI", "Jekyll"];
            document.querySelector(".frameworks").innerHTML = createLangTags(frames, colors, true, true).join("\n") + "\n<br /><br />";
        })();
    </script>
</div>


## Education

### Heriot-Watt University
<span class="tag is-small">2019-present</span>
<p class="subtitle is-6">Pursuing a Bachelor of Science (BSc) in Computer Science at the Dubai Campus. Graduating in 2023.</p>

## Experience

### Newline.co – Course Author
<span class="tag is-small">Feb 2021 - present</span>
<p class="subtitle is-6">[Work in progress] Authoring an audio-video course about ThreeJS and 3D Graphics on the web.</p>

### Various Open-Source projects
<span class="tag is-small">2018 - present</span>
<p class="subtitle is-6">Check them out by clicking the relavent links in the Nav Bar.</p>

