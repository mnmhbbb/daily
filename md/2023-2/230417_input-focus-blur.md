2023.04.17.Mon.

#### 인풋에 포커스가 되었는지 여부를 감지하는 방법

```jsx
const inputRef = useRef < HTMLInputElement > null;

const [isInputFocused, setIsInputFocused] = useState(false);

useEffect(() => {
  const handleFocus = () => setIsInputFocused(true);
  const handleBlur = () => setIsInputFocused(false);

  if (inputRef.current) {
    inputRef.current.addEventListener('focus', handleFocus);
    inputRef.current.addEventListener('blur', handleBlur);
  }

  return () => {
    if (inputRef.current) {
      inputRef.current.removeEventListener('focus', handleFocus);
      inputRef.current.removeEventListener('blur', handleBlur);
    }
  };
}, [inputRef]);
```

- 상위 컴포넌트에 prop으로 포커스 여부를 주고 받으려고 했으나, 위 방법을 사용하면 현재 컴포넌트 안에서 input에 포커스 되었는지를 바로 감지할 수 있게 됨

+) focus ↔ blur

- focus: 포커스를 얻을 때 발생하는 이벤트
- blur: 포커스를 잃을 때 발생하는 이벤트
