## push를 사용하지 말자(불변성)
- 리액트의 렌더링 기준은 `이전 상태와 현재 상태를 비교하여 다른 점이 있을 때` 렌더가 실행된다.
- 따라서 배열에 단순히 `push`를 사용하면 리액트가 변화를 감지하지 못한다.
- 아래와 같이 true가 뜨면 바뀐 게 없다고 생각하고 렌더하지 않음
```javascript
//bad
const array = [];
array.push(1);
arr // [1]

arr === arr // true 
```
- 아래와 같이 새로운 배열을 만들어야 변화를 감지하고 새롭게 렌더함.
```javascript
//good
const arr = [1];
const arr2 = [...arr, 2];
arr2 // [1, 2]

arr === arr2 //false
```
- 따라서 숫자야구 게임 실습에서도 이 방법을 사용했다.
```javascript
//before
this.setState({
          tries: [
            ...this.state.tries,
            {
              try: value,
              result: `${strike} 스트라이크, ${ball} 볼 입니다.`,
            },
          ],
          value: "",
        });

//after
  this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              {
                try: value,
                result: `${strike} 스트라이크, ${ball} 볼 입니다.`,
              },
            ],
            value: "",
          };
        });
      }
```
- 단, 여기서 이전에 배운 `prevState`를 사용한다.
- setState는 비동기이기 때문에 이전 상태값을 바탕으로 새로운 값을 만들 때 이렇게 리턴하는 함수형으로 사용해야 한다.
- 위 예시는 이전값을 받아와서 현재 시도한 값을 추가로 담는 방식이다.
