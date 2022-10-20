2022.09.13.Tue.

각종 버그들 해결하고, 이전에 습득한 내용 복습함

### Promise.all

- 비동기 처리를 await 하나씩 기다리지 않고, 병렬로 처리함으로써 시간을 단축할 수 있다.
- 만약 실패했을 경우에도 즉시 반환한다.
- 순회 가능한 객체에 주어진 모든 프로미스를 이행한 후, 하나라도 reject 되는 경우 모두 이행취소된다

### Promise.allSettled

- all과 유사하지만, 성공/실패에 관계없이 무조건 배열에 결과값을 담아준다.

Promisea.all이 사용된 곳:

1. **mypage.tsx**

   ```jsx
   useAsyncEffect(async () => {
     const userAverage = apis.getTotalAverageEmission(userId);
     const companyAverage = apis.getTotalAverageEmissionOfCompany(company.id);

     const [userAverageValue, companyAverageValue] = await Promise.all([
       userAverage,
       companyAverage,
     ]);
     setUserAverageEmission(userAverageValue?.average);
     setCompanyAverageEmission(companyAverageValue?.average);
   }, []);
   ```

   - 위 데이터를 토대로 메인페이지의 등급을 결정함

2. **resultSum store**

   - 현재 기록과 이전 기록의 전체 배출량(전체, 출퇴근, 외부미팅 등)
   - 유저모드와 회사모드 그리고 공유페이지용 = 총 3번 요청 필요

   ```jsx
   const getSumEmissionFromAPI = async (
     {
       userId,
       companyId,
       thisTime,
       lastTime,
       resultMode,
     }: {
       userId: string,
       companyId: string,
       thisTime: { start: Date, end: Date },
       lastTime: { start: Date, end: Date },
       resultMode: ResultPageMode,
     },
     cancelTokenSource: CancelTokenSource
   ) => {
     let promiseStt;
     let promiseSlt;
     if (resultMode === ResultPageMode.USER) {
       promiseStt = apis.getSumEmission(userId, thisTime, cancelTokenSource.token);
       promiseSlt = apis.getSumEmission(userId, lastTime, cancelTokenSource.token);
       const [stt, slt] = await Promise.all([promiseStt, promiseSlt]);
       return { stt, slt };
     }
     promiseStt = apis.getSumEmissionOfCompany(companyId, thisTime);
     promiseSlt = apis.getSumEmissionOfCompany(companyId, lastTime);
     const [stt, slt] = await Promise.all([promiseStt, promiseSlt]);
     return { stt, slt };
   };

   // 공유 페이지 전용
   const getSumEmissionFromAPIGuest = async ({
     userId,
     thisTime,
     lastTime,
   }: {
     userId: string,
     thisTime: { start: Date, end: Date },
     lastTime: { start: Date, end: Date },
   }) => {
     let promiseStt;
     let promiseSlt;
     promiseStt = apis.getSumEmissionGuest({ userId, start: thisTime.start, end: thisTime.end });
     promiseSlt = apis.getSumEmissionGuest({ userId, start: lastTime.start, end: lastTime.end });
     const [stt, slt] = await Promise.all([promiseStt, promiseSlt]);
     return { stt, slt };
   };
   ```

---

### 요청 취소 & useEffect return

어떤 비동기 요청을 보내고, 응답을 받기 전 기다리고 있는 상황에서 요청을 취소하고 싶을 때

- 대표적으로 사용된 곳: result.tsx의 일간/주간/월간 탭 클릭 시 해당하는 기간의 데이터 요청을 보내는데, 클릭을 연달아 할 경우, 이전에 보낸 요청을 하나씩 await 하고 있어서 무한 딜레이 현상이 일어남
- 따라서 이전 요청을 취소할 수 있게 하기 위해 **useEffect return**에 `promise.abort` 를 추가하였다.
- 이는 중요한 개념이다.
  - [https://youtu.be/QQYeipc_cik](https://youtu.be/QQYeipc_cik)
  - 함수호출을 하고, 이렇게 함수처리를 위해 사용되었던 공간을 반환하는 역할. 정리하는 역할

```jsx
useEffect(() => {
  if (isSignedIn && selectedDate && recordMode !== ResultPageMode.GUEST) {
    const promiseSetSummary = dispatch(
      setSummary({
        userId: userInfo.id,
        companyId: userInfo.company.id,
        target: new Date(String(router.query.date)),
        unit: recordType,
        resultMode: recordMode,
      })
    );
    const promiseSetCompanyAverage = dispatch(
      setCompanyAverage({
        companyId: userInfo.company.id,
        target: new Date(String(router.query.date)),
        unit: recordType,
      })
    );
    const promiseSetRecordByDate = dispatch(
      setRecordByDate({
        userId: userInfo.id,
        date: new Date(String(router.query.date)),
      })
    );
    return () => {
      consolelog('result page data cleanup');
      promiseSetSummary.abort();
      promiseSetCompanyAverage.abort();
      promiseSetRecordByDate.abort();
    };
  }
}, [selectedDate, recordType, recordMode, router, isSignedIn]);
```

- 이와 비슷하게 useEffect 비동기 요청에 대해서는 항상 return에 요청 취소를 반환해준다.
- DatePicker 컴포넌트에서

  ```jsx
  useAsyncEffect(() => {
    if (recordType === TimeUnit.DAY || recordType === TimeUnit.WEEK) {
      const source = getAbortSignal();
      void getMonthRecord(clickedDate, source);

      return () => {
        source.cancel();
      };
    }
  }, [clickedDate]);
  ```

- `getAbortSignal` : Redux Thunk abort 시그널을 받기 위한 유틸 함수

  ```jsx
  /**
   * Redux Thunk abort signal을 받기 위한 함수
   * Redux Thunk 안에서 사용되지 않는 경우에는 signal을 받지 않고 source만 return 함
   */
  export const getAbortSignal = (signal?: AbortSignal) => {
    const source = axios.CancelToken.source();
    signal &&
      signal.addEventListener('abort', () => {
        consolelog('aborted');
        source.cancel();
      });

    return source;
  };
  ```

- `AbortController` 라는 web api가 있다.
  - 하나 이상의 웹 요청을 취소할 수 있게 해준다.
  - [https://developer.mozilla.org/ko/docs/Web/API/AbortController](https://developer.mozilla.org/ko/docs/Web/API/AbortController)
- `AbortSignal` 라는 web api
  - fetch와 같은 DOM 요청과 통신하고 필요한 경우 `AbortController` 객체를 통해 취소할 수 있게 해주는 신호 객체
  - [https://developer.mozilla.org/ko/docs/Web/API/AbortSignal](https://developer.mozilla.org/ko/docs/Web/API/AbortSignal)
- `Redux ThunkAPI` 에서 위 개념들을 활용하기 때문에 위에서 `getAbortSignal`이라는 유틸함수를 위와 같이 생성하여 사용한다.
  - [https://redux-toolkit.js.org/api/createAsyncThunk#cancellation](https://redux-toolkit.js.org/api/createAsyncThunk#cancellation)
- 더 올라가 Redux Thunk에서 사용되는 api는 axios 기반으로 구성되어 있는데, axios에서는 `cancel token` 이라는 것으로 요청을 취소할 수 있게 해준다.
  - [https://yamoo9.github.io/axios/guide/cancellation.html#해제-cancellation](https://yamoo9.github.io/axios/guide/cancellation.html#%ED%95%B4%EC%A0%9C-cancellation)
