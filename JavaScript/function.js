// 함수
// - 함수는 한번에 한 작업에 집중하는 것이 좋다.
// - 읽기 쉽고 어떤 동작인지 알 수 있게 네이밍할 것
// showError: 에러를 보여줌
// getName: 이름을 얻어옴
// createUserData: 유저데이터 생성
// checkLogin: 로그인 여부 체크

//전역변수
{
  let message = "hello";
  //함수 호출 전
  console.log(message); //hello

  function sayHello(name) {
    if (name) {
      message += `, ${name}`;
    }
    //함수 내부
    console.log(message); // hello, Mike
  }

  sayHello("Mike");

  //함수 호출 후
  console.log(message); //hello, Mike
}

//매개변수로 받은 값은 복사된 후 함수의 지역변수가 됨
{
  let name = "Mike";
  function sayHello(name) {
    console.log(name);
  }

  sayHello(); //undefined
  sayHello("Jane"); //jane
}

//매개변수가 없을 경우
// 1. OR 연산자를 이용하기
{
  function sayHello(name) {
    let Newname = name || "friend";
    let message = `Hello, ${Newname}`;
    console.log(message);
  }

  sayHello(); //Hello, friend
  sayHello("jane"); //Hello, Jane
}

// 2. 매개변수의 기본값 설정하기
{
  function sayHello(name = "friend") {
    let message = `Hello, ${name}`;
    console.log(message);
  }

  sayHello(); //Hello, friend
  sayHello("jane"); //Hello, Jane
}

//함수 선언문 vs 함수표현식
{
  sayHello();

  function sayHello() {
    console.log("hello");
  }
}
// 함수선언문: 어디서든 호출 가능
// 자바스크립트는 인터프리터 언어인데??
// (interpreted language: 위에서 아래로 순차적으로 실행되고, 즉시 결과를 반환함)
// 자바스크립트는 실행 전 초기화 단계에서 모든 함수선언문을 찾아서 생성해두기 때문.(=호이스팅)
// 코드의 위치가 실제로 올라가는 것은 아님

//함수표현식: 코드에 도달하면 비로소 생성됨
{
  const sayHello = function () {
    console.log("hello");
  };

  sayHello();
}
