import { useState, Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorDisplay } from "./components/ErrorDisplay";
import "./App.css";

// 컴포넌트들을 lazy로 불러오기
const UserProfile = lazy(() => import("./components/UserProfile"));
const UserProfileWithError = lazy(() => import("./components/UserProfileWithError"));
const SlowDataComponent = lazy(() => import("./components/SlowDataComponent"));
const InstantDataComponent = lazy(() => import("./components/InstantDataComponent"));

// 로딩 스피너 컴포넌트
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>컴포넌트를 불러오는 중...</p>
  </div>
);

function App() {
  const [userId, setUserId] = useState(1);
  const [showErrorCase, setShowErrorCase] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React 코드 스플리팅 + Suspense + ErrorBoundary 테스트</h1>
        <p>각 컴포넌트가 필요할 때만 로드됩니다!</p>
      </header>

      <main className="App-main">
        {/* 컨트롤 섹션 */}
        <section className="controls">
          <h2>컨트롤</h2>
          <div className="control-group">
            <label>
              사용자 ID:
              <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
                min="1"
                max="10"
              />
            </label>
          </div>
          <div className="control-group">
            <button
              onClick={() => setShowErrorCase(!showErrorCase)}
              className={showErrorCase ? "active" : ""}
            >
              {showErrorCase ? "에러 케이스 숨기기" : "에러 케이스 보기"}
            </button>
          </div>
        </section>

        {/* 즉시 데이터 컴포넌트 */}
        <section className="demo-section">
          <h2>즉시 데이터 (Lazy + Suspense)</h2>
          <ErrorBoundary FallbackComponent={ErrorDisplay}>
            <Suspense fallback={<LoadingSpinner />}>
              <InstantDataComponent />
            </Suspense>
          </ErrorBoundary>
        </section>

        {/* 사용자 프로필 컴포넌트 */}
        <section className="demo-section">
          <h2>사용자 프로필 (Lazy + Suspense)</h2>
          <ErrorBoundary FallbackComponent={ErrorDisplay}>
            <Suspense fallback={<LoadingSpinner />}>
              <UserProfile userId={userId} />
            </Suspense>
          </ErrorBoundary>
        </section>

        {/* 느린 데이터 컴포넌트 */}
        <section className="demo-section">
          <h2>느린 데이터 (Lazy + Suspense)</h2>
          <ErrorBoundary FallbackComponent={ErrorDisplay}>
            <Suspense fallback={<LoadingSpinner />}>
              <SlowDataComponent />
            </Suspense>
          </ErrorBoundary>
        </section>

        {/* 에러 케이스 컴포넌트 */}
        {showErrorCase && (
          <section className="demo-section error-case">
            <h2>에러 케이스 (Lazy + Suspense + ErrorBoundary)</h2>
            <ErrorBoundary FallbackComponent={ErrorDisplay}>
              <Suspense fallback={<LoadingSpinner />}>
                <UserProfileWithError userId={userId} />
              </Suspense>
            </ErrorBoundary>
          </section>
        )}

        {/* 설명 섹션 */}
        <section className="explanation">
          <h2>코드 스플리팅 테스트 케이스 설명</h2>

          <div className="lazy-common-info">
            <h3>React.lazy 공통 특징</h3>
            <ul>
              <li>페이지 첫 로드 시에는 로드되지 않음</li>
              <li>해당 컴포넌트가 처음 렌더링될 때만 JavaScript 파일 다운로드</li>
              <li>한 번 로드된 컴포넌트는 재사용 (추가 다운로드 없음)</li>
              <li>각 컴포넌트가 별도의 JavaScript 청크로 분리됨</li>
            </ul>
          </div>

          <div className="case-list">
            <div className="case-item">
              <h3>1. 즉시 데이터 컴포넌트</h3>
              <p>
                <strong>React.lazy 특징:</strong> 컴포넌트 로드 후 즉시 데이터 표시
              </p>
              <p>
                <strong>데이터 페칭:</strong> Promise.resolve()로 즉시 반환
              </p>
              <p>
                <strong>사용자 경험:</strong> 컴포넌트 로드와 동시에 데이터 확인 가능
              </p>
            </div>

            <div className="case-item">
              <h3>2. 사용자 프로필 컴포넌트</h3>
              <p>
                <strong>React.lazy 특징:</strong> 사용자 ID 변경 시마다 새로운 데이터 요청
              </p>
              <p>
                <strong>데이터 페칭:</strong> 5초 지연을 가진 API 호출
              </p>
              <p>
                <strong>사용자 경험:</strong> ID 입력 후 5초간 로딩 상태 표시
              </p>
            </div>

            <div className="case-item">
              <h3>3. 느린 데이터 컴포넌트</h3>
              <p>
                <strong>React.lazy 특징:</strong> 컴포넌트 로드 후 긴 로딩 시간
              </p>
              <p>
                <strong>데이터 페칭:</strong> 10초 지연을 가진 API 호출
              </p>
              <p>
                <strong>사용자 경험:</strong> 컴포넌트 로드 완료 후 10초간 로딩 상태
              </p>
            </div>

            <div className="case-item">
              <h3>4. 에러 케이스 컴포넌트</h3>
              <p>
                <strong>React.lazy 특징:</strong> 컴포넌트 로드 후 의도적 에러 발생
              </p>
              <p>
                <strong>에러 처리:</strong> 5초 후 ErrorBoundary로 에러 처리
              </p>
              <p>
                <strong>사용자 경험:</strong> 에러 발생 시 재시도 버튼으로 복구 가능
              </p>
            </div>
          </div>

          <div className="code-splitting-info">
            <h3>코드 스플리팅의 장점</h3>
            <ul>
              <li>
                <strong>초기 번들 크기 감소</strong>: 필요한 컴포넌트만 로드
              </li>
              <li>
                <strong>지연 로딩</strong>: 사용자가 실제로 사용할 때만 로드
              </li>
              <li>
                <strong>캐싱</strong>: 한 번 로드된 컴포넌트는 재사용
              </li>
              <li>
                <strong>성능 향상</strong>: 초기 페이지 로딩 속도 개선
              </li>
            </ul>
          </div>

          <div className="testing-tips">
            <h3>테스트 방법</h3>
            <ul>
              <li>
                <strong>브라우저 개발자 도구 → Network 탭</strong>: 각 컴포넌트가 별도 파일로
                로드되는 것 확인
              </li>
              <li>
                <strong>사용자 ID 변경</strong>: UserProfile 컴포넌트의 데이터 페칭 동작 확인
              </li>
              <li>
                <strong>에러 케이스 토글</strong>: UserProfileWithError 컴포넌트의 지연 로딩 확인
              </li>
              <li>
                <strong>페이지 새로고침</strong>: 모든 컴포넌트가 다시 lazy 로딩되는 것 확인
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
