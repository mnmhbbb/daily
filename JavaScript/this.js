// this
// 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.
// 단, 생성자 함수와 객체의 메소드를 제외한 모든 함수(내부 함수, 콜백 함수 포함) 내부의 this는 전역 객체를 가리킨다.

// 함수가 객체의 프로퍼티 값이면 메소드로서 호출된다. 이때 메소드 내부의 this는 해당 메소드를 호출한 객체에 바인딩된다.
// 메서드에서 객체 내의 속성명을 사용하는 경우, this를 사용하는 것이 좋다.
// 쉽게 말해 this는 . 점 앞에 있는 객체를 의미함
{
  let boy = {
    name: "Mike",
    showName: function () {
      console.log(this.name);
    },
  };

  let man = boy;
  man.showName(); //Mike
  boy = null;
  man.showName(); //Mike
  //this=man=boy
}

// 화살표함수에서 this
// 화살표함수는 일반함수와 달리 자신만의 this를 가지지 않음
// 화살표함수 내부에서 this를 사용하면, 그 this는 외부에서 값을 가져옴
// 화살표 함수의 this 언제나 상위 스코프의 this를 가리킨다. 이를 Lexical this라 한다.
// 화살표 함수의 this 바인딩 객체 결정 방식은 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프와 유사하다.
{
  let boy = {
    name: "Mike",
    sayThis: () => {
      console.log(this);
    },
  };
  boy.sayThis(); //window
  // this != boy
  // 화살표함수는 this를 가지지 않으므로 전역객체에서 가져옴
  // 따라서, 화살표함수로 메서드를 정의하는 것은 지양해야 한다.
}

{
  let boy = {
    name: "Mike",
    sayThis: function () {
      console.log(this);
    },
  };
  boy.sayThis(); //{name: "Mike", sayThis: ƒ}
  // this=boy
}

// 주의
// 화살표함수로 정의된 메서드를 prototype에 할당하는 경우도 문제가 생기므로 반드시 일반함수를 할당하자.
{
  const person = {
    name: "Lee",
  };

  Object.prototype.sayHi = () => console.log(`Hi ${this.name}`);

  person.sayHi(); // Hi undefined
}

// 생성자 함수는 prototype 프로퍼티를 가지며 prototype 프로퍼티가 가리키는 프로토타입 객체의 constructor를 사용한다.
// 화살표함수는 prototype 프로퍼티를 가지고 있지 않으므로 사용할 수 없다.
{
  const Foo = () => {};

  // 화살표 함수는 prototype 프로퍼티가 없다
  console.log(Foo.hasOwnProperty("prototype")); // false

  const foo = new Foo(); // TypeError: Foo is not a constructor
}

// 추가로, addEventListener 의 콜백함수의 경우도 화살표함수로 정의하면 this가 전역객체를 가리킨다.
