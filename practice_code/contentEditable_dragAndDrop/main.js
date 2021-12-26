let handleDrag = function (e) {
  console.log('dragover');
  e.stopPropagation();
  e.preventDefault();
};

let handleDrop = function (e) {
  console.log('drop');
  e.stopPropagation();
  e.preventDefault();
  console.log(e);

  let x = e.clientX;
  let y = e.clientY;
  let file = e.dataTransfer.files[0];

  if (file.type.match('image.*')) {
    let reader = new FileReader();

    reader.addEventListener('load', function (e) {
      let dataURI = e.target.result;
      let img = document.createElement('img');
      img.src = dataURI;
      if (document.caretPositionFromPoint) {
        let pos = document.caretPositionFromPoint(x, y);
        let range = document.createRange();
        range.setStart(pos.offsetNode, pos.offset);
        range.collapse();
        range.insertNode(img);
      }
      // the WebKit way. This works in Chrome.
      else if (document.caretRangeFromPoint) {
        range = document.caretRangeFromPoint(x, y);
        range.insertNode(img);
      } else {
        console.log('could not find carat');
      }
    });

    //this reads in the file, and the load event triggers, which adds the image to the div at the carat
    reader.readAsDataURL(file);
  }
};

let dropZone = document.getElementById('d');
dropZone.addEventListener('dragover', handleDrag);
dropZone.addEventListener('drop', handleDrop);
