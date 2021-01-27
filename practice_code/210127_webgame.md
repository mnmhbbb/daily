#### 2021.01.26
## 자바스크립트 웹게임 실습으로 새롭게 알게 된 내용 등 정리하기

### 1. 가위바위보 게임
#### 1. `Arr.includes()`  
처음 알게 된 메서드인데, `diff`에 특정 배열 요소를 포함하고 있는지 확인할 때 사용했다.
```javascript
//내 선택 - 컴 선택 = 결과값으로 승패여부 조사
const diff = myScore - computerScore;
let message = "";
if ([2, -1].includes(diff)) {
  me += 1;
  message = "승리";
} else if ([1, -2].includes(diff)) {
  com += 1;
  message = "패배";
} else {
  message = "무승부";
}
```

#### 2. 객체의 키와 밸류 특징을 살려서 객체['key']로 접근하기  
다음 코드는 클릭핸들러 안에 포함된 코드이며,  
사용자가 클릭한 버튼을 파악하여 사용자의 상태를 반영하는 방법으로 삼항연산자와 객체['key'] 특징을 사용하여 간단하게 접근하였다.
```javascript
// 내가 가위/바위/보 중에 하나를 클릭함
const myChoice =
  e.target.textContent === "바위"
    ? "rock"
    : e.target.textContent === "가위"
    ? "scissors"
    : "paper";

const scoreTable = {
rock: 0,
scissors: 1,
paper: -1,
};

const myScore = scoreTable[myChoice];
```
#### 3. 가위바위보에 기본값을 설정해놓고, 차이값으로 승부를 판독하기  
해당 코드도 클릭핸들러 안에 위치한 코드이다.  
가위바위보 승부를 어떻게 판단해야할지 고민했는데, 가위/바위/보에 각각 초기값을 넣어두고 각각의 차이로 승패여부를 판단하는 방법이 있었다.  
```javascript
// 가위: 1, 바위: 0, 보: -1
// 나\컴퓨터  가위   바위    보
//   가위      0     1      2
//   바위     -1     0      1
//   보       -2    -1      0


     const diff = myScore - computerScore;
    let message = "";
    if ([2, -1].includes(diff)) {
      me += 1;
      message = "승리";
    } else if ([1, -2].includes(diff)) {
      com += 1;
      message = "패배";
    } else {
      message = "무승부";
    }
    
```  
&nbsp;  
&nbsp;   
### 2. 로또추첨기
#### 1. 배열을 응용하여 랜덤 숫자를 뽑는 방법
1.1 숫자후보 45개가 들어있는 배열 만들기  
단순히 배열에 숫자 45개를 입력하는 방법이 아닌, map 메서드를 활용한 방법
```javascript
const candidate = Array(45).fill().map((item, index) => index + 1);
```
1.2.1 숫자 후보 배열에서 랜덤으로 6개를 뽑기
```javascript
let lotto = [];
for (i = 0; i < 6; i++) {
  let shuffle = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
  lotto.push(shuffle);
}
```
1.2.2 숫자 후보 배열을 랜덤으로 정렬한 뒤에 맨 앞에서부터 6개를 뽑기
```javascript
const shuffle = [];
for (let i = candidate.length; i > 0; i--) {
  const random = Math.floor(Math.random() * i);
  const spliceArray = candidate.splice(random, 1);
  const value = spliceArray[0];
  shuffle.push(value);
}
const lottoball = shuffle.slice(0, 6)
```
1.3 뽑힌 숫자를 오름차순으로 정렬하기
```javascript
const lottoball = shuffle.slice(0, 6).sort((a, b) => a - b);
```  
&nbsp;
&nbsp;
### 3. 반응속도게임
#### 1. 클릭하는데 걸린 시간을 체크하는 방법들
1.1 `console.time('check')`, `console.timeEnd('check')`  
동일한 키워드를 담은 console.time 을 활용한 방법이다.
```javascript
console.time('timecheck');
screen.addEventListener("click", function () {
  //시간 체크
  console.timeEnd('timecheck')
}
```
1.2 `new Date()`  
현재 시간을 나타내주는 new Date()를 활용하여 각 시간의 차이를 통해 체크할 수 있다.
```javascript
var start = new Date();
screen.addEventListener("click", function () {
  //시간 체크
  var end = new Date();
  console.log(end - start);
```
1.3 `performance.now()`  
2번의 방법과 거의 동일하지만, 해당 방법은 소수점이 길게 측정되므로 보다 정밀한 시간을 측정하고 싶을 때 사용할 수 있다.
```javascript
var start = performance.now();
screen.addEventListener("click", function () {
  //시간 체크
  var end = performance.now();
  console.log( (end - start) / 1000 );
  // 소수점이 엄청 길게 측정되어서, 정밀한 시간을 체크하고 싶을 때 사용
```
#### 2. `element.click()` 마우스클릭간주  
클릭하지 않았지만, 클릭한 것처럼 요소를 클릭해서 실행하는 방법이다.
```javascript
randomTime = setTimeout(function () {
            start = new Date();
            screen.click();
}, Math.floor(Math.random() * 1000) + 2000);
```
`setTimeout`을 통해 랜덤시간 뒤에 클릭할 수 있는 화면으로 변경되도록 짠 코드이다.  
대기 상태에서 클릭이 발생하면 -> 클릭할 수 있는 화면으로 바뀌는 로직이므로,   
실제 클릭이 일어나지 않아도 랜덤 시간 뒤에는 클릭이 발생해야 한다.  
따라서 `screen.click()` 방법을 사용하였다.
