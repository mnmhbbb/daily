function logMessage(value: string) {
  console.log(value);
}
function logMessage(value: number) {
  console.log(value);
}
function logMessage(value: any) {
  console.log(value);
}

// # Union 타입 문법 - `any` 보다는 명시적임
function logMessage(value: string | number) {
  console.log(value);
}

//타입가드
function logMessage(value: string | number) {
  if (typeof value === 'string') {
    value.toLocaleUpperCase();
  }
  if (typeof value === 'number') {
    value.toLocaleString();
  }
  throw new TypeError('value must be string or number')
}

// # Intersection 타입 문법
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}

function askSomeone(someone: Developer & Person) {
  someone.age;
  someone.name;
  someone.skill;
}

// Developer, Person 속성 모두를 가지는 새로운 타입 유형으로.
askSomeone({name: '개발자', skill: '웹 개발', age: 27})

// 유니온 타입의 경우
function askSomeone2(someone: Developer | Person) {
  someone.name; // O
  someone.age; // X
  someone.skill; // X
}

askSomeone2({name: '개발자', skill: '웹 개발'}); // Developer
askSomeone2({name: '디벨로퍼', age: 27}); // Person