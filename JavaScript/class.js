//클래스

//1. 생성자함수와의 비교
{
  // 생성자함수
  const User = function (name, age) {
    this.name = name;
    this.age = age;
    this.showName = function () {
      console.log(this.name);
    };
  };

  //클래스
  class User2 {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    showName() {
      console.log(this.name);
    }
  }

  const cfUser = new User("Mike", 20);
  const classUser = new User2("Tom", 21);

  console.log(cfUser);
  //User {name: "Mike", age: 20, showName: ƒ}
  //age: 20
  //name: "Mike"
  //showName: ƒ ()
  //__proto__:
  //constructor: ƒ (name, age)

  console.log(classUser);
  //User2 {name: "Tom", age: 21}
  //age: 21
  //name: "Tom"
  //__proto__:
  //constructor: class User2
  //showName: ƒ showName()
}
// 클래스는 객체 지향 프로그래밍에서 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀로,
// 객체를 정의하기 위한 상태(멤버 변수)와 메서드(함수)로 구성된다.

// constructor 메서드는 class 내에서 객체를 생성하고 초기화하기 위한 특별한 메서드
// 클래스는 constructor를 하나씩만 가질 수 있다.

// constructor 메서드를 생략해도 constructor(){}를 포함한 것처럼 빈객체를 생성하고
// 인스턴스를 생성해서 프로퍼티를 동적으로 추가해야 한다.

// 클래스 안에서 선언한 메서드는 클래스의 프로토타입에 저장됨

// 그래서 생성자함수(constructor function)인 cfUser는 객체 내부에 showName이 있고
// 클래스인 classUser은 프로토타입내부에(__proto__) showName이 있는 것을 확인할 수 있다.

// 생성자함수도 동일하게 만들어주려면,
{
  const User = function (name, age) {
    this.name = name;
    this.age = age;
    // this.showName = function () {
    //   console.log(this.name);
    // };
  };

  User.prototype.showName = function () {
    console.log(this.name);
  };

  const cfUser = new User("Mike", 20);
  console.log(cfUser);
}
// 클래스와 동일하게 프로토타입내부에(__proto__) showName이 있는 것을 확인할 수 있다.

// 단,
//User {name: "Mike", age: 20}
//age: 20
//name: "Mike"
//__proto__:
//showName: ƒ ()
//constructor: ƒ (name, age)
// 위와 같이 constructor에 class라고 명시가 되어있진 않음

// 그럼 단순히 문법의 편의성을 위해 class가 탄생한 걸까?
// 또 다른 비교
// 인스턴스를 만들 때 new를 빼고 만든다면?
{
  const User = function (name, age) {
    this.name = name;
    this.age = age;
  };

  const cfUser = User("Mike", 20);
  console.log(cfUser); //undefined
}
// 생성자함수의 경우, 단순히 User 함수가 반환하는 값(이 없으므로) undefined가 호출됨
// 개발자가 new를 빼먹는 실수를 하더라도 문제없이 동작함

{
  class User2 {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }

  const classUser = User2("Tom", 21); //Class constructor User2 cannot be invoked without 'new'
}
// 클래스의 경우 즉시 에러가 발생함

// for ... in
{
  const User = function (name, age) {
    this.name = name;
    this.age = age;
  };
  User.prototype.showName = function () {
    console.log(this.name);
  };

  class User2 {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    showName() {
      console.log(this.name);
    }
  }

  const cfUser = new User("Mike", 20);
  const classUser = new User2("Tom", 21);

  for (const p in cfUser) {
    console.log(p);
  } // name age showName

  for (const p in classUser) {
    console.log(p);
  } // name age

  // for ... in 문은 프로토타입에 포함된 프로퍼티를 다 보여주고,
  // 객체가 가지고 있는 프로퍼티를 판결하기 위해선 hasOwnProperty
  // class의 메서드는 for ... in 문에서 제외된다.
}
