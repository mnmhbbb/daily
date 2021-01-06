//상속과 프로토타입

//1. 프로토타입 체이닝
//객체내부에서 우선 프로퍼티를 찾고 없으면? __proto__에서 찾아서 읽는다.

// const car = {
//   wheels: 4,
//   drive() {
//     console.log("drive...");
//   },
// };

// const Bmw = {
//   color: "red",
//   navigation: 1,
// };

// const x5 = {
//   wheels: 4,
//   color: "white",
// };

const Bmw = function (color) {
  this.color = color;
};

//생성자로 만들어진 모든 객체에 일일이 __proto__를 줄 필요없이
//해당 생성자로 만들어진 모든 객체는 다음 속성들을 공유하게 됨
Bmw.prototype.wheels = 4;
Bmw.prototype.drive = function () {
  console.log("drive...");
};

//car가 Bmw의 프로토타입이 되고,
//Bmw는 car의 상속을 받음
//x5도 마찬가지로 Bmw의 상속을 받음
// Bmw.__proto__ = car;
// x5.__proto__ = Bmw;

const x5 = new Bmw("white");
const z4 = new Bmw("blue");

console.log(x5.color); //white
console.log(x5.wheels); //4
console.log(z4.color); //blue
console.log(z4.wheels); //4

//생성자함수로 만들어진 객체를 생성자의 인스턴스라고 부른다.
//이를 확인하려면 instanceof 를 사용하면 된다.
console.log(z4 instanceof Bmw); //true
//또한 인스턴스의 constructor 프로퍼티를 이용하여 생성자를 확인할 수도 있다.
console.log(z4.constructor === Bmw); //true
