#### 210203 리액트 공부
## React Router
- 리액트는 SPA, 싱글 페이지 어플리케이션이라서 한 개의 페이지로 구성된다.
- 하지만 눈에 보기에는 여러 페이지가 있는 것처럼 보이고 이동까지 한다.
- 이를 가능하게 해주는 것이 바로 리액트 라우터.
- 리액트 라우터가 여러 개의 페이지를 동시에 렌더링 해준다.
- 라우팅이란 다른 주소에 따라 다른 뷰를 보여주는 것을 의미한다.
### 0. 설치
```javascript
npm i react-router
npm i react-router-dom
```
- 우리는 웹을 다루기 때문에 웹에서 쓰는 라이브러리인 react-router-dom까지 설치함.
### 1. BrowserRouter, HashRouter
- 리액트 라우터를 사용하기 위해서는 컴포넌트의 최상위를 라우터로 감싸야 함.
- 그리고 넣고 싶은 페이지를 `Route`로 불러온다.
- `path`로 가상의 주소를 입력하고, 보여줄 컴포넌트도 연결시킨다.
- 이렇게 하면 각각 따로 만들었던 페이지를 하나의 페이지에서 볼 수 있게 된다.
- `Link`라는 리액트라우터돔의 기능을 사용하는데, html의 `a`태그와 같은 역할을 한다.
- 각 링크를 클릭하면 실제로 페이지가 이동하는 게 아니라, 리액트라우터가 가상으로 만들어낸 페이지가 동작함.
- 여러개가 아니라 여러개인 '척'!
```javascript
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NumberBaseBall from './NumberBaseBall';
import RSP from './RSP';
import Lotto from './Lotto';

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        ~여기는 공통인 부분~
        <Link to="/number-baseball">숫자야구</>
        <Link to="/rock-scissors-pape">가위바위보</>
        <Link to="/lotto-generator">로또생성기</>
      </div>
      <div>
        <Route path="/number-baseball" component={NumberBaseball}></Route>
        <Route path="/rock-scissors-paper" component={RSP}></Route>
        <Route path="/lotto-generator" component={Lotto}></Route>
      </div>
    </BrowserRouter>
   )
 }

export default Games;
```
- `Link`와 `Route`를 매칭했다.
- Route 부분은 바뀔 화면이 나오는 부분이며
- 그 외 부분은 공통 레이아웃이다. 따라서 다른 화면으로 바뀌어도 그대로 유지.
### 1.1 BrowserRouter
- 예를 들어 숫자야구 링크를 클릭하면 주소창이 `localhost:8080/number-baseball`이 되는데,
- 여기서 새로고침을 하면 `Cannot GET /number-baseball`이라는 에러가 발생한다.
- 그 이유는, 해당 페이지가 가상 페이지이기 때문이다.
- `localhost:8080/number-baseball`은 실제 서버에 연결된 페이지가 아니므로,
- 새로고침을 한 순간 서버에 요청이 가는데 서버는 이 주소를 모른다!
- 프론트단에서만 이 주소가 유효하기 때문에 서버쪽에 알려서 세팅을 해야 한다.
- 같은 이유로 검색엔진에 걸리지도 못한다.
#### 1.1.1 tip
webpackconfig.js에서 `devServer: { historyApiFallback: True }` 으로 세팅하면 해결할 수 있다고 함
### 1.2 HashRouter
- `BrowserRouter`와 사용방법과 동작결과까지 동일하지만, 주소창에 `#`가 추가된다.
- 또한, 아까의 경우처럼 새로고침을 했을 때 에러가 발생하지 않고 정상적으로 동작한다.
- 이 해쉬 이후 주소는 프론트엔드만 아는 부분이다.
- 서버는 여전히 이 주소를 알지 못하므로 검색엔진에 걸리지 않는다.
- 그래서 보통 검색엔진이 필요없는 관리자페이지 같은 경우에 많이 사용한다고 함.
### 2. Dynamic Routing 다이나믹 라우팅(동적 라우팅)
- `Route`가 아주아주 많아졌는데 이를 효율적으로 관리하고 싶을 때 유용하다.
- 쉽게 말해 `Route`의 개수를 줄이는 방법이다.
```javascript
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/game/number-baseball">숫자야구</>
        <Link to="/game/rock-scissors-paper">가위바위보</>
        <Link to="/game/lotto-generator">로또생성기</>
        <Link to="/game/index">게임 매쳐</>
      </div>
      <div>
        <Route path="/game:name" component={GameMatcher} >
      </div>
    </BrowserRouter>
   )
 }

export default Games;
```
- `path="/game:name"`에서 : 콜론을 파라미터, 줄여서 `params`라고 부름
- `name`이 동적으로 바뀐다. name에 number-baseball이 들어갈 수도 있고, rsp가 들어갈 수도 있다.
- `Link`에는 `game/아무단어` 이렇게 2단어를 입력한다.
- `Link`에서 주소를 `/game`으로 통일하면 기존 Route 3개를 쓰지 않아도 된다.
- 그리고 `GameMatcher`에서 그 게임 컴포넌트들을 불러오고 구분해주면 된다.
- 이런 방법으로 Route 부분을 간략하게 줄일 수 있다.(대신 GameMatcher부분이 길어지지만...)
```javascript
import React, { Component } from 'react';
import NumberBaseBall from './NumberBaseBall';
import RSP from './RSP';
import Lotto from './Lotto';

class GameMatcher extends Component {
  render() {
    if (this.props.match.params.name === 'number-baseball') {
      return <NumberBaseball />
  } else if (this.props.match.params.name === 'rock-scissors-paper') {
     return <RSP />
  } else if( this.props.match.params.name === 'lotto-generator') {
     return <Lotto />
  }
  return (
    <div>
      일치하는 게임이 없습니다.
    </div>
   );
  }
};

export default GameMatcher
```
- 이 부분을 이해하기 전에 알아야 할 개념들이 있다.
- `GameMatcher` 컴포넌트에서 `console.log(this.props)`를 찍어보면, `history`, `location`, `match`가 들어있다.
- 이는 `<Route <Route path="/game:name" component={GameMatcher} >`에서   
  '라우트 컴포넌트'가 현재 연결되어있는 `GameMatcher` 컴포넌트한테 그 셋을 넣어주는거임.
  - 만약 연결이 되지 않은 컴포넌트에서 이 세 기능을 쓰고 싶다면 `withRouter`를 사용한다.
  - 하이오더컴포넌트 방식으로 withRouter로 감싸준다.
  ```javascript
  import React { Component } from 'react';
  import { withRouter } from 'react-router-dom';

  class GameMatcher extends Component {
    render() {
      console.log(this.props.history, this.props.location);
      return(
        <div>게임매쳐</div>
      )
    }
  }

  export default withRouter(GameMatcher);
  ```
### 2.1 history
- 이 api는 사실 브라우저에도 있지만, 여기서 설명하는 것은 리액트라우터에서 제공하는 api이다.
- 리액트는 기본 브라우저의 동작과 다르기 때문에 해당 api를 써야 하며 혼동하면 안된다. 
- history는 페이지를 넘나드는 기능을 하는 메서드들을 가지고 있다.
### 2.2 match
- 동적 주소를 라우팅할 때 params에 대한 정보를 담고 있다.
- 위에서 언급한 `path`에서 입력한 `:` 에 현재 페이지 정보가 들어있음.
### 2.3 location
- 실제 주소에 대한 정보들을 담고 있다.
- `pathname: "game/number-baseball"이나 `search: ""`, `hash: ""` 이런 기능을 담고 있다.
- 위 기능들을 활용하여   
  `if (this.props.match.params.name === 'number-baseball') {return <NumberBaseball />`
  `:name`에 대한 정보가 `match.params.name`에 들어있다는 개념을 활용하여 분기처리했다.
### 3. Query String 쿼리스트링과 URLSearchParams
- 주소에 부가정보를 담는 방법이며, 주소에 데이터를 전달하는 가장 간단한 방법이다.
- `?key=value` 형식을 사용한다.
- 예를 들어,  
```javascript
<Link to="/game/number-baseball?query=10&hello=react&bye=corona">숫자야구</>
```
- 이와 같이 주소에 담아서 전달하면 이번엔 서버도 이해할 수 있다.
- 이 쿼리스트링에 대한 정보는 `location.search`에 담겨있어서 다음과 같이 활용할 수 있다.
```javascript
class GameMatcher extends Component {
  render() {
    let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
    console.log(urlSearchParams.get('hello')); //react
```
