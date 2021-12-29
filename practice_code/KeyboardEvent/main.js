const editor = document.getElementById('editor');
const imgInput = document.querySelector('.img-input');

editor.focus();

function doInsert(text) {
  var sel = window.getSelection && window.getSelection();
  if (sel && sel.rangeCount > 0) {
    var range = sel.getRangeAt(0);
    var node = document.createTextNode(text);
    range.deleteContents();
    range.insertNode(node);
    console.log(range);
  }
}
doInsert('test ');

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
