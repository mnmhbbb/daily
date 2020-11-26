"use strict";

document.addEventListener("scroll", () => {
  const navbar = document.querySelector("#navbar");
  const navbarHeight = navbar.getBoundingClientRect().height;
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("bgcolor");
  } else {
    navbar.classList.remove("bgcolor");
  }
});

const menu = document.querySelector(".navbar__menu");
const toggleBtn = document.querySelector(".navbar__toggle");
toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
});

menu.addEventListener("click", (e) => {
  const target = e.target;
  const link = target.dataset.link;
  const scrollTo = document.querySelector(link);
  if (link == null) {
    return;
  }
  scrollTo.scrollIntoView({ behavior: "smooth" });
});
