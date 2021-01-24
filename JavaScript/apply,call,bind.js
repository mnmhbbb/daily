// apply, call, bind 호출
// 함수 호출 방식과 관계없이 this를 지정할 수 있음

//call: 모든 함수에서 사용할 수 있으며, this를 특정값으로 지정할 수 있다.
{
  const mike = {
    name: "Mike",
  };

  const tom = {
    name: "Tom",
  };

  function showThisName() {
    console.log(this.name);
  }

  showThisName(); //window
  showThisName.call(mike); //Mike
  showThisName.call(tom); //Tom
  //이렇게 주어진 객체의 메서드인 것처럼 사용할 수 있다.
}

{
  const mike = {
    name: "Mike",
  };

  function update(birthYear, occupation) {
    this.birthYear = birthYear;
    this.occupation = occupation;
  }

  update.call(mike, 1996, "singer");
  console.log(mike); //{name: "Mike", birthYear: 1996, occupation: "singer"}
  //함수가 사용할 매개변수들을 순서대로 넣어줌
}

//apply: 함수 매개변수를 처리하는 방법을 제외하면 call과 완전히 같다
//call은 일반 함수와 마찬가지로 매개변수를 직접 받지만, apply는 매개변수를 배열로 받음
{
  const mike = {
    name: "Mike",
  };

  function update(birthYear, occupation) {
    this.birthYear = birthYear;
    this.occupation = occupation;
  }

  update.apply(mike, [1996, "singer"]);
  console.log(mike); //{name: "Mike", birthYear: 1996, occupation: "singer"}
}

// apply는 배열요소를 함수의 매개변수로 사용할 때 유용함.
{
  const nums = [3, 10, 1, 6, 4];
  const minNum = Math.min(...nums);
  const maxNum = Math.max(...nums);
  console.log(minNum); //1
  console.log(maxNum); //10
}

{
  const nums = [3, 10, 1, 6, 4];
  const minNum = Math.min.apply(null, nums);
  const maxNum = Math.max.apply(null, nums);
  console.log(minNum); //1
  console.log(maxNum); //10

  //call을 사용한다면,
  const callMinNum = Math.min.call(null, ...nums);
  console.log(callMinNum); //1
}

//bind: 함수의 this 값을 영구히 바꿀 수 있다.
{
  const user = {
    name: "Mike",
    showName: function () {
      console.log(`hello, ${this.name}`);
    },
  };

  user.showName(); //hello, Mike
  let fn = user.showName;
  fn(); //hello, (this가 없으므로)
  fn.call(user); //hello, Mike
  fn.apply(user); //hello, Mike

  let boundFn = fn.bind(user);
  boundFn(); //hello, Mike
}
