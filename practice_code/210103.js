"use strict";

const open = document.querySelector(".open");
const modal = document.querySelector(".modal");
const btn = document.querySelector(".modal__btn");
const body = document.querySelector("BODY");

open.addEventListener("click", (e) => {
  modal.style.visibility = "visible";
  body.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
});

btn.addEventListener("click", () => {
  modal.style.visibility = "hidden";
  body.style.backgroundColor = "white";
});
