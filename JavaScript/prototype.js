//상속과 프로토타입

//객체에 프로퍼티를 가지고 있는지 확인하기
{
  const user = {
    name: "Mike",
  };

  console.log(user.hasOwnProperty("name")); //true
  console.log(user.hasOwnProperty("age")); //false;
}

//우선 객체내부에서 프로퍼티를 찾고, 없으면 __proto__에서 찾아서 읽는다.
//다음과 같은 공통된 프로퍼티가 있는 경우,
{
  const bmw = {
    color: "red",
    wheels: 4,
    navigation: 1,
    dive() {
      console.log("drive..");
    },
  };

  const benz = {
    color: "black",
    wheels: 4,
    drive() {
      console.log("drive..");
    },
  };

  const audi = {
    color: "blue",
    wheels: 4,
    drive() {
      console.log("drive..");
    },
  };
}
// 공통된 프로퍼티를 car에 담고.

{
  const car = {
    wheels: 4,
    drive() {
      console.log("drive..");
    },
  };

  const bmw = {
    color: "red",
    navigation: 1,
  };

  const benz = {
    color: "black",
  };

  const audi = {
    color: "blue",
  };

  bmw.__proto__ = car;
  benz.__proto__ = car;
  audi.__proto__ = car;
  //car가 각 객체의 프로토타입이 됨
  //다시 말해, 각 객체가 car의 상속을 받는 것

  console.log(bmw); //{color: "red", navigation: 1}
  console.log(bmw.wheels); //4

  //상속을 할 수도 있음
  const x5 = {
    color: "white",
    name: "x5",
  };

  x5.__proto__ = bmw;
  console.log(x5.name); //name
  console.log(x5.color); //white
  console.log(x5.navigation); //1
  //이런 과정을 프로토타입 체인이라고 함

  //-------------------------------------
  for (p in x5) {
    console.log(p);
  }

  //다음과 같이 key, value 관련 메서드에서 상속된 프로퍼티는 반환되지 않음
  console.log(Object.keys(x5)); //["color", "name"]
  console.log(Object.values(x5)); //["white", "x5"]
}

// const Bmw = function (color) {
//   this.color = color;
// };

// //생성자로 만들어진 모든 객체에 일일이 __proto__를 줄 필요없이
// //해당 생성자로 만들어진 모든 객체는 다음 속성들을 공유하게 됨
// Bmw.prototype.wheels = 4;
// Bmw.prototype.drive = function () {
//   console.log("drive...");
// };

// //car가 Bmw의 프로토타입이 되고,
// //Bmw는 car의 상속을 받음
// //x5도 마찬가지로 Bmw의 상속을 받음
// Bmw.__proto__ = car;
// x5.__proto__ = Bmw;

// const x5 = new Bmw("white");
// const z4 = new Bmw("blue");

// console.log(x5.color); //white
// console.log(x5.wheels); //4
// console.log(z4.color); //blue
// console.log(z4.wheels); //4

// //생성자함수로 만들어진 객체를 생성자의 인스턴스라고 부른다.
// //이를 확인하려면 instanceof 를 사용하면 된다.
// console.log(z4 instanceof Bmw); //true
// //또한 인스턴스의 constructor 프로퍼티를 이용하여 생성자를 확인할 수도 있다.
// console.log(z4.constructor === Bmw); //true
