const dropdown = document.querySelector(".dropdown");
const dropdownBtn = document.querySelector(".dropdown-toggle");
const menu = document.querySelector(".dropdown-menu");
const nextBtn = document.querySelector(".next-button");

dropdown.addEventListener("click", (e) => {
  menu.classList.toggle("show");
  dropdownBtn.classList.toggle("selected");

  if (e.target.value) {
    dropdownBtn.textContent = e.target.textContent;
    menu.classList.remove("show");
    dropdownBtn.classList.add("selected");
    nextBtn.disabled = false;
  }
});
