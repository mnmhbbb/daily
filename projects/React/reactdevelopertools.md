## 리액트 개발 툴 
##### zerocho님의 강좌를 보고 공부한 내용
### 0. React Developer Tools
- 브라우저의 확장 프로그램으로 **React Developer Tools**를 설치하면 정확한 state 상태를 확인할 수 있고, 리액트로 만들어진 웹페이지에 대한 정보를 읽을 수 있다.
- 참고로, 아이콘이 빨간색인 이유는 내가 현재 개발용으로 빌드했기 때문이며, 배포용은 파란색이라고 함.
- 개발/배포용 버전은 지난 웹팩시간에 공부한 webpackage.config.js에서 변경할 수 있음
### 1. shouldComponentUpdate
- 리액트개발툴의 설정에서 highlight update에 체크를 하면, 렌더가 될 때마다 컴포넌트의 색깔이 변하는 것을 확인할 수 있다.
- 만일 렌더가 될 필요가 없는 부분이 렌더가 된다면 성능에 안좋은 영향을 줄 수 있다.
- 이때 리액트에서 제공하는 `shouldComponentUpdate` 메서드를 사용하여 어떤 경우에 리렌더링을 해야 하는지 지시할 수 있다.
```javascript
shouldComponentUpdate(nextProps, nextState, nextContext){
  if(this.state.counter !== nextState.counter) {
    return true;
  }
  return false;
}
```
- 이와 같이 내가 원하는 상황에서만 렌더가 일어나도록 지시할 수 있다.
### 2. PureComponent
- 위와 같은 기능을 하는데, 클래스의 Component 대신 `PureComponent`를 입력하면 `shouldComponentUpdate`를 자동으로 구현한다.
- 리액트가 state나 props의 변화를 감지하고, 변화가 생겼을 때만 동작을 하는 것.
- 단, 객체나 배열이 복잡하게 들어간 구조는 잘 판단하지 못 함.
```javascript
//bad
class Test extends Component {
  state = {
     counter: 0,
     array: [],
   }
   
 onClick = () => {
  const array = this.state.array;
  array.push(1);
  this.setState({
  array: array
  });


//good
class Test extends Component {
  state = {
     counter: 0,
     array: [],
   }
   
 onClick = () => {
  this.setState({
    array: [...this.state.array, 1]
    });
```
- ["불변성"](https://github.com/mnmhbbb/daily/blob/main/React/push.md)에서 공부한 것처럼 예전 배열을 그대로 가져와서 쓰면 리액트가 변화를 감지하지 못 함
- 반드시 **새로운 배열**을 만들어줘야 한다.
### 3. memo
- 그렇다면 훅스의 경우에는 어떻게 사용할 수 있을까
- 컴포넌트를 `memo`로 감싸주면 동일하게 동작한다.
```javascript
import React, { memo } from "react";

const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;
```
- 그러나 리액트개발툴의 하이라이트 옵션이 아주 정확하지는 않기 때문에, 진짜 리렌더링 여부를 알아보려면 render 부분에 콘솔로그를 넣어보는 방법도 사용하자.
