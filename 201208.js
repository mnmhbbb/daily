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

let id = 0;

//새 아이템 만드는 함수+삭제아이콘
function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "items__row");
  itemRow.setAttribute("data-id", id);
  itemRow.innerHTML = `
  <li class="items__row">
    <div class="item">
      <span class="item__name">${text}</span>
      <button class="item__delete">
        <i class="fas fa-trash-alt" data-id="${id}"></i>
      </button>
    </div>
    <div class="item__divider"></div>
  </li>
  `;
  id++;
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

items.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.items__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
