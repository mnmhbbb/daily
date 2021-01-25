// 생성자함수
// 생성자 함수의 첫글자는 대문자로 만들고
// new 연산자를 사용해서 호출한다.
{
  function User(name, age) {
    this.name = name;
    this.age = age;
  }

  let user1 = new User("Mike", 20);
  let user2 = new User("Tom", 25);
  let user3 = new User("Jane", 22);
}

//기본적인 동작 방식
{
  function User(name, age) {
    // this = {};
    this.name = name;
    this.age = age;

    // return this;
  }

  new 함수명();
}
// new 함수명() 을 실행했을 때
// 1. 빈 객체를 만들고 this에 할당함
// 2. 함수 본문을 실행하면서 this에 프로퍼티들을 추가함
// 3. 마지막으로, this를 반환함
// 실제 코드에서 this = {};, return this; 부분은 없음
// 어떤 함수든 new를 붙여 실행하는 순간 이러한 방식으로 동작되는 것
// 그래서 생성자 함수의 첫글자를 대문자로 하는 것이 관례이다.
// new를 붙이지 않으면 아무것도 리턴해주지 않는다.
