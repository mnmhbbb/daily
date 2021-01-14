# 1. 프로미스
## 1.1 프로미스 이전에... 
- 태초에 **콜백지옥**이 있었다...
- 다음은 콜백지옥의 예시이다.
```javascript
const f1 = (callback) => {
  setTimeout(function () {
    console.log("1번 주문 완료");
    callback();
  }, 1000);
};

const f2 = (callback) => {
  setTimeout(function () {
    console.log("2번 주문 완료");
    callback();
  }, 3000);
};

const f3 = (callback) => {
  setTimeout(function () {
    console.log("3번 주문 완료");
    callback();
  }, 2000);
};

console.log("콜백지옥 시작");
f1(() => {
  f2(() => {
    f3(() => {
      console.log("끝");
    });
  });
});

//콜백지옥 시작
//(1초 뒤)
//1번 주문 완료
//(3초 뒤)
//2번 주문 완료
//(2초 뒤)
//3번 주문 완료
//끝
```
(정말 지옥같은 코드)
- 위와 같이 연속적으로 콜백함수를 사용하여 가독성이 떨어지는 코드를 보완하기 위해 프로미스를 사용한다.  
&nbsp;
&nbsp;
## 1.2 프로미스
- 프로미스는 기본적으로 객체이며, `new Promise`로 생성하고, 두 개의 콜백함수를 인자로 받는다.
```javascript
const pr = new Promise((resolve, reject) => {
  //code
})
```
- `new Promise` 생성자 함수로 반환된 프로미스 객체는 기본적으로 `state`, `result` 프로퍼티를 갖는다.
- 초기엔 `state: pending`, `result: undefined` 상태이다.
- 성공하여 `resolve`가 호출되면 `state: fulfilled` 상태가 되고, `resolve`함수로 전달된 값을 `result`로 받는다.
- 실패하여 `reject`가 호출되면 `state: rejected` 상태가 되고, `reject`함수로 전될된 에러를 `result`로 받는다.
- 다음은 프로미스의 예시이다.
```javascript
const f1 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("1번 주문 완료");
    }, 1000);
  });
};

const f2 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("2번 주문 완료");
    }, 3000);
  });
};

const f3 = (message) => {
  console.log(message);
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("3번 주문 완료");
    }, 2000);
  });
};

console.log("프로미스 시작");
f1()
  .then((res) => f2(res))
  .then((res) => f3(res))
  .then((res) => console.log(res))
  .catch(console.log)
  .finally(() => {
    console.log("끝");
  });
```
- 코드를 설명하자면,   
  `f1`에서 `res`를 실행하면서 반환한 값 `res("1번 주문 완료")`이 `f2`로 가게 된다.  
  `f2`는 콜백함수를 받으니까. 그래서 여기서 받아온 값을 console.log로 호출하고,  
  여기서 또 반환된 값이 `f3`의 콜백함수로 전달되어 console.log로 호출되며,  
  마지막으로 `f3`에서 반환한 `"3번 주문 완료"`는 console.log를 찍어서 호출한다.  
- 이와 같은 코드를 `프로미스 체이닝`이라고 한다.
&nbsp;
&nbsp;
## 1.3 프로미스 메서드
### 1.3.1 `Promise.all`
- 순차적으로 진행하는 것이 아니라, 동시에 실행하면 3초면 끝낼 수 있게 해준다.  
  (예시 코드에서 가장 오래 걸리는 시간이 3초)
- 하나라도 실패하면 곧바로 에러로 연결된다.
```javascript
console.time("시간");
Promise.all([f1(), f2(), f3()]).then((res) => {
  console.log(res);
  console.timeEnd("시간");
});
```
- `console.time`을 이용하면 소요되는 시간을 체크할 수 있는데,  
  위 코드로 실행할 경우 `시간: 3004.0791015625ms`의 결과가 나온다.
&nbsp;
### 1.3.2 `Promise.race`
- 가장 빨리 수행된 결과를 보여준다.
- 하나라도 수행되면 거기서 중단한다.
```javascript
console.time("시간");
Promise.race([f1(), f2(), f3()]).then((res) => {
  console.log(res);
  console.timeEnd("시간");
});
```
- 위 코드로 실행할 경우 `시간: 1002.58203125ms`의 결과가 나온다.
- 이러한 프로미스 체이닝을 더 간결하게 만들어주는 것이 `async`, `await`이다.
