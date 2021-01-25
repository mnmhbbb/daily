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

  //상속을 더 할 수도 있음
  const x5 = {
    color: "white",
    name: "x5",
  };

  x5.__proto__ = bmw;
  console.log(x5.name); //name
  console.log(x5.color); //white
  console.log(x5.navigation); //1
  //이렇게 연쇄하여 프로퍼티를 찾는 과정을 프로토타입 체인이라고 함

  //-------------------------------------
  //관련
  for (p in x5) {
    console.log(p);
  } // color name navigation wheels drive

  //다음과 같이 key, value 관련 객체 내장 메서드를 실행할 때, 상속된 프로퍼티는 안나옴
  console.log(Object.keys(x5)); //["color", "name"]
  console.log(Object.values(x5)); //["white", "x5"]

  //hasOwnProperty도 본인이 갖고 있는 프로퍼티만 가져와줌
  for (a in x5) {
    if (x5.hasOwnProperty(a)) {
      console.log("o", a);
    } else {
      console.log("x", a);
    }
  }
  // o color
  // o name
  // x navigation
  // x wheels
  // x color
}

// 생성자함수
{
  const Bmw = function (color) {
    this.color = color;
    this.wheels = 4;
    this.drive = function () {
      console.log("drive..");
    };
  };

  const x5 = new Bmw("red");
  const z4 = new Bmw("blue");
}
// 매개변수로 넣어주는 컬러를 제외한 wheels, drive는 동일하니까

{
  const car = {
    wheels: 4,
    drive: function () {
      console.log("drive..");
    },
  };

  const Bmw = function (color) {
    this.color = color;
    this.wheels = 4;
    this.drive = function () {
      console.log("drive..");
    };
  };

  const x5 = new Bmw("red");
  const z4 = new Bmw("blue");

  x5.__proto__ = car;
  z4.__proto__ = car;

  console.log(x5); //Bmw {color: "red", wheels: 4, drive: ƒ}
  console.log(z4); //Bmw {color: "blue", wheels: 4, drive: ƒ}
  console.log(z4.wheels); //4
}
//이 방법 말고,

{
  const Bmw = function (color) {
    this.color = color;
    this.wheels = 4;
    this.drive = function () {
      console.log("drive..");
    };
  };

  const x5 = new Bmw("red");
  const z4 = new Bmw("blue");

  //생성자로 만들어진 모든 객체에 일일이 __proto__를 줄 필요없이
  //해당 생성자로 만들어진 모든 객체는 다음 속성들을 공유하게 됨
  Bmw.prototype.wheels = 4;
  Bmw.prototype.drive = function () {
    console.log("drive...");
  };

  console.log(x5); //Bmw {color: "red", wheels: 4, drive: ƒ}
  console.log(z4); //Bmw {color: "blue", wheels: 4, drive: ƒ}
  console.log(z4.wheels); //4

  //이렇게 생성자함수로 만들어진 객체를 생성자의 인스턴스라고 부른다.
  //또한 인스턴스의 constructor 프로퍼티를 이용하여 생성자를 확인할 수도 있다.
  console.log(z4 instanceof Bmw); //true
  console.log(z4.constructor === Bmw); //true
}

//위 코드를 더 깔끔하게 하기 위해서, 프로토타입을 하나로 묶게 되면
{
  const Bmw = function (color) {
    this.color = color;
  };

  Bmw.prototype = {
    //constructor가 사라지기 때문에 명시를 꼭 해줘야 한다.
    constructor: Bmw,
    wheels: 4,
    drive() {
      console.log("drive..");
    },
  };

  const x5 = new Bmw("red");
  const z4 = new Bmw("blue");

  console.log(z4.wheels); //4
  console.log(z4.constructor === Bmw); //true
}

// 그런데, c5.color = "black"; 이런 식으로 누구나 쉽게 색깔을 바꿔버릴 수 있음..
//이 코드의 속성값을 변경할 수 없게 하려면, 클로저를 이용한다.

{
  const Bmw = function (color) {
    const c = color;
    this.getColor = function () {
      console.log(c);
    };
  };

  const x5 = new Bmw("red");
  console.log(x5.getColor());

  //초기 세팅되어있던 값을 얻을 수는 있으나 바꿀 수는 없다.
  //getColor 함수는 생성될 당시의 컨텍스트를 기억하는 것.
}
