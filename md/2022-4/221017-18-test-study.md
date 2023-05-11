2022.10.17~18

테스트 코드 적용 전 구체적 구현 계획 및 적용 사례 정리

- ~~공식 문서 빠르게 훑어보며 jest, react-testing-library에 대한 기본적인 내용 습득~~
- ~~유닛 테스트 자세한 적용 사례~~
  - ~~컴포넌트 하나에 적용한 사례~~
  - ~~하위 컴포넌트가 있을 경우?~~ -> 케이스에 따라 다르겠지만, 같이 포함시키는 Sociable 방식으로 진행해보기
  - ~~mock api 통신 방식~~
- ~~통합 테스트 사례~~
  - ~~통합 범위 -> 화면 단위(페이지)~~
  - ~~api 적용 사례~~
- ~~단위-통합 테스트의 모호한 경계~~
- ~~e2e에서 api 통신 관련 작업 방식 -> 실제 api와 통신~~
- ~~모든 api에 대한 목 함수 파일을 별도로 만들어놓고 필요할 때마다 가져다가 사용해야?~~
- ~~리덕스에서의 테스트 코드 적용 사례~~
- ~~테스트 코드 실행 방법(단일 파일, 전체, 경로별 등)~~
- ~~테스트 코드 적용 시점~~
  - ~~테스트 코드 작성 시점~~
  - ~~테스트 자동화?~~

---

<br />

## 유닛 테스트

- 사용 도구: Jest & React-Testing-Library(RTL)
- 유닛 테스트의 예시
  - 컴포넌트가 잘 렌더링된다.
  - 컴포넌트의 특정 함수를 실행하면 상태가 우리가 원하는 형태로 바뀐다.
  - 리덕스의 액션 생성 함수가 액션 객체를 잘 만들어낸다.
  - 리덕스의 리듀서에 상태와 액션객체를 넣어서 호출하면 새로운 상태를 잘 만들어준다.
- [유닛 테스트에 대한 방향성을 잡기 전에 읽을만한 글](https://jbee.io/react/testing-1-react-testing/)

<br />

## 통합 테스트

- 사용 도구: playwright, jest & rtl
  - 이 부분은 케이스에 따라, 개발자의 관점에 따라 갈리는 듯 하다.
  - 브라우저 환경에서 UI를 정확하게 검증할 필요가 있다고 생각할 경우 playwright을,
  - 단위 테스트의 확장 버전으로 생각할 경우(비즈니스 로직과 관련이 깊은 경우) jest&rtl으로 결정하는 것 같다.
  - 테스트 케이스에 따라 더 적합한 툴을 판단하여 사용하면 되지 않을까 싶음
  - playwright 사용 예시
    - https://dev.to/stripe/integration-testing-the-payment-element-with-playwright-1j9n
    - https://yeoulcoding.me/245 (cypress)
  - rtl 사용 예시
    - https://im-developer.tistory.com/226
    - https://fe-developers.kakaoent.com/2022/220825-msw-integration-testing/
- 통합 테스트의 예시
  - 여러 컴포넌트들을 렌더링하고 서로 **상호 작용**을 잘 하고 있다.
  - DOM 이벤트를 발생 시켰을 때 우리의 UI 에 원하는 변화가 잘 발생한다.
  - 리덕스와 연동된 컨테이너 컴포넌트의 DOM 에 특정 이벤트를 발생시켰을 때 우리가 원하는 액션이 잘 디스패치 된다.

<br />

## E2E 테스트

- 사용 도구: playwright

- 현재 playwright 라이브러리로 적용되어 있음(register.spec.ts)
- 위 방법대로 진행하면 될 듯.
- [TOAST UI 팀의 사례](https://ui.toast.com/weekly-pick/ko_20210818)

<br />

## Redux 에서의 테스트 코드

- state와 action을 테스트 케이스에 따라 넘겨주고, 그에 맞게 상태가 잘 변경되는지에 대해 테스트
- https://velog.io/@velopert/using-redux-in-2021#%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C%EB%A5%BC-%EC%9E%91%EC%84%B1%ED%95%98%EC%9E%90
- [Provider를 생략하기 위해 커스텀 함수를 생성하여 사용한 사례](https://team.modusign.co.kr/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%97%90%EC%84%9C-%EC%9D%98%EB%AF%B8%EC%9E%88%EB%8A%94-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0-4992409c7f2d)

<br />

## Next.js 공식 문서에서 말하는 테스트 코드

- https://nextjs.org/docs/testing

1. Playwright

   - > Playwright is a testing framework that lets you automate Chromium, Firefox, and WebKit with a single API. You can use it to write **End-to-End (E2E)** and **Integration** tests across all platforms.
   - > Since Playwright is testing a real Next.js application, **it requires the Next.js server to be running prior to starting Playwright.** It is recommended to run your tests against your production code to more closely resemble how your application will behave.
   - > Run `npm run build` and `npm run start`, then run `npm run test:e2e` **in another terminal window** to run the Playwright tests.

2. Jest & RTL

   - > Jest and React Testing Library are frequently used together for **Unit Testing**.

<br />

## api 통신 관련

- [Jest mock](https://minoo.medium.com/%EB%B2%88%EC%97%AD-jest-mocks%EC%97%90-%EB%8C%80%ED%95%9C-%EC%9D%B4%ED%95%B4-34f75b0f7dbe)
- mock api 구현할 때 많이 사용하는 방식은 다음 2가지
  1. [axios-mock-adapter](https://velog.io/@velopert/react-testing-library-%EC%9D%98-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%9E%91%EC%97%85%EC%9D%84-%EC%9C%84%ED%95%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8#axios-mock-adapter-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0)
  2. [MSW(Mock Service Worker)](https://fe-developers.kakaoent.com/2022/220825-msw-integration-testing/)
- 이 중 **MSW** 방식을 채택하기로 함

  - MSW는 API 요청을 가로채서 사전에 설정해둔 목업 데이터를 넘겨주도록 설정해 주는 도구
  - 네트워크 요청을 가로채도록 설계된 Service Worker API를 활용하기 때문에 목 사용 여부 관계 없이 동일한 애플리케이션 동작을 보장
  - 특히, 모킹을 위해 애플리케이션 코드를 변경할 필요가 없음
  - [적용 사례](https://blog.mathpresso.com/msw%EB%A1%9C-api-%EB%AA%A8%ED%82%B9%ED%95%98%EA%B8%B0-2d8a803c3d5c)

- 실제 API 서버를 이용 -> 통합/E2E 테스트
- Ajax 통신 모듈을 Mocking / 가상 API 서버를 구축 -> 단위/통합 테스트
- 서비스 레이어를 분리해서 Mocking - 단위/통합 테스트
- > (통합 테스트는) 나중에 전사적으로 E2E테스트를 시작할 준비가 되었을 때 기존 테스트 코드를 그대로 재사용할 수 있습니다. (서버사이드에서 발생하는 요청들을 모킹하는 것이 아니라 그냥 실제 서버에서 내려주는 값을 사용하는 것이기 때문에 네트워크 모킹 하는 부분들만 지워주면 됩니다.)(출처: https://yeoulcoding.me/245)

<br />

## 단위 vs 통합 테스트 (참고용)

- 어플리케이션의 상태를 관리하는 레이어만 분리해서 테스트 -> 단위 테스트
- 상태와 바인딩 된 DOM 요소의 상태를 테스트 -> 통합 테스트
- 핵심 알고리즘을 담고 있는 모듈이 아니면 단위 테스트를 지양한다.
- 내부 모듈간의 의존성을 Mocking 하는 것은 지양하고, 통합 테스트 위주로 작성한다.
- 통합 테스트는 **화면 단위**로, 즉 pages 디렉토리 파일 단위로 진행 예정
- 단위 테스트는 가급적이면 **화면과 관련없는 비지니스 로직** 관련 위주로 작성할 것.
- [참고](https://nhnent.dooray.com/share/posts/9jRYF1fxRwiCvwi6VM0VgA)

<br />

## 테스트 코드 실행하기

> Jest는 <u>테스트할 대상 파일을 구체적으로 지정할 수 있는 기능</u>을 제공한다. 우선 Jest는 기본적으로 Git과 같은 버전 관리 도구와 연동하여 마지막 커밋 이후에 변경 사항이 있는 파일만을 테스트 대상에 포함한다. 이를 통해 이미 검증된 파일에 대해서 불필요한 테스트를 매번 실행하는 것을 방지할 수 있다.

> 커맨드 라인 인터페이스를 사용하면 파일을 더 구체적으로 선별할 수 있다. 한 번 실행한 이후에는 추가로 명령할 수 없는 보통의 러너들과는 달리, Jest는 인터랙티브한 커맨드 라인 인터페이스를 제공해서 실행 이후에도 키 입력을 통해 테스트 대상 파일들을 변경할 수 있는 기능을 지원한다. 이를 통해 현재 진행 중인 테스트를 취소하거나, 특정 파일명과 매치되는 테스트만 필터링해서 실행하도록 명령할 수 있다. 또한 스냅샷 테스트가 실패한 경우 결과를 확인한 후에 바로 스냅샷을 갱신하도록 만들 수도 있다.
> (출처: https://ui.toast.com/fe-guide/ko_TEST#%ED%85%8C%EC%8A%A4%ED%8A%B8-%ED%8C%8C%EC%9D%BC-%ED%95%84%ED%84%B0%EB%A7%81)

- 디렉토리 구성

  - Next.js 공식문서에 의하면 jest의 컨벤션은 `__test__` 디렉토리 안에 테스트 코드 파일을 저장하는 것이라고 함(https://nextjs.org/docs/testing#creating-your-tests)
  - Jest 공식문서에 의하면 꼭 모두가 그렇게 사용하지는 않는다고 함(https://jestjs.io/blog/2016/09/01/jest-15#test-file-patterns)
  - 더 많은 사례 찾아보거나 실제로 적용해보고 결정

- 파일 실행
  - scripts에 작성한 test 명령어를 실행하면 프로젝트 내에 모든 테스트 파일을 찾아서 테스트를 실행함.
  - Jest는 기본적으로 `test.js`로 끝나거나, `__test__` 디렉토리 안에 있는 파일들은 모두 테스트 파일로 인식하기 때문에 만약 특정 테스트 파일만 실행하고 싶은 경우에는 테스트 실행 명령어 뒤에 파일명이나 경로를 입력함
  - ex:
    ```
      "scripts": {
        test: "jest",
      }
    ```
    - `npm test`
    - `npm test 파일명 또는 경로`

<br />

## 테스트 코드 작성 시점

- 긴급 대응 상황이 아니라면 개발과 함께 진행하는 것이 좋다고 생각(개발 전후 또는 진행하면서)
- 단위/통합/e2e 각 테스트가 존재하는데, 어떤 테스트를 어떤 시점에 작업하는 것이 좋을까?
- 한 곳에서 새로운 코드를 작성할 때마다 유닛 테스트를 실행한다? (리팩토링되었을 경우는 테스트 코드도 수정해야겠지)
- 위와 같은 경우가 생겼을 때마다 한 번씩은 통합 테스트를 실행한다?
- e2e 테스트의 경우는? 완전 최후에?
- [모두싸인 프론트엔드 팀의 사례](https://team.modusign.co.kr/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%97%90%EC%84%9C-%EC%9D%98%EB%AF%B8%EC%9E%88%EB%8A%94-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0-4992409c7f2d)
  > 1. 여러 모듈의 상호작용을 가장 높은 우선순위로 두고 통합 테스트 작성에 집중합니다.
  > 2. 복잡한 기능, 다른 팀원에게 부가 설명이 필요한 함수는 유닛테스트를 작성합니다. 테스트 코드가 함수의 기능을 설명하는 명세서의 역할도 합니다.
  > 3. 테스트 커버리지 퍼센트에 연연하지 않습니다. 1번에서 작성한 통합 테스트가 간접적으로 테스트하고, 추가로 확인할 필요 없으면 별도로 테스트를 작성하지 않아도 좋습니다.

<br />

## 테스트코드 자동화

- 하나의 기능을 추가/변경/삭제 하였을 때 다른 컴포넌트에도 영향을 줄 수 있기 때문에 그때마다 유닛/통합 테스트를 진행하는 것이 좋을 듯?
- 그렇다면 커밋을 하나 할 때마다 자동으로?
- 현재 package.json scripts의 `"pre-commit"`:
  `lint-staged && yarn test:unit && yarn test:e2e`
  - lint 검사를 실행하고 && 유닛 테스트를 실행하고 && e2e 테스트를 실행시킴
- 기존 `ci.yml`을 살펴보니 다음 내용이 주석처리 되어 있음
  ```
  # 웹 서버 실행을 위한 조건을 갖춘 후 build 실행
  # build 후에 테스트를 위한 패키지 설치 후 테스트 진행
  # 테스트를 통과하면 Vercel로 배포 진행
  ```
- (참고로 api repo의 경우는 build - unit test - e2e test - deploy 순으로 작성됨)
- 현 프로젝트는 build, test를 생략하고 곧바로 vercel로 배포가 진행되는 상황
- 그렇기 때문에 이 순서에 적절하게 적용하면 되지 않을까 싶음
- 커밋을 하기 전에 변경된 코드에 대한 unit test, 배포하기 전에 통합 & e2e 테스트? -> 이 부분은 실제 사용해보고 구체적으로 다시 정리하기.
- 그리고 명령어를 입력하면 언제든 통합 테스트, 특정 테스트를 실행시킬 수 있게 세팅시키기.
- 일단 통합 테스트 -> vercel deploy 까지는 확정. 아무리 긴급 대응이라도 이 부분은 통과해야 배포해도 되는 코드라고 생각함.

<br />

## 구현 방향 계획(임시)

- mock api 파일들을 세팅
- 컴포넌트별로 유닛 테스트(비즈니스 로직에 집중, 모든 컴포넌트x)
- 페이지별 통합 테스트
- 코드 수정이 일어날 때, 해당 코드가 속한 페이지의 통합 테스트를 실행시키기?
- e2e 테스트는 통합 테스트에서 mock api -> 실제 api 통신을 하기만 하면 된다?
- 배포 전 e2e 테스트를 작동시키고 통과했을 때 vercel로 넘긴다?
  - 너무 많은 시간이 소요되진 않을지.
  - 구체적 범위에 대해 결정할 필요

<br />

## 기타 테스트 관련 방법론들

- [TDD](https://velog.io/@velopert/TDD%EC%9D%98-%EC%86%8C%EA%B0%9C)
- [계층 구조의 테스트 코드 작성하기](https://johngrib.github.io/wiki/junit5-nested/)
  - BDD(Behaviour-Driven Development)가 테스트 대상의 행동을 묘사하는 방식이라는 것을 염두에 두고 작성함

<br />

참조:

- https://nhnent.dooray.com/share/posts/9jRYF1fxRwiCvwi6VM0VgA
  - [위 설명을 더 정리한 포스팅](https://ehddnjs8989.medium.com/2020-nhn-fe-test-%EA%B5%90%EC%9C%A1-7631a3a15206)

<br />

---

<br />
<br />

+) husky와 lint-staged

- Git hook
  - git과 관련된 어떤 이벤트(add, commit, push 등)가 발생했을 때 특정 스크립트를 실행할 수 있도록 하는 기능
  - 크게 클라이언트 훅 / 서버 훅으로 나뉨
  - 클라이언트 훅은 commit, merge가 발생하거나 push가 발생하기 전에 클라이언트에서 실행하는 훅
  - 서버 훅은 git repository로 push가 발생했을 때 서버에서 실행하는 훅
  - 그 중에서 `pre-commit` 훅이 현재 프로젝트에 입력되어 있는 상태.
  - `git commit` 명령어로 커밋을 실행하기 전에 실행되는 훅
- **husky**가 바로 이 git hook을 편하게 사용할 수 있도록 도와주는 툴
- eslint나 prettier가 반드시 작동한 뒤에 repo에 커밋될 수 있도록 하기 위함(잠재적 문제를 사전 방지 & 포맷의 일관성 유지의 목적)
- **lint-staged**는 내가 stage에 add한 파일에 대해 미리 설정해놓은 명령어를 실행해주는 라이브러리
- husky는 프로젝트의 모든 코드를 검사하지만, lint-staged는 staged한 코드만 검사하기 때문에 보다 효율적임

참조:

- https://velog.io/@jma1020/husky-lint-staged%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80
- https://library.gabia.com/contents/8492/
