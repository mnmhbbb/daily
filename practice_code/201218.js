//숫자야구 문제 만드는 배열 연습
let number = [];
let list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 0; i < 4; i++) {
  let random = Math.floor(Math.random() * list.length);
  number[i] = list.splice(random, 1)[0];
}
console.log(number);

// 배열 만들기
let num = Array(45).fill(0);
console.log(num);
