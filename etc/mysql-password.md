#### 210218 mysql을 처음 사용하면서 알게 된 내용
1. mysql을 설치하고 mysql이 있는 위치로 이동한 뒤 다음을 입력하여 실행한다.
```
$ mysql -u root -p
```
그런 후에 설치할 때 입력했던 비밀번호를 여기서 입력하면 됨  
&nbsp;

2. 비밀번호 변경하기
```
use mysql;
select host, user, authentication_string from user;
```
현재 비밀번호 확인하고,
```
alter user 'root'@'localhost' identified with mysql_native_password by '변경 후 비밀번호';
```
변경할 비밀번호를 입력한다.
