//class & callback

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

  //콜백함수가 없을 경우까지 고려
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

coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
