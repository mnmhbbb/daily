const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

input.focus();

function onAdd() {
  //1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  if (text === "") {
    input.focus();
    return;
  }

  //2. 새로운 아이템을 만듦(텍스트+삭제)
  const item = createItem(text);

  //3. items 안에 그 새로운 아이템을 추가
  items.appendChild(item);

  //4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: "center" });

  //5. 인풋을 초기화
  input.value = "";
  input.focus();
}

//새 아이템 만드는 함수+삭제아이콘
function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "items__row");

  const item = document.createElement("div");
  item.setAttribute("class", "item");

  const name = document.createElement("span");
  name.setAttribute("class", "item__name");
  name.innerHTML = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "item__delete");
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteBtn.addEventListener("click", () => {
    items.removeChild(itemRow);
  });

  const itemDivider = document.createElement("div");
  itemDivider.setAttribute("class", "item__divider");

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);
  item.appendChild(name);
  item.appendChild(deleteBtn);

  return itemRow;
}

addBtn.addEventListener("click", () => {
  onAdd();
});

input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    onAdd();
  }
});
