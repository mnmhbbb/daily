//콜백지옥의 예시
// const f1 = (callback) => {
//   setTimeout(function () {
//     console.log("1번 주문 완료");
//     callback();
//   }, 1000);
// };

// const f2 = (callback) => {
//   setTimeout(function () {
//     console.log("2번 주문 완료");
//     callback();
//   }, 3000);
// };

// const f3 = (callback) => {
//   setTimeout(function () {
//     console.log("3번 주문 완료");
//     callback();
//   }, 2000);
// };

// console.log("콜백지옥 시작");
// f1(() => {
//   f2(() => {
//     f3(() => {
//       console.log("끝");
//     });
//   });
// });

// 프로미스
// 프로미스는 기본적으로 객체이며, new Promise로 생성하고 두 개의 콜백함수 인자를 전달받음.
// const pr = new Promise((resolve, reject) => {
//   //code
// })

//new Promise 생성자 함수가 반환하는 프로미스객체는 state, result를 프로퍼티로 갖는다.
//초기엔 state: pending(대기), result: undefined였다가
//성공하여 resolve가 호출되면 fulfilled 상태가 되고 resolve 함수로 전달된 값을 result로 받는다.
//실패하여 reject가 호출되면 rejected 상태가 되고 reject 함수로 전달된 에러를 result로 받는다.

//프로미스의 예시
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

// console.log("프로미스 시작");
// f1()
//   .then((res) => f2(res))
//   .then((res) => f3(res))
//   .then((res) => console.log(res))
//   .catch(console.log)
//   .finally(() => {
//     console.log("끝");
//   });

//f1에서 res를 실행하면서 반환한 값 res("1번 주문 완료")이 f2로
//f2는 콜백함수를 받으니까. 여기서 그 받아온 값을 console.log로 호출하고
//여기서 또 반환한 값 res("2번 주문 완료")가 f3으로
//f3도 콜백을 받고, 그 메세지를 호출함
//f3에서 반환한 res("3번 주문 완료")는 직접 console.log를 찍어서 호출함
//이와 같은 코드를 프로미스 체이닝이라고 한다.

//프로미스 메서드
//1. Promise.all
//순차적이 아니라 동시에 실행하면, 가장 오래 걸리는 3초면 끝낼 수 있음
//하나라도 실패하면 곧바로 에러.
// console.time("시간");
// Promise.all([f1(), f2(), f3()]).then((res) => {
//   console.log(res);
//   console.timeEnd("시간");
// });
//시간: 3004.0791015625ms

//2. Promise.race
//하나라도 수행되면 거기서 중단
console.time("시간");
Promise.race([f1(), f2(), f3()]).then((res) => {
  console.log(res);
  console.timeEnd("시간");
});
//시간: 1002.58203125ms
//가장 빨리 수행된 결과를 보여줌

//이러한 프로미스 체이닝을 더 간결하게 만들어주는 것이 async, await 이다.
