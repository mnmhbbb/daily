##### 2021.01.25.월요일 공부한 내용
## 자바스크립트 웹게임 틱택토 실습
### 1. 이차원배열
반복문을 중첩하여 배열 안에 배열을 넣는 방법으로 생성하였다.  
- 줄들과 칸들의 배열을 만들고, 줄들 배열에 `tr`태그를 담고,
- 칸들 배열에 또 배열을 만들고, 그 안에 `td`태그를 3개씩 넣는다.
- 이렇게 담긴 `td`태그 3개를 `tr`태그에 담는다.
- 이 동작을 2번 더 반복하면, 3x3 틱택토 칸이 생성된다.
```javascript
var BODY = document.body;
var table = document.createElement("table");
var cells = [];
var rows = [];

for (var i = 0; i < 3; i++) {
  var row = document.createElement("tr");
  rows.push(row);
  cells.push([]);
  for (var j = 0; j < 3; j++) {
    var cell = document.createElement("td");
    cell.addEventListener("click", clickHandler);
    cells[i].push(cell);
    row.appendChild(cell);
  }
  table.appendChild(row);
}
BODY.appendChild(table);

//rows = [tr, tr, tr]
//cells = [[td, td, td], [td, td, td], [td, td, td]]
```
- 이러한 이차원배열은 `cells[0][0]`과 같이 인덱스를 두 번 입력하여 접근할 수 있다.
- 각 칸을 클릭했을 때 클릭이벤트가 발생해야 하므로 이벤트리스너를 추가한다.
- 각 칸을 클릭하여 O, X를 채우게 되는데, 게임을 리셋할 때도 `forEach`를 중첩하여 사용한다.
```javascript
 if (filled) {
      message.textContent = turn + "님이 승리!";
      //게임이 끝났으니까 초기화
      turn = "X";
      cells.forEach(function (row) {
        row.forEach(function (cell) {
          cell.textContent = "";
        });
      });
    }
   }
```
### 2. 클릭한 위치 확인하여 칸에 입력하기
```javascript
let clickHandler = function (e) {
  let rowIndex = rows.indexOf(e.target.parentNode);
  let cellIndex = cells[rowIndex].indexOf(e.target);
```
- 몇 번째 줄, 몇 번째 칸을 클릭했는지 확인하는 방법이다.  
- `event.target`은 이벤트 버블링으로 인해 `td`태그가 출력된다.
- 따라서 해당 `td`태그가 포함된 row를 확인하기 위해 `parentNode`를 사용함
- 이렇게 클릭한 위치를 확인하여 각 차례에 맞는 O, X를 입력시킨다.
### 3. 세 칸이 채워졌는지 확인하기
- 가로/세로/대각선을 각각 체크하고 채워졌으면 `filled`변수의 상태로 다음 동작을 이어나간다.
- 3칸이 채워지지 않았다면 다음 턴으로 넘긴다.
```javascript
var clickHandler = function (e) {
  //클릭한 칸의 위치 확인
  var rowIndex = rows.indexOf(e.target.parentNode);
  var cellIndex = cells[rowIndex].indexOf(e.target);

  //칸이 비었는지 확인
  if (cells[rowIndex][cellIndex].textContent !== "") {
    alert("칸이 이미 채워져있습니다.");
  } else {
    cells[rowIndex][cellIndex].textContent = turn;

    //3줄이 채워졌는가?
    var filled = false;

    // 가로줄 체크
    if (
      cells[rowIndex][0].textContent === turn &&
      cells[rowIndex][1].textContent === turn &&
      cells[rowIndex][2].textContent === turn
    ) {
      filled = true;
    }

    // 세로줄 체크
    if (
      cells[0][cellIndex].textContent === turn &&
      cells[1][cellndex].textContent === turn &&
      cells[2][cellIndex].textContent === turn
    ) {
      filled = true;
    }

    // 대각선 체크1
    if (
      cells[0][0].textContent === turn &&
      cells[1][1].textContent === turn &&
      cells[2][2].textContent === turn
    ) {
      filled = true;
    }
    // 대각선 체크2
    if (
      cells[0][2].textContent === turn &&
      cells[1][1].textContent === turn &&
      cells[2][0].textContent === turn
    ) {
      filled = true;
    }
  }
};
```
### 4. 컴퓨터에게 턴 넘기기
- `turn` 변수로 간단하게 턴을 넘긴다.
- `setTimeout`을 이용하여 컴퓨터가 1초 뒤에 칸을 클릭하도록 한다.
- 이때 컴퓨터가 클릭할 수 있는 후보칸을 설정하고, 그 칸 중 랜덤으로 선택하도록 해야 한다.
- 여기서 후보칸을 만드는 생각을 하기가 조금 힘들었다.
- `forEach`메서드를 중첩하여 전체 칸을 후보에 일단 넣은 뒤,  
아직 채워지지 않은 빈값만 남기기 위해 `filter`메서드를 사용한다.
- `!item.textContent` not연산자를 사용하여 디폴트가 false인 상태를 true로 변경시켰다.
```javascript
else {
      //칸이 안찼으니까 다음 턴 넘기기
      if (turn === "X") {
        turn = "O";
      }
      // 컴퓨터의 턴
      setTimeout(function () {

        // 후보칸
        var candidate = [];

        // 우선 모든 후보를 넣고
        cells.forEach(function (row) {
          row.forEach(function (cell) {
            candidate.push(cell);
          });
        });

        // 클릭할 수 있는 칸만 필터링
        candidate = candidate.filter(function (item) {
          return !item.textContent;
          // 디폴트가 cell.textContent = ""; 즉 빈값 (= false) 이니까
          // 그 빈값들이 클릭할 수 있는 값
        });

        // 클릭 후보칸 중에 랜덤 선택
        var selected = candidate[Math.floor(Math.random() * candidate.length)];
        selected.textContent = turn;

        // 컴퓨터가 3칸을 채웠는가?
 	

        // 턴을 다시 나한테 넘긴다.
        turn = "X";
      }, 1000);
    }
```
### 5. 이제 컴퓨터의 칸 상태 확인하기
- 아까 사용한 길고 긴 코드를 또 사용해야 하는데, 중복을 피하기 위해 결과체크하는 함수로 따로 빼준다.
- 그런데 3칸이 찼는지 상태를 확인하는 `filled`변수가 결과체크 함수 안에 있다는 문제가 발생한다.
- 해결하는 방법에는, 1)단순히 filled 변수를 전역변수로 빼주거나
- 2)결과체크 함수 마지막에 filled를 리턴해서 그 값을 가져오고  
  결과체크함수를 `rowIndex`, `cellIndex`를 매개변수로 받는 함수로 만들어서 활용하는 방법.
- 보통의 나라면 1) 방법을 사용하고 클릭이벤트함수에 결과체크하는 길고 긴 부분을 모두 넣었겠지만,   
  2) 방법도 있다는 것을 알게 되었다. 더 간결해진다.
- 함수의 리턴과 매개변수 특징을 잘 활용하자.
```javascript
function check(rowIndex, cellIndex){
  var filled = false;
  // 가로줄 체크
  if (
    cells[rowIndex][0].textContent === turn &&
    cells[rowIndex][1].textContent === turn &&
    cells[rowIndex][2].textContent === turn
  ) {
    filled = true;
  }
  
  ... 

  return filled
}


//결과 체크
var filled = check(rowIndex, cellIndex);

if (filled) {
          message.textContent = turn + "님이 승리!";
          //게임이 끝났으니까 초기화
          turn = "X";
          cells.forEach(function (row) {
            row.forEac ... 
```
### 6. 게임이 끝났으니 초기화시키기 + 무승부 판별
- 초기화하는 부분도 마찬가지로 각 턴에서 각각 발생하므로 중복을 줄이기 위해 함수로 따로 빼준다.
- 그러면 각 턴에서 초기화함수만 실행시키도록 하면 된다.
- 추가로, 무승부했을 때의 상황도 추가해야 한다.
- 어떻게 무승부를 판정할지 고민스러웠는데, 후보칸이 더이상 없으면 무승부이다...!
- 무승부를 판별하기 위해 후보칸 부분의 코드를 컴퓨터의 턴이 아닌, 클릭한 해당 칸이 비었는지 확인하는 부분으로 옮긴다.
```javascript
function init(draw) {
  if (draw) {
    message.textContent = "무승부";
  } else {
    message.textContent = turn + "님 승리!";
  }
  // 1초 뒤에 게임 초기화
  setTimeout(function () {
    message.textContent = "";
    cells.forEach(function (row) {
      row.forEach(function (cell) {
        cell.textContent = "";
      });
    });
    turn = "X";
  }, 1000);
}

 // 다 찼는지 결과체크
    var filled = check(rowIndex, cellIndex);
    if (filled) {
      init();
    } else if (candidate.length === 0) {
      init(true);
    } else {
      //칸이 안찼으니까 다음 턴 넘기기
      if (turn === "X") {
        turn = "O";
      }
      
   // 컴퓨터의 턴
      setTimeout(function () {
        // 클릭이 가능한 칸 중에 랜덤 선택
        var selected = candidate[Math.floor(Math.random() * candidate.length)];
        selected.textContent = turn;

        // 컴퓨터의 결과체크
        var rowIndex = rows.indexOf(selected.parentNode);
        var cellIndex = cells[rowIndex].indexOf(selected);
        var filled = check(rowIndex, cellIndex);

        if (filled) {
          init();
        }
        // 턴을 다시 나한테 넘긴다.
        turn = "X";
      }, 1000);
    }
  }
```
