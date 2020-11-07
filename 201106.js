const tog = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-menu");
const icons = document.querySelector(".nav-icons");
tog.addEventListener("click", () => {
  menu.classList.toggle("active");
  icons.classList.toggle("active");
});
