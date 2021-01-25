// 상속
// (생성자 함수는 프로토타입을 통해 상속을 구현했다.)
// 클래스는 extends 키워드를 사용한다.

{
  class Car {
    constructor(color) {
      this.color = color;
      this.wheels = 4;
    }
    drive() {
      console.log("drive..");
    }
    stop() {
      console.log("STOP!");
    }
  }

  class Bmw extends Car {
    park() {
      console.log("PARK");
    }
  }

  const z4 = new Bmw("blue");

  console.log(z4);
  // Bmw {color: "blue", wheels: 4}
  // color: "blue"
  // wheels: 4
  // __proto__: Car
  // constructor: class Bmw
  // park: ƒ park()
  // __proto__:
  // constructor: class Car
  // drive: ƒ drive()
  // stop: ƒ stop()
  // __proto__: Object

  console.log(z4.drive()); //drive..
  // 프로토타입 체인
}
// 클래스 내부에서 선언한 메서드(park)는 프로토타입에 저장됨
