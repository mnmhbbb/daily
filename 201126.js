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
  if (link == null) {
    return;
  }
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  menu.classList.remove("open");

  //선택한 버튼만 활성화시키기
  if (target.classList.contains("navbar__menu")) {
    return;
  }
  const selected = document.querySelector(".selected");
  selected.classList.remove("selected");
  target.classList.add("selected");
});

//맨 위로 버튼
const upBtn = document.querySelector(".upBtn");
const home = document.querySelector(".home");
upBtn.addEventListener("click", () => {
  home.scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("scroll", () => {
  const homeHeight = home.getBoundingClientRect().height;
  if (window.scrollY > homeHeight / 2) {
    upBtn.classList.add("visible");
  } else {
    upBtn.classList.remove("visible");
  }
});

//앨범 필터링
const years = document.querySelector(".play__years");
const albumContainer = document.querySelector(".play__albums");
const albums = document.querySelectorAll(".album");

years.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  albums.forEach((album) => {
    if (filter === "all" || filter === album.dataset.type) {
      album.classList.remove("invisible");
    } else if (e.target.classList.contains("play__years")) {
      return;
    } else {
      album.classList.add("invisible");
    }
  });
  const active = document.querySelector(".active");
  active.classList.remove("active");
  e.target.classList.add("active");
});
