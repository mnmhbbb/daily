## props
- props는 부모 컴포넌트가 자식 컴포넌트에게 주는 값을 의미함
- html의 attribute 같은 느낌
- 숫자야구 만들기 실습을 하면서 사용한 코드를 예시로,
- `NumberBaseBall` 컴포넌트에서 `map` 반복문을 사용하였는데, 여기서 사용한 인자를 `Try`컴포넌트로 넘기기 위해 연결고리로 props를 사용했다.
```javascript
//NumberBaseBall.jsx
import React, { Component, createRef } from "react";
import Try from "./Try";
class NumberBaseBall extends Component {
  //code...
  
render() {
    const { tries } = this.state;
    return (
       <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도: `} tryInfo={v} />;
          })}
       </ul>
    );
  }
  
//Try.jsx
import React, { Component } from "react";

class Try extends Component {
  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default Try;
```
- `Try`컴포넌트 입장에선 v 인자가 어떤 값인지 알 길이 없기 때문.(map의 콜백함수 두번째인자는 인덱스를 의미)
- `{tries.map((v, i) => { return <Try key={`${i + 1}차 시도: `} tryInfo={v} />; })}`에서  
  `<Try key={`${i + 1}차 시도: `} tryInfo={v} />` 이 부분  
- `tryInfo`를 사용하여 props를 넘기면 자식컴포넌트에서는 `this.props.tryInfo`로 사용할 수 있다.
- 훅스의 경우는 `props.tryInfo`로 받아서 사용한다.
- 참고로 map 메서드를 사용할 땐 고유한 **key**값을 반드시 명시해줘야 한다.
- `props`는 직계자식에게만 줄 수 있으며, 자식컴포넌트는 이 값을 수정할 수 없다. 수정은 오직 부모컴포넌트만 가능.
- 점점 넘겨야 할 하위컴포넌트가 많고 깊어질수록 복잡한 문제가 생기는데, 이 문제는 컨텍스트와 리덕스로 개선할 수 있음.
### 1. 만일 수정해야 할 일이 생긴다면?
#### 1.1 훅스의 경우는 state를 활용.
- props를 state로 만든 뒤에 setState를 사용하여 변경함.
```javascript
const Try = memo(({ tryInfo }) => {
  const [result, setResult] = useState(tryInfo.result);

  const onClick = () => {
    setResult("1");
  };

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{result}</div>
    </li>
  );
});
```
#### 1.2 클래스의 경우
1. state에서 값을 바꿈
```javascript
lass Try extends PureComponent {
   state = {
     result: this.props.result,
     try: this.props.try,
   };
  
  render() {
    const { tryInfo } = this.props;
      return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
 }
 ```
2. `constructor`메서드
 - 함수의 장점인 정밀한 컨트롤이 가능하다는 점을 활용할 수 있다.
 ```javascript
 class Try extends PureComponent {
  constructor(props){
   super(props);
   
   //다른동작
   const filtered = this.props.filter(()=>{ 
   });
   
   this.state = {
     result: filtered, //필터링한 것을 여기에 넣어주기
     try: this.props.try,
   };
  }
  
  render() {
    const { tryInfo } = this.props;
      return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
 }
}
```
