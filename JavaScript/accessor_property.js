const person = {
  firstName: 'Winter',
  lastName: 'Kim',

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(name) {
    // this.firstName = name.split(' ')[0];
    // this.lastName = name.split(' ')[1];
    // 배열 구조분해할당:
    [this.firstName, this.lastName] = name.split(' ');
  },
};

console.log(person.firstName + ' ' + person.lastName); // Winter Kim

// 접근자 프로퍼티를 통한 프로퍼티 값 저장
// 다음과 같이 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출됨.
person.fullName = 'Summer Lee';
console.log(person); // {firstName: 'Summer', lastName: 'Lee'}

// 접근자 프로퍼티를 통한 프로퍼티 값 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출됨.
console.log(person.fullName); // Summer Lee

// firstName과 lastName은 일반적인 데이터 프로퍼티
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {value: 'Summer', writable: true, enumerable: true, configurable: true}

// fullName은 접근자 프로퍼티
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
// {enumerable: true, configurable: true, get: ƒ, set: ƒ}

// 일반 객체의 __proto__는 접근자 프로퍼티
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {enumerable: false, configurable: true, get: ƒ, set: ƒ}

// 함수 객체의 prototype은 데이터 프로퍼티
Object.getOwnPropertyDescriptor(function () {}, 'prototype');
// {value: {…}, writable: true, enumerable: false, configurable: false}

const person2 = {};

// 만약 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값.
Object.defineProperty(person2, 'firstName', {
  value: 'John',
  writable: true,
  enumerable: true,
  configurable: true,
});

Object.defineProperty(person2, 'fullName', {
  get() {
    return this.firstName;
  },

  set(name) {
    this.firstName = name;
  },
});
