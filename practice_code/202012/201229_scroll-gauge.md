# 상단 스크롤 게이지 연습
(구독하고 있는 뉴스레터 사이트의 상단바 스타일을 보면서 만들어보고 싶다는 생각을 하였음)  
## 구현 사항
![scroll bar](https://user-images.githubusercontent.com/66292371/104364566-23255980-555a-11eb-9ced-72d943d58548.gif)
1. 처음엔 보이지 않다가, 일정 높이가 지나면 스크롤 게이지가 보임
2. 현재 스크롤 위치에 따라서 게이지가 변경됨
```javascript
const bar = document.querySelector(".progress-bar");
const first = document.querySelector(".first");
const firstHeight = first.getBoundingClientRect().height;
const gauge = document.querySelector(".progress-gauge");

document.addEventListener("scroll", () => {
  if (window.scrollY > firstHeight / 2) {
    bar.classList.remove("invisible");
  } else {
    bar.classList.add("invisible");
  }
  function getScroll() {
    return (
      ((window.scrollY + window.innerHeight) /
        document.documentElement.scrollHeight) *
      100
    );
  }
  gauge.style.width = `${getScroll()}%`;
});
```
- 구현하는 방법 자체는 어렵지 않았다. 
- 다음 방법을 통해 각 기능의 값을 알아냈다.
- `window.scrollY` : 현재 스크롤된 높이
- `getBoundingClientRect` : 해당 객체의 크기
- `document.documentElement.scrollHeigth` : 문서 전체의 높이값
- `window.innerHeight` : 현재 보고 있는 화면의 높이
