# 바닐라 자바스크립트로 드롭다운 메뉴 만들기
(김버그님 예제 사용 :smile::+1:)

## 구현 사항
![alt dropdown](https://user-images.githubusercontent.com/66292371/104361181-78ab3780-5555-11eb-8ede-5040d83c4438.gif)  
1. 드롭다운 클릭 시, 각 지점이 보이도록
2. 내가 클릭한 지점이 화면에 입력되도록
3. 선택되었을 시, 다음 버튼 활성화

## 작성한 코드
```javascript
dropdown.addEventListener("click", (e) => {
  menu.classList.toggle("show");
  dropdownBtn.classList.toggle("selected");

  if (e.target.value) {
    dropdownBtn.textContent = e.target.textContent;
    menu.classList.remove("show");
    dropdownBtn.classList.add("selected");
    nextBtn.disabled = false;
  }
});
```
- 내가 사용할 요소를 모두 포함하고 있는 부모 요소(dropdown)에 이벤트위임을 했다.
- 내가 클릭한 타겟이 `value`를 포함하고 있으면   
    -> 클릭한 아이템의 텍스트로 변경되고, 글씨를 활성화하고, 드롭다운메뉴를 숨겼다.
- 처음으로 사용해본 기능인데, style의 `disabled` 속성을 자바스크립트에서는 불리언 값으로 입력한다는 것을 알게 되었다.

## 느낀점
처음 예제가 주어졌을 때, 내가 할 수 있을까? 라는 생각을 먼저 했는데   
지금까지 인강을 통해 배웠던 예제들을 떠올려보고 스스로 하나씩 입력하고 확인해보니까 생각보다 금방 완성할 수 있었다.  

#### 참고 자료:  
유튜브 김버그님 영상 https://youtu.be/OSFTXX_ex7I
