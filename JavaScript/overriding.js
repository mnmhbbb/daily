//class - overriding

// 1. 메소드 오버라이딩
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
      console.log("STOP");
    }
  }

  class Bmw extends Car {
    park() {
      console.log("PARK");
    }
    stop() {
      console.log("OFF");
    }
  }

  const z4 = new Bmw("blue");
  console.log(z4.stop()); //OFF
  // 이와 같이 동일한 이름의 메서드를 사용하면 덮어쓰게 됨..
}

// 부모의 메서드를 그대로 사용하면서 확장하고 싶다면?
// super.메서드명()
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
      console.log("STOP");
    }
  }

  class Bmw extends Car {
    park() {
      console.log("PARK");
    }
    stop() {
      super.stop(); // 부모 클래스의 stop을 호출하고,
      console.log("OFF"); // 확장하고 싶은 기능을 넣음
    }
  }

  const z4 = new Bmw("blue");
  console.log(z4.stop()); // STOP OFF
}

// 2. 생성자 오버라이딩
// 지금까진 Bmw에 자체 constructor가 없었음
// 이렇게 constructor가 없는 경우엔 비어있는 constructor가 자동으로 만들어짐.
{
  class Bmw extends Car {
    constructor(...arg) {
      super(...arg);
    }
  }
  // 생성자(constructor)는 기본적으로 부모 생성자를 호출해줌
  // 이때 부모 constructor에도 인수를 모두 전달함
  // 클래스에 자체 생성자가 없는 경우엔 이런 일이 모두 자동으로 일어남
}

// 상속클래스의 생성자에선 반드시 super(...)를 호출해야 함
// 왜냐면 '상속 클래스의 생성자 함수(derived constructor)'와 그렇지 않은 생성자 함수를 구분하기 위해.
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
      console.log("STOP");
    }
  }

  class Bmw extends Car {
    constructor() {
      this.navigation = 1;
      //super(...)를 사용하기 전에 this를 사용했음
    }

    park() {
      console.log("PARK");
    }
  }

  const z4 = new Bmw("blue");
  console.log(z4);
  //Must call super constructor in derived class before accessing 'this' or returning from derived constructor
  // this에 접근하기 전에 반드시 super(...)를 먼저 호출해야 한다!
}
//일반 클래스가 new와 함께 실행되면, 빈 객체가 만들어지고 this에 이 객체를 할당합니다.
//그런데 extends로 만들어진 객체는 이 작업을 건너뜀..
//상속 클래스의 constructor는 빈 객체를 만들고 this에 이 객체를 할당하는 일을 부모 클래스의 생성자가 처리해주길 기대함
//그래서 super() 키워드를 사용하여 부모 클래스의 constructor를 실행해줘야 함
//그렇지 않으면 this가 될 객체가 만들어지지 않아 에러가 발생함.

//또한, 이 예시의 경우 color 인자를 받기 때문에 상속 받은 객체의 constructor에서도 동일하게 color 인자를 받아와야 함
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
      console.log("STOP");
    }
  }

  class Bmw extends Car {
    // 생성자 오버라이딩
    constructor(color) {
      super(color);
      this.navigation = 1;
    }

    park() {
      console.log("PARK");
    }
  }

  const z4 = new Bmw("blue");
  console.log(z4);
  console.log(z4.navigation);
}
