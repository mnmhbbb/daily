const preview = document.querySelector('.preview');
let open;
preview.addEventListener('click', function () {
  letopen();
});

function letopen() {
  open = window.open(
    'preview.html',
    'previewWindow',
    'width=400, height=750, resizable=no, scrollbars=no',
  );
}
