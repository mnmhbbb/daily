2022.11.16.Wed.

#### Next.js Link

- Next.js에서 제공하는 `<Link>`를 사용하면 `<a>` 태그로 변환됨
- `<Link>`의 자식으로 커스텀 컴포넌트(ex: styled component a태그)을 사용할 때 꼭 `passHref` 속성을 쓸 것.
- `passHref`는 `<Link>`에서 하위 컴포넌트로 href 속성을 전달해주는 역할
- `<Link>`의 자식이 함수 컴포넌트인 경우 passHref를 사용하는 것 이외에도 `React.forwardRef`로 컴포넌트를 감싸야 함

```js
import Link from 'next/link';

// `onClick`, `href`, and `ref` need to be passed to the DOM element
// for proper handling
const MyButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      Click Me
    </a>
  );
});

function Home() {
  return (
    <Link href='/about' passHref>
      <MyButton />
    </Link>
  );
}

export default Home;
```

<br />

+) Next.js 13부터는 `<a>` 태그를 더이상 자식 요소로 필요하지 않는다. 그렇기 때문에 기본 태그에도 props를 전달할 수 있게 되었음

+) 추가
`router.push()` vs `<Link>` vs `<a>`

1. `router.push()`
   window.location과 비슷하게 동작함. `<a>`태그를 만들지 않기 때문에 해당 링크는 크롤링되지 않아서 SEO에 불리함

2. `<Link>`

- `<a>`태그를 생성하기 때문에 웹사이트가 크롤링되어 SEO에 유리함.
- 페이지를 다시 로드하지않고 SPA동작처럼 보이게 만듭니다.

3.  `<a>`
    페이지는 완전히 새로고침 되기 때문에 `<Link>`태그로 바꾸는 것이 좋다.
