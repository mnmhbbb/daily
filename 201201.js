const tagElem = document.querySelector(".tag");
function updateTag() {
  tagElem.innerHTML = `
    window.screen : ${window.screen.width}, ${window.screen.height} <br/>
    window.outer : ${window.outerWidth}, ${window.outerHeight} <br/>
    window.inner : ${window.innerWidth}, ${window.innerHeight} <br/>
    documentElement.clientWidth : ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}
    `;
}

window.addEventListener("resize", () => {
  updateTag();
});

updateTag();
