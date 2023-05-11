2022.11.02.Wed.

lodash를 사용해서 오브젝트 어레이를 정렬하는 작업

```js
const items = [
  { name: 'foo', age: 28 },
  { name: 'bar', age: 20 },
  { name: 'baz', age: 23 },
];

_.sortBy(items, 'age');
```
