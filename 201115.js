// //숫자야구 랜덤 문제 내기
// let list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// let number = [];
// for (let i = 0; i < 4; i++) {
//   let select = Math.floor(Math.random() * list.length);
//   number[i] = list.splice(select, 1)[0];
// }

// //숫자야구 숫자 맞추기
// let count = 1;
// let strike = 0;
// let ball = 0;

// let input = document.querySelector("input");
// let ment = document.querySelector('.ment');
// let submit = input.value;
// console.log(submit)

// input.addEventListener('submit', function submitHandler(e){
//   e.preventDefault();

//   //inputvalue이 맞으면

// })

var list;
var number;

function question() {
  list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  number = [];
  for (var i = 0; i < 4; i += 1) {
    var select = list.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    number.push(select);
  }
}

question();
console.log(number);

var result = document.querySelector("h2");
var form = document.querySelector("form");
var input = document.querySelector("input");
input.type = "text";
input.maxLength = 4;

var count = 0;
function submitHandler(e) {
  e.preventDefault();
  var inputvalue = input.value;

  if (inputvalue === number.join("")) {
    // inputvalue(답) 맞으면
    result.textContent = "홈런!";
    input.value = "";
    input.focus();
    question();
    count = 0;
  } else {
    // inputvalue(답) 틀리면
    var inputArray = inputvalue.split("");
    var strike = 0;
    var ball = 0;
    count += 1;

    if (count > 10) {
      // 10번 넘게 틀린 경우
      result.textContent = `10회 초과로 실패! 정답은 ${number}였습니다.`;
      input.value = "";
      input.focus();
      question();
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
      result.textContent = `${strike}스트라이크 ${ball}볼`;
      input.value = "";
      input.focus();
    }
  }
}

form.addEventListener("submit", submitHandler);
