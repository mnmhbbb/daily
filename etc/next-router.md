## next/router
- 로그인 페이지에서 로그인이 성공하면, 홈으로 이동하는 기능을 구현하려고 했다.
- 일반적인 경우에는 prop을 받아서 `prop.history.push('/');`로 이동시키거나,
- `useHistory()`를 불러와서 아래와 같이 구현했었다.
```javascript 
import { useHistory } from 'react-router-dom';
const history = useHistory();
history.push("/"); 
```
- 넥스트에서는 이 기능을 어떻게 구현시킬까 검색하던 중, 공식문서에서 관련 글을 발견할 수 있었다.
- https://nextjs.org/docs/api-reference/next/router#router-api
```javascript
import { useRouter } from 'next/router';
const router = useRouter();
router.push("/");
```
