#### 210219 git add 하다가 발생한 에러

```
LF will be replaced by CRLF in (파일).   
The file will have its original line endings in your working directory
```
- 플랫폼마다 사용하는 줄바꿈 문자가 달라서 발생한 문제.
- Windows는 라인 바꿈 문자로 CR(Carriage-Return)과 LF(Line Feed) 문자를 둘 다 사용하지만, Mac과 Linux는 LF 문자만 사용한다.   

- `$ git config --global core.autocrlf input`  
 이 설정을 이용하면 Windows에서는 CRLF를 사용하고 Mac, Linux, 저장소에서는 LF를 사용할 수 있다.  
- [관련 공식 문서 설명](https://git-scm.com/book/ko/v2/Git%EB%A7%9E%EC%B6%A4-Git-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
