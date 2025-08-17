# React 코드 스플리팅 + Suspense + ErrorBoundary 데모 프로젝트

이 프로젝트는 React의 코드 스플리팅, Suspense, ErrorBoundary를 실습한 프로젝트입니다.

## 🚀 프로젝트 개요

React 18의 주요 기능들을 학습하고 테스트할 수 있는 프로젝트로, 다음과 같은 기술들을 다룹니다:

- **React.lazy**: 컴포넌트 지연 로딩
- **Suspense**: 로딩 상태 처리
- **ErrorBoundary**: 에러 처리 및 복구
- **코드 스플리팅**: 번들 크기 최적화
- **데이터 페칭**: 다양한 API 호출 시나리오

## 🛠️ 기술 스택

- **React 18** - 최신 React 기능 활용
- **TypeScript** - 타입 안전성 보장
- **Vite** - 빠른 개발 환경
- **pnpm** - 패키지 관리자
- **react-error-boundary** - 에러 경계 처리

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm dev
```

### 3. 브라우저에서 확인

```
http://localhost:5173
```

## 🎯 주요 기능

### 1. 코드 스플리팅 (React.lazy)

모든 컴포넌트가 `React.lazy`로 구현되어 있어 필요할 때만 로드됩니다:

```typescript
const UserProfile = lazy(() => import("./components/UserProfile"));
const SlowDataComponent = lazy(() => import("./components/SlowDataComponent"));
const InstantDataComponent = lazy(() => import("./components/InstantDataComponent"));
const UserProfileWithError = lazy(() => import("./components/UserProfileWithError"));
```

**특징:**

- 페이지 첫 로드 시에는 로드되지 않음
- 해당 컴포넌트가 처음 렌더링될 때만 JavaScript 파일 다운로드
- 한 번 로드된 컴포넌트는 재사용 (추가 다운로드 없음)
- 각 컴포넌트가 별도의 JavaScript 청크로 분리됨

### 2. Suspense를 통한 로딩 처리

각 lazy 컴포넌트는 Suspense로 감싸져 있어 로딩 상태를 표시합니다:

```typescript
<Suspense fallback={<LoadingSpinner />}>
  <UserProfile userId={userId} />
</Suspense>
```

### 3. ErrorBoundary를 통한 에러 처리

모든 컴포넌트는 ErrorBoundary로 감싸져 있어 에러 발생 시 우아하게 처리됩니다:

```typescript
<ErrorBoundary FallbackComponent={ErrorDisplay}>
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
</ErrorBoundary>
```

## 📋 테스트 케이스

### 1. 즉시 데이터 컴포넌트

- **React.lazy 특징**: 컴포넌트 로드 후 즉시 데이터 표시
- **데이터 페칭**: Promise.resolve()로 즉시 반환
- **사용자 경험**: 컴포넌트 로드와 동시에 데이터 확인 가능

### 2. 사용자 프로필 컴포넌트

- **React.lazy 특징**: 사용자 ID 변경 시마다 새로운 데이터 요청
- **데이터 페칭**: 5초 지연을 가진 API 호출
- **사용자 경험**: ID 입력 후 5초간 로딩 상태 표시

### 3. 느린 데이터 컴포넌트

- **React.lazy 특징**: 컴포넌트 로드 후 긴 로딩 시간
- **데이터 페칭**: 10초 지연을 가진 API 호출
- **사용자 경험**: 컴포넌트 로드 완료 후 10초간 로딩 상태

### 4. 에러 케이스 컴포넌트

- **React.lazy 특징**: 컴포넌트 로드 후 의도적 에러 발생
- **에러 처리**: 5초 후 ErrorBoundary로 에러 처리
- **사용자 경험**: 에러 발생 시 재시도 버튼으로 복구 가능

## 🔧 프로젝트 구조

```
src/
├── components/
│   ├── UserProfile.tsx           # 사용자 프로필 컴포넌트
│   ├── UserProfileWithError.tsx  # 에러 발생 컴포넌트
│   ├── SlowDataComponent.tsx     # 느린 데이터 컴포넌트
│   ├── InstantDataComponent.tsx  # 즉시 데이터 컴포넌트
│   ├── LoadingSpinner.tsx        # 로딩 스피너
│   └── ErrorDisplay.tsx          # 에러 표시 컴포넌트
├── utils/
│   └── api.ts                    # API 시뮬레이션 함수들
├── App.tsx                       # 메인 애플리케이션
├── App.css                       # 스타일시트
└── main.tsx                      # 애플리케이션 진입점
```

## 🧪 테스트 방법

### 1. 코드 스플리팅 확인

- **브라우저 개발자 도구 → Network 탭**: 각 컴포넌트가 별도 파일로 로드되는 것 확인
- **페이지 새로고침**: 모든 컴포넌트가 다시 lazy 로딩되는 것 확인

### 2. 데이터 페칭 동작 확인

- **사용자 ID 변경**: UserProfile 컴포넌트의 데이터 페칭 동작 확인
- **에러 케이스 토글**: UserProfileWithError 컴포넌트의 지연 로딩 확인

### 3. 에러 처리 확인

- **에러 케이스 보기** 버튼 클릭: 에러 발생 및 ErrorBoundary 처리 확인
- **다시 시도** 버튼 클릭: 에러 복구 동작 확인

## 🎨 UI/UX 특징

### 1. 반응형 디자인

- 모바일과 데스크톱 모두 지원
- 그리드 레이아웃으로 깔끔한 구성

### 2. 시각적 피드백

- 로딩 스피너 애니메이션
- 에러 상태 시각적 구분
- 색상별 섹션 구분

### 3. 사용자 친화적 인터페이스

- 직관적인 컨트롤
- 명확한 설명과 가이드
- 실시간 상태 표시

## 📚 학습 포인트

### 1. React.lazy와 코드 스플리팅

- 컴포넌트 지연 로딩의 원리
- 번들 크기 최적화 방법
- 성능 향상 기법

### 2. Suspense의 활용

- 로딩 상태 처리 방법
- 컴포넌트 지연 로딩과의 연동
- 사용자 경험 개선

### 3. ErrorBoundary 패턴

- 에러 처리 전략
- 사용자 친화적 에러 메시지
- 에러 복구 메커니즘

### 4. 데이터 페칭 패턴

- useEffect와 useState 조합
- 로딩, 에러, 성공 상태 관리
- 비동기 작업 처리
