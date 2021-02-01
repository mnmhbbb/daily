##### 210131 공부한 내용
## 로또추첨기 실습
- 자바스크립트로 만들었던 로또추첨기를 리액트로 만들기.
- 어제 공부한 리액트의 라이프사이클을 심화해서 다뤄보았다.  
### 1. 컴포넌트 분리
- 랜덤으로 뽑힌 숫자에 따라 색깔을 결정하는 `Ball`컴포넌트
- 보통 반복문을 기점으로 컴포넌트를 분리함.
- 이 컴포넌트는 데이터를 갖거나 state를 다루는 값이 아니라서 간단하게 함수로 만들고
- 퓨어컴포넌트로 만들기 위해 `Ball`컴포넌트를 `memo`로 감싸줬다.
```javascript
//(부모 컴포넌트)
 <div id="결과창">
          {winBalls.map((v) => (<Ball key={v} number={v} />))}
        </div>

//(자식 컴포넌트)
import React, { memo } from "react";

const ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }
});

return (
  <div className="ball" style={{ background }}>{number}</div>
);

export default Ball;
```
- 이렇게 컴포넌트를 다른 컴포넌트로 감싸는 것을 `HOC(Higher Order Component)`라고 부른다.  
&nbsp;  
### 2. componentDidUpdate() 사용하기
- componentDidUpdate를 사용해서 당첨된 공들이 1초에 한 개씩 등장하게 할 것이다.
- 지난 시간에 배운 대로, props나 state 값 갱신에 따라 실행되는 메서드이다.
- 따라서 componentDidUpdate에서는 **조건문**이 아주 중요하다.
- 조건문을 적절히 작성해야 필요한 순간에만 업데이트시켜서 불필요한 리렌더를 막을 수 있다.
```javascript
  // init
  onClickRedo = () => {
    console.log("onClickRedo");
    this.setState({
      winNumbers: getNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };
  
componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate"); //함수 실행여부 테스트용
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }
```
- 중간중간에 콘솔로그를 찍어서 내가 원하는 순간, 필요한 순간에만 그 함수가 실행되고 있는지 확인할 필요가 있다.
- 위 코드는, 우리가 '한 번 더' 버튼을 클릭했을 때에만 공이 나타나는 동작이 실행되도록 만들었다.
- '한 번 더' 버튼을 클릭하면 `onClickRedo` 함수가 실행되는데, 그때 일어나는 state의 변화를 조건에 넣은 것이다.
- `this.bonus === null`이나 `this.redo===false`, 심지어 `this.timeouts.length===0`으로 조건을 넣어도 동일하게 동작한다.
- 단, 만일 조건문으로 작성하지 않으면 매번 `runTimeouts()`가 실행되는 문제가 발생함!
#### 2.1 각 함수에 콘솔로그를 찍어서 실행되는 순서 파악해보기
- 라이프사이클 부분이 조금 헷갈려서 제대로 짚고 넘어가고 싶었다.
```javascript
import React, { Component } from "react";
import Ball from "./Ball";

function getNumbers() {
  console.log("getNumbers"); // 이 함수의 반복실행여부를 확인하기 위함
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = []; //

  runTimeouts = () => {
    console.log("runTimeouts"); ////////////////////////////////////////
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  componentDidMount() {
    console.log("didMount"); /////////////////////////////////
    this.runTimeouts();
    console.log("로또 숫자를 생성합니다."); //////////////////////
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate"); /////////////////////////////
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  // init
  onClickRedo = () => {
    console.log("onClickRedo"); ///////////////////////////////////
    this.setState({
      winNumbers: getNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    console.log('render'); ////////////////////////////////////
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;

//console
1. getNumbers
2. render
3. didMount
4. runTimeouts
5. 로또 숫자를 생성합니다
6. render
7. didUpdate
6번과 7번 * 7번 반복(6개 뽑고 + 보너스 1개)
끝.  
```
+ 설명을 덧붙이자면,  
1: 맨처음 컴포넌트가 실행될 때, state 초기값 세팅한 부분이 실행되므로   
2: 이제 처음 렌더가 되면,   
3~5: `componentDidMount`가 실행된 상황  
6: 그때 `runTimeouts`안에 setState가 실행되니까 리렌더링이 됨  
  - 그래서 `componentDidUpdate`가 실행됨.   
  - *setState가 실행되면 componentDidUpdate()가 무조건 실행된다!*  
  - 단, `componentDidUpdate`안에 입력한 조건문에 해당하지 않아서 DidUpdate만 실행되는 것을 확인할 수 있다.
  - runTimeouts는 처음 `componentDidMount`일 때만 한 번 실행됨


여기서 '한 번 더' 를 클릭하면?

```javascript
//console
1. onClickRedo
2. getNumbers
3. render
4. didUpdate
5. runTimeouts
6. render
7. didUpdate
6번 7 * 6번 반복
끝.
```
1: `onClickRedo`가 실행되면,  
2: setState에서 state값들이 다시 세팅되고  
3~4: setState가 실행됐으니까 리렌더돼서 `componentDidUpdate`가 실행되고  
5: 이때 `componentDidUpdate`안에 입력한 조건문에 의해 `runTimeouts`가 실행됨  
6: 그 `runTimeouts`에 의해 다시 리렌더돼서 `componentDidUpdate`가 실행되지만  
  조건문에 해당하지 않기에 `runTimeouts`는 더이상 실행되지 않음. 이는 위와 동일함. 
&nbsp;  
&nbsp;  
### 3. hooks로 전환하기(useEffect, useMemo, useCallback)
클래스-훅스 라이프사이클 부분이 1대1로 대응하지 않아서 `useEffect`로 전환하기가 조금 까다롭다.  
- 지난 시간에 배운 내용을 복습하면, `useEffect`의 두번째 인자인 배열에 넣은 요소에 따라서 `useEffect`가 실행된다고 했음.
- 또한, return 이전의 코드는 `componentDidMount`+`componentDidUpdate`역할을,   
  return 이후는 `componentWillUnmount`역할을 함.
- 두 번째 인자인 배열에 넣은 값이 바뀔 때 `useEffect`가 실행된다.
- 두 번째 인자에 빈값을 주면: `componentDidMount`와 동일. 한 번만 실행됐다가 멈춤
- 두 번째 인자에 값을 주면: 일단 기본적으로 `componentDidMount`를 실행하고, 두 번째 인자에 넣은 값의 상태에 따라 `componentDidUpdate`까지 실행함.
- 여기서 조건이란 `componentDidUpdate`에 넣었던 조건을 의미함
- 참고로, 두 번째 인자에 꼭 state만 넣을 수 있는 것은 아니다. 
#### 3.1 useEffect
- 클래스와 동일한 조건인 `winBalls.length === 0` 을 배열에 넣었더니 초반 1,2번째 숫자가 중복되는 문제 발생!
- 초기값 `winBalls.length`가 0이라서. componentDidMount 실행되자마자, 저 조건에 충족하니까 한 번 더 실행되기 때문.
```javascript
  useEffect(() => {
    console.log("useEffect runTimeouts");
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]), setRedo(true);
    }, 7000);

    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); //이 부분 주의
```
- 일단 처음에 한 번만 실행이 되고, '한 번 더'를 클릭해서 `timeouts.current`가 빈값이 됐을 때, `useEffect`가 실행되도록.
- 여기서 헷갈릴 수 있는 게, `timeouts.current[i]` 부분은 값이 바뀌는 부분이 아님. (timeouts.current 배열의 요소로 넣어준거라서 바뀌는 거 아님)
- `onClickRedo`에서 `timeouts.current = [];` 이 부분이 변하는 값임. 직접 빈값을 넣어준거니까. 예전 값이랑 달라짐.
- 이렇게 `useEffect`에는 초기값이랑 완전히 달라지는 값을 두 번째 인자에 넣어야 한다.
#### 3.2 useMemo
- 클래스에서와 마찬가지로 함수에 콘솔을 찍어서 실행여부를 확인해보니,
- 당첨공이 나올 때마다, 즉 렌더가 될 때마다 getNumbers 함수가 실행되는 문제 발생.
- 훅스는 함수형 컴포넌트이기 때문에 전체가 다시 실행되니까.
- `const [winNumbers, setWinNumbers] = useState(getNumbers);` 이 부분이 다시 실행되는 것.
- 만일 이 함수가 길고 복잡한 함수였다면 심각한 렌더 문제가 있었을 것이다.
- 이 문제를 개선하는 것이 `useMemo` 이름 그대로 기억해두는 역할을 한다.
```javascript
const Lotto = () => {
  const lottoNumbers = useMemo(() => getNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
```
- getNumbers 함수의 리턴값을 기억하고. 두 번째 인자가 바뀌지 않는 한, 다시 실행되지 않는다.
- 그래서 처음 한 번만 실행되고 그 뒤로는 리턴값을 기억만 해둔다.
#### 3.3 useCallback
- `useCallback`은 그 함수 자체를 기억한다.
- 마찬가지로 두 번째 인자가 바뀌기 전까지는 다시 실행되지 않는다.
- 따라서 컴포넌트가 재실행돼도 그 함수가 새로 생성되지 않는다.
- 그로 인한 문제:
  - 두 번째 인자 배열에 아무 값도 넣지 않으면, 계속 기억만 하고 업데이트가 되지 않는다.
  - 따라서 적절히 값을 입력해야 원하는 대로 업데이트 할 수 있음.
  - 예를 들어, `onClickRedo` 함수를 `useCallback`으로 감싼다면 '한 번 더'를 클릭했을 때 다음 새로운 숫자를 불러오지 못한다.
  - 따라서 `useCallback` 안에서 쓰이는 `state`를 두 번째 인자에 넣어야 한다.
  ```javascript
    // init
  const onClickRedo = useCallback(() => {
    console.log("onClickRedo");
    setWinNumbers(getNumbers()),
      setWinballs([]),
      setBonus(null),
      setRedo(false);
    timeouts.current = [];
  }, [winNumbers]); //useCallback 안에서 쓰이는 state를 꼭 넣기
  ```
- `useCallback`을 꼭 사용해야 하는 경우: 자식 컴포넌트에 함수를 넘길 때.  
- 예를 들어 이 예시에서는 볼 컴포넌트한테 `onClickRedo`로 props를 넘길 때
```jvascript
 <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
    </>
```
- 만일 `useCallback`이 없으면 매번 새로운 함수가 생성됨.
- 자식 컴포넌트에 props로 매번 새로운 함수가 전달되면 자식 입장에서는 부모로부터 오는 props가 바뀌었네? 계속 함수가 바뀌니까 새로운 props를 주는 걸로 인식해서 매번 리렌더링을 해버림.
- 이런 쓸데없는 리레더링을 막기 위해, useCallback을 꼭 사용해야, 아 부모로부터 오는 함수가 매번 같구나.. 라고 인식함.
#### 3.4 use-
- 지금까지 공부한 내용을 간단히 정리하면, `use` 시리즈들은 두 번째 인자가 컨트롤한다는 것을 알 수 있다.
- `useMemo`는 두 번째 인자가 바뀌기 전까진 함수의 리턴값을 기억하고
- `useCallback`은 두 번째 인자가 바뀌기 전까진 그 함수 자체를 기억하고
- `useEffect`는 두 번째 인자가 바뀔 때 실행된다.
  - 정확히는 무조건 처음 한 번은 DidMount가 실행되고, 두 번째 인자가 바뀔 때 DidUpdate 역할을 함
  - `useEffect( ()=>{}, [] )` 이렇게 빈배열이면 DidMount만!
- 전시간에도 말했지만 useEffect 여러번 써도 되니까 내가 컨트롤하고 싶은대로 만들면 됨
#### 3.4.1 Tip
만약에 DidMount는 안하고 DidUpdate만 실행시키고싶다면?
```javascript
const mounted = useRef(false);

useEffect( ()=>{
  if(!mounted.current){
    mounted.currend = true;
  } else {
    //DidUpdate
  }
 }, [바뀌는 값]);
```
#### 3.5 훅스는 선언해주는 순서가 매우 중요하다.
- 훅스를 한 번 선언하면 그 순서를 지켜야 함. 
- 그래서 훅스는 절대 조건문 안에 넣지 말 것. 
- use-- 안에도 넣으면 안됨. 순서가 시시각각 바뀔 수 있으므로. 
- 순서가 확실히 정해진 반복문에는 넣어도 될 수도 있는데, 웬만하면 최상위에 빼서 실행순서가 항상 같게끔 할 것.
