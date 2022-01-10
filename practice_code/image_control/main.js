const tool = document.getElementById('tool');
const editor = document.getElementById('editor');
const imgInput = document.querySelector('.img-input');
const reader = new FileReader();

// editor.focus();

imgInput.addEventListener('change', (e) => onChange(e));

// 첨부된 이미지 클릭 시 이미지 이동 버튼 추가
editor.addEventListener('click', (e) => addBtn(e));

// 위로 / 아래로 버튼 클릭해서 이미지 이동시키기
tool.addEventListener('click', (e) => moveImg(e));

function insertImageData(file) {
  reader.addEventListener('load', readImg);
  reader.readAsDataURL(file); // base64 encoding
}

function onChange(e) {
  const files = e.target.files;
  if (!!files) {
    insertImageData(files[0]);
  }
}

function readImg() {
  const p = document.createElement('p');
  const img = document.createElement('img');
  p.append(img);
  editor.append(p);
  img.src = reader.result;
  editor.innerHTML += '<p><br></p>';
}

function addBtn(e) {
  // 기존에 선택된 이미지가 있을 경우 초기화
  document.querySelector('.clicked')?.classList.remove('clicked');

  // 현재 선택된 이미지가 있을 때
  if (e.target.tagName == 'IMG') {
    const imgMove = document.createElement('div');
    imgMove.setAttribute('class', 'img-move-btn');
    imgMove.innerHTML = `
      <button type="button" data-move="up">위로</button>
      <button type="button" data-move="down">아래로</button>
    `;
    e.target.parentNode.classList.add('clicked');
    if (!tool.hasChildNodes()) {
      tool.appendChild(imgMove);
    }
  } else {
    tool.innerHTML = '';
  }
}

function moveImg(e) {
  if (e.target.tagName == 'BUTTON') {
    const clickedImg = document.querySelector('.clicked');
    const direction = e.target.dataset.move;
    if (direction == 'up') {
      const prevElem = clickedImg.previousElementSibling;
      if (prevElem != null) {
        // editor.insertBefore(clickedImg, prevElem);
        prevElem.before(clickedImg);
      }
    } else {
      const nextElem = clickedImg.nextElementSibling;
      if (nextElem != null) {
        nextElem.after(clickedImg);
      }
    }
  }
}
