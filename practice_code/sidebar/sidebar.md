## 사이드바 만들기

- ![sidebar]('./sidebar.gif')
- html, css를 이용해서 사이드바 만들기 실습을 했다.
- `input` 태그의 `check` 타입 속성을 활용한 방법으로도 가능하다는 게 놀라웠다.
- `input`과 `label`을 연결하고 `label`이 클릭될 때마다 다음과 같은 변화를 주었다.

```css
input#sidebar:checked ~ header label {
  background-position: -24px 0;
}

input#sidebar:checked ~ .sidebar_content {
  right: 0;
}

input#sidebar:checked ~ .background {
  opacity: 1;
  visibility: visible;
}
```
