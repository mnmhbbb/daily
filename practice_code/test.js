// async function a() {
//   console.log(2);
//   const a = await 1;
//   console.log(4);
//   console.log('a', a);
//   console.log('hmm');
//   await null;
//   const b = await Promise.resolve(1);
//   console.log('b', b);
//   return a + b;
// }

// console.log(1);

// a()
//   .then((result) => {
//     console.log(result); // 1
//   })
//   .then((result2) => {
//     console.log(result2); // undefined
//   });

// console.log(3);

// // 1 2 3 4 a 1 hmm b 1 2 undefined

// setTimeout을 promise로 만드는 함수
function delayP(ms) {
  // setTimeout을 Promise로 감싸서 원할 때 결괏값을 resolve
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
    resolve('hello');
    reject(new Error('에러')); // 에러처리할 경우
  });
}

async function a() {
  try {
    let test = await delayP(2000);
    console.log(test);
  } catch (error) {
    console.error(error);
  }
  // try catch 분리
  // then catch then then then then catch 와 동일
  try {
    await delayP(1000);
    await delayP(1000);
    await delayP(1000);
    await delayP(1000);
  } catch (error) {
    console.error(error);
  }
}
a();
