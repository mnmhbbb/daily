const tool = document.getElementById('tool');
const editor = document.getElementById('editor');
const imgInput = document.querySelector('.img-input');

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
    let p = document.createElement('p');
    let img = document.createElement('img');
    p.append(img);
    editor.append(p);
    img.src = reader.result;
    editor.innerHTML += '<p><br></p>';
    editor.focus();
  });
  reader.readAsDataURL(file); // base64 encoding
}

// 첨부된 이미지 클릭 시 이미지 이동 버튼 추가
editor.addEventListener('click', function (e) {
  // 기존에 선택된 이미지가 있을 경우 초기화
  document.querySelector('.clicked')?.classList.remove('clicked');

  // 현재 선택된 이미지가 있을 때
  if (e.target.tagName == 'IMG') {
    const imgMove = document.createElement('div');
    imgMove.setAttribute('class', 'img-move-btn');
    imgMove.innerHTML = `
      <button data-move="up">위로</button>
      <button data-move="down">아래로</button>
    `;
    e.target.parentNode.classList.add('clicked');
    if (!tool.hasChildNodes()) {
      tool.appendChild(imgMove);
    }
  } else {
    tool.innerHTML = '';
  }
});

// 위로 / 아래로 버튼 클릭해서 이미지 이동시키기
tool.addEventListener('click', function (e) {
  if (e.target.tagName == 'BUTTON') {
    const clickedImg = document.querySelector('.clicked');
    const direction = e.target.dataset.move;
    if (direction == 'up') {
      // previousSibling가 아닌 previousElementSibling를 사용해서
      // 공백, 줄바꿈 등을 포함하지 않는 '이전 엘리먼트'를 가져올 수 있음
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
});
