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
  increase(runIf5Times) {
    this.counter++;
    console.log(this.counter);
    if (this.counter % 5 === 0) {
      runIf5Times(this.counter);
    }
  }
}

const coolCounter = new Counter();

function printSomething(num) {
  console.log(`hello ${num}`);
}

coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);

// 그래서 increase 에 콜백함수를 전달.
// 장점: 우리가 원하는 기능을 입력할 수 있다.
// 단점: 매번 printSomething을 호출해야 하는 점이 비효율적
