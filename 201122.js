let number = Array(45)
  .fill()
  .map(function (item, index) {
    return index + 1;
  });

let lotto = [];
for (i = 0; i < 6; i++) {
  let shuffle = number.splice(Math.floor(Math.random() * number.length), 1)[0];
  lotto.push(shuffle);
}

let bonus = lotto.splice(5, 1);

lotto.sort(function (a, b) {
  return a - b;
});

let result = document.querySelector(".result");

function colorBall(num, result) {
  let ball = document.createElement("div");
  ball.textContent = num;
  ball.className = "ball";
  let back;

  if (num <= 10) {
    back = "red";
  } else if (num <= 20) {
    back = "orange";
  } else if (num <= 30) {
    back = "yellow";
  } else if (num <= 40) {
    back = "blue";
  } else {
    back = "green";
  }
  ball.style.background = back;
  result.appendChild(ball);
}

for (j = 0; j < lotto.length; j++) {
  colorBall(lotto[j], result);
}

setTimeout(function () {
  let bonusBall = document.querySelector(".bonus");
  colorBall(bonus, bonusBall);
}, 1500);
