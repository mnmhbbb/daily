https://youtu.be/RfK15tw8H-I?si=KyE7BNpz-Wj2f0bJ

를 보고 정리한 내용:

# 1. Tanstack Query 소개

💡 최초 이름은 React Query였는데, 리액트 뿐만 아니라 뷰, 스벨트, 앵큘러 등까지 지원하기 위해 이름을 변경함. 그래서 아직 React Query 라고 부르는 곳도 많음.

### 공식 문서 소개

> **Powerful asynchronous state management
> (강력한 비동기 혹은 서버 상태 관리)** > https://tanstack.com/query/latest

### 서버 상태 관리의 필요성

대다수의 상태 관리 라이브러리(Redux, MobX 등)는 클라이언트 상태 관리에는 효과적이지만, 비동기 혹은 **서버 상태** 관리의 경우는 그다지 효과적이지 않다.

### 서버 상태란?

- 서버(DB)에 저장되고 관리되는 데이터
- 직접 관리하거나 소유하지 않은 원격 저장소에 보관됨
- fetching과 updating을 위해서는 비동기 api 요청이 필요
- 여러 사용자가 공유하는 데이터로, 내가 모르는 사이에 다른 사람에 의해 변경 가능
- 주의하지 않으면 앱에서 사용 중인 데이터가 최신 상태를 유지하지 않을 수 있음
- 예를 들면, API에서 가져온 데이터를 저장하는 것
  ```jsx
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  ```

### 서버 상태를 관리하는데 어려움들

- 캐싱해야 하거나
- 같은 데이터에 대한 중복 요청을 단일 요청으로 합치거나
- 백그라운드에서 오래된 데이터를 업데이트하거나
- 데이터가 얼마나 오래되었는지를 파악하거나
- 데이터 업데이트를 가능한 빠르게 반영하거나
- 페이지네이션 및 데이터 지연 로드와 같은 성능을 최적화한다거나
- 서버 상태의 메모리 및 가비지 수집 관리를 해야 한다거나
- 구조 공유를 사용하여 쿼리 결과를 메모화하거나

### Tanstack Query 기능

- 캐싱
- 같은 데이터에 대한 중복 요청을 단일 요청으로 통합
- 백그라운드에서 오래된 데이터를 업데이트
- 데이터가 얼마나 오리되었는지를 파악
- 데이터 업데이트를 가능한 빠르게 반영
- 페이지네이션 및 데이터 지연 로드와 같은 성능을 최적화
- 서버 상태의 메모리 및 가비지 수집 관리
- 구조 공유를 사용하여 쿼리 결과를 메모화

→ 따라서 Tanstack Query를 강력한 비동기 혹은 서버 상태 관리 도구 부른다.

**뿐만 아니라, 타 라이브러리 혹은 useState 훅으로 서버 상태 관리 시 복잡해질 수 있는 코드를 단 몇 줄로 줄일 수 있다.**

Tanstack Query 사용 전 코드:

```jsx
function UserComponent({ userId }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

  return <div>{user.name}</div>;
}
```

- API 응답 값을 저장하는 상태, 로딩 상태, 에러 상태를 일일이 만들어서 적용해야 해서 코드가 다소 길어진다.

Tanstack Query를 사용한 코드:

```jsx
const fetchUser = async (userId) => {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

function UserComponent({ userId }) {
  const { data: user, isLoading, error } = useQuery(["user", userId], () => fetchUser(userId));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;

  return <div>{user.name}</div>;
}
```

- useQuery 단 하나로 인해 각 상태에 대한 코드를 한 줄로 줄일 수 있게 된다.

# 2. 기본 설정 및 핵심 개념 3가지

## Query Client와 Query Client Provider

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      suspense: true,
    },
  },
});

queryClient.invalidateQueries();

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>;
}
```

- Query Client를 사용하여 캐시와 상호작용이 가능하며, `defaultOptions` 설정 시 모든 query와 mutation에 기본 옵션을 적용할 수 있다.(staleTime 등)
  - 추가로, `suspense: true` 속성을 추가하면, 모든 useQuery가 로딩 상태일 때 <Suspense>의 fallback UI가 자동으로 표시된다.
  - (위 속성을 추가하면, TanStack Query가 로딩 상태일 때, 즉 아직 데이터가 없을 때 Promise를 throw하기 때문에 리액트 Suspense가 이를 감지하여 fallback을 보여주는 것)
  ```js
  <Suspense fallback={<Loader />}>
    <App />
  </Suspense>
  ```
- 그 밖에도 다양한 메서드가 존재한다.(대표적으로 invalidateQueries)
- Query Client Provider는 Query Client를 Application에 연결 및 제공해주는 역할
- 위 코드와 같이 최상단에 감싸주고 Query Client 인스턴스를 client prop에 넣어주는 것이 기본 설정

## 핵심 개념 3가지

### 1. Queries

- Query Key를 기반으로 Query Caching을 진행함
- \*쿼리는 서버로부터 데이터를 가져오기 위해 Promise 기반의 모든 메서드와 함께 사용 가능
  - (쿼리: useQuery로 등록된 **하나의 데이터 요청 단위**라고 이해하면 좋을 듯)
- 서버의 데이터를 수정하고자 한다면, 쿼리 대신 Mutation 사용을 권장
  - Queries의 경우 Query Key 바탕으로 Caching을 진행하지만,
    Mutations는 Caching을 진행하지 않고 서버에 사이드 이펙트를 일으킴
  - 이러한 차이로 Queries는 GET, Mutations는 POST, PATCH, DELETE에 더 적합함
- options

  ```jsx
  const result = useQuery({
    querykey: ["todos"],
    queryFn: fetchTodoList,
    staleTime: 1 * 60 * 1000, // 1분
    gcTime: 5 * 60 * 1000, // 5분
    // ... options
  });
  ```

  - queryKey(필수)
    - 쿼리를 고유하게 식별하기 위한 키로, 배열 형태로 지정
    - 단순한 문자열 배열일 수도 있고, 여러 개의 문자열이나 객체를 조합한 복합 구조로 구성할 수도 있음
  - queryFn(필수)
    - Promise를 반환하는 함수
  - staleTime
    - 데이터가 fresh(신선) 상태에서 stale(오래됨) 상태로 전환되기까지의 시간으로, 기본값은 0
    - fresh 상태일 때는 컴포넌트가 새로 mount되어도 fetch 요청이 발생하지 않는다.
    - stale 상태이면 fetch가 발생함.
      - +) 다음 조건 중 하나라도 충족하면, 자동 fetch가 발생한다(네트워크 요청을 한다)
        | 조건 | 설명 |
        | -------------------------- | -------------------------------------------------- |
        | stale 상태 | 데이터가 stale 상태임 |
        | 쿼리 컴포넌트가 mount됨 | 해당 쿼리를 사용하는 컴포넌트가 다시 화면에 나타남 |
        | 브라우저가 다시 focus됨 | 페이지가 백그라운드 → 포그라운드로 돌아올 때 |
        | 쿼리 키가 변경됨 | 예: `[“user”, userId]`에서 `userId`가 변경된 경우 |
        | 수동 refetch (`refetch()`) | 개발자가 수동으로 요청한 경우 |
  - gcTime(Garbage Collection Time)
    - 쿼리 인스턴스가 사용되지 않게 된 후에도 메모리에서 유지되는 시간
      - (쿼리 인스턴스가 사용되지 않게 된 후 = 컴포넌트가 unmount 됐을 때)
    - 주로 컴포넌트가 unmount되거나, 쿼리가 inactive 상태일 때 적용
    - 이 시간이 지나면 캐시된 데이터는 메모리에서 삭제되며, 기본값은 5분
  - \*쿼리 상태 변화 흐름도(by. ChatGPT)
    ```jsx
    [데이터 fetch 성공]
            ↓
        ✅ fresh 상태
            ↓ (staleTime 지나면)
        🕓 stale 상태
            ↓ (컴포넌트 unmount)
        💤 inactive 상태
            ↓ (gcTime 지나면)
        🗑️ GC (메모리에서 제거)
    ```
    - 따라서, 다음 코드의 예상 흐름은 이러하다:
      ```jsx
      useQuery(["user"], fetchUser, {
        staleTime: 60 * 1000, // 1분
        gcTime: 5 * 60 * 1000, // 5분
      });
      ```
      - 컴포넌트가 마운트되면 fetchUser가 호출됨 → fresh 상태.
      - 1분이 지나면 stale 상태로 전환.
      - 이후 컴포넌트가 언마운트되면 inactive 상태.
      - 5분 뒤 GC에 의해 메모리에서 제거됨.

- return
  - data: 쿼리 요청이 성공한 경우, 쿼리 함수가 리턴한 Promise에서 resolved된 데이터
  - error: 쿼리 함수에서 오류가 발생한 경우, 쿼리에 대한 오류 객체
  - isSuccess: 쿼리 요청이 성공하고 데이터를 이용할 수 있는 상태
  - isError: 쿼리 요청 중 에러가 발생한 상태
  - isPending: 캐싱된 데이터가 없고, 쿼리 시도가 아직 완료되지 않은 상태(완전 초기 로딩)
  - isFetching: 캐싱된 데이터 유무에 관계없이 서버로부터 데이터 페칭 중인 상태
  - isLoading: isPending && isFetching 캐싱된 데이터가 없고, 페칭 중인 상태
  - isPaused: 데이터 페칭 중 네트워크 연결이 끊어졌을 때, 네트워크가 다시 연결되기 전까지 쿼리 실행을 멈추고 중지(pause)상태가 됨. 네트워크 연결이 끊어졌을 때 예외 처리하기 위해 사용함

### 2. Mutations

- POST, PATCH, DELETE 요청 등 서버에 사이드 이펙트를 일으키는 경우에 사용함
- options:
  ```jsx
  const mutation = useMutations({
    mutationFn: createToto,
    onMutate() {
      // ...
    },
    onSuccess(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
    onSettled() {
      // ...
    },
    // ...options
  });
  ```
  - mutationFn(필수): Promise를 반환하는 함수
  - onMutate: mutationFn이 실행되기 전에 실행되는 함수. 주로 낙관적 업데이트 구현할 때 많이 사용.
  - onSuccess: mutationFn이 성공했을 때 실행되며, mutation의 결과를 받음
  - onError: mutationFn이 실패했을 때 실행되고, error 객체를 받음
  - onSettled: try/catch/finally 구문의 finally처럼 요청 성공 여부에 관계없이 마지막에 실행됨
- return
  - data: mutation 함수가 리턴한 Promise에서 resolved 된 데이터
  - error: mutaion 중 발생한 오류 객체
  - isSuccess: mutaion이 성공하고 데이터를 이용할 수 있는 상태
  - isPending: mutaion이 진행 중인 상태
  - isError: mutation 중 에러가 발생한 상태
  - isIdle: mutation이 아직 실행되지 않았거나, 이전 실행 후 리셋된 상태

### 3. Query Invalidation

```jsx
const deleteCartItem = useMutation({
  mutationFn: (cartItemId: number) => fetchDeleteCartItem(cartItemId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItems] });
  },
  onError: () => {
    setErrorMessage(ERROR_MESSAGE.deleteFromCart);
  },
});
```

- queryClient 메서드로 쿼리를 무효화(stale 상태로 만듦)하고 최신화(새로운 데이터를 fetch)
- invalidQueries에 옵션이 없는 경우, 캐시 안에 있는 모든 쿼리를 무효화함
- 옵션에 querykey를 넣어주면 해당 쿼리키를 가진 모든 쿼리를 무효화
- (mutation 성공 후, 갱신된 데이터를 가져올 때 유용함)
