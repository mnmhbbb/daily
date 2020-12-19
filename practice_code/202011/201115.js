//전역변수로..
var list;
var number;

function quiz() {
  list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  number = [];
  for (var i = 0; i < 4; i += 1) {
    var select = list.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    number.push(select);
  }
}

quiz();
console.log(number);

var result = document.querySelector("h2");
var form = document.querySelector("form");
var input = document.querySelector("input");
input.maxLength = 4;

var count = 0;

function submitHandler(e) {
  e.preventDefault();
  var inputvalue = input.value;
  if (inputvalue == number.join("")) {
    // inputvalue(답) 맞으면
    result.textContent = "홈런!";
    input.value = "";
    input.focus();
    quiz();
    count = 0;
  } else {
    // inputvalue(답) 틀리면
    var strike = 0;
    var ball = 0;
    count += 1;

    if (count > 10) {
      // 10번 넘게 틀린 경우
      result.textContent = `10회 초과로 실패! 정답은 ${number} 였습니다.`;
      quiz();
      input.value = "";
      input.focus();
      count = 0;
    } else {
      // 10번 미만으로 틀린 경우
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          if (number[i] == inputvalue[j]) {
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
