#### 210201 리액트 공부
## 틱택토 게임 실습 - useReducer
### 1. state의 개수를 줄여주는 useReducer

```javascript
// before
const TicTacToe = () => {
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState("O");
  const [tableDate, setTableDate] = useState([['','',''],['','',''],['','','']])
  
//after
const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
```
- `useReducer`는 여러개의 `state`와 `setState`를 각각 하나로 통일하여 관리할 수 있게 해준다.
- 리덕스에 있는 개념을 도입한거라고 함.
- 아래에서 전체적인 흐름을 이해해보자.
```javascript
const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

const reducer = (state, action) => { 
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };
      
      ...
}

export const SET_WINNER = "SET_WINNER";

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: "O" });
  }, []);
  
  ...

return (
    <>
      <Table onClick={onClickTable} />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
```
1. `useReducer(reducer, initialState)`에서 `initialState`는 초기값 state,   
  `reducer`는 함수, state를 어떻게 변경할지 적는 곳(setState와 비슷)  
  현재 상태(state)와 액션 객체(action)를 파라미터로 받아와서 새로운 상태를 반환함.
2. `dispatch`는 `action`객체를 포함하고 있으며, 액션을 실행시키는 역할을 한다.
3. 그 `action` 객체에 포함된 `type`이 해당 액션의 이름을 의미하며, 대문자로 표현한다.   
  또한, `action` 객체에는 state를 포함하고 있음
4. `dispatch`가 `action`을 실행할 때마다 `reducer`가 실행되며 `reducer`에서 정의한대로 state 값이 갱신됨.
5. 현재 `reducer`에서 `action.type` 즉, 액션의 이름에 따라 리턴하는 값을 다르게 정의하고 있음   
  (액션을 실행하면 그 액션을 구별해서 state를 어떻게 바꿀지...)
6. 이전 시간에도 강조했던 것처럼 리액트에서는 **불변성**이 중요한 개념이다.   
  기존 state를 바꾸지 않고, 새롭게 객체를 만들어서 변경될 값만 바꿔야 한다.   
  따라서 `...state`로 기존 state를 복사해오는 것.
7. return에서는 `state.`를 붙여야하고, 구조분해할당을 사용하면 간략하게 사용할 수 있다.
- 정리하면: 어떤 이벤트가 발생됨에 따라 `state`가 변경되는데, 이 `state`는 직접 수정할 수 없음.  
  수정하려면 `action`을 만들어서 실행(dispatch)해야 하고, 이 액션을 어떻게 처리할지는 `reducer`에서 관리한다.
### 2. 컴포넌트 연결
- 현재 `TicTacToe` 컴포넌트가 가장 상위 컴포넌트이고, 그 아래로 `Table`, `Tr`, `Td` 순으로 형성되어있다.
- 유저가 실제로 클릭하는 칸은 `Td`인데, 이를 가장 상위 `TicTacToe`가 관리하는 구조라서 비효율적임
- 이 부분을 개선하는 기능이 `context API`인데 다음 시간에 공부할 예정.
