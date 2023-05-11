2022.09.26.Mon.

1. 외부미팅 기능 계산 각종 버그
2. 외부미팅 기능 본 서버 적용(release v0.2.0)

- 글자가 width보다 커질 경우 말줄임표
  - 해당 글자에 다음 css 속성을 적용
  ```css
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  ```
