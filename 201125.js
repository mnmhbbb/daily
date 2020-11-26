"use strict";

//스크롤 내렸을 때 navbar 상단에 고정시키기
const navbar = document.querySelector("#navbar");
const navberHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navberHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

//해당 섹션으로 스크롤이동하는 함수 생성
function scrollGoTo(selection) {
  const scrollTo = document.querySelector(selection);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

// 메뉴 클릭시 해당 섹션으로 스크롤 시키기
const menu = document.querySelector(".navbar__menu");
menu.addEventListener("click", (e) => {
  const target = e.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollGoTo(link);
});

const goTo = document.querySelector(".home p");
goTo.addEventListener("click", (e) => {
  scrollGoTo("#no3");
});

//토글버튼
const toggleBtn = document.querySelector(".navbar__toggleBtn");
toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
});
