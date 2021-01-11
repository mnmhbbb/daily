#### 자바스크립트에서 함수를 호출할 때, `arguments`객체와 `this`인자가 함수의 내부에 암묵적으로 전달된다.

## 1. arguments 객체

- 함수 호출 시, 전달된 인수(argument)들의 정보를 담고 있는, 배열 형태의 객체를 의미한다.
- 함수 내부에서 지역변수처럼 사용되며, 함수 외부에서는 사용할 수 없다.
- 매개변수 개수가 확정되지 않은 가변인자함수를 구현할 때 유용하다.
- **배열 형태**이지만, 실제 배열은 아니며, 정확히는 **유사 배열 객체**이다.
  - **유사 배열 객체** : `length`와 `index`프로퍼티를 가지는 객체이며 배열이 아니므로 배열 메서드를 사용하면 에러가 발생함.  
     배열 메서드를 사용하려면 `call`, `apply` 메서드를 사용해야 한다. 자세한 정보는 this 파트에서.
## 1.1 ES6 이후 문법을 사용할 수 있다면...
- `나머지 매개변수(Rest Parameter)`를 사용하자.
- 정해지지 않는 개수의 인수(가변인자함수)를 배열로 나타낼 수 있게 해줌.
- 따라서 `arguments`와 달리 배열 메서드를 사용할 수 있음.
- 나머지 매개변수 `...`은 항상 마지막 매개변수에 위치할 것.
  ```javascript
  function add(...numbers) {
    let result = 0;
    numbers.forEach( num => (result += num));
    console.log(result);
  };
  
  add(1, 2); //3
  add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); //55
  
  //reduce를 사용한다면,
  function add(...numbers) {
    let result = numbers.reduce((prev, curr) => (prev + curr));
    console.log(result);
  };
  ```
- `전개 구문(Spread Syntax)`
  - 이름 그대로 펼쳐주는 방식이다. 
  - `...`만 앞에 붙이면 됨
  - 다음 배열 예시에서 arr1을 `[4, 5, 6, 1, 2, 3]`으로 바꾸려고 한다.
    ```javascript
    let arr1 = [1, 2, 3];
    let arr2 = [4, 5, 6];
  
    arr2.reverse().forEach((num) => {
      arr1.unshift(num);
    });
    ```
    다소 복잡한 방법을 `전개 구문`으로 아주 간편하게 바꿀 수 있다.  
    ```javascript
    arr1 = [...arr2, ...arr1]
    ```
  - 이번엔 객체에서 적용해보자.
    ```javascript
    let user = { name: "Mike" };
    let info = { age: 30 };
    let fe = ["JS", "React"];
    let lang = ["Korean", "English"];
    
    user = {
      ...user,
      ...info,
      skills: [...fe, ...lang],
    };
    
    console.log(user); // { user: "Mike", info: 30, skills: ["JS", "React", "Korean", "English"] }
    ```
  
    
  
  

## 2. this

- 자바스크립트의 호출 상황에 따라 `this`는 다른 객체를 참조하므로 주의가 필요하다.(this 바인딩)
- 함수 호출 시, this는 기본적으로 `전역객체`에 바인딩된다. 심지어 내부함수의 경우에도.
  - 단, 엄격모드("use strict")에서 실행하면 this는 본래의 값을 유지하여 `undefined`가 할당됨
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
//쉽게 생각해서 메서드에서 this는 . 점 앞의 객체를 참조함.
//메서드에서는 자신을 호출한 객체에 this가 바인딩 되니까
//그래서 this를 명시해줘야 함

//this값을 영구히 지정
let boundFn = fn.bind(user);
boundFn();
```
### 2.2 화살표 함수에서의 this
- 함수를 생성하고 전달하면서 함수의 컨텍스트를 잃을 수 있지만, 화살표 함수의 경우는 그렇지 않다.
- 화살표 함수에는 `this`가 없다. 
- 화살표 함수 안에서 `this`에 접근하면, 외부에서 값을 가져온다.
- ```javascript
  let team = {
    title: "bebe",
    members: ["yerin", "sinb", "umji"],

    showUp() {
      this.members.forEach((members) =>
        console.log(`${this.title}'s ${members}`)
      );
    },
  };

  team.showUp(); 
  // bebe's yerin
  // bebe's sinb
  // bebe's umji
  ```
  - `this.title` 은 `team.title`과 동일하다.
  - 일반함수에서 다음과 같이 실행하였다면 에러가 발생한다. this에 할당된 값이 없기 때문.
&nbsp;  
&nbsp;  
참조:  
웹 프로그래밍 튜토리얼 <https://poiemaweb.com/js-this>  
인사이드자바스크립트(송형주, 고현준 지음. 2014)  
코딩앙마님 강좌 <https://youtu.be/KfuyXQLFNW4>  
모던 자바스크립트 <https://ko.javascript.info/arrow-functions>
