const editor = document.getElementById('editor');
const imgInput = document.querySelector('.img-input');
const tool = document.getElementById('tool');

editor.focus();

imgInput.addEventListener('change', function (e) {
  const files = e.target.files;
  if (!!files) {
    insertImageDate(files[0]);
  }
});

function insertImageDate(file) {
  const reader = new FileReader();
  reader.addEventListener('load', function (e) {
    let img = document.createElement('img');
    editor.append(img);
    img.src = reader.result;
    editor.innerHTML += '<div class="nextLine"><br></div>';
    editor.focus();
    // focus()를 이용하면 커서가 맨 앞으로 들어간다는 문제
  });
  reader.readAsDataURL(file); // base64 encoding
}

// 이미지 이동 버튼
editor.addEventListener('click', function (e) {
  const imgMove = document.createElement('div');
  imgMove.setAttribute('class', 'img-move-btn');
  imgMove.innerHTML = `
  <button data-move="up">위로</button>
  <button data-move="down">아래로</button>
  `;

  if (e.target.tagName == 'IMG') {
    e.target.classList.add('clicked');
    if (!tool.hasChildNodes()) {
      console.log('o');
      tool.appendChild(imgMove);
    }
  } else {
    tool.innerHTML = '';
  }
});

tool.addEventListener('click', function (e) {
  const clickedImg = document.querySelector('.clicked');
  console.log(clickedImg);
  if (e.target.tagName == 'BUTTON') {
    const direction = e.target.dataset.move;
    console.log(direction);
    if (direction == 'up') {
      // editor.insertBefore(clickedImg)
    }
  }
});
