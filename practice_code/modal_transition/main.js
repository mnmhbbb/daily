const clickBtn = document.querySelector('.open');
const modalBack = document.querySelector('.modal_back');
const modalGroup = document.querySelector('.modal_group');
const modalContent = document.querySelector('.modal_content');
const modalClose = document.querySelector('.modal_close');

clickBtn.addEventListener('click', function () {
  console.log('open');
  modalBack.classList.add('on_opacity');
  modalGroup.classList.add('on_transform');
});

modalBack.addEventListener('click', function () {
  this.classList.remove('on_opacity');
  modalGroup.classList.remove('on_transform');
});
// modalClose.addEventListener('click', closeModal);

modalContent.addEventListener('click', function (e) {
  e.stopPropagation();
  console.log('modal content');
});
