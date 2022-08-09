// data.json에서 items 불러오기
function loadItems() {
  return fetch("./data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// 받아온 items를 화면에 보이게 html로
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// 받아온 item을 li에 추가하기
function createHTMLString(item) {
  return `
  <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
    `;
}

// 클릭했을 때 필터링
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }
  displayItems(items.filter((item) => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

//main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
