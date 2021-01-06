//Class / 상속 / extends

// 위키백과 : 클래스는 객체 지향 프로그래밍에서 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀로,
// 객체를 정의하기 위한 상태(멤버 변수)와 메서드(함수)로 구성된다.

// MDN : constructor 메서드는 class 내에서 객체를 생성하고 초기화하기 위한 특별한 메서드입니다.
// 클래스는 constructor라는 이름을 가진 특별한 메서드를 하나씩만 가질 수 있습니다.

// 비교) 생성자 함수 (constructor)
// 생성자 함수는 함수 이름의 첫 글자는 대문자로 시작해서 구분함
// 반드시 'new' 연산자를 붙여 실행함

class Counter {
  constructor(runEvery5Times) {
    this.counter = 0;
    this.callback = runEvery5Times;
  }

  //클래스 안에서 함수 선언할 때는 function을 작성하지 않는다.
  //클래스 안에서 선언한 메서드는 클래스의 프로토타입에 저장됨!!!
  //다음의 코드는 &&논리연산자를 이용하여, 콜백함수가 없을 경우까지 고려하여 만든 코드
  increase() {
    this.counter++;
    console.log(this.counter);
    if (this.counter % 5 === 0) {
      this.callback && this.callback(this.counter);
    }
  }
}

function printSomething(num) {
  console.log(`hello ${num}`);
}

//콜백함수가 없다면???
const coolCounter = new Counter();

coolCounter.increase(); //1
coolCounter.increase(); //2
coolCounter.increase(); //3
coolCounter.increase(); //4
coolCounter.increase(); //5

//다음 예시
//클래스와 생성자함수 비교
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  showName() {
    console.log(this.name);
  }
}

const tom = new User("tom", 20);
console.log(tom);
tom.showName();

//생성자함수
const User2 = function (name, age) {
  this.name = name;
  this.age = age;
  this.showName = function () {
    console.log(this.name);
  };
};

const mike = new User2("mike", 20);
console.log(mike);
mike.showName();

function User3(name, age) {
  this.name = name;
  this.age = age;
  this.showName = function () {
    console.log(this.name);
  };
}

const mina = new User3("mina", 20);
console.log(mina);
mina.showName();
//생성자함수인 User2,3의 메서드는 프로토타입에 저장되지 않음.

//이 생성자 함수를 클래스와 동일하게 만들어보면,
//즉, 생성자 함수 내의 메서드를 프로토타입에 저장되게 만드려면,
const User4 = function (name, age) {
  this.name = name;
  this.age = age;
};

//이와 같이 작성해야 한다.
User4.prototype.showName = function () {
  console.log(this.name);
};

const yerin = new User4("yerin", 20);
console.log(yerin);

//참고로, 클래스 안의 메서드는 for ... in 문에서 제외되고 hasownproperty를 사용해야 한다.

//extends 상속
class Car {
  constructor(color) {
    this.color = color;
    this.wheels = 4;
  }
  drive() {
    console.log("drive...");
  }

  stop() {
    console.log("stop!");
  }
}

class Bmw extends Car {
  //생성자 오버라이딩
  //만일 constructor가 없으면
  // constructor(...arg) {
  //   super(...arg);
  // } 이렇게 있는 것처럼 동작함
  constructor(color) {
    super(color);
    this.navigation = 1;
  }

  park() {
    console.log("PARK");
  }

  //메서드 오버라이딩. Car에 stop을 사용한 것이 됨.
  stop() {
    super.stop();
    console.log("add message");
  }
}

const z4 = new Bmw("blue");
console.log(z4);
//다음 코드를 실행할 땐, drive 메서드를
//우선 객체 내부에서 찾고 없으면 프로토타입에 가서 찾는다.
z4.drive();
z4.stop();

//오버라이딩 overriding
//기본적으로 자바스크립트에서는 같은 이름의 함수가 있을 때, 마지막에 선언된 함수가 최종적으로 덮어버림
//1. 메서드 오버라이딩
//부모의 메서드인 stop() 메서드를 계속 사용하면서 확장하고 싶다면, super()를 사용한다.
//2. 생성자(constructor) 오버라이딩
//기본적으로 class의 constructor는 빈객체를 만들고, this를 할당하는 작업을 하는데,
//extends로 만들어진 객체는 이 작업을 건너뜀..
//그래서 마찬가지로 super() 키워드를 사용하여 부모 클래스의 constructor를 실행해줘야 함
//또한, 이 예시의 경우 color 인자를 받기 때문에 상속 받은 객체의 constructor에서도 동일하게 color 인자를 받아와야 함
