2023.03.28.Tue.

#### input type="file" 에서 동일 파일을 선택할 경우

- 기존 파일을 다시 업로드 할 경우 onChange 이벤트가 동작하지 않는 문제 방지
- onChange는 실질적인 데이터가 바뀔 때만 감지되므로

```tsx
onClick={(e: any) => {
  e.target.value = null;
}}
```

출처: https://stackoverflow.com/questions/39484895/how-to-allow-input-type-file-to-select-the-same-file-in-react-component
