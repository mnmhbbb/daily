2024.03.21.Thu.

가장 보편적으로 사용되는 정규표현식을 사용하면 safari에서 다음과 같은 에러가 발생한다.

```js
value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
```

> SyntaxError: Invalid regular expression: invalid group specifier name...

이전에도 이러한 크로스브라우징 이슈를 마주친 적이 있는데, toLocaleString을 사용해서 해결했었다.

```js
value.toLocaleString('ko-KR');
```

value에 반드시 정수만 온다면 이 방식을 쓰는 것이 간단하고 좋다. 이외에도 다양한 방법이 있지만, 새로운 기능을 알게 되어 정리하게 되었다.

만약 소수점이 있는 유리수가 올 수도 있다면 maximumFractionDigits를 사용하여 소수점을 지정할 수 있다.
[Intl.NumberFormat() constructor - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#maximumfractiondigits)
maximumFractionDigits는 숫자 포맷팅 메서드에서 사용된다. 주 목적은 숫자를 문자열로 변환할 때 표시할 소수점 이하 최대 자릿수를 지정하는 것. 반대로 최소 자릿수를 지정하는 minimumFractionDigits도 있다.

```jsx
value.toLocaleString('ko-KR', { maximumFractionDigits: 2 });
```

위와 같이 천단위 콤마를 찍으면서 동시에 소수점 자리수를 지정할 수 있다.

이 방법은 toFixed를 사용하는 것보다 유용한 것 같다. 기본적으로 toLocaleString을 사용하기 때문에 소수점을 지정함과 동시에 천단위 콤마나 통화 표시 등 다양한 포맷을 적용할 수 있기 때문이다.

```js
const num = 1234.567;

// 미국 달러로 통화 표시, 소수점 이하 두 자리까지 지정
const formattedNumber = num.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

console.log(formattedNumber); // "$1,234.57"
```

도움을 받은 글:

[https://okayoon.tistory.com/entry/숫자-천-단위-마다-콤마-찍어주세요-1000-소수점-숫자도-나와야해요-RegExr-toLocaleString-정규-표현식LookaheadLookbehind사파리-lookbehind-오류에-대해서](https://okayoon.tistory.com/entry/%EC%88%AB%EC%9E%90-%EC%B2%9C-%EB%8B%A8%EC%9C%84-%EB%A7%88%EB%8B%A4-%EC%BD%A4%EB%A7%88-%EC%B0%8D%EC%96%B4%EC%A3%BC%EC%84%B8%EC%9A%94-1000-%EC%86%8C%EC%88%98%EC%A0%90-%EC%88%AB%EC%9E%90%EB%8F%84-%EB%82%98%EC%99%80%EC%95%BC%ED%95%B4%EC%9A%94-RegExr-toLocaleString-%EC%A0%95%EA%B7%9C-%ED%91%9C%ED%98%84%EC%8B%9DLookaheadLookbehind%EC%82%AC%ED%8C%8C%EB%A6%AC-lookbehind-%EC%98%A4%EB%A5%98%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C)
