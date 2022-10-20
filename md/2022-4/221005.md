2022.10.05.Wed.

origin에 올린 커밋 취소하기

- 완벽하다고 생각한 develop을 release 하고 origin/main에 까지 올렸는데, 잘못된 부분을 발견함.

- 이미 origin 원격 저장소에 올라간 main 브랜치를 수정하려면?

  - `git log --oneline` 명령어를 입력하여 푸시하기 전 원격 저장소의 위치를 찾아서

  - `git reset --hard "asdf23"` 입력한다.

  - 이 상태에서 `git push origin main -f` 하면 원격저장소에도 잘못 올라왔던 기록이 사라져있다.

- 도움을 받은 글: https://panython.tistory.com/24
