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
  });
  reader.readAsDataURL(file); // base64 encoding
}
const selection = window.getSelection();
console.log(selection);
