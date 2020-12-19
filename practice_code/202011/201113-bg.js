const body = document.querySelector("body");

const IMG_NUMBER = 4;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `./img/${imgNumber + 1}.jpg`; //random 함수가 0을 줄 수도 있어서 +1
  image.classList.add("bgImage");
  body.prepend(image);
}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = getRandom();
  paintImage(randomNumber);
}

init();
