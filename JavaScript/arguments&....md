#### 자바스크립트에서 함수를 호출할 때, `arguments`객체와 `this`인자가 함수의 내부에 암묵적으로 전달된다.

## 1. arguments 객체

- 함수 호출 시, 전달된 인수(argument)들의 정보를 담고 있는, 배열 형태의 객체를 의미한다.
- 함수 내부에서 지역변수처럼 사용되며, 함수 외부에서는 사용할 수 없다.
- 매개변수 개수가 확정되지 않은 가변인자함수를 구현할 때 유용하다.
- **배열 형태**이지만, 실제 배열은 아니며, 정확히는 **유사 배열 객체**이다.
  - **유사 배열 객체** : `length`와 `index`프로퍼티를 가지는 객체이며 배열이 아니므로 배열 메서드를 사용하면 에러가 발생함.  
     배열 메서드를 사용하려면 `call`, `apply` 메서드를 사용해야 한다. 
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
    다소 복잡한 방법이다. 이 코드를 `전개 구문`으로 간편하게 바꿀 수 있다.  
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

&nbsp;  
&nbsp;  
참조:   
인사이드자바스크립트(송형주, 고현준 지음. 2014)  
코딩앙마님 강좌 <https://youtu.be/KfuyXQLFNW4>  
