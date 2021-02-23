## 고차함수(higher order function)
- 함수를 인자로 전달받거나 함수를 결과로 반환하는 함수
- 인자로 받은 함수를 필요한 시점에 호출하거나 클로저를 생성하여 반환한다.
- 외부 상태 변경이나 가변(mutable) 데이터를 피하고, 불변(Immutability)을 지향하는 함수형 프로그래밍에 기반을 두고 있기 때문에 리액트에서도 자주 쓰인다.
- 함수형 프로그래밍의 순수 함수와 보조 함수의 조합을 통해 복잡성을 해결하고 변수의 사용을 억제하여 상태 변경을 피할 수 있다.
### 예시1

```javascript
// 함수를 인자로 전달받고 함수를 반환하는 고차 함수
function makeCounter(predicate) {
  // 자유 변수. num의 상태는 유지되어야 한다.
  let num = 0;
  // 클로저. num의 상태를 유지한다.
  return function () {
    // predicate는 자유 변수 num의 상태를 변화시킨다.
    num = predicate(num);
    return num;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// makeCounter는 함수를 인수로 전달받는다. 그리고 클로저를 반환한다.
const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```
### 예시2
배열에서 사용하던 다양한 메서드들이 사실은 고차함수를 활용한 것이었다.(배열 내장 고차함수)
```javascript
const array1 = [1, 3, 5, 7];
const map1 = array1.map(x => x * 2);

console.log(map1);//  [2, 6, 10, 14]
```
### 예시3
지난 리액트 웹게임 실습에서 클릭 이벤트함수를 다음과 같이 사용하였다.
```javascript
 onClickBtn = (choice) => () => {
   const myScore = scores[choice]; //ex: 바위를 클릭했으면 0
   const computerChoice = (imgCoord) => {
     return Object.entries(rspCoords).find((v) => {
         return v[1] === imgCoord;
     })[0];
   };
// 1. before
onClickBtn = (choice) => { }
<button id="rock" className="btn" onClick={() => this.onClickBtn("바위")}>
// onClick 메서드 안에 함수를 호출하는 부분이 들어있는 상태

// 2. after(함수를 연달아 쓰는 고차함수 패턴)
onClickBtn = (choice) => () => { }
<button id="rock" className="btn" onClick={this.onClickBtn("바위")}>
```


##### 참조
[배열 고차함수](https://poiemaweb.com/js-array-higher-order-function)
[고차함수](https://velog.io/@blackwidow/4-3-%EA%B3%A0%EC%B0%A8%ED%95%A8%EC%88%98)
