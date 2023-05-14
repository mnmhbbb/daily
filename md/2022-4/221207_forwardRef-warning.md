2022.12.07.Wed.

#### forwardRef 관련 경고 로그

> Warning: forwardRef render functions accept exactly two parameters: props and ref. Did you forget to use the ref parameter?

- 인쇄 기능을 만들면서 forwardRef를 도입하였는데, 기능은 잘 되지만, 위 경고창이 자꾸만 떴다.
- 다음과 같이 적용하여 해결

```js
type SalesTablePropsType = {
  documentData: ActionType;
};
const SalesTable = forwardRef<HTMLDivElement, SalesTablePropsType>(({documentData}, printRef) => {
  const companyInfo = useAppSelector((state) => state.user.userInfo.company);
```
