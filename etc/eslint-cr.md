## Delete `␍` eslint (prettier/prettier) 에러
- 타입스크립트를 사용한 프로젝트를 실행하던 중 발생한 에러
- 아마 줄바꿈 문자 관련 에러라고 생각된다.
- `.eslintrc`에 다음과 같이 엔드라인을 오토로 수정하여 해결하였다.
- ```javascript  
   "rules": {    
     "prettier/prettier": ["error", { "endOfLine": "auto" }],
  ```
- 참조: https://noogoonaa.tistory.com/62
