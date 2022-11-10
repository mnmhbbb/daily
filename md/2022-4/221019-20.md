2022.10.19-20

## 세팅하기

- 필요한 디펜던시 설치

  - 타입스크립트 개발에서 필요한 라이브러리를 추가로 설치하였고, mock-service-worker로 api 통신 작업을 동작시키기 위해 설치함
  - `@types/jest`
  - `@types/testing-library__jest-dom`
  - `msw`

<br />

## 테스트 파일 실행하기

- ```javascript
    "scripts": {
      "test:unit": "env-cmd -f .env.test jest --watch",
    },
  ```
- 기본적으로 `--watch` 속성을 추가해서, 테스트 코드를 작성하면서 저장할 때마다 그 즉시 테스트가 동작되어 패스 여부를 바로 파악할 수 있음
- msw가 test 환경에서만 동작하게 하기 위해 명령어에 환경변수를 test로 설정하였음.
- 추후에 통합테스트 명령어를 추가할 경우에도 test 환경변수를 적용할 예정
- `yarn test:unit` 을 입력하면 `.test.js` 또는 `__test__` 디렉토리 안에 있는 모든 파일들이 실행됨
- 개별 파일을 테스트하고 싶을 때는 `yarn test:unit 파일명 또는 경로`

  - ex: `yarn test:unit sample.test.js`

    <br />

- 현재 아주 간단하게 유닛 테스트 코드를 하나 짜서 통과시켜본 예시

  (Calculator 컴포넌트가 렌더링이 되고, "예상배출량"이라는 타이틀을 잘 띄우는지 확인함)

  ```jsx
  import { screen } from '@testing-library/react';
  import Calculator from './Calculator';
  import { renderWithProviders } from 'tests/utils/test-utils';

  describe('Calculator', () => {
    it('title should be rendered', () => {
      renderWithProviders(<Calculator />);
      const titleEl = screen.getByText('예상배출량');
      expect(titleEl).toBeInTheDocument();
    });
  });
  ```

  - 이 테스트 코드를 실행하려면, `yarn test:unit calculator.test.tsx`

## 리덕스
