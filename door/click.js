const stageElem = document.querySelector(".stage");

let currentItem;

// function doorHandler(e) {
//   const targetElem = e.target;

//   if (currentItem) {
//     currentItem.classList.remove("door-opened");
//   }

//   if (targetElem.classList.contains("door-body")) {
//     targetElem.parentNode.classList.add("door-opened");
//     currentItem = targetElem.parentNode;
//   }
// }

function activate(element) {
  element.classList.add("door-opened");
  currentItem = element;
}

function inactivate(element) {
  element.classList.remove("door-opened");
}

function doorHandler(e) {
  const targetElem = e.target;

  if (currentItem) {
    inactivate(currentItem);
  }

  if (targetElem.classList.contains("door-body")) {
    activate(targetElem.parentNode);
  }
}

stageElem.addEventListener("click", doorHandler);
