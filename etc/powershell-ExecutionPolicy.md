## Window Powershell 스크립트 관련 에러
![errorimage](https://user-images.githubusercontent.com/66292371/111908495-d8194c80-8a9c-11eb-9deb-28b4ce41dfb0.png)
- 타입스크립트 컴파일 시도 중에 발생한 에러
- Powershell에서 스크립트 실행을 기본적으로 제한하고 있기 때문에 권한 설정을 해야 했다.
1. PowerShell 프로그램을 관리자 권한으로 실행
2. `Set-ExecutionPolicy RemoteSigned` 를 입력하여 RemoteSigned로 권한을 수정한다.
3. `Get-ExecutionPolicy` 명령어로 RemoteSigned로 변경되었는지 확인한다.
- RemoteSigned 에 대한 설명
  - 스크립트를 실행할 수 있습니다.  
  - 전자 메일과 인스턴트 메시징 프로그램을 포함하여 인터넷에서 다운로드하는 스크립트와 구성 파일에는 신뢰된 게시자의 디지털 서명이 필요합니다.  
  - 이미 실행한 스크립트와 로컬 컴퓨터에 작성한(인터넷에서 다운로드하지 않음) 스크립트에는 디지털 서명이 필요 없습니다.  
  - 서명되었지만 악의적인 스크립트를 실행할 위험이 있습니다.  


##### 참조
https://talsu.net/?p=834
