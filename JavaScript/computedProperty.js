// 계산된 프로퍼티 Computed Property
// 객체를 만들 때, 프로퍼티 키가 대괄호로 둘러싸여 있는 경우 계산된 프로퍼티라고 부름
{
  let a = "age";

  const user = {
    name: "Mike",
    [a]: 30,
    //변수 a에서 프로퍼티 이름을 동적으로 가져오겠다는 의미
  };

  console.log(user); //{name: "Mike", age: 30}
}

//다음 경우처럼 식을 넣을 수도 있다.
{
  let fruit = "apple";
  let bag = {
    [1 + 4]: 5,
    [fruit + "Yamyam"]: 100,
  };

  console.log(bag); //{5: 5, appleYamyam: 100}
}
