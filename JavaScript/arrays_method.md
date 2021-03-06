# 배열 메서드를 정리해보자

### 201218

여러 실습을 하면서 사용하는 법을 배웠던 배열 메서드에 대한 (애매한)개념을 제대로 정리해야겠다고 생각했다. 사용할 때마다 **매번** MDN 찾아보는 일을 조금이라도 줄여볼 수 있지 않을까? MDN과 모던자바스크립트 등의 사이트를 보고 이해하면서 다시 한 번 내 방식대로 정리해보자.


- ### 빈배열을 만드는 2가지 방법

  - `let arr = []`
    가장 기본적인 선언 방법이다.
  - `let arr = new Array()`
    괄호 안에 숫자를 넣으면 해당 숫자만큼의 길이를 가진 배열이 된다.  
    이때 `fill()` 메소드를 활용하여 원하는 구성으로 배열을 채울 수 있다.
    ```javascript
    let arr = new Array(5).fill(0);
    // [0, 0, 0, 0, 0]
    ```
    `fill()`은 배열의 모든 요소를 정적인 값으로 채우는 메서드이다.


- ### 스택의 LIFO와 큐의 FIFO 자료구조를 구현할 때 쓰이는 메서드

  - `push()`는 배열 끝에 요소를 추가함
  - `pop()`은 배열 끝 요소를 제거하고 제거한 요소를 반환함
  - `unshift()`는 배열 앞에 요소를 추가함
  - `shift()`는 배열 앞 요로슬 제거하고 제거한 요소를 반환함
  - 따라서 성능은 `push`와 `pop`이 더 빠르다. `unshift`와 `shift`는 배열 **앞에서** 요소를 실행시키므로 기본 요소들이 이동해야 하고 메모리 관련 연산이 추가되기 때문이다.


- ### `splice`와 `slice`

  - `splice()`는 배열의 기존 요소를 삭제하거나 교체할 수 있음.

  ```javascript
  arr.splice(시작인덱스, 삭제할 개수, 추가할 요소)
  let arr = [1, 2, 3];
  arr.splice(1, 2, 4);
  console.log(arr); //[1, 4]
  ```

  - `slice()`는 선택한 범위의 요소를 복사해서 새 배열을 반환할 수 있으며, 원래 배열은 그대로 유지함.

  ```javascript
  arr.slice(시작, 끝); //시작인덱스부터 끝인덱스를 제외한 끝인덱스까지를 복사
  let arr = [1, 2, 3];
  let arr2 = arr.slice(0, 2);
  console.log(arr2); //[1, 2]
  ```


- ### 반복하는 메서드

  #### 1. `forEach(fn)`는 배열의 요소 각각이 콜백함수를 실행하게 함.  
     for문처럼 반복할 수 있지만, 배열을 순회하므로 중간에 'break'를 사용하여 중단할 수 없음.

  ```javascript
  arr = ["apple", "banana", "cherry"];
  arr.forEach((item) => {
    console.log(`내가 좋아하는 과일은 ${item}`);
  });
  ```

  #### 2. `map(fn)` 또한 배열 요소들이 콜백함수를 실행하게 하지만, `forEach`와 달리, 함수의 반환값으로 새 배열을 만듦.

  ```javascript
  let arr = [1, 2, 3];
  let newArr = arr.map((item) => {
    return item * 2;
  }); //[2, 4, 6]
  
  //Arr.map((요소, 인덱스, 배열) => {return 요소})
  ```

  #### 3. `reduce()` 또한 모든 요소에 대해 콜백함수를 실행하지만, 누적된 단 1개의 결과값을 반환한다. 배열을 계속 순회하며 인덱스 데이터를 줄여나감.

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  let sumArr = arr.reduce((prev, curr) => {
    return prev + curr;
  });
  console.log(sumArr); //15
  
  //Arr.reduce((누적값, 현재값, 인덱스, 요소) => {return 결과}, 초기값 )
  ```
  왼쪽부터 차례로 1과 2를 더한 후 리턴된 값 3이 prev가 됨. 다음 3과 3을 더한 후 리턴된 6을 4와 더하는 방식이다.  
  아래는 조금 더 활용한 예시 코드이다.
  
  ```javascript
  oneTwoThree = [1, 2, 3];
  result = oneTwoThree.reduce((acc, cur) => {
    acc.push(cur % 2 ? '홀수' : '짝수');
    return acc;
  }, []);
  result; // ['홀수', '짝수', '홀수']
  ```
  reduce를 막연히 누적하는 메서드, 덧셈, 이렇게만 생각했는데, map 메서드와 같은 동작을 하기도 한다.
  ```javascript
  oneTwoThree = [1, 2, 3];
  result = oneTwoThree.reduce((acc, cur) => {
  cur % 2 && acc.push(cur);
  return acc;
  }, []);
  result; // [1, 3]
  ```
  심지어 filter 메서드 역할도 수행한다. 이 밖에도 sort, every, some, find 등의 메서드와 같은 동작을 수행한다고 하므로 다양하게 활용할 수 있다.

  #### 4. `reduceRight()`는 반대로 오른쪽부터 줄여나감.


- ### 조건으로 특정값을 찾는 메서드

  #### 1. `find(fn)`는 각 요소마다 콜백함수를 호출하여 조건을 만족하는 요소를 찾고, true가 되는 요소를 발견하면 즉시 중단. 조건에 만족하는 그 첫 번째 요소를 리턴함. 그런 요소가 없다면, undefined.

     > 비슷한 `findIndex()`는 조건에 맞는 요소의 인덱스를 반환함. 그런 요소가 없다면 `-1`이 반환됨

  #### 2. `filter(fn)`는 조건에 충족하는 요소 전체를 담은 배열을 반환함

  ```javascript
  let arr = [1, 2, 3, 4, 5];
  let newArr = arr.filter((item) => {
    return item % 2 === 0;
  });
  console.log(newArr); //[2, 4]
  ```

  #### 3. `every(fn)`는 배열 안의 **모든** 요소가 콜백함수 조건에 충족하는지 확인할 수 있는 메서드이다.

  #### 4. `some(fn)`은 배열 안의 요소 중 **하나라도** 콜백함수 조건에 만족하면 true를 반환하는 메서드이다.

  ```javascript
  let arr = [12, 30, 8, 2];
  arr.some((itme) => itme >= 10); //true
  ```

  #### 5. `sort(fn)`은 콜백함수의 조건에 따라서 요소를 재정렬하여 반환한다. 이때 <u>정렬함수</u>를 넘겨주지 않으면, 요소를 문자열로 취급하여 사전편집 순으로 정렬함. 자주 사용되는 오름차순 정렬 방법은 다음과 같다.

  ```javascript
  let arr = [19, 2, 25, 38, 5];
  arr.sort((a, b) => {
    return a - b;
  });
  console.log(arr); //[2, 5, 19, 25, 38]
  ```
  
  - 순서와 관련된 또다른 메서드: `reverse()`  
    : 배열의 순서를 반대로 뒤집는다.

##### 참조
(https://www.zerocho.com/category/JavaScript/post/5acafb05f24445001b8d796d)
