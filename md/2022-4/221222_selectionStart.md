2022.12.22.Thu.

#### selectionStart (인풋 숫자 관련 유틸리티 함수 도입)

- 숫자 인풋 값에 대한 처리
- 초기값 0인 상태에서 숫자를 입력하면 0이 남는 문제를 해소하기 위함
- 커서의 위치와 입력된 인풋 길이를 감지하여 0을 제거하도록 조정
- selectionStart
  - 커서 앞에 존재하는 문자 개수(를 통해 커서의 위치를 감지함)

https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
