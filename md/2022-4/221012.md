2022.10.12.Thu.

1. react-calendar 라이브러리를 주간 달력으로 나타내기

- react-calendar는 월간 달력에 최적화되어 있음
- 시작 날짜를 지정하는 속성 등은 라이브러리에서 제공되지만 주간만 표시하는 방법은 없음
- 따라서 `querySelectorAll` 메서드를 사용하여 월에 있는 모든 날짜를 가져온 다음, 남길 날짜를 배열로 만들어서 해당 배열에 포함되지 않는 모든 날짜 엘리먼트를 `remove()` 속성으로 삭제시켜서 주간 달력으로 표시함
- 캘린더의 aria-label에 날짜에 대한 데이터가 담겨있어서 그 부분을 활용함.
- 구현해야 할 기능이 주간 <-> 월간을 트랜지션 효과를 주면서 전환해야 하기 때문에, react-calendar 라이브러리 `<Calendar />`를 2번(주간용/월간용을 분리) 사용함.
- 그래서 `weeklyElem`라는 주간 Calendar를 감싸는 엘리먼트 안에 포함된 날짜 리스트 중에서 remove를 시켜야 함.
- (그렇지 않으면 월간 달력이 표시되지 않음)

  ```javascript
  const days = weeklyElem.querySelectorAll('.react-calendar__tile');

  days.forEach((item) => {
    const date = item.children[0].ariaLabel;
    if (!weekly.includes(date)) {
      item.remove();
    }
  });
  ```

2. react-calendar 이전달/다음달 전환 시 발생했던 버그 수정

- 원인: 이전달 또는 다음달을 클릭했을 때 이벤트 핸들러에 의해 날짜 state는 업데이트되지만, Calendar 본체의 날짜 데이터는 업데이트되지 않았음. 즉, Calendar와 날짜 state가 연동되지 않았음.
- 해결: `onChange`를 업데이트한다.
  - 날짜 state를 업데이트: 현재 날짜(현재 날짜가 포함된 월)에 해당하는 기록 데이터를 불러오기 위함
  - onChange 업데이트: Calendar 자체를 업데이트
  - 둘이 연동되어 현재 Calendar에 해당하는 기록 데이터를 불러와서 Calendar에 표시할 수 있음.
- 해결한 아이디어: 날짜를 클릭할 경우에는 state와 Calendar가 잘 연동되는 것을 확인함. 날짜 1개를 클릭할 때 동작하는 함수는 onChange를 사용하여 날짜를 업데이트 시킴.

3. 주간 <-> 월간 달력 트랜지션

- `max-height`, `overflow: hidden`, `visibility: hidden`를 활용
- `max-height`에 구체적인 수치를 적용

4. new Date() UTC

- 오늘날짜를 활용할 일이 많아서 `new Date()`를 변수로 선언하고 사용하였는데, 테스트하는 시간대에 따라 날짜가 1일 정도 오차가 나는 것을 발견함
- new Date()를 사용하면 기본적으로 사용자의 pc에 설정된 표준 시간대를 기준으로 표시됨.
- 따라서 오늘 날짜를 00:00:00 으로 세팅하여 항상 균일한 데이터를 가져올 수 있게 됨
- 도움을 받은 글: https://pks2974.medium.com/javascript-%EC%99%80-date-%EB%82%A0%EC%A7%9C-cf638c05f8f3
