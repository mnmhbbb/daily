2022.11.04.Fri.

1. [아이폰 안전영역](https://wit.nts-corp.com/2019/10/24/5731)
   노치 유무 등 다양한 아이폰 기기에서 균일한 화면을 나타내기 위함

2. safari css 이슈

- 지난 번에 계산기 작업하면서 rgba로 해결했던, 클릭하면 점차 까맣게 되는 이슈
- box shadow도 영향이 있을까 해서 rgba로 바꾸는데, `rba(0 0 0 / 25%)`로 되어있던걸 그냥 `0 0 0 0.25`로 바꾸니까 당연히 안됐고, `0, 0, 0, 0.25`를 입력해서 해결

3. safari 정규표현식 이슈

- lookbehind 문법은 사파리와 익스플로러에서 쓸 수 없음
- 출처: https://yceffort.kr/2021/09/deep-dive-javascript-regex#lookbehind-문법은-사파리와-익스플로러에서-쓸-수-없다
