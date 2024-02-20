// Proxy & Reflect
const person = {
  name: 'John',
  get name() {
    return this._name;
  },
  set name(value) {
    this._name = value;
  },
};

const handler = {
  get(target, property, receiver) {
    console.log(`Reading '${property}'`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    console.log(`Writing '${property}' as ${value}`);
    return Reflect.set(target, property, value, receiver);
  },
};

const proxiedPerson = new Proxy(person, handler);

console.log('before', proxiedPerson.name); // undefined

console.log('//');

proxiedPerson.name = 'Mina';
console.log('after', proxiedPerson.name); // Mina

// Reading name
// Reading _name
// before undefined

// Writing 'name' as Mina
// Writing '_name' as Mina
// Reading name
// Reading _name
// after Mina

const ref = (value) => {
  const refObject = {
    get value() {
      console.log(`value is ${value}`);
      return value;
    },
    set value(newValue) {
      // 값이 변경될 때 반응해야 하는 로직
      // 변경을 감지하고 의존하는 모든 리액티브 효과를 업데이트
      console.log(`set to ${newValue}`);

      value = newValue;
    },
  };
  return refObject;
};

console.log('---');

const count = ref(0);
console.log('before', count.value); // 0

count.value = 999;
console.log('after', count.value); // 999

console.log('---');

const reactive = (target) => {
  const handler = {
    get(target, property, receiver) {
      console.log(`Property '${property}' has been read.`);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      // 속성이 변경될 때 실행되는 로직, UI 업데이트 트리거 등
      console.log(`Property '${property}' set to ${value}.`);
      const result = Reflect.set(target, property, value, receiver);
      // 변경을 감지하고 의존하는 모든 리액티브 효과를 업데이트
      return result;
    },
  };

  // Proxy 객체 반환.
  return new Proxy(target, handler);
};

const state = reactive({
  count: 0,
});
console.log('before', state.count);

state.count = 999;
console.log('after', state.count);
