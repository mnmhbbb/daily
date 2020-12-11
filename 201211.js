//class & callback

// 위키백과 : 클래스는 객체 지향 프로그래밍에서 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀로,
// 객체를 정의하기 위한 상태(멤버 변수)와 메서드(함수)로 구성된다.

// 비교) 생성자 함수 (constructor)
// 생성자 함수는 함수 이름의 첫 글자는 대문자로 시작해서 구분함
// 반드시 'new' 연산자를 붙여 실행함

class Counter {
  //콜백함수를 받아오는거임
  //constructor도 함수니까
  //runEveryFiveTimes라는 인자에서 받아온 값을
  //this.callback이라는 변수에 할당함
  constructor(runEvery5Times) {
    this.counter = 0;
    this.callback = runEvery5Times;
  }

  increase() {
    this.counter++;
    console.log(this.counter);
    if (this.counter % 5 === 0) {
      this.callback(this.counter);
    }
  }
}

function printSomething(num) {
  console.log(`hello ${num}`);
}

//그리고나서 생성자함수에 우리가 웜하는 콜백함수를 전달함
//callback은 printSomething을 가리킴
const coolCounter = new Counter(printSomething);

coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
