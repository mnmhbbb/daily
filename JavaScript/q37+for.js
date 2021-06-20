const input = '소정 소정 예린 예린 예린 예린 은비 은비';
const data = input.split(' ');
console.log(data);

// 객체
const obj = {};

for (let key of data) {
  let value = data[key];
  obj[value] === undefined ? (obj[value] = 1) : (obj[value] += 1);
}

console.log(obj); // {undefined: 8}

// 그러나 for ... in 으로 해야
// 원래 원하는대로
// { 소정: 2, 예린: 4, 은비: 2} 가 나온다.

// for ... in 과 for ... of의 정확한 차이는?
// for ... in은 객체 순환
// for ... of는 배열 순환 인데
// 배열에 for ... in문을 사용하면 배열도 객체니까 배열의 index에 접근한다.

const abc = ['소정', '소정', '예린', '은비'];
for (let key in abc) {
  console.log(key);
}
// 0 1 2 3

const abc = ['소정', '소정', '예린', '은비'];
for (let key of abc) {
  console.log(key);
}
// 소정 소정 예린 은비

// 둘다 배열인데
// for...in을 사용하면 index가,
// for...of를 사용하면 배열의 값이 나오는 것으로 보아,
// for...in은 객체의 속성에 접근하고
// for...of는 배열의 '값'에 접근한다는 사실을 알 수 있게 됐다.

// 비슷한 예로 forEach 또한 배열의 '값'에 접근한다.
abc.forEach((i) => {
  console.log(i);
});
// 소정 소정 예린 은비
