// 객체 Object

{
  const obj = { key: value };
}

// key: 문자열만 가능. 따옴표 없어도 됨. 띄어쓰기 있을 땐 필요함.
// value: 문자열, 숫자, 객체 ... 모두 가능. 함수일 경우 메서드라고 함.

// in 프로퍼티의 존재 여부를 확인할 때
{
  function isAdult(user) {
    if (!("age" in user) || user.age < 20) {
      return false;
    }
    return true;
  }

  const Mike = {
    name: "Mike",
    age: 30,
  };

  const Jane = {
    name: "Jane",
  };

  console.log(isAdult(Mike)); //true
  console.log(isAdult(Jane)); //false
}

// for ... in 반복문: 객체의 key에 접근
{
  const Mike = {
    name: "Mike",
    age: 30,
  };

  for (x in Mike) {
    console.log(`${x}: ${Mike[x]}`);
  }
  // name: Mike
  // age: 30
}
// for ... of 는 배열에서! 헷갈리지 말자.

//method: 객체 프로퍼티로 할당된 함수

//메서드 단축구문
{
  const superman = {
    name: "clark",
    age: 33,
    fly: function () {
      console.log("날아갑니다");
    },
  };
}

{
  const superman = {
    name: "clark",
    age: 33,
    fly() {
      console.log("날아갑니다!");
    },
  };
}
