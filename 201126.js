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
toggleBtn.addEventListener("click", (e) => {
  menu.classList.toggle("open");
});

menu.addEventListener("click", (e) => {
  //선택한 메뉴로 스크롤
  const target = e.target;
  const link = target.dataset.link;
  const scrollTo = document.querySelector(link);
  if (link == null) {
    return;
  }
  scrollTo.scrollIntoView({ behavior: "smooth" });

  //선택한 버튼만 활성화시키기
  if (target.classList.contains("navbar__menu")) {
    return;
  }
  const active = document.querySelector(".active");
  active.classList.remove("active");
  target.classList.add("active");
});
