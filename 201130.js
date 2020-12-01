const special = document.querySelector(".special");
special.addEventListener("click", (e) => {
  const rect = special.getBoundingClientRect();
  console.log(rect);
  console.log(`client X : ${e.clientX}, client Y : ${e.clientY}`);
  console.log(`page X : ${e.pageX}, page Y : ${e.pageY}`);
});

const scrollBy = document.querySelector(".scroll-by");
const scrollTo = document.querySelector(".scroll-to");
const scrollToSpecial = document.querySelector(".scroll-special");

scrollBy.addEventListener("click", () => {
  window.scrollBy({ top: 100, left: 0, behavior: "smooth" });
});

scrollTo.addEventListener("click", () => {
  window.scroll({ top: 100, left: 0, behavior: "smooth" });
});

scrollToSpecial.addEventListener("click", () => {
  special.scrollIntoView({ behavior: "smooth" });
});

//다른 방법
// const btns = document.querySelector(".buttons");
// btns.addEventListener("click", (e) => {
//   if (e.target.classList.contains("scroll-by")) {
//     window.scrollBy(0, 100);
//   } else if (e.target.classList.contains("scroll-to")) {
//     window.scroll(0, 100);
//   } else {
//     special.scrollIntoView();
//   }
// });
