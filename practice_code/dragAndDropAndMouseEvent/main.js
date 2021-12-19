const container = document.querySelector('.container');
const ball = document.querySelector('.ball');

ball.addEventListener('dragstart', function (e) {
  e.dataTransfer.setData('data', this.innerHTML);
  e.dataTransfer.dropEffect = 'copy';
});

container.addEventListener('dragover', function (e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
});

container.addEventListener('drop', function (e) {
  let halfWidth = ball.getBoundingClientRect().width;
  let halfHeight = ball.getBoundingClientRect().height;
  alert(e.dataTransfer.getData('data')); // ball
  ball.style.position = 'absolute';
  ball.style.transform = `translate(${e.clientX - halfWidth}px, ${e.clientY - halfHeight}px)`;
});
