2023.03.13.Mon
2023.03.14.Tue

### Next.js & Sanity CMS 수정

#### 1. 파일 첨부하기

- blockContent schema에 type: file 추가
- 해당 내용 가져와서 a 태그 href에 적용

#### 2. 비디오 링크 추가하기

- iframe을 편하게 적용하기 위해 react-youtube 패키지 설치
- youtube 링크에서 youtube id 추출하는 유틸리티 함수 추가

#### 3. 마크다운 에디터 적용하기

- [MDX + Sanity + Next.js](https://github.com/jlengstorf/sanity-next-mdx)
- [Markdown input dashboard](https://www.sanity.io/plugins/sanity-plugin-markdown?utm_source=twitter&utm_medium=social&utm_campaign=sanity-plugin-markdown)
- `sanity install markdown`
- `npm install --save sanity-plugin-markdown easymde@2`
- 위 방식은 안돼서 아래 방식으로 적용되고 있음
- `sanity.config.ts` 에서 `sanity-plugin-markdown` 모듈의 `markdownSchema()` 플러그인을 설정함
- 이 상태에서 schema 파일에서 `type: 'markdown'`인 설정을 추가함
- `react-markdown`을 설치하여 저장된 마크다운 형식 데이터를 HTML 엘리먼트로 변환하여 렌더링함

#### 4. getServerSideProps로 전환

- sanity에 저장되는 내용을 동적으로 불러오기 위해 기존 `getStaticProps`, `getStaticPaths`를 `getServerSideProps`로 전환함
- 확인하려면 배포를 해 봐야 함. 기존 방식은 로컬에서 매번 빌드하기 때문.

#### 5. 카테고리 필터링 쿼리 작성

#### 6. sanity CICD
