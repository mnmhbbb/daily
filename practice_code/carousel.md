# 캐러셀 슬라이드 연습
![carousel](https://user-images.githubusercontent.com/66292371/104826944-65250700-589c-11eb-9aee-486c384613dd.gif)  
- ~~간단한데 내가 생각한 대로 실행이 잘 되지 않아서 애먹은...~~ 
- html, css, js를 사용하여 구현하였다.
- 각 색깔 페이지를 포함하고 있는 carousel을 container로 감싸고, container의 사이즈를 넘어가는 캐러셀 목록은 `overflow: hidden`으로 가렸다.
- 버튼을 클릭할 때마다 `position: absolute`의 `left` 속성값을 변경하여 슬라이드가 이동하도록 했다.
```javascript
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const carousel = document.querySelector(".carousel");
let n = 0;

prev.addEventListener("click", () => {
  carousel.classList.add("slide");
  n += 100;
  carousel.style.left = n + "%";

  if (n > 0) {
    n = -400;
    carousel.style.left = n + "%";
  }
});

next.addEventListener("click", () => {
  carousel.classList.add("slide");
  n -= 100;
  carousel.style.left = n + "%";

  if (n === -500) {
    n = 0;
    carousel.style.left = n + "%";
  }
});
```
```css
.carousel {
  position: absolute;
  left: 0;
  width: 2500px;
  display: flex;
}

.slide {
  transition: left 700ms ease;
}
```
- 위와 같이 클릭할 때마다 `n` 변수값을 높이거나 내려서 원하는 방향으로 이동하도록 했다.
- 시간이 오래 걸린 부분은, 가장 첫 페이지와 마지막 페이지에서 이전 버튼이나 다음 버튼을 클릭했을 상황이었다.
- 클릭하여 어떤 순간을 조건으로 설정할지가 어려웠는데 성공시키고나니까 너무나 간단하다..
- 추가하려다가 실패한 기능이 있어서 추후 더 공부하여 추가해야곘다.  
(슬라이드될 때마다 동기화되는 페이지 버튼이 있고 이 버튼을 클릭하면 해당 페이지로 이동하도록 하는 기능)
