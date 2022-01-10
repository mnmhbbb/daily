const view = document.querySelector('.view');
document.addEventListener('DOMContentLoaded', function () {
  view.innerHTML = opener.document.querySelector('.sample').innerHTML;
});
