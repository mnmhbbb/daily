2022.10.11.Tue.

- capacitor 를 사용하여 웹앱을 네이티브 앱으로 변환하기
- 필요한 환경세팅 미리하기
- 배경지식

  - ionic
    > 하이브리드 어플리케이션을 쉽게 만들기위한 프레임 워크이자, 하이브리드 앱을 개발하기에 최적화된 환경을 제공하고, ionic은 HTML5 API를 사용할 수 있는 컴포넌트들과 크로스 플랫폼 빌드가 가능한 Cordova 기반으로 구성된 하이브리드 앱 개발 프레임워크이다.
    - [https://velog.io/@dog0094s/1-Ionic-이란](https://velog.io/@dog0094s/1-Ionic-%EC%9D%B4%EB%9E%80)
    - [https://mingpd.github.io/2019/05/15/develop/ionic-1/](https://mingpd.github.io/2019/05/15/develop/ionic-1/)
    - android 빌드 시 Android Studio
    - ios 빌드 시 xcode
    - [설치방법](https://velog.io/@dormahd114/MacM1-Xcode-Android-Studio-%EC%84%A4%EC%B9%98-%EC%8B%A4%ED%96%89-%EB%B0%A9%EB%B2%95)
  - cordova
    - apache 재단에서 지원 중인 하이브리드 웹 애플리케이션 개발을 위한 프레임워크
  - capacitor
  - capacitor는 코르도바와 매우 유사하지만 앱 워크플로우의 주요 차이점이 있다.
  - [https://12teamtoday.tistory.com/96](https://12teamtoday.tistory.com/96)

    > 본질적으로 캐패시터는 코르도바의 새롭고 유연한 버전과 같다.

  - 기타 참조할만한 글
    - [https://www.gongsiljang.net/post/88](https://www.gongsiljang.net/post/88)
    - [https://mingpd.github.io/2019/05/15/develop/ionic-1/](https://mingpd.github.io/2019/05/15/develop/ionic-1/)

- 환경세팅

  - xcode 설치
    - app store에서 설치가 진전이 없는 이슈가 유명해서 다음 링크를 참조함
    - [https://extrememanual.net/41685](https://extrememanual.net/41685)
    - apple developer 로그인
    - 설치 1시간 가량 소요됨
    - 설치 완료
  - [capacitor 세팅](https://capacitorjs.com/docs/getting-started/environment-setup)

    - 을 하기 전에 ionic부터 설치 `npm install -g @ionic/cli`
    - ios, android requirements 체크
    - `brew install cocoapods`
      - `pod --version` → `1.11.3` 확인 완료
    - `brew install watchman`
      - `watchman --version` → `2022.10.03.00`
    - jdk
      - `brew install --cask adoptopenjdk/openjdk/adoptopenjdk11`
      - `java --version`
        ```jsx
        java version "17.0.3.1" 2022-04-22 LTS
        Java(TM) SE Runtime Environment (build 17.0.3.1+2-LTS-6)
        Java HotSpot(TM) 64-Bit Server VM (build 17.0.3.1+2-LTS-6, mixed mode, sharing)
        ```
    - android studio
      - [https://developer.android.com/studio](https://developer.android.com/studio)
    - iterm2에서 `open ~/.zshrc` 입력하고 맨 마지막 줄에 다음 내용 추가

      ```
      export GEM_HOME=$HOME/.gem
      export PATH=$GEM_HOME/bin:$PATH
      ```

    - [https://dotorimook.github.io/post/2021-06-13-next-js-with-capacitor/](https://dotorimook.github.io/post/2021-06-13-next-js-with-capacitor/)
