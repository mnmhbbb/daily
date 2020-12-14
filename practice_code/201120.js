let list;
let number;

function quiz() {
  list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  number = [];
  for (i = 0; i < 4; i++) {
    var select = list.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    number.push(select);
  }
}

quiz();
console.log(number);

let count = 0;

let form = document.querySelector("form");
let input = document.querySelector("input");
input.focus();
input.maxLength = 4;
let result = document.querySelector("h1");

function submitHandler(e) {
  e.preventDefault();

  //답이 맞았음
  if (input.value === number.join("")) {
    result.textContent = "홈런!";
    input.value = "";
    input.focus();
    quiz();
    count = 0;
  } else {
    //답이 틀림
    let strike = 0;
    let ball = 0;
    count++;

    //10회 넘겼음
    if (count > 10) {
      result.textContent = `10회 초과! 답은 ${number} 였습니다`;
      count = 0;
      quiz();
      input.value = "";
      input.focus();
    } else {
      //10회 안넘김
      for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
          if (number[i] == input.value[j]) {
            if (i === j) {
              strike++;
            } else {
              ball++;
            }
            break;
          }
        }
      }
      result.textContent = `${count}회 : ${strike}스트라이크 ${ball}볼`;
      input.value = "";
      input.focus();
    }
  }
}

form.addEventListener("submit", submitHandler);
