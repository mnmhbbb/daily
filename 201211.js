//class & callback

// 위키백과 : 클래스는 객체 지향 프로그래밍에서 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀로,
// 객체를 정의하기 위한 상태(멤버 변수)와 메서드(함수)로 구성된다.

// 비교) 생성자 함수 (constructor)
// 생성자 함수는 함수 이름의 첫 글자는 대문자로 시작해서 구분함
// 반드시 'new' 연산자를 붙여 실행함

class Counter {
  constructor() {
    this.counter = 0; //counter라는 변수에 0이 담겨있음
  }

  //클래스 안에서 함수 선언할 때는 function 작성 하지 않음
  increase() {
    this.counter++;
    console.log(this.counter);
    if (this.counter % 5 === 0) {
      console.log("yo!");
    }
  }
}

const coolCounter = new Counter();
coolCounter.increase(); //1
coolCounter.increase(); //2
coolCounter.increase(); //3
coolCounter.increase(); //4
coolCounter.increase(); //5 yo!

// 이 코드의 문제점
// Counter 클래스 자체에서 틀을 만들기 때문에, 이 클래스를 이용하는 사람이 원하는 값으로 출력할 수 없다.
// 예를 들면 ' yo!'를 다른 문구나 다른 기능으로 바꾸고 싶을 때.
