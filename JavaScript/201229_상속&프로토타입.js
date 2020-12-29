//상속과 프로토타입

//1. 프로토타입 체이닝
//객체내부에서 우선 프로퍼티를 찾고 없으면? __proto__에서 찾아서 읽는다.

const car = {
  wheels: 4,
  drive() {
    console.log("drive...");
  },
};

const Bmw = {
  color: "red",
  navigation: 1,
};

const x5 = {
  wheels: 4,
  color: "white",
};

Bmw.__proto__ = car;
x5.__proto__ = Bmw;

console.log(Bmw.color); //red
console.log(x5.color); //white
console.log(Bmw.wheels); //4
console.log(x5.wheels); //4
