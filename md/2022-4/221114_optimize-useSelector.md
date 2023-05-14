2022.11.14.Mon.

#### 1. useSelector의 성능 최적화

- React.memo를 사용하여 컴포넌트를 최적화시킬 수 있음
- 컴포넌트를 메모이징하기 때문에 props가 바뀔 때만 재렌더링 됨
- 만약 useSelector 를 사용해서 데이터를 화면에 표시하는 경우에는 어떻게 되는지 검색해보았음

> 기본적으로, useSelector를 사용해서 리덕스 스토어의 상태를 조회 할 땐 만약 상태가 바뀌지 않았으면 컴포넌트가 리렌더링하지 않습니다.

- 만약 useSelector로 객체를 가져올 경우는 낭비 렌더링이 이루어짐.
- 상태가 바뀌었는지, 아닌지 확인할 수 없기 때문.
- 이럴 경우는 useSelector를 쪼개서 여러번 사용하는 방법과 `shallowEqual` 를 useSelector의 2번째 인자로 전달하는 방법이 있음.

```javascript
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

function CounterContainer() {
  const { number, diff } = useSelector(
    state => ({
      number: state.counter.number,
      diff: state.counter.diff
    }),
    shallowEqual
  );
```

- 이전 값과 다음 값을 비교하여 **true**가 나오면 리렌더링을 하지 않고 **false**가 나오면 리렌더링 함.
- shallowEqual은 react-redux에 내장되어있는 함수
- 객체 안의 가장 겉에 있는 값들을 모두 비교(얕은 비교)

출처: https://react.vlpt.us/redux/08-optimize-useSelector.html

<br />

#### 2. shallowEuqal을 위한 custom Hook

- 매번 `shallowEuqal`을 입력하기 귀찮기 때문에 커스텀 Hook을 만들어 사용

```js
function useMySelector(selector){
    //useSelector 훅과 shallowEqual을 사용한 것을 return해줍니다.
    return useSelector(selector,shallowEqual);
}

function MyCompoenent(){
    //위에서 선언한 useMySelector 훅으로 첫 번째 인자로 (state=> ... ) 들을 전달해주면
    //반환값으로는 shallowEqual을 사용하여 비교한 값으로 return해줍니다.
    const[value1, value2] = useMySelector(state => [state.value1,state.value2];
    const value3 = useMySelector(state=> state.value3);
    const [value4] = useMySelector(state => [state.value4]);
}
```

출처: https://2ham-s.tistory.com/342
