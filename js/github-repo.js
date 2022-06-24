import { colorLang } from "./lang-colors.js";

const magicProjectsGrid = new MagicGrid({
    container: "#work_section",
    animate: true,
    gutter: 30, // default gutter size
    useMin: true,
    maxColumns: 2,
    useTransform: true,
    items: 2,
});

function repoPrint() {
    fetch("https://api.github.com/users/MaximCosta/repos", {
        method: "GET",
        redirect: "follow",
    })
        .then((response) => response.json())
        .then((result) => {
            let repoList = document.getElementById("work_section");

            let template = document.getElementById("repo_template");
            repoList.innerHTML = "";
            result.map((itm) => {
                let clone = template.content.cloneNode(true);
                let parent = document.createElement("a");

                parent.setAttribute("href", itm.html_url);
                parent.setAttribute("id", itm.name);
                parent.setAttribute("target", "_blank");

                clone.querySelector("div.section_title").innerText = itm.name;
                clone.querySelector("div.about_section>span").innerText = itm.description;

                clone.querySelector("div.bottom_section>span:nth-child(1)>span").innerText = itm.language || "null";
                clone.querySelector("div.bottom_section>span:nth-child(1)").style.color = colorLang[itm.language]?.color;

                clone.querySelector("div.bottom_section>span:nth-child(2)>span").innerText = itm.stargazers_count;
                clone.querySelector("div.bottom_section>span:nth-child(3)>span").innerText = itm.forks_count;

                parent.appendChild(clone);
                repoList.appendChild(parent);
            });
        })
        .catch((error) => console.log("error", error));
}

document.addEventListener("DOMContentLoaded", function () {
    repoPrint();
    magicProjectsGrid.listen();
});

onDomChange(function () {
    magicProjectsGrid.positionItems();
});
