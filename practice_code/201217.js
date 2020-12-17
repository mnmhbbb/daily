//빈 객체를 -> 각 알파벳을 키로 갖는 객체로 만들기

let obj1 = {};
let str1 = "abc";
console.log(str1[0]); //a
console.log(obj1[str1[0]]); //undefined 객체 안에 딱히 설정한 키값이 없으니까..

//반복문을 활용하여,,
let obj2 = {};
let str2 = "cherry";
for (let i = 0; i < str2.length; i++) {
  if (obj2[str2[i]] === undefined) {
    obj2[str2[i]] = 0; //obj2안에 c라는 키가 아직 없으니까 카운트 0 으로 선언해줌
  }
  obj2[str2[i]]++; //반복문 돌 때마다 해당 키의 값이 카운트 되게
}
console.log(obj2); //{c: 1, h: 1, e: 1, r: 2, y: 1}

//함수표현식으로..
const counter = function (str) {
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]] === undefined) {
      obj[str[i]] = 0;
    }
    obj[str[i]]++;
  }
  return obj; //리턴 잊지 말기..!
};
console.log(counter("banana")); //{b: 1, a: 3, n: 2}

//다른 방법..
let apple = counterAlphabet("apple");
function counterAlphabet(str) {
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]] === undefined) {
      obj[str[i]] = 0;
    }
    obj[str[i]]++;
  }
  return obj;
}
console.log(apple); //{a: 1, p: 2, l: 1, e: 1}

//함수 선언 방식으로 할 때 인자의 타입이 문자열이라는 걸 명시할 방법이 없다.
//타입스크립트를 공부할 시점일까?
