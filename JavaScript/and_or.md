# 논리연산자 응용하기
## 1. && AND 연산자
- 모두 true일 경우 true
- false일 경우 종료
- 즉, false를 찾는 연산자  
- `A && B`
  - A가 true면 B 반환
  - A가 false면 A 반환
- 따라서 and 연산자는 간단한 조건문으로 응용할 수 있다.
  ```javascript
  if( A ){
    B;
  } else {
    A;
  };
  ```  
&nbsp;
## 2. || OR 연산자
- 하나 이상 true일 경우 true
- true일 경우
- 즉, true를 찾는 연산자
- A || B
  - A가 true면 A 반환
  - B가 ture면 B 반환
- 또한, or연산자는 [null, undefined, 0, 빈값]이 아닌 값을 반환함
- 즉, [false, null, undefined, 0, 빈값]이 아닌 값을 찾는다고 할 수 있음.
- or 연산자는 주로 변수 할당에 응용되고, 크로스브라우징이 필요한 코드를 작성할때 많이 사용한다고 함.  
  ```javascript
  var a = a || {}    // a가 존재하지 않으므로 {} 할당
  var b = a || null  // a는 {} 이므로 {} 할당
  var c = b || 10    // b는 {} 이므로 {} 할당
  console.log(a, b, c) // {} {} {}
  var db = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
  ```
&nbsp;
##### 참조: (http://junil-hwang.com/blog/javascript-%EB%85%BC%EB%A6%AC%EC%97%B0%EC%82%B0%EC%9E%90/)

