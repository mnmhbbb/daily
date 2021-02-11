## Custom-hook
- 반복적으로 발생하는 Form 코드 중복 문제가 생겼다.
- react hook form 라이브러리도 있지만, `커스텀 훅`을 사용한 방법을 배워서 정리해보았다.
### before
```javascript
  const [id, setId] = setState("");
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);
```
- input 창에 문자를 입력하면 화면에 반영이 되도록 하는 코드이다.
- 아이디, 비밀번호, 비밀번호 체크 등 끊임없이 똑같은 코드가 반복된다.
### after
```javascript
import { useState, useCallback } from "react";

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};
```
- `hooks/useInput.js` 파일을 생성
- `useState`, `useCallback`을 동시에 사용하여, setValue가 아니라 `handler`를 리턴한다.
```javascript
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
```
- 그 결과 한 줄로 간결하게 사용할 수 있게 되었다.
