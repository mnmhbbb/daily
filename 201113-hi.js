const nameForm = document.querySelector('.js-input');
const nameInput = document.querySelector('input');
const greeting = document.querySelector('.js-hi')

const USER_LS = 'userName';
const SHOWING_CN = 'showing';

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function paintGreeting(text){
    nameForm.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hi ${text}`;
}

function askForName(){
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener('submit', handleSubmit);
}

function handleSubmit(e){
    e.preventDefault();
    const currentValue = nameInput.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function init(){
    loadName();
}

init();
