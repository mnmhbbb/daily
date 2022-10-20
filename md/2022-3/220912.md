2022.09.12.Mon.

git flow를 활용하여 github release하기

`git flow init -f`

main

develop

나머지 다 엔터

시작: develop 브랜치에서 `git flow release start '0.1.0'`

원격 저장소에 올리려면,

`git flow release publish '0.1.0'`

삭제하려면,

`git flow release delete -f ‘0.1.0'`

이제 release를 끝내려면

1. `git flow release finish '0.1.0'`

   그러면 자동으로 main 브랜치에 merge가 되고, (:wq)

2. tag 생성

   v0.1.0 으로 생성(insert, :wq)

   - 2.1 또 다른 방법:

     - `git tag -a 'v0.1.0'` 을 입력

     - 그 다음 # 다음 줄에 v0.1.0 입력하고 :wq를 하니까 생성되었다.

`git tag` 명령어를 입력해보면 목록에 뜬다.

3. 다시 develop 브랜치로 돌아온다.

   `git checkout develop`

   `git merge --no-ff release/0.1.0`

   를 하는데, 이미 업데이트 상태라고 뜬다.

4. `git push origin main`

5. upstream repo에서 PR 하기

- main → main 으로 설정했다.

6. 최종 머지된 커밋을 create a release의 main에 연동하여 등록.
7. main 브랜치에 머지되었으나 vercel에서 environment가 preview로 되어 있어서 **promote to production** 클릭하여 메인 도메인으로 배포함. 완료.

참조:

- [https://git.jiny.dev/gitflow/release](https://git.jiny.dev/gitflow/release)

- [https://uroa.tistory.com/106](https://uroa.tistory.com/106)

- [https://hbase.tistory.com/60](https://hbase.tistory.com/60)

- [https://git.logikum.hu/flow/release](https://git.logikum.hu/flow/release)
