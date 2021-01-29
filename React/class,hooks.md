## class & hooks 컴포넌트 비교하기

### 1. 객체형 vs 함수형
- 클래스형 컴포넌트와 함수형컴포넌트(훅스)의 대표적 차이.
#### 1.1 클래스
- 클래스는 `state = { }` 객체 형식으로 한 번에 모아서 선언함.(따라서 호출할 때 this를 사용해야 함)
- 또한, `setState = { 여기에다가 어떻게 변화시킬지 입력 }` 마찬가지로 객체형으로 선언함.
- setState는 state를 갱신하는 함수.  
```javascript
//class
import React, {Component} from 'react';

class App extends Component {
  render() {
    const name = 'react';
    return <div className="react">{name}</div>
  }
}

export default App;
```  
&nbsp;  
#### 1.2 훅스
- 훅스는 `const [state, setState] = useState( 여기에 초기값 );` 함수를 사용하고 하나하나 나눠서 선언함.
- 그래서 `setState(어떻게 바꿀지)` 마찬가지로 함수형으로 작성함
- 예를 들어 `const [first, setFirst] = useState();`의 경우, state가 first, 이 변수의 전용 setState가 setFirst
```javascript
//hooks
import React from 'react';
import './App.css';

function App() {
  const name = 'react';
  return <div className = "react">{name}</div>
}

export default App;  
```  
&nbsp;    
### 2. 렌더링
- 클래스는 `render()`메서드를 사용하며, 이 부분만 리렌더링됨
- 훅스는 바로 `return`을 하는데, 전체가 리렌더링됨

### 3. import 
- 클래스 컴포넌트를 작성할 때는 리액트의 Component를 클래스에 상속시켜야 함.
```javascript
import React, { Component } from "react";
```
### 4. ref
- ref는 DOM에 직접 접근하고 싶을 때 사용함.  
- 클래스에서 ref를 사용하는 방법이 2가지가 있음.
#### 4.1 함수형  
- 함수니까 콘솔로그를 찍거나, 미세하게 조정하고 싶을 때 유용함.
```javascript
inputRef;
onRefInput = (c) => (this.inputRef = c);
this.inputRef.focus

<input ref={this.onRefInput} />
```
#### 4.2 createRef  
- 훅스와 같이 `current`를 붙여야 함.
```javascript
import React, { Component, createRef } from 'react';

inputRef = creatRef();
this.inputRef.current.focus();

<input ref={this.inputRef} />
```
#### 4.3 훅스에서는 `useRef`를 사용함
```javascript
import React, { useState, useRef } from "react";

const inputEl = useRef(null);
inputEl.current.focus();

<input ref={inputEl} />
```
