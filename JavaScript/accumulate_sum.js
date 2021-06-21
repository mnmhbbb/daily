// 배열의 누적 합 구하기
const arr = [
  { apple: 10 },
  { banana: 25 },
  { banana: 10 },
  { melon: 20 },
  { apple: 10 },
  { melon: 20 },
];

// 방법1
// Map, forEach
function accumulate(arr) {
  const map = new Map();

  arr.forEach((v) => {
    const [[key, value]] = Object.entries(v);
    if (map.has(key)) {
      map.set(key, map.get(key) + value);
    } else {
      map.set(key, value);
    }
  });

  return console.log(map);
}

accumulate(arr); //Map(3) {"apple" => 20, "banana" => 35, "melon" => 40}

// 방법2
// reduce, Object.entries, ??연산자
const result = arr.reduce((accu, curr) => {
  const [[k, v]] = Object.entries(curr);
  accu[k] = (accu[k] ?? 0) + v;
  return accu;
});

console.log(result); //{apple: 20, banana: 35, melon: 40}
