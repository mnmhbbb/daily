const toDoForm = document.querySelector('.js-toDoInput');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

function filterFn(toDo){
    return toDo.id === 1
}

let toDos = [];

function deleteTodo(e){
     const btn = e.target;
     const li = btn.parentNode;
     toDoList.removeChild(li);
     const cleanToDOs = toDos.filter(function(toDo){
         return toDo.id !== parseInt(li.id)
     })
     toDos = cleanToDos;
     saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function loadToDos(){
    const loadedToTods = localStorage.getItem(TODOS_LS);
    if(loadedToTods !== null){
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        }) //parsedToDos 요소 각각을 화면에 보이게 실행시키기 위한 forEach 메서드
    }
}

function paintToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    delBtn.innerText = "❌";
    delBtn.addEventListener('click',deleteTodo); // X버튼 눌렀을 때 지워지게 할 이벤트리스너
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);  
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(e){
    e.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function init(){
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();