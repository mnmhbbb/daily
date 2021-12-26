const editor = document.querySelector('.text-input');
const btnBold = document.getElementById('btn-bold');
const btnItalic = document.getElementById('btn-italic');
const btnUnderline = document.getElementById('btn-underline');
const btnStrike = document.getElementById('btn-strike');
const btnImage = document.getElementById('btn-image');
const imageSelector = document.getElementById('img-selector');

btnBold.addEventListener('click', function () {
  setStyle('bold');
});
btnItalic.addEventListener('click', function () {
  setStyle('italic');
});
btnUnderline.addEventListener('click', function () {
  setStyle('underline');
});
btnStrike.addEventListener('click', function () {
  setStyle('strikeThrough');
});
btnImage.addEventListener('click', function () {
  imageSelector.click();
});
imageSelector.addEventListener('change', function (e) {
  const files = e.target.files;
  if (!!files) {
    insertImageDate(files[0]);
  }
});

function insertImageDate(file) {
  const reader = new FileReader();
  reader.addEventListener('load', function (e) {
    focusEditor();
    document.execCommand('insertImage', false, `${reader.result}`);
  });
  reader.readAsDataURL(file);
}

function focusEditor() {
  editor.focus();
}

editor.addEventListener('keydown', function () {
  checkStyle();
});
editor.addEventListener('mousedown', function () {
  checkStyle();
});

function setStyle(style) {
  document.execCommand(style);
  focusEditor();
  checkStyle();
}

function checkStyle() {
  if (isStyle('bold')) {
    btnBold.classList.add('active');
  } else {
    btnBold.classList.remove('active');
  }
  if (isStyle('italic')) {
    btnItalic.classList.add('active');
  } else {
    btnItalic.classList.remove('active');
  }
  if (isStyle('underline')) {
    btnUnderline.classList.add('active');
  } else {
    btnUnderline.classList.remove('active');
  }
  if (isStyle('strikeThrough')) {
    btnStrike.classList.add('active');
  } else {
    btnStrike.classList.remove('active');
  }
}

function isStyle(style) {
  return document.queryCommandState(style);
}
