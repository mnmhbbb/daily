#### 210202 리액트 공부
## Context API 
- 지난 틱택토 실습에서 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달할 때, 일일이 전달해야 하는 불편함이 있었다.
- `Context API`를 통해 모든 하위 컴포넌트로 간편하게 값을 전달하게 된다.
```javascript
import React, { useEffect, useReducer, createContext, useMemo } from "react";

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});
```
- `creatContext`에 초기값들을 넣어주고,
```javascript
return (
    <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
```
- 이렇게 `provider`로 묶어야 하위컴포넌트에서 데이터에 접근할 수 있게 됨
- 그 데이터를 `value={}`에 넣음.
- 이 데이터가 하위컴포넌트에게 바로 전달될 값이다.
- 그런데 `value`에 이렇게 값을 직접 넣으면 렌더할 때마다 새로운 객체를 생성하기 때문에 성능 최적화에 좋지 않다.
- 따라서 value 변수를 만들고 `useMemo`를 사용하여 값을 기억하도록 하자.
```javascript
const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, timer, result } = state;

  const value = useMemo(() => ({ tableData, dispatch }), [tableData]);
  
   return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
```
- 그러면 이제 하위컴포넌트인 `Form`에서 이 데이터에 접근할 수 있게 됐으니까,
```javascript
import React, { useState, useCallback, useContext, memo } from "react";
import { TableContext } from "./MineSearch";

const Form = memo(() => {
  const { dispatch } = useContext(TableContext);
```
- `useContext`를 사용하여 불러오고
```javascript
  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine });
  }, [row, cell, mine]);
```
- 원하는 값을 넣을 수 있게 된다.
