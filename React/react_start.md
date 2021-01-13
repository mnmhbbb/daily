# 리액트 시작
(zerocho님 강좌와 리액트 공식 문서를 보면서 정리한 내용)  

## 0. 프론트엔드 라이브러리를 사용하면 좋은 이유
귀찮은 DOM관리와 상태값 업데이트 관리를 최소한으로 하고, 오직 기능 개발과 사용자 인터페이스를 구현하는 것에 집중할 수 있기 때문. 개발의 생산성과 깊이, 높은 유지보수성과 관련이 있다.

## 1. 리액트를 사용하는 이유
1. 사용자 경험(User Experience)
     - 웹에서 앱과 같은 사용자 경험을 만들어 준다.
     - 리액트는 SPA(Single Page Application)으로, 사용자에게 보이는 화면을 서버 측에서 준비하는 전통적인 웹 페이지와 달리 뷰 렌더링을 사용자의 브라우저가 담당하도록 하고, 우선 애플리케이션을 브라우저에 불러와서 실행시킨 후에 사용자와 인터랙션이 발생하면 필요한 부분만 자바스크립트를 사용하여 업데이트하기 때문에 UX가 좋아진다.
2. 재사용 **컴포넌트**
     - 중복되는 요소를 하나로 묶어줌/유지보수 하기가 좋다.
3. 데이터 - 화면 일치
    - 데이터를 화면에 반영할때 일치(바뀐 데이터 = 바뀐 화면)시켜주는게 좋아짐
 
## 1.1 
공식문서: 개별 컴포넌트는 **props**라는 매개변수를 받아오고 **render** 함수를 통해 표시할 뷰 계층 구조를 반환합니다. render 함수는 화면에서 보고자 하는 내용을 반환합니다. React는 설명을 전달받고 결과를 표시합니다. 특히 render는 렌더링할 내용을 경량화한 React 엘리먼트를 반환합니다. 다수의 React 개발자는 “**JSX**”라는 특수한 문법을 사용하여 React의 구조를 보다 쉽게 작성합니다. `<div />`구문은 빌드하는 시점에서 `React.createElement('div')`로 변환됩니다. JSX를 사용할 경우 React.createElement()를 직접 호출하는 일은 거의 없습니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <!-- 리액트가 동작하는 핵심적인 코드가 들어있음 -->
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <!-- 리액트 코드를 웹에다가 붙혀줌 -->
    <!-- 실제 배포할 땐 development 부분을 production으로  -->
  </head>
  <body>
    <div id="root"></div>
    <script>
      const e = React.createElement; //태그를 만듦(JSX를 사용하는 경우 사용할 일은 거의 없음)

      // 컴포넌트를 class로 만듦
      // react 안에 들어있는 Component의 상속을 받음
      class LikeButton extends React.Component {
      
        // 개별 컴포넌트는 props라는 매개변수를 받아오고 render 함수를 통해 표시할 뷰 계층 구조를 반환함
        // state는 상태. 바뀔 수 있는 부분. 이 부분은 react 확장 프로그램으로 상태를 확인할 수 있음
        constructor(props) {
          super(props);
          this.state = {
            liked: false,
          };
        }

        // render 함수는 화면에서 보고자 하는 내용을 반환
        render() {
          return e(
            "button",
            {
              onClick: () => {
                this.setState({ liked: true });
              },
              type: "submit",
            },
            this.state.liked === true ? "Liked" : "Like"
            // 상태가 바뀌면 화면이 저절로 바뀜!
            // 리액트가 데이터와 화면을 일치시켜주는 것.
          );
          // e(a, b, c) a:tag / b: attribute / c: text
          //<button type="submit">Like</button>
        }
      }
    </script>
    <script>
      //위에서 어떻게 구현할지 설계해놓은 것을 이제 실제로 렌더링함
      ReactDOM.render(e(LikeButton), document.querySelector("#root"));
      //실행 결과: <div id="root"><button type="submit">Like</button></div>
    </script>
  </body>
</html>

```
- 클래스형태로 만들어진 컴포넌트에는 꼭, **render** 함수가 있어야 하고, 그 내부에서는 **JSX** 를 return 해주어야 함  
&nbsp;  
## 2. JSX 문법
- JSX(JavaScript + XML): 자바스크립트를 확장한 문법
- 공식문서: React에서는 이벤트가 처리되는 방식, 시간에 따라 state가 변하는 방식, 화면에 표시하기 위해 데이터가 준비되는 방식 등 렌더링 로직이 본질적으로 다른 UI 로직과 연결된다는 사실을 받아들입니다. React는 JSX 사용이 필수가 아니지만, 대부분의 사람은 JavaScript 코드 안에서 UI 관련 작업을 할 때 **시각적으로** 더 도움이 된다고 생각합니다. 또한 React가 더욱 도움이 되는 에러 및 경고 메시지를 표시할 수 있게 해줍니다.
- JSX 내부에서 자바스크립트 값을 사용할 땐 `{ }` 중괄호 안에 입력한다.
- 태그는 꼭 닫아줘야 한다. `<div></div>`, `<br />`
- 2개 이상의 엘리먼트는 하나의 엘리먼트로 감싸줘야 한다.
- if문을 사용할 수 없으므로 삼항연산자, `&&`연산자를 이용한다. 
- if문을 사용해야 할 경우는 IIFE를 사용하는데, 복잡한 조건은 웬만하면 JSX 밖에서 작성한다.
- 클래스 설정 시, class 대신 `className`
- 스타일을 적용할 땐, 객체 형태로.

## 3. 필요한 도구
### 3.1 웹팩(webpack) 
- 쪼개진 자바스크립트 파일을 html이 실행할 수 있는 자바스크립트 파일로 만들어주는 모듈 번들러(웹 애플리케이션을 구성하는 HTML, CSS, JS 등을 모두 각각의 모듈로 보고 이를 조합해서 하나의 결과물을 만드는 도구)

- 모듈: 프로그래밍 관점에서 특정 기능을 갖는 작은 단위.  
  비슷한 기능들을 하나의 의미 있는 파일로 관리하면 모듈이라 할 수 있다.  
  webpack에서 모듈은 js로 한정되어 있지 않고 웹 애플리케이션을 구성하는 모든 자원을 의미한다.
  
### 3.2 바벨(babel)
  - jsx를 비롯한 자바스크립트 문법을 모든 브라우저가 이해할 수 있는 문법(ES5)으로 변환해주는 도구

### 4. 
## 4.1 props
  - 부모가 자식에게 주는 값
  - 자식입장에선 읽기 전용! 수정이 불가함
## 4.2 state
  - 상태. 바뀌는 부분. 바뀔 수 있는 부분
  - react 확장 프로그램으로 상태를 확인할 수 있다.
  - `setState()`라는 내장함수를 이용하여 값을 변경함.
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      //js안에서 jsx를 쓸 수 있게 해줌
      class LikeButton extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            liked: false,
          };
        }

        render() {
          return (
            <button
              type="submit"
              onClick={() => {
                this.setState({ liked: true });
              }}
            >
              {this.state.liked === true ? "Liked" : "Like"}
            </button>
          );
        }
      }
    </script>
    <script type="text/babel">
      ReactDOM.render(<LikeButton />, document.querySelector("#root"));
    </script>
  </body>
</html>
```
##### 참조
리액트 공식 페이지  
벨로퍼트와 함께 하는 모던 리액트 <https://react.vlpt.us/basic/04-jsx.html>
