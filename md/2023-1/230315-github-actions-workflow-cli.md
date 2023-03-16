2023.03.15.Wed
2023.03.16.Thu

### github action workflow 작성하기

- /studio 내부에서 코드가 변경되었을 경우, 직접 `sanity deploy`를 해야만 배포되어 반영이 되는 번거로움을 해소하기 위함
- main 브랜치에 변동이 생기면 vercel은 항상 배포가 됨
- sanity도 동일하게 하는 것이 좋을 듯
- /studio 내용이 변경되었을 때만 감지해서 배포된다면 가장 좋음
- 이참에 CICD에 대해 다시 학습하기

- github의 경우 actions로 CICD를 설정할 수 있음
- `/.github/workflow/__.yml`에 자동화 프로세스를 만들어서 실행할 수 있음

- workflow > job > step > action 순으로 명시적으로 작성함

- 절차 자체는 간단함
  - 1. studio 디렉토리에서
  - 2. sanity deploy 명령어 실행하여 배포하기
- 우선으로 `./studio` 디렉토리에서 sanity cli tool 설치가 필요함
  - `npm install -g @sanity/cli`
- 그런 후에 `sanity deploy` 명령어를 실행시킴
- 실행하는 디렉토리 설정은 `working-directory` 프로퍼티를 사용함
- > working-directory 프로퍼티는 명령을 실행할 때마다 수행해 주어야 합니다. 터미널처럼 한번 경로를 이동한다고 상태가 남는 것이 아니라 매번 새로 실행하기 때문입니다.
  > 출처: [원하는 디렉토리에서 Github Actions 실행하기](https://velog.io/@bluestragglr/%EC%9B%90%ED%95%98%EB%8A%94-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC%EC%97%90%EC%84%9C-Github-Actions-%EC%8B%A4%ED%96%89%ED%95%98%EA%B8%B0)

- 반영한 workflow

  ```yml
  name: sanity deploy
  on:
    push:
      branches: [main]

  jobs:
    deploy:
      timeout-minutes: 5
      runs-on: ubuntu-latest # self-hosted || ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
          with:
            node-version: 16
        - name: install sanity cli tool & package
          run: |
            npm install -g @sanity/cli
            npm install
          working-directory: ./studio
        - name: check sanity
          run: |
            sanity -v
          working-directory: ./studio
  ```

- `runs-on: ubuntu-latest`: Job이 돌아갈 환경(ubuntu 최신 버전)
- `uses: actions/checkout@v3`:
  - `{소유자}/{저장소명}@{참조자}`의 형태
  - checkout: github에 올려둔 코드를 ci 서버로 내려받은 후에 특정 브랜치로 전환하는 행위
  - GitHub Actions에서 처리되는 모든 작업은 이 checkout 단계부터 시작함
  - 그래서 GitHub에서는 checkout에 필요한 일련의 과정을 묶어서 액션으로 제공하기 때문에 이 GitHub Actions의 checkout 액션을 사용하면 매우 간편하게 코드 저장소로 부터 CI 서버로 코드를 내려받도록 워크플로우를 구성할 수 있음
  - `actions/checkout@v3`은 GitHub에서 제공하는 체크아웃 액션의 소유자 actions, 저장소 이름은 checkout이며 현재 포스팅 시점에서 사용 가능한 최신 버전은 v3을 의미함
- `uses: actions/setup-node@v3`: runner에 node 패키지를 설치함
- `run: sanity deploy`: runner에서 command로 실행할 명령어 `sanity deploy`
- 멀티 커맨드 라인은 다음과 같이 작성함

  - ```yml
    run: |
      npm install -g @sanity/cli
      sanity -v
    ```

- 도움 받은 글:
  - https://docs.github.com/ko/actions/using-workflows/workflow-syntax-for-github-actions
  - https://docs.github.com/en/actions/using-workflows/using-github-cli-in-workflows
  - [Github Action을 이용한 CI/CD 개발 주기 자동화](https://velog.io/@youngerjesus/Github-Action을-이용한-CICD-개발-주기-자동화)
  - [원하는 디렉토리에서 Github Actions 실행하기](https://velog.io/@bluestragglr/%EC%9B%90%ED%95%98%EB%8A%94-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC%EC%97%90%EC%84%9C-Github-Actions-%EC%8B%A4%ED%96%89%ED%95%98%EA%B8%B0)
  - [GitHub Actions의 체크아웃(Checkout) 액션으로 코드 내려받기](https://www.daleseo.com/github-actions-checkout/)
