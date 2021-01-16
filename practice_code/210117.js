"use strict";
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const carousel = document.querySelector(".carousel");
let n = 0;

prev.addEventListener("click", () => {
  carousel.classList.add("slide");
  n += 100;
  carousel.style.left = n + "%";

  if (n > 0) {
    n = -400;
    carousel.style.left = n + "%";
  }
});

next.addEventListener("click", () => {
  carousel.classList.add("slide");
  n -= 100;
  carousel.style.left = n + "%";

  if (n === -500) {
    n = 0;
    carousel.style.left = n + "%";
  }
});
