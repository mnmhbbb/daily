const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const doneList = document.querySelector(".js-doneList");

const TODOS_LS = "toDos"; //로컬스토리지에 저장될 key

let toDos = [];

function deleteTodo(e) {
  const btn = e.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanDone = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  }); //toDos의 id들이 li의 id와 같지 않은 것(=제거할 li를 제거한 상태)***
  toDos = cleanDone;
  console.log(cleanDone);
  saveToDos();
}

//done list...
function doneToDo(e) {
  const donebtn = e.target;
  const li = donebtn.parentNode;
  toDoList.removeChild(li);
  doneList.appendChild(li);
}

// 입력한 일 화면에 보이게 하기
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "⭕";
  delBtn.addEventListener("click", deleteTodo); // X버튼 눌렀을 때 지워지게 할 이벤트리스너
  const span = document.createElement("span");
  span.innerText = text; //입력받은 글이 적힐 곳
  li.appendChild(checkBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  toDoList.appendChild(li); //ul 밑에 li 넣기

  const newId = toDos.length + 1; //각 아이템을 id로 구분하기 위해 설정***
  li.id = newId;
  const toDoObj = {
    text: text, //paindtToDo(text)의 text가 저장됨
    id: newId,
  };
  toDos.push(toDoObj); // toDos 배열에 넣기
  saveToDos();
}

//로컬스토리지에 저장하기 key, value
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
} //자바스크립트는 LS에 데이터를 string으로 저장하기 때문에

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue); //인풋에서 받은 값을 화면에 보이게 전달
  toDoInput.value = "";
}

//로컬스토리지에 저장된 값 가져오기
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); //string을 object로 바꾸고
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    }); //parsedToDos 요소 각각(toDo)을 화면에 보이게 forEach 메서드
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
