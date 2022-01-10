let open;
const openBtn = document.querySelector('.open-btn');
const goToChild = document.querySelector('.to-child');

openBtn.addEventListener('click', function (e) {
  letsOpen();
});

function letsOpen() {
  open = window.open('open.html', 'childWindow', 'width=800, height=750, resizable,scrollbars=yes');
}
