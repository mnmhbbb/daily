const tool = document.getElementById('tool');
const editor = document.getElementById('editor');
const imgInput = document.querySelector('.img-input');
const reader = new FileReader();
const submitBtn = document.querySelector('.goToParent');
const getData = document.querySelector('.getData');

editor.focus();

imgInput.addEventListener('change', (e) => onChange(e));

// 첨부된 이미지 클릭 시 이미지 이동 버튼 추가
editor.addEventListener('click', (e) => addBtn(e));

// 위로 / 아래로 버튼 클릭해서 이미지 이동시키기
tool.addEventListener('click', (e) => moveImg(e));

////// 현재 자식 창 -> 부모창으로 값 전달
submitBtn.addEventListener('click', function (e) {
  opener.document.getElementById('content').innerHTML = editor.innerHTML;
  window.close();
});

////// 부모창 -> 현재창 값 받기
document.addEventListener('DOMContentLoaded', function (e) {
  editor.innerHTML = opener.document.getElementById('content').innerHTML;
});

// // 자식창 열자마자 부모 값 전달받기
// let triggerEvt = function (elem) {
//   // Create our event (with options)
//   let evt = new MouseEvent('click', {
//     bubbles: true,
//     cancelable: true,
//     view: window,
//   });

//   let canceled = !elem.dispatchEvent(evt);
// };

// triggerEvt(getData);

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
