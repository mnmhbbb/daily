# 구구단 게임으로 state 연습하기
(zerocho님 리액트 기본 강좌를 보고 공부한 내용 정리)

## 1. 시작
- 완성할 구구단 게임의 모습  
  - (첫 번째 숫자) 곱하기 (두 번째 숫자) 는?  
    (입력할 부분) <버튼>  
    (정답여부)정답/땡
- 바뀌는 부분과/바뀌지 않는 부분을 나눠서 바라보는 관점이 필요함
- 바뀌는 부분은 `state` 객체에 초기값을 생성해줌
  ```javascript
  class GuGuDan extends React.Component {
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
- 이 값을 JSX에서 적절한 곳에 입력한다.
  ```javascript
  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.first}곱하기{this.state.second}는?
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="number" value={this.state.value} onChange={this.onChange} />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </React.Fragment>
    );
  }
  ```  
&nbsp;  
## 2. 클래스메서드 생성
  - 위 코드에 `onSubmit`, `onChange`와 같은 이벤트함수를 발견할 수 있는데, 길고 복잡한 코드는 따로 클래스메서드에 생성한 뒤 호출하는 것이 효율적이다.
  - `setState`가 호출될 때마다 렌더링이 진행되기 때문이기도 함(리렌더링될 때마다 함수가 실행되는 비효율을 방지함)
  ```javascript
  onChange = (e) => {
    this.setState({ value: e.target.value });
  };
  ```  
&nbsp;  
## 3. 함수형 setState
  - 바뀔 `state` 상태는 `setState`를 이용하여 수동적으로 컨트롤함
  ```javascript
  onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
      //setState 객체
        this.setState({
          result: `정답! ${this.state.value}`,
          value: "",
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
        });
      });
    } else {
      this.setState({
        result: "땡! 다시 입력하세요",
        value: "",
      });
    }
  };
  ```
  - 위와 같이 조건에 따라 상태가 바뀔 부분을 지정해준다.
  - 현재 `setState` 안에 객체형으로 입력했는데, 이는 다음과 같이 함수를 사용하는 것이 더 좋다.
  ```javascript
   this.setState( (prevState) => {
   	return {
            result: `정답! ${prevState.value}`,
            value: "",
            first: Math.ceil(Math.random() * 9),
            second: Math.ceil(Math.random() * 9),
     }
   });
  ```
  - `result`의 `this.state.value`은 이전 state 값을 의미하고,  
    아랫줄부터 나오는 state는 그 다음 state 값을 의미한다.  
  - 하지만, 리액트는 이벤트가 끝날 시점에 state를 일괄적으로 업데이트한다.(비동기)  
    그래서 이전 값 `prevState`를 사용하여 리턴하는 함수로 변경하였다.  
  - 그러므로, `setState`에서 이전 값을 기반으로 다음 값을 바꿀 때는 `함수`를 사용하자.
  - 함수를 사용하면 이전 값을 매개변수로 하여 접근할 수 있기 때문이다.   
  - 중요! `setState`는 호출 될 때마다 발생하는 불필요한 리렌더링을 줄이고, 성능 향상을 위해 **비동기적**으로 이루어진다.
&nbsp;  
## 4. ref
  - 값을 입력할 때마다 input에 focus를 주고 싶다면, 
  - 즉, DOM에 직접 접근하고 싶을 때, `ref`를 사용한다.
  ```javascript
  input;
  onRefInput = (c) => (this.input = c);
  ```
  ```html
  <input ref={ (c) => { this.input = c; } } />
  ```
  
  - 그런 다음 원하는 위치에 `this.input.focus();`를 입력한다.
  ```javascript
  document.querySelector('input').focus();
  ```
  - 그렇게 하면 이와 같은 코드를 입력하지 않아도 된다.
