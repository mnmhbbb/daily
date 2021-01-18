# webpack 과 babel 배우기
(zerocho님 강좌를 보고 공부한 내용이며, 웹팩과 바벨로 리액트 환경을 구축하는 원리를 이해하기 위해 **creat-react-app을 사용하지 않고** 빌드하는 과정을 정리해보려 함.)

## 1. 웹팩과 바벨을 사용하는 이유
- 지금은 배우는 입장이기에 간단한 몇 줄의 코드를 입력하지만, 프로젝트가 커지고, 실무에 들어가게 되면 수십, 수백 가지 컴포넌트로 구성된 페이지를 다루게 될 것이다.
- 그러나 이러한 수천 줄의 코드를 하나의 파일에서 관리하는 것은 비효율적이다.
- 모듈 단위를 사용하여 분리하면 코드의 가독성와 유지보수 효율을 높이고, 스코프 영향을 받지 않으며, 다른 파일에서 만든 코드를 가져와서 활용할 수 있다. 
- 이렇게 분리된, 서로 관련 있는 여러 소스들을(js, css, img, etc...) 하나로 결합하기 위해 **Webpack**이라는 도구를 사용한다.
- 기존의 원본 파일들을 하나의 파일로 압축하여 최적화시키면 네트워크 요청을 여러번 할 필요가 없어지고, 페이지 로드가 빨라질 수 있기 때문이다. 
- 또한, 모든 브라우저에서 최신 문법을 지원하는 것은 아니므로 ES6 이상의 최신 문법을 ES5 문법으로 변환시켜주는 **Babel**이라는 자바스크립트 트랜스파일러를 사용한다.  
- **Babel**은 리액트에서 사용하는 `JSX`문법 또한 `JS`로 변환시켜주므로 브라우저 호환성을 높일 수 있다.  
&nbsp;  

## 2. 그렇다면 사용하는 방법은?
### 2.0 npm 혹은 yarn
- `Node.js` 설치가 필요하며, `npm`은 Node.js를 설치하면 같이 설치된다.
- node.js는 JavaScript 기반으로 구성된 서버 사이드 서비스를 JavaScript로 구현할 수 있게 만든 런타임이고 쉽게 말해 자바스크립트 실행기.  
- npm은 node.js 기반의 모듈을 모아둔 집합 저장소이다. npm은 **Node Package Manager** 또는 **Node Package Modules**라고도 한다. 
- `yarn` 또한 `npm`과 같은 노드 패키지 관리자이다.
### 2.1 본격적인 시작
- 리액트 프로젝트를 작업할 폴더에서 `npm init` 명령어로 초기화시킨다.
  - 그러면 해당 폴더에 **package.json** 파일이 생성됨
- `npm i react react-dom` 명령어로 리액트 관련 코어 라이브러리를 설치한다.
  - **node_modules** 폴더와 **package-lock.json** 파일이 생성될 것이다.
  - **package-lock.json**은 **package.json** 파일의 의존성 트리에 대한 정확한 정보를 가지고 있으므로 커밋할 때 꼭 같이 할 것.
- `npm i -D webpack webpack-cli` 명령어로 웹팩을 설치한다.
  - `-D`는 개발(Development)용이라는 의미이다. pacakage.json에서 확인해보면 "devDependencies" 속성에 담겨있는 것을 확인할 수 있다.
- `npm i -D @babel/core @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties` 명령어로 바벨 설치
  - @babel/core: 바벨의 메인
  - @babel/preset-env: ES6이상의 최신 문법을 ES5로 변환해줌
  - @babel/preset-react: JSX를 JS로 변환해줌
  - @babel/plugin-proposal-class-properties: `state = {}` 같은 class 최신 문법 쓰기위함
- `npm i -D babel-loader`
  - babel-loader: 바벨과 웹팩을 연결해줌
- 추가
```javascript
npm i react-refresh @pmmmwh/react-refresh-webpack-plugin -D
npm i -D webpack-dev-server
```   
데브서버와 핫리로딩 기능을 위해 설치한다.  
  - **웹팩 데브서버**는 webpack.config.js에 적어준 대로 빌드 결과물을 돌린 다음 `publicPath`에 그 결과물을 메모리로 저장함. 그 후 index.html을 실행하면 저장한 결과물을 제공해줌.
  - **핫리로딩**은 코드에 수정사항이 있을 때마다 수정 사항을 감지하고 변경된 결과물을 `publicPath`에 저장해줌. 수동으로 빌드할 필요가 없음.
### 2.2 setting
- `webpack.config.js` 파일을 생성하여 다음과 같이 세팅한다.
```javascript
const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval', //실무에선 hidden-source-map,
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  
  entry: {
    app: './client',
  },
  
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ["@babel/plugin-proposal-class-properties",
                    "react-refresh/babel"
       ],
      }
    }],
  },
  
  plugins: [
    new RefreshWebpackPlugin()
  ],

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
    publicPath: "/dist/",
  },
  
  devServer: {
    publicPath: "/dist/",
    hot: true,
    writeToDisk: true, //app.js 파일을 실제로 생성해줌
  },
}
```
- webpack 공식 사이트에서 확인할 수 있듯 웹팩의 대표적인 컨셉을 말하자면 크게  
  `Entry`, `Output`, `Loaders`, `Plugins`, `Mode` 5가지로 나눌 수 있다.  
&nbsp;  
&nbsp;  
- **Entry**: 모듈의 의존성이 **시작**되는 부분(입력) 경로는 상대경로.
- **Output**: 번들링 결과 설정하고(출력), 경로설정은 절대경로로. 
  - `__dirname`은 현재 프로젝트 디렉터리를 의미함
  - `path.join`: 경로를 합쳐줌
  - `dist`: 빌드된 파일들을 생성하는 폴더
- **Loaders**: 위 코드에서 `module` 속성을 의미하며, 가장 중요한 부분이다.
  - 웹팩은 js파일만 이해할 수 있기 때문에 변환이 필요한데, 그 작업을 여기서 실행한다.
  - loaders는 다른 type의 파일들을 의존성 그래프에 추가할 수 있는 유효한 module 들로 변환시켜준다.
  - loaders는 기본적으로 `rules`프로퍼티를 정의하고 `rules`은 `test`와 `use` 프로퍼티를 가지고 있다.
  - `test` 프로퍼티: 변환해야 하는 파일(대상파일)을 식별하는 역할(정규표현식을 사용했음. jsx 확장자만 변환하라는 의미)
  - `use` 프로퍼티: 어떤 로더를 사용하여 변환해야 하는지.
  - `options`: 로더에 대한 옵션으로, 아까 설치한 presets들을 적용한다.
    - presets은 plugin들의 모임이라고 할 수 있으며, 브라우저 대응도 할 수 있다.
    - 예를 들어  
    ```javascript
              presets: [
            ["@babel/preset-env", {
              targets: {
                browsers: ['> 5% in KR', 'last 2 chrome versions'],
              },
              debug: true, //개발용
            },
          "@babel/preset-react",
    ```  
    - 최근 2 버전 크롬까지만 지원한다거나, 한국에서 점유율 5% 이상인 브라우저만 지원하겠다는 의미.
    - 관련한 자세한 정보는 (https://github.com/browserslist/browserslist)에서 확인해볼 수 있다.
- **Mode**: mode가 development면 개발용, production이면 배포용을 의미한다. 
  - production은 알아서 최적화가 적용된다.
  - development은 빠르게 빌드된다.
- **Plugins**: 부가적인 기능. 다양한 플러그인이 있으므로 선택하여 효과적으로 번들링할 수 있다.  
&nbsp;
- 추가로, **devtool**은 에러가 발생했을 때 번들링된 파일에서 어느 부분에서 에러가 났는지 쉽게 확인할 수 있는 도구를 의미한다.
- **resolve**은 확장자를 생략해도 웹팩이 인식할 수 있게 해주는 속성.  
- **devServer**은 위에서 언급한 대로, webpack.config.js에 적어준 대로 결과물을 돌리고 publicPath에 결과물을 저장하는데,   
  `writeToDisk: true`을 입력하지 않았더니, dist 폴더에 app.js 파일이 생성되지 않았다.   
  결국 빌드 당시에 터미널에 뜨는 `http://localhost:8080/` 링크를 통해 실행하는 방법밖에 없었는데, 검색 도중 알게 되었다. :blush:  
&nbsp;  
&nbsp;  
--------------------------------
## 2.3 컴포넌트 작성
- 위 코드에서 `entry`에 `./client`로 시작한 이유는, 기본적으로 `client.jsx`에서 리액트를 렌더할 계획이기 때문이다.
- `client.jsx`
  ```javascript
  const React = require("react");
  const ReactDom = require("react-dom");

  const GuGuDan = require("./GuGuDan");

  ReactDom.render(<GuGuDan />, document.querySelector("#root"));
  ```
  - 한 줄씩 보자면, 해당 모듈에 리액트와 리액트 돔을 불러오는 것이고,
  - 구구단 컴포넌트를 불러오고, 따라서 webpack.config.js의 entry에서 구구단 컴포넌트를 불러올 필요가 없었다.
  - 마지막으로 이 컴포넌트를 렌더하는 코드  
&nbsp;
- `GuGuDan.jsx`
  ```javascript
  const React = require('react'); 
  const { useState, useRef } = React;

  const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    // ... 코드
  
  };

  module.exports = GuGuDan;
  ```
  - 마찬가지로 해당 모듈에 리액트를 불러오고,
  - 코드를 간결하게 적기 위해 구조분해할당을 작성하고,
  - 하단에 이 모듈을 내보내는 코드를 반다시 작성한다.  
&nbsp;  
&nbsp;
## 2.4 웹팩 실행
- 이제 드디어 파일들을 번들링할 시간이다.
- 터미널에 `webpack`을 입력하면 등록되지 않은 명령어이므로 실행되지 않는다.
## 2.4.1 package.json에서 설정하는 방법
- `package.json`
  ```javascript
  "scripts": {
    "dev": "webpack serve --env development"
  },
  ```
  위와 같이 설정한 후 `npm run dev` 명령어를 입력하면 웹팩이 실행된다.
## 2.4.2 npx를 사용하는 방법
- `npx webpack` 명령어를 사용하면 더 간단하게 실행할 수 있다.
- **npx**은 npm 5.2버전부터 기본으로 제공해주는 하나의 도구이며, npm을 조금 더 편하게 사용하게 해준다.
- 일회성으로 원하는 기능을 수행할 때 사용한다. npx는 최신 버전에 해당하는 패키지를 설치하여 실행하고 실행된 이후에 해당 패키지를 제거하기 때문.  
  (출처: https://pongsoyun.tistory.com/116)
&nbsp;
- 이제 마지막 단계이다. index.html에 스크립트 파일을 불러오면 페이지에서 확인해볼 수 있다.
```javascript
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>구구단</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./dist/app.js"></script>
  </body>
</html>
```
