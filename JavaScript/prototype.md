# 프로토타입에 대한 내용 정리
##### (얼렁뚱땅뒤죽박죽 알고 있는 정보를 조금만 더 깔끔하게. 복습)  
ES6부터 클래스 개념이 나오긴 했지만, 여전히 자바스크립트는 프로토타입 기반의 객체지향 언어이다.   
기본적인 흐름은 이러하다.  
> 자바스크립트에서는 함수를 선언할 때, 함수를 생성하면서 함수 자신과 연결된 **프로토타입 객체**를 동시에 생성함.  
> 예를 들어`Person`이라는 함수를 생성한다면, `Person.prototype`이라는 프로토타입 객체가 동시 생성됨  
> 이때 이 둘을 연결하기 위해, Person의 함수에 `prototype` 프로퍼티를 만들어서 `Person.prototype`을 가리키게 함  
> `Person.prototype`에도 자신이 `Person`과 연결됐다는 것을 표시하기 위해 `constructor`라는 프로퍼티를 만들어서 `Person`을 가리키게 함    
> 여기서 Person이라는 생성자함수를 통해 객체를 만들었다면, 이 객체(인스턴스)안에는 `Person.prototype`을 가리키는 `[[Prototype]]`프로퍼티가 생성됨으로써
> 객체에 일일이 해당 프로퍼티를 넣지 않아도, 프로토타입객체에 프로퍼티를 담으면 모든 객체에서 **공유**할 수 있다는 장점.
> 다시 말해, 같은 생성자함수를 통해 만들어진 객체끼리 프로토타입 객체를 공유한다. 
> "모든 객체는 자신을 생성한 생성자 함수의 `prototype` 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 취급한다"
> ![img](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F9iGLv%2FbtqR6vUvMt7%2Ff0Op1cMGfGYR6BE4lK3uyk%2Fimg.png)  
> (출처: 생활코딩 - 프로토타입)
&nbsp;   
&nbsp;   
### 용어 정리  
1. 프로토타입(prototype) 객체   
  - 쉽게 말해 부모 객체. 모든 객체는 자신의 부모 역할을 하는 프로토타입 객체와 연결되어 있음. 
  - 생성자 함수에 의해 생성되는 모든 객체에 프로퍼티를 **공유**할 수 있게 해줌.
  - 객체에서 어떤 프로퍼티를 읽어야 하는데 찾을 수 없다? 자동으로 해당 객체의 프로토타입에서 프로퍼티를 찾는다.(프로토타입 상속)
  - 모든 함수의 부모 객체는 `Function.prototype 객체`
  - 모든 배열의 부모 객체는 `Array.prototype 객체`
  - 하지만 결국 모든 객체의 조상은 `Object.prototype 객체`이므로 모든 프로토타입 체이닝의 종점이 여기에 해당한다.
  - 프로토타입 객체의 네이밍은 일반적으로, 자신과 연결된 함수의 prototype 프로퍼티 값을 그대로 이용한다.   
    예를 들어 `add()` 함수의 프로토타입 객체는 `add.prototype` 객체가 된다. 
  - 프로토타입 객체도 객체이므로 동적으로 프로퍼티를 추가하거나 삭제하는 것이 가능하다.   
    `Person.prototype.(추가할 프로퍼티) = '값'` 이와 같이 이용할 수 있다.

2. [[Prototype]]   
  - 모든 객체는 자신의 프로토타입을 가리키는 `[[Prototype]]`라는 숨겨진 내부 프로퍼티를 가짐.
  - 다시 말하면, [[Prototype]]이 참조하는 객체가 `프로토타입`
  - `__proto__`는 크롬 등의 브라우저 환경에서 지원하는 형태
  - 최근엔 `Object.getPrototypeOf`나 `Object.setPrototypeOf`를 써서 프로토타입을 get하거나 set한다고 함.(`__proto__`대신)
    - `Object.getPrototypeOf(obj)` : obj의 Prototype을 반환함.
    - `Object.setPrototypeOf(obj, prototype)` : obj의 Prototype을 다른 객체 또는 null로 설정함.
  - `Object.create(prototype)` 또한 알아두면 좋다.
    - 새 객체를 생성하고 prototype을 지정하는 메서드.
&nbsp;   
&nbsp;   
### 함수 객체의 `prototype`과 `[[Prototype]]`을 구분하기
ECMA5 : "모든 함수는 length와 prototype 프로퍼티를 가져야 한다" 라고 했으므로 모든 함수는 prototype 프로퍼티를 갖는다. 
  - [[Prototype]]은 **객체 입장에서** 자신의 부모 역할을 하는 프로토타입 객체를 가리킴
  - `prototype` 프로퍼티: **함수 입장에서** 함수가 생성자로 사용될 때, 이 함수를 통해 생성될 객체의 프로토타입을 가리킨다.
    - 다시 정리하면, `prototype`은 함수를 생성할 때 만들어지고, 새로운 객체의 [[Prototype]]을 설정한다.  
  - constructor 프로퍼티
    - 프로토타입은 디폴트로 constructor 프로퍼티만을 가지는 객체이며, `prototype`프로퍼티와 상호참조함
    - `F.prototype = { constructor : F }`
&nbsp;  
&nbsp;  

참조 :   
MDN-상속과 프로토타입 <https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain>  
모던자바스크립트-프로토타입 상속 <https://ko.javascript.info/prototypes>  
인사이드자바스크립트(송형주, 고현준 지음. 2014)
