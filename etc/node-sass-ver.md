## node-sass 버전 충돌 문제
- cra로 만든 프로젝트에서 scss를 사용하려고 했는데, 에러가 발생했다.  
`Error: Node Sass version 5.0.0 is incompatible with ^4.0.0.`  
- 알고보니 cra로 만든 프로젝트와 node-sass 5.0 버전과 충돌이 난다고 한다.
- 관련 링크: https://github.com/facebook/create-react-app/issues/10045#issuecomment-738920721
- 따라서 4 버전으로 설치해야했다.
- ```javascript
  npm uninstall node-sass
  npm install node-sass@4.14.1
  ```
