2023.03.08 ~ 2023.03.09

### Blogging with Sanity and Next.js

#### [Sanity 공식 문서에서 안내하는 Next.js 튜토리얼](https://www.sanity.io/blog/build-your-own-blog-with-sanity-and-next-js)

- 빠르게 확인해 보기 위해 내 github에 test repo를 만들어서 배포까지 진행하려고 함
- 기존 프로젝트에서는 yarn 패키지를 사용하였으나, 위 튜토리얼의 경우 호환의 문제인지 에러가 빈번하게 발생하여 막히는 문제를 방지하기 위해 npm 패키지로 진행함
- 디렉토리는 크게 2가지로 나뉨: studio & frontend
  - studio: 컨텐츠를 작성하고 관리하는 서버 localhost:3333
  - frontend: 이 컨텐츠 데이터를 기반으로 블로그를 구성할 서버 localhost:3000
- 기본적인 세팅 방식은 위 튜토리얼을 따르면 됨  
  0. Sanity cli tool 설치하기 `npm install -g @sanity/cli`
  1. Sanity 회원가입(구글을 통한 방법 등)
  2. `cd studio` `npm install`
  3. `sanity login` `sanity init` -> 프로젝트 생성
  4. Sanity 홈페이지에서 해당 프로젝트 id 가져오기
  5. `sanity.cli.ts`, `sanity.config.ts` 파일의 위 id 입력(추후에 환경변수로 세팅)
  6. dataset은 3번의 프로젝트 생성 과정에서 기본으로 선택된 'production'으로 그대로 진행
  7. `npm run build` 먼저 진행하여 dist 디렉토리가 있는 상태에서 `npm run dev` 입력하면 `localhost:3333` 서버 실행됨. 이곳에서 컨텐츠를 추가/수정할 수 있음
  8. `cd ../frontend` 로 이동하여 `npm install`, `npm run dev`
  9. 필요한 패키지 설치
     `npm i @sanity/image-url @sanity/client`
  10. `localhost:3000` 기본 페이지 실행됨
  11. `/post/slug이름` url로 이동하여 등록된 컨텐츠를 화면에서 확인할 수 있음
- 목록 불러오기 테스트
  - 카테고리별 필터링(초급/중급/고급)
    -> GROQ (Graph-Relational Object Queries) 쿼리 언어를 사용
    - 여기에서 카테고리 전체/초급/중급/고급을 가져오면 될 듯(우선은 페이지네이션x)
    - `categories`가 현재 선택한 카테고리인 post만 필터링
- 배포 테스트
  - studio 배포
    - `sanity deploy` 입력 후 호스트네임을 설정하면 해당 호스트네임이 적용된 url로 배포됨
    - ex. `https://mnmhbbb.sanity.studio`
    - `localhost:3333`에서 입력하는 내용이 위 페이지의 내용과 실시간으로 연동됨
    - `sanity.config.ts`에서 타이틀 등을 설정할 수 있음
  - frontend 배포
    - vercel에 배포할 repo를 연동
    - 이때 root 디렉토리를 `frontend`로 하여 deploy
    - 하기 전에 `npm run build` 로 꼭 체크할 것
  - 최종 확인 결과, 이미지를 제외하고는 로컬과 동일하게 불러옴
  - `<Image>` -> `<img>` 로 변경하여 해결함. 이미지 최적화
  - studio에서 포스트를 수정할 경우, frontend를 다시 배포해야 반영이 됨
- 최종적으로 실제 회사 계정, 회사 레포에 연결시키기
  - 이때는 환경변수, sanity에 cors 허용 설정 적용하기
