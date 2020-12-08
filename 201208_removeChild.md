# removeChild

오늘 활용한 매서드

```javascript
deleteBtn.addEventListener("click", () => {
  items.removeChild(itemRow);
});
```

하위노드를 삭제하고 제거된 노드를 반환한다.  
따라서, delete 버튼을 클릭했을 때, 해당 노드의 하위 아이템을 삭제할 수 있다.

기존에는 `classList.remove` 방법을 통해 클래스 이름을 제거하는 것보다 간편하다.
