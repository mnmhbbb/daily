// 렉시컬 스코프 lexical scope

// 자바스크립트는 렉시컬 스코프를 따르므로 함수를 '선언'한 시점에 상위 스코프가 결정된다.
// 함수를 어디에서 호출하였는지는 스코프 결정에 아무런 의미를 주지 않는다.
{
  var x = 1;

  function foo() {
    var x = 10;
    bar();
  }

  function bar() {
    console.log(x);
  }

  foo(); // 1
  bar(); // 1
}
// 위 예제의 함수 bar는 전역에 선언되었다. 따라서 함수 bar의 상위 스코프는 전역 스코프이고 전역 변수 x의 값 1을 두번 출력한다.

{
  function Prefixer(prefix) {
    this.prefix = prefix;
  }

  Prefixer.prototype.prefixArray = function (arr) {
    // this는 상위 스코프인 prefixArray 메소드 내의 this를 가리킨다.
    return arr.map((x) => `${this.prefix}  ${x}`);
  };

  const pre = new Prefixer("Hi");
  console.log(pre.prefixArray(["Lee", "Kim"]));
  // ["Hi  Lee", "Hi  Kim"]
}

// 암묵적 전역
// 선언하지 않은 식별자 y가 전역객체의 프로퍼티가 되어 마치 전역 변수처럼 동작하는 현상
// y가 변수는 아니므로, 호이스팅이 발생하지는 않는다.
{
  var x = 10; // 전역 변수

  function foo() {
    // 선언하지 않은 식별자
    y = 20;
    console.log(x + y);
  }

  foo(); // 30
}
