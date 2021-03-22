var a = 'a';

function logA(a = 'a') {
  var b = 10;
  return a + b;
}

// 타입 추론 - 인터페이스, 제네릭
interface Dropdown<T> {
  value: T
  title: string;
}
var items: Dropdown<number> = {
  value: 10,
  title: 'a'
}

interface DetailedDropdown<K> extends Dropdown<K> {
  description: string;
  tag: K;
}
var detailItems: DetailedDropdown<number> = {
  title: 'a',
  description: 'b',
  value: 'hi',
  tag: 'c'
}