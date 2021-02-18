# 변수와 호이스팅 & 클로저
## 1. 변수와 호이스팅  
- 변수의 생성과정
1. 선언 단계
2. 초기화 단계(undefined를 할당해주는 단계)  
  : 변수객체가 가질 값을 위해 메모리에 공간을 할당하는 것. 초기화되는 값이 undefined
3. 할당 단계  
  : 변수객체에 값을 할당함  
&nbsp;
&nbsp;  
### var
- `var`은 선언과 초기화가 동시에 됨. 
- 따라서, 선언되자마자 undefined로 초기화 됨. 그래서 선언되기 전에 참조 할 수 있다.
- 이것을 **호이스팅(hoisting)** 이라고 한다.
  - 호이스팅: 스코프 내부 어디서든 변수 선언이 최상위에 선언된 것처럼 동작하는 것.   
             변수를 선언하고 초기화했을 때 선언 부분이 최상단으로 끌어올려지는 현상.   
             대표적으로 함수선언식이 함수 통째로 호이스팅 됨.
- `var`은 한 번 선언된 변수를 다시 선언할 수도 있으며, 선언하기 전에 참조할 수도 있다.
- 단, 할당은 호이스팅되지 않는다.  
&nbsp;
### let
- `let`은 선언과 초기화가 분리되어 진행됨
- 따라서, 선언하기 전에는 변수를 참조할 수 없다.(아직 초기화되지 않아서)
- 초기화 단계는 실제 코드에 도달했을 때 실행된다.
- 이와 같이, 아직 초기화되지 않는 변수가 있는 곳을 **TDZ(Temporal Dead Zone)** 라고 말한다.
  - TDZ: 스코프에 변수가 등록되었으나, 공간을 메모리에 확보하지 못하여 변수를 참조할 수 없는 상태  
         아직 초기화 되지 않은 바인딩에 접근할 때, 미리 초기화하라고 에러로 알려주는 장치.
```javascript
console.log(foo); //undefined
var foo;
console.log(foo); //undefined

console.log(bar); //Uncaught ReferenceError: bar is not defined
let bar;
//변수 선언문에서 초기화 단계 실행됨. 이제 TDZ 탈출
console.log(bar); //undefined 
```  
&nbsp;
### const
- `const`는 선언+초기화+할당 모두가 동시에.
- 따라서 선언과 동시에 값을 할당해야 한다.  
&nbsp;  
### 스코프
- `var`의 스코프: 함수 스코프
  - 함수 내부에서 선언한 변수는 지역변수이며, 함수 외부에서 선언한 변수는 모두 전역변수로 취급함
```javascript
function foo() {
  var a = 'hello';
  if (true) {
    var a = 'bye';
    console.log(a); //bye
  }
  console.log(a); //bye
}
```
- `let`, `const`의 스코프: 블럭 스코프
  - 중괄호 박스 안에서 선언한 변수는 모두 지역변수로 취급
```javascript
function foo() {
  let a = "hello";
  if (true) {
    let a = "bye";
    console.log(a); //bye
  }
  console.log(a); //hello
}
foo();
```
- 따라서 결론:  
  재할당이 필요한 경우를 제외하면 const를 사용하자.  
  (의도치 않게 값이 변경해서 발생할 수 있는 재할당을 방지해주므로.)  
### 관련 예시
```javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}

sayHi(); 
//undefined (선언하기 전에 출력했지만 호이스팅되었으므로 undefined)
//ReferenceError (아직 초기화되지 않았으므로)
```
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
```
각각 출력되는 값은 `3 3 3` 과 `0 1 2`이다.  
출처:(https://github.com/lydiahallie/javascript-questions)  
&nbsp;
&nbsp;  
## 2. 클로저
- 자바스크립트는 기본적으로 어휘적 환경(Lexical Environment)을 갖는다.  
- 다음 예시를 통해 하나씩 습득해보기
```javascript
function makeAdder(x) {
    return function (y) {
      return x + y;
    };
  }
const add = makeAdder(3);
console.log(add(2)); //5
```
#### 1. 최초의 상황(아직 0줄을 읽은 상태)
- 전역 Lexical 환경(전역 컨택스트)
  - makeAdder : function
  - add: 아직 초기화X
#### 2. `const add = makeAdder(3);` 부분을 읽음
- makeAdder Lexical 환경
  - x : 3
- 전역 Lexical 환경  
  add은 이제 makeAdder 함수가 리턴하는 값을 받는 함수가 됨
  - add : function
#### 3. `console.log(add(2));` 부분을 읽음  
  add3을 실행하면 makeAdder의 리턴 부분 익명함수가 실행됨.  
  이때 받은 y값이 들어가게 됨
  - 익명함수 Lexical 환경
    - y : 2
#### 4. 최종  
  이제 x + y를 할 차례임  
  현재 익명함수 Lexical 환경에서 y값은 찾았으나 x가 없음  
  -> 상위 함수인 makeAdder Lexical 환경에서 x값을 찾아옴
&nbsp;
## 정리하면,  
- y를 가지고 있는 상태에서, 상위함수인 makeAdder의 x에 접근 가능하고,  
- add3 함수가 생성된 이후에도 상위함수인 makeAdder의 x에 접근 가능하다.
- 이와 같은 것이 바로 **클로저**이다.
  - 함수와 그 함수의 렉시컬 환경의 조합.
  - 함수가 생성될 당시의 외부 변수를 기억하고, 생성된 이후에도 계속해서 접근 가능.
  - 외부함수의 실행이 끝나서 소멸된 이후에도, 내부함수가 외부함수의 변수에 접근할 수 있는 것.    
&nbsp;
&nbsp;  
###### 참조:   
[ES6] Hoisting & Temporal Dead Zone(TDZ) <https://velog.io/@wrfg12/ES6-Hoisting-Temporal-Dead-ZoneTDZ>   
코딩앙마님 '#11 클로저(Closure) 5분만에 이해하기'<https://youtu.be/tpl2oXQkGZs>
