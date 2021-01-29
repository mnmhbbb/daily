// 화살표함수
// 일반 함수를 보다 간략한 방법으로 선언하는 방법이다.
{
    // 매개변수가 없을 경우
    () => { ... }
    
    // 매개변수가 1개
    x => { ... }

    // 매개변수가 2개 이상
    (x, y) => { ... }
    
    // 함수 몸체가 한 줄일 때는 중괄호, return 생략 가능
    x => { return x * 2 }
    x => x * 2

    () => {
         const x = 10;
         return x * 2;
    }
}

// 화살표 함수는 익명함수로만 사용할 수 있어서 함수표현식을 사용한다.
{
    // ES5
    var foo = function (x) {
      return x * 2;
    };
    console.log(foo(2));
  
    // ES6
    const foo2 = (x) => {
      return x * 2;
    };
    console.log(foo2(2));
  }

// 콜백함수를 사용할 때 보다 간결해진다.
{
    // ES5
    var arr = [1, 2, 3];
    var foo = arr.map(function (x) {
      return x * 2;
    });
    console.log(foo); //[2, 4, 6]
  
      //ES6
      const arr = [1, 2, 3];
      const foo = arr.map((x) => {
        return x * 2;
      });
      console.log(foo); //[2, 4, 6]
  }
  
// this - 일반함수
// 함수를 호출할 때 어떻게 호출되었는지에 따라 this가 동적으로 결정됨

// this - 화살표함수
// 화살표함수의 this는 언제나 상위 스코프의 this를 가리킴.