## Warning: Prop className did not match. ... 
- Next.js에서 styled-components를 사용해서 스타일을 적용하려고 했는데, 위와 같은 에러메세지가 발생했다.
- 검색한 결과, 서버에서 받은 클래스이름과 클라이언트에서 작동하는 클래스이름이 일치하지 않아서 발생한 문제라고 한다.
- 서버사이드렌더링을 하기 때문에 발생할 수 있는 문제였다.
- `npm i -D babel-plugin-styled-components`를 설치하여 서버와 클래스 각각의 클래스이름을 일치시킬 수 있다.
- `.babelrc` 를 생성하여 다음과 같이 바벨 설정을 하여 해결하였다.
```javascript
{
  "presets": ["next/babel"],
  "plugins": ["babel-plugin-styled-components"]
}
```


##### 참조: https://velog.io/@hwang-eunji/Styled-components-nextjs%EC%97%90%EC%84%9C-className-%EC%98%A4%EB%A5%98
