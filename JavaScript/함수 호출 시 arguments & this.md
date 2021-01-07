#### 자바스크립트에서 함수를 호출할 때, `arguments`객체와 `this`인자가 함수의 내부에 암묵적으로 전달된다.

## 1. arguments 객체

- 함수 호출 시, 전달된 인수(argument)들의 정보를 담고 있는, 배열 형태의 객체를 의미한다.
- 함수 내부에서 지역변수처럼 사용되며, 함수 외부에서는 사용할 수 없다.
- 매개변수 개수가 확정되지 않은 가변인자함수를 구현할 때 유용하다.
- **배열 형태**이지만, 실제 배열은 아니며, 정확히는 **유사 배열 객체**이다.
  - **유사 배열 객체** : `length`프로퍼티를 가진 객체이며 배열이 아니므로 배열 메서드를 사용하면 에러가 발생함.  
     배열 메서드를 사용하려면 `call`, `apply` 메서드를 사용해야 한다. 자세한 정보는 this 파트에서.

## 2. this

- 자바스크립트의 호출 상황에 따라 `this`는 다른 객체를 참조하므로 주의가 필요하다.(this 바인딩)
- 함수 호출 시, this는 기본적으로 `전역객체`에 바인딩된다. 심지어 내부함수의 경우에도.
- 생성자 함수에서 this는 사실 다음과 같이 동작한다.
  ```javascript
  function Person(name) {
    //this = { }
    this.name = name;
    //return this
  }
  ```
  &nbsp;

### 2.1 함수 호출 방식에 관계없이 this를 지정하는 법: `call`, `apply`, `bind` 메서드를 이용하기

```javascript
function.apply(thisArg, argArray)
```

- function 함수의 this로 사용할 객체를 첫 번째 인자 `thisArg`에 넣어서 함수를 호출한다.
- `call`과 `apply`는 동일하게 동작하며, `call`은 두 번째 인자에서 각각 하나의 인자로 넘기고, `apply`는 배열 형태로 넘긴다는 점만 다르다.
- `bind`는 함수의 this 값을 영구히 바꿀 수 있다.
- 총정리 예시

```javascript
const user = {
  name: "Mike",
  showName: function () {
    console.log(`hello, ${this.name}`);
  },
};

user.showName();
let fn = user.showName;

fn.call(user);
fn.apply(user);

fn(); //hello,
//쉽게 생각해서 메서드는 .앞이 this임
//메서드에서는 자신을 호출한 객체에 this가 바인딩 되니까
//그래서 this를 명시해줘야 함

//this값을 영구히 지정
let boundFn = fn.bind(user);
boundFn();
```

&nbsp;  
&nbsp;  
참조:  
웹 프로그래밍 튜토리얼<https://poiemaweb.com/js-this>  
인사이드자바스크립트(송형주, 고현준 지음. 2014)  
코딩앙마님 강좌 <https://youtu.be/KfuyXQLFNW4>
