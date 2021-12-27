const editor = document.getElementById('editor');
const imgInput = document.querySelector('.img-input');

imgInput.addEventListener('change', function (e) {
  const files = e.target.files;
  if (!!files) {
    insertImageDate(files[0]);
    // editor.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));
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

    var pressthiskey = 'Enter';
    var e = new Event('keydown');
    e.key = pressthiskey;
    e.keyCode = e.key.charCodeAt(0);
    e.which = e.keyCode;
    e.altKey = false;
    e.ctrlKey = true;
    e.shiftKey = false;
    e.metaKey = false;
    e.bubbles = true;
    img.dispatchEvent(e);

    // document.execCommand('insertImage', false, `${reader.result}`);
  });
  reader.readAsDataURL(file); // base64 encoding
}
