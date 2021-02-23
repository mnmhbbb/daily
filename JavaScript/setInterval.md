## setInterval 즉시 실행하기
- 시간을 나타내는 화면을 구현하고 있는데, `setInterval` 함수를 사용했을 때, 1초 지연되는 문제가 있었다.
```javascript
setInterval(timer, 1000);
//1초 뒤 시작
```
- 원인: 이벤트 루프에 의해서 setInterval 함수가 백그라운드에 가고 1초 뒤에 태스크큐로 이동하고, 호출스택에 들어가서 실행되기 때문이다.
- 즉, 1초 지연 후 실행된다.
- 원하는 함수를 즉시 실행시키기 위해 다음 함수를 만들자.
```javascript
function startInterval(seconds, callback) {
  callback();
  return setInterval(callback, seconds * 1000);
  
startInterval(1, timer);
```
- 위와 같이 콜백함수를 받아서 바로 실행시키는 함수 `startInterval`을 호출한다.
- 그러면 바로 timer 함수를 호출하고 return과 함께 setInterval을 시작하면서 이 함수는 종료된다.
- 이렇게 되면 원하는 대로 함수를 실행한 후 1초 지연되고 다시 실행하는 동작을 할 수 있게 된다.

#### 참조
https://itmining.tistory.com/70
