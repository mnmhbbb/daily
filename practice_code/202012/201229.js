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
  console.log(getScroll());
  gauge.style.width = `${getScroll()}%`;
});

//window.scrollY : 현재 스크롤된 높이
//getBoundingClientRect 해당 객체의 크기
//document.documentElement = <html>
//document.documentElement.scrollHeigth 문서 전체 높이값
//document.documentElement.scrollTop 현재 스크롤된 높이
//window.innerHeight 현재 보고 있는 화면 높이
