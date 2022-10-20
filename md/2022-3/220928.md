2022.09.28.Wed.

- scope 적용 결과페이지 구현
- keycloak 에러
  - 평소와 같이 docker를 작동시키고 작업을 하려고 했는데 에러 발생
  - ```
    User with username 'admin' already added to '/opt/jboss/keycloak/standalone/configuration/keycloak-add-user.json'
    ```
  - 다음 페이지의 도움으로 해결: https://stackoverflow.com/questions/59599620/keycloak-8-user-with-username-admin-already-added
  - vscode 에서 keycloak open
  - ```
    KEYCLOAK_USER: admin
    KEYCLOAK_PASSWORD: code1234
    ```
  - 위 2줄을 주석처리하고 start 컨테이너 실행하면 잘 동작함
  - stop
  - 다시 주석해제
  - start
  - 끝
