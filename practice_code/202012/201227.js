//객체를 독립적으로 복제하는 연습
// for...in
let foo = {
  name: "foo",
  age: 30,
};

let prop;
for (prop in foo) {
  console.log(prop);
  console.log(foo[prop]);
  console.log(prop, foo[prop]);
  console.log("-----------");
}

//for...in문으로 객체를 독립적으로 복제할 수 있다.
let clone = {};
for (let itsKey in foo) {
  clone[itsKey] = foo[itsKey];
}
console.log(clone);
clone.name = "yerin";
console.log(clone);
console.log(foo);

//Object.assign
let user = {
  name: "yerin",
  age: 20,
};
let clone2 = Object.assign({}, user);
console.log(clone2);
clone2.age = 25;
console.log(clone2);

//호이스팅: 스코프 내부 어디서든 변수 선언은 최상위에 선언된 것처럼 행동
