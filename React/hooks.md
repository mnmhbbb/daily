# React Hook
(zerocho님 강좌와 리액트 공식문서를 바탕으로 공부한 내용)  
- 지금까지 클래스 컴포넌트에 대해 공부했다면, 지금부터는 함수형 컴포넌트인 훅스에 대해 공부할 것이다.  
- 지난 구구단 게임 예제에서 만든 컴포넌트를 훅스로 바꾸면서 습득해보자.
## 1. 비교
```javascript
const { Component } = React
class GuGuDan extends Component {
        constructor(props) {
          super(props);
          this.state = {
            first: Math.ceil(Math.random() * 9),
            second: Math.ceil(Math.random() * 9),
            value: "",
            result: "",
          };
        }
```
위 코드는 클래스 컴포넌트 코드이다.
```javascript
const { useState } = React;
const GuGuDan = () => {
        const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
        const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
        const [value, setValue] = useState("");
        const [result, setResult] = useState("");
 };
```
위 코드는 배열의 구조분해할당을 활용한 훅스 방식

## 2. useState
```javascript
const [state, setState] = useState(initialState);
setState(newState);
```
- 상태 유지 값 `state`, 그 값을 갱신하는 함수 `setState`  
 (클래스에서는 setState() 함수 안에 객체를 반환하기도 했음)
- 최초로 렌더링을 하는 동안, 반환된 state는 첫 번째 전달된 인자(initialState)의 값과 같음(즉, 초기값)
- setState 함수는 state를 갱신할 때마다 사용. 새 state 값을 받아 컴포넌트 리렌더링을 큐에 등록함
- 다음 렌더링 시에 useState를 통해 반환받은 첫 번째 값은 항상 갱신된 최신 state가 됨

## 3. 함수적 갱신
- 이전 시간에 배운 '이전 값을 기반으로 다음 값을 만드는 경우' 함수 형식을 이용.
```javascript
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```
- ”+“와 ”-” 버튼은 함수 형식을 사용하고 있고, 이는 갱신된 값이 갱신되기 이전의 값을 바탕으로 계산되기 때문. 
- 업데이트 함수가 현재 상태와 정확히 동일한 값을 반환한다면 바로 뒤에 일어날 리렌더링은 완전히 건너뛰게 된다.
- 주의)  
  "클래스 컴포넌트의 `setState` 메서드와는 다르게, `useState`는 갱신 객체(update objects)를 자동으로 합치지는 않습니다.   
  함수 업데이터 폼을 객체 전개 연산자와 결합함으로써 이 동작을 복제할 수 있습니다."
- `setState`가 동기라면 호출될 때마다 렌더링이 발생했겠지만,  
  비동기이므로, `setState`를 하나로 모아서 처리함.  
- 리액트에서 렌더링이 한 번만 발생하도록 하기 위해 `setState`를 비동기로 만들었거든.  
  (지난 클래스 컴포넌트에서 setState에 함수를 넣은 것은 비동기로 진행되는 문제를 해결하기 위해)
