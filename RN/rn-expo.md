# React Native(Expo) Study

0. 기본 내용

- React Native는 네이티브 앱이자 크로스플랫폼 프레임워크
- React의 문법으로 Android, iOS 앱을 개발할 수 있는 크로스플랫폼 프레임워크
- 아래에서 학습하는 RN 컴포넌트(View, Text, Button 등)는 웹 브라우저의 DOM이 아니라 iOS/Android의 네이티브 UI 컴포넌트로 변환되어 렌더링된다.
  (예: <View> → iOS의 UIView, Android의 ViewGroup)
- 앱 안에서 웹페이지를 띄우고 싶다면 react-native-webview 패키지를 사용한다.
- `npx expo install react-native-webview`
- 그러면 RN 화면 일부를 웹뷰 컨테이너로 열어 웹 페이지를 로딩하는 방식이 된다.
- WebView는 해당 컴포넌트 영역 안에서만 웹브라우저 엔진을 사용한다.
- (참고로, 하이브리드 앱(Cordova, Capacitor)은 앱 전체가 WebView 위에서 돌아가고, RN 앱 + WebView는 앱 전체가 네이티브 UI로 구성되며, 일부 화면만 WebView)

1. 공식 문서 참조하여 프로젝트 생성하기
   - https://docs.expo.dev/get-started/create-a-project/
   - `npx create-expo-app@latest`
   - 특정 패키지 설치 시 `npx expo install 패키지명`
2. iOS 시뮬레이터 환경설정
   - 참조: https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated
   - Xcode 설치 후 실행
   - `command + ,` 설정 들어가서 ios 설치
   - Locations 탭 - Command Line Tools 최신 버전 적용
   - watchman 설치(RN 프로젝트에서는 파일이 변경될 때마다 Watchman이 변경사항을 감지하고 해당 파일만 다시 빌드함)
   - `npx expo start`로 프로젝트 실행, i 눌러서 시뮬레이터 실행
   - (만약 switch to expo mode가 보이는 상태라면 s를 먼저 눌러서 expo 모드로 만들고 i 누르기)
     - Using Expo Go가 보여야 함
     - Expo 개발 환경에는 2가지 모드가 있는데, Expo Go와 Development Build이다.
     - Expo Go는 개발 환경에서 변경된 사항만 빠르게 반영할 수 있어서 편리하다.
     - 만약 네이티브 단을 건드려야 하는 기능(카메라, 푸시 알림 등)부터는 Expo Go만으로 할 수 없기 때문에 Development Build 모드로 전환해야 한다고 한다.
     - \*이 부분은 추후 필요할 때 다시 정리 예정
     - [참조 링크](https://var-log.tistory.com/343)
   - 시뮬레이터 실행된 상태에서 터미널에서 y 입력해서 Expo Go 앱이 설치되고, 시뮬레이터에 자동으로 실행됨
     <img src="./rn-expo-1.png" alt='시뮬레이터에서 프로젝트 최초 실행 시' width="300" />
3. Mac에서 Android 에뮬레이터 환경설정
   - 참조: https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated
   - Android Studio 설치 - SDK setup - SDK Manager - Android 14.0 (API Level 34) 설치
   - `code ~/.zshrc`명령어로 설정에
     ```
     export ANDROID_HOME=$HOME/Library/Android/sdk
     export PATH=$PATH:$ANDROID_HOME/emulator
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     ```
     추가하고 터미널 재실행: `source ~/.zshrc`
   - Android Studio - Virtual Device Manager에 가서 사용할 가상 기기를 다운로드 받아야 함
   - (Pixel 3a, API Level 34버전 선택 후 다운로드)
   - Device Manager에서 방금 생성한 가상 기기 옆의 재생 아이콘 클릭해서 에뮬레이터 실행
   - 이제 프로젝트 코드에서 `npx expo start`로 프로젝트 실행, a 눌러서 에뮬레이터 실행
4. 실제 Android, iOS 기기에서 실행하기
   - 앱스토어/플레이스토어에서 Expo Go 설치
   - `npx expo start` 했을 때 나오는 QR코드 기기에서 읽으면, 이제 실제 기기에서 프로젝트를 실행해볼 수 있다.
5. RN 기초 - 컴포넌트
   - RN 공식문서 참조 https://reactnative.dev/docs/components-and-apis
   - **View**는 웹에서 div와 유사한 역할을 하지만, 하위에 바로 텍스트를 적용할 순 없다. Text 컴포넌트를 사용해야 한다.
   - **ScrollView**는 View와 유사하지만, 내용이 화면보다 클 때 스크롤이 가능하다.
   - **TextInput**
     - focus 됐을 때 iOS의 경우 키보드를 띄우려면 `command + k`
     - `autoCapitalize="none"`: 첫 글자 자동 대문자 되는 것 해제
     - `spellCheck={false}`: 키보드 상단에 자동으로 뜨는 것 해제
     - `autoCorrect={false}`
     - `returnKeyType='next'`: 키보드 리턴 부분에 띄울 텍스트
     - `submitBehavior='submit'`: 현재 인풋에서 엔터 누를 때 키보드가 닫히지 않고 유지 됨.
       - blurAndSubmit | newline | submit 3가지 종류가 있음
       - blurAndSubmit를 하면 인풋에서 엔터 누를 때 키보드가 닫힘(디폴트)
       - newline은 줄바꿈
     - `onSubmitEditing={() => setFocus("password")}`: 인풋1에서 엔터를 누르면 password 인풋으로 커서를 이동시킴
       - 이걸 하려면 포커스 받을 인풋을 forwardRef로 감싸고, 이 인풋에 ref를 전달해야 함
     - `textContentType='oneTimeCode'`: 비밀번호 인풋에 'Automatic Strong Password cover view text'가 뜰 경우 추가
       - 이 경우도 ref를 연결해야 함
     - `autoFocus`: 자동으로 포커스
   - Button 사용 시, title로 버튼명을 적용할 수 있다.
   - RN에서는 onClick이 아니라 **onPress**로 클릭 핸들러를 연결할 수 있다.
   - **Pressable**: 버튼이 아니라, 클릭해야 하는 영역을 사용할 때, 더 디테일한 동작을 제어할 수 있다. 마찬가지로 하위에 바로 텍스트를 적용할 수 없다.
   - 웹과 달리 RN에서는 display: flex를 사용하지 않아도 된다.
   - RN에서는 기본적으로 flex direction이 가로가 아니라 세로로 표시됨. 세로로 표시하려면 flexDirection: row를 추가
   - **SafeAreaView**는 ios 노치 영역에 컨텐츠가 침범하지 않도록 하는데, 최근 안드로이드 ui에 존재하는 상하단 노치에는 대응하지 못한다고 함.
     - 그래서 'react-native'가 아닌 '**react-native-safe-area-context**'에서 제공하는 SafeAreaView를 사용함
6. Navigation 구조 설정(Expo Router)
   - Next.js 라우터 방식처럼 각 폴더가 경로가 되고, 파일명도 경로가 된다.
   - 폴더명이 괄호라면 경로를 무시함(Next.js 앱 라우터 방식과 동일)
   - 각 폴더 하위엔 `_layout.tsx` 레이아웃 파일을 만들어서 네비게이션 구조를 설정할 수 있다.
   - 실제 화면에 보이는 것은 아니고, 어떤 네비게이션 구조로 페이지가 전환될지 설정하는 역할
   - 레이아웃 파일에서는 expo-router에서 제공하는 [Tabs](https://docs.expo.dev/router/advanced/tabs/), [Stack](https://docs.expo.dev/router/advanced/stack/) 등을 사용할 수 있다.
   - **Tabs**: 화면 하단에 탭 바가 있고, 탭 버튼을 눌러서 페이지 전환
   - **Stack**: 화면이 쌓이고(pop/push) 이동하는 구조(다음 화면으로 전환할 때 자연스러운 애니메이션 제공함)
   - Tab이 아닌 화면에서는 기본적으로 Stack을 사용함
   - `screenOptions={{ headerShown: false }}`는 네비게이터(Stack, Tabs, Drawer 등)에서 기본으로 제공되는 상단 헤더(타이틀 바)를 숨기는 옵션
   - `<Link>` 태그에 replace를 넘기면 히스토리 스택을 쌓지 않고 대체되는 방식(웹과 동일)
   - **options 종류**:
     - `headerLeft`에 렌더링할 UI 엘리먼트를 리턴하는 콜백함수를 넘길 수 있다.
       ```
       <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "로그인",
          headerLeft: () => (
            <Link href={"/"} replace style={{ paddingRight: 5 }}>
              <Foundation name="home" size={28} color="black" />
            </Link>
          ),
        }}
       />
       ```
     - `headerBackButtonDisplayMode: "minimal"`를 넘기면 헤더 텍스트를 지우고 이전 페이지로 이동하는 아이콘만 남길 수 있다.
     - Stack 내 options 안에 넣는 방식이 아니라, 각 페이지 내에서 `useNavigation()`을 가져와서 상단 헤더를 설정할 수도 있다.
       ```
         const navigation = useNavigation();
         useEffect(() => {
           navigation.setOptions({
             headerRight: () => (
               <CustomButton
                 label="저장"
                 size="medium"
                 variant="standard"
                 onPress={postForm.handleSubmit(onSubmit)}
               />
             ),
           });
         }, []);
       ```
   - `useFocusEffect`: 화면이 포커스됐을 때 동작을 적용할 수 있는 훅
7. 아이콘 적용하기(expo-vector-icons)
   - https://icons.expo.fyi/Index
8. [Pressable](https://reactnative.dev/docs/pressable)
   - style에 다음과 같이 콜백함수를 넘기면, 버튼이 눌린 순간의 스타일도 적용할 수가 있다.
   - ```tsx
       <Pressable
         {...props}
         style={({ pressed }) => [
           styles.container,
           styles[size],
           styles[variant],
           pressed && styles.pressed,
         ]}
       >
     ```
9. style

   - StyleSheet.create에 넘기는 스타일 객체는 모두 카멜케이스로 작성
   - padding 좌우 -> 'paddingHorizontal'
   - 인라인 스타일 적용 방식: `<Link style={{ paddingRight: 5 }}>`
   - 안드로이드는 헤더가(`_layout.tsx`의 `<Stack.Screen>`) 기본적으로 중앙 정렬이 아니라 왼쪽 정렬임
   - `borderTopWidth: StyleSheet.hairlineWidth,` 스타일을 주면 상단에만 보더를 넣을 수 있다. bottom도 마찬가지
   - ios 하단 노치 영역에 스타일이 겹치는 문제:
     - "react-native-safe-area-context"에서 제공하는 `useSafeAreaInsets()` 사용하기
     - 이는 안전 영역의 여백값을 제공한다.
     - `const inset = useSafeAreaInsets();`라고 한다면,
     - `<View style={[styles.fixed, { paddingBottom: inset.bottom || 12 }]}>`
     - 안드로이드의 경우 inset.bottom이 0일 것이기 때문에 기본값 12를 적용한 예시이다.
   - <Text>에 `numberOfLines={3}`을 적용하면 최대 3줄까지만 표시되고 말줄임표가 표시된다.

10. [FlatList](https://reactnative.dev/docs/flatlist)

- 리스트의 길이가 가변적이고 많은 리스트를 표시할 때 사용하면 성능적으로 유용함.
- 이것과 유사한 [SectionList](https://reactnative.dev/docs/sectionlist)가 있는데, 이는 리스트를 그룹화할 때 사용한다.
- `data`에 리스트 데이터와, `renderItem`에 렌더링할 아이템 컴포넌트, 그리고 `keyExtractor`에 react key처럼 고유의 문자열 key를 넘겨준다.
- 컨테이너 스타일은 [contentContainerStyle](https://reactnative.dev/docs/scrollview#contentcontainerstyle) prop으로 넘긴다.
- 그 외 prop으로는 **onEndReached**: 리스트 끝에 도달했을 때 핸들러
- **onEndReachedThreshold**: 리스트의 특정 시점부터 핸들러를 트리거할 수 있음. 0~1 사이의 숫자를 넘길 수 있으며, 예를 들어 0.1로 설정하면, 리스트의 90% 지점에 도달했을 때 핸들러가 트리거됨
- **onRefresh**: 리스트 새로고침 핸들러. 당겨서 새로고침 제스처(pull-to-refresh)에 의해 트리거됨
- **refreshing**: 리프레시 상태

```
<FlatList
  data={dummyList}
  renderItem={({ item }) => <FeedItem post={item} />}
  contentContainerStyle={styles.contentContainer}
  keyExtractor={(item) => String(item.id)}
/>
```

11. [Expo - SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)

- `npx expo install expo-secure-store`
- 디바이스에 key-value 쌍을 암호화하여 저장하는 라이브러리라고 설명되어있음.
- app.json plugins에 "expo-secure-store"를 추가해야 한다.
- RN은 `AsyncStorage`라는 로컬 스토리지를 기본으로 제공하지만, 이는 암호화가 적용되지 않아서 보안에 취약하다고 한다.
- expo-secure-store는 민감한 정보를 안전하게 저장하기 위해 암호화를 적용한 스토리지 솔루션이다.
- 그래서 단순 상태 정보 저장 용으로는 AsyncStorage를 사용해도 되지만, 토큰과 같이 민감한 정보를 저장할 때는 SecureStore를 사용하는 것이 좋겠다.
- `SecureStore.setItemAsync(key, value);`
- `SecureStore.getItemAsync(key);`
- `SecureStore.deleteItemAsync(key);`

12. localhost

- API baseUrl을 연결하는 중에 알게 된 점
- Android에서는 localhost가 아닌 10.0.2.2를 사용한다.
- react-native에서 제공하는 `Platform`을 사용해서 현재 플랫폼에 따라 localhost와 10.0.2.2로 분기처리를 한다.

13. react-native-toast-message

- RN 내 ‘ToastAndroid’를 이용하여 ToastMessage를 구현할 수 있지만, 이는 안드로이드 앱에서만 동작한다.
- 따라서 위 라이브러리를 사용하여 토스트 메시지를 구현할 수 있다.

14. 키보드가 화면 하단을 가릴 경우

- 'react-native-keyboard-aware-scroll-view'의 `KeyboardAwareScrollView`
  - 그러나 이는 ios에서만 해결되고 안드로이드에서는 해소되지 않아서, react-native에서 제공하는 `KeyboardAvoidingView`를 사용한다.
  - 그리고 `keyboardVerticalOffset` prop으로 적절한 높이를 적용하면 키보드를 열었을 때 인풋창을 가리지 않게 된다.
- 또는 'react-native-keyboard-controller'를 사용하면 ios, aos 모두 대응할 수 있다고 한다.
  - 다만, Expo Go에서는 동작하지 않고, deployment Build 환경에서만 동작한다고 한다.

15. @expo/react-native-action-sheet

    - 화면 하단에 슬라이드처럼 올라오는 메뉴 형태의 컴포넌트로, expo에서 사용되는 패키지이다.
    - 루트 \_layout.tsx에 `<ActionSheetProvider>`로 전체를 감싸주고, 필요한 위치에서 `useActionSheet()`에서 제공하는 `showActionSheetWithOptions()`를 호출하여 액션 시트를 띄울 수 있다.
    - `options`에 띄울 버튼 리스트를 넘기면 되고,
    - `destructiveButtonIndex`과 `cancelButtonIndex`에 각각 삭제와 수정하는 option 인덱스를 넘기면 액션 시트 내의 스타일에도 적용된다.

16. React Query Dev Tool 적용하기

- RN expo에 대한 내용은 아니지만, RN Expo에서 react-query-devtools 적용하는 방법을 추가로 남김
- `npx expo install @dev-plugins/react-query`
- 루트 \_layout.tsx에 useReactQueryDevTools(queryClient);를 추가하고,
- 터미널에서 서버 재실행 후 Shift + m 입력하면 나오는 tool 목록 중
- Open @dev-plugins/react-query 선택하면 웹 브라우저에 react-query 상태를 확인할 수 있다.
- 시뮬레이터는 기존과 동일하게 켜기

17. expo-image-picker

- app.json의 plugins에 "expo-image-picker"를 추가해야 한다.
- 기기의 이미지 갤러리에서 사진을 선택하거나, 카메라로 사진을 촬영할 수 있도록 하는 라이브러리

18. RN - Keyboard

- RN에서 제공하는 `Keyboard` 모듈을 사용하면 키보드 이벤트를 감지할 수 있다.
- `Keyboard.addListener('keyboardDidShow', callback)`으로 키보드가 열릴 때의 이벤트를 감지할 수 있다.
- `Keyboard.addListener('keyboardDidHide', callback)`으로 키보드가 닫힐 때의 이벤트를 감지할 수 있다.
