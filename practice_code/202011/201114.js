"use strict";

const input = document.querySelector("input");
const btn = document.querySelector("button");
const toDoList = document.querySelector("ul");

btn.addEventListener("click", btnHandler);

function btnHandler(e) {
  let li = document.createElement("li");
  const liBtn = document.createElement("button");
  liBtn.innerText = "❌";
  li.innerText = input.value;
  toDoList.appendChild(li);
  toDoList.appendChild(liBtn);
}
