# 구조 분해 할당
## 0. 시작
`key`를 가진 여러개의 데이터를 저장할 땐 `객체`를, 데이터를 순서대로 저장할 땐 `배열`을 사용한다.   
그리고 이 데이터의 일부를 함수에 전달해야 할 경우가 생기는데, 이때 `구조 분해 할당`을 사용하면 코드가 간결해지고 편리해진다.  
한 마디로 정의하면,   
'배열이나 객체 **속성**을 분해하고 추출하여 그 값을 **변수**에 담을 수 있게 하는 표현식'을 `구조 분해 할당`이라고 한다.  

## 1. before/after 예시
~~아무래도 내가 좋아하는 아티스트로 하면 몰입이 확~~  
### 1. before
```javascript
const crossroads = {
  name: "Labyrinth",
  title: "교차로",
  release: "2월 3일",
};
const apple = {
  name: "Song Of The Sirens",
  title: "Apple",
  release: "7월 13일",
};
const mago = {
  name: "Walpurgis Night",
  title: "MAGO",
  release: "11월 9일",
};

function print(album) {
  const text = `${album.release}에 발매된 앨범 "${album.name}"의 타이틀 곡은 "${album.title}"이다.`;
  console.log(text);
}

print(crossroads); //2월 3일에 발매된 앨범 "Labyrinth"의 타이틀 곡은 "교차로"이다.
print(apple); //7월 13일에 발매된 앨범 "Song Of The Sirens"의 타이틀 곡은 "Apple"이다.
print(mago); //11월 9일에 발매된 앨범 "Walpurgis Night"의 타이틀 곡은 "MAGO"이다.
```
파라미터 콜백함수 `album`의 내부 값을 가져올 때마다 이렇게 `album. `을 붙여야 한다.  
&nbsp;  
### 2. after - 1
```javascript
function print1(album) {
  const { name, title, release } = album;
  const text = `${release}에 발매된 앨범 "${name}"의 타이틀 곡은 "${title}"이다.`;
  console.log(text);
}

print1(crossloads); //2월 3일에 발매된 앨범 "Labyrinth"의 타이틀 곡은 "교차로"이다.
```
이와 같은 방법이 바로 객체의 `구조 분해 할당`이다.
```javascript
const { name, title, release } = album;
```
객체에서 속성을 추출하여 변수로 선언한 결과, `album. `을 붙이지 않아도 동일한 결과가 발생하였다.  
여기서 더 간단히 하는 방법이 있다.
### 3. after - 2
```javascript
function print2({ name, title, release }) {
  const text = `${release}에 발매된 앨범 "${name}"의 타이틀 곡은 "${title}"이다.`;
  console.log(text);
}

print2(crossroads);
```
바로 이와 같이 파라미터에서 구조 분해 할당을 시키는 방법이다. 더 간단한 방법으로 코드를 깔끔하게 줄였다.  
&nbsp;  
## 3. 그 밖의 예시
```javascript
//배열의 구조 분해 할당
const members = ["mina", "sana", "tzuyu"];
const [member1, member2, member3] = members;
console.log(member1); //mina
console.log(member2); //sana
console.log(member3); //tzuyu


//기본값 설정
const obj = { a: 1, b: 2 };

const { a, b, c = 3 } = obj;
console.log(a); //1
console.log(b); //2
console.log(c); //3

function print({ a, b, c = 3 }) {
  console.log(a); //1
  console.log(b); //2
  console.log(c); //3
}

print(obj);


//일부 반환값 무시
const [a, ,c] = [1, 2, 3];
console.log(a); // 1
console.log(c); // 3


//깊은 값
const obj = {
  h: 'Tom',
  i: {
    j: 'Jay'
  }
}
const { h, i: { j }, k } = obj2
console.log(h, j, k); // 'Tom', 'Jay', undefined
```  
&nbsp;
&nbsp;
###### 참고:  
<https://learnjs.vlpt.us/basics/06-object.html>  
<https://ko.javascript.info/destructuring-assignment>
