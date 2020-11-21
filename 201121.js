const 바디 = document.body;
const 테이블 = document.createElement("table");

let 줄들 = [];
let 칸들 = [];
let 턴 = "X";

function 비동기콜백(e) {
  let 몇줄 = 줄들.indexOf(e.target.parentNode);
  let 몇칸 = 칸들[몇줄].indexOf(e.target);

  console.log(칸들[몇줄][몇칸]);
}

for (i = 0; i < 3; i++) {
  let 줄 = document.createElement("tr");
  줄들.push(줄);
  칸들.push([]);

  for (j = 0; j < 3; j++) {
    let 칸 = document.createElement("td");
    칸.addEventListener("click", 비동기콜백);
    칸들[i].push(칸); //이 부분
    줄.appendChild(칸);
  }
  테이블.appendChild(줄);
}

바디.appendChild(테이블);
