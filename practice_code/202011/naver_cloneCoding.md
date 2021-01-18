# 네이버 메인 페이지 클론코딩으로 html, css 연습하기
(혼자 만들다가 막히는 부분은 zerocho님 html, css 강좌를 보고 참고하여 공부함)  
![nave clone coding](https://user-images.githubusercontent.com/66292371/104930126-14bac000-59e8-11eb-87ed-ca448f931f72.gif)
## 1. html 구조 짜기
기본적으로 header/nav/main/footer 구조에 맞게 짜야 하고, 크롬 확장앱 중  validity 라는 앱으로 웹 표준성을 검사할 수 있다.  
완벽하게 이 구조를 맞출 순 없어도 어느정도 맞게 짜야 한다.  
![html](https://user-images.githubusercontent.com/66292371/104927133-64978800-59e4-11eb-942a-083c69791536.png)
## 2. 사용한 기능 및 기타 팁
### 이미지 스프라이트(Image Sprite)  
![imgagesprite](https://user-images.githubusercontent.com/66292371/104927540-ea1b3800-59e4-11eb-9503-d000d07ce3c3.png)
- 여러 아이콘이나 이미지를 하나의 이미지로 합쳐서 관리하고, 불러오는 것.
- css의 background-posiotion 기능을 사용하여 해당 이미지의 필요한 부분만 불러올 수 있다.
- GET 요청을 줄여서 서버, 클라이언트 모두에게 좋다는 장점이 있다.
### sr-only & aria-label
- 이미지 태그를 사용할 땐 `alt` 속성으로 스크린 리더 설명을 꼭 달아야 함
- sr-only 라는 클래스를 사용하고   
  ```css
  position: absolute;
  z-index: -1;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  width: 1px;
  height: 1px;
  opacity: 0
  ```  
  위와 같은 css 속성을 주면, 페이지에 보이지 않지만 스크린리더 유저에게 페이지에 대한 설명이 전달할 수 있다.
- aria-label은 스크린리더를 사용하는 유저에게 메세지를 더 구체적으로 전달할 수 있다.
  - 예를 들어,   
  ```html
  <dt>Coke Light - 0.3<span aria-labe="litter">L</span></dt>
  ```  
  단순히 span 태그만 사용하지 않고 aria-label 속성을 사용하면 0.3L인 걸 정확하게 알릴 수 있다.
  - aria-hidden="true": 스크린리더로 읽었을 때 그 요소를 숨기는 방법.
### calc()
  - css 안에서 알아서 계산해주는 속성
### vertical-align
  - 수직 정렬 속성
  - vertical-align은 display : inline / inline-block 일 때만 적용가능
### 마진 상쇄
  - 형제태그끼리(혹은 부모/자식) margin이 상하로 겹치면, 사이즈가 더 큰 아이로 합쳐짐
  - 이때 display: inline-block; width:100%; 하면 해결됨
