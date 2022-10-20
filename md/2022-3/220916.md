2022.09.16.Fri.

PR을 로컬로 가져오기

- 지금까지는 바로 merge한 다음 로컬에서 확인했는데, pr 자체를 로컬로 가져와서 확인한 다음에 merge 하는 방법이 필요하다.
  [https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/checking-out-pull-requests-locally](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/checking-out-pull-requests-locally)

  ```jsx
  git fetch origin pull/ID/head:BRANCHNAME
  git checkout BRANCHNAME

  // 새로운 pr을 올릴 수 있다
  git push origin BRANCHNAME
  ```

- `ID` 는 PR 번호
- `BRANCHNAME`은 임의로 만든 브랜치명

- 다른 포스트: [https://blog.outsider.ne.kr/1204](https://blog.outsider.ne.kr/1204)

  ```jsx
  git pull origin pull/110/head:pr-110
  ```

- (여기서 origin은 메인 원격 저장소) 이 과정을 자동으로 하는 방법도 있음. config에 설정하면 되지만 현재 나에게는 불필요하다고 생각되어 잠시 패스
