import React, { Component } from "react";
import Ball from "./Ball";

function getNumbers() {
  console.log("getNumbers"); // 이 함수의 반복실행여부를 확인하기 위함
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    console.log("runTimeouts");
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  componentDidMount() {
    console.log("didMount");
    this.runTimeouts();
    console.log("로또 숫자를 생성합니다.");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate");
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
    if (prevState.winNumbers !== this.state.winNumbers) {
      console.log("로또 숫자를 생성합니다...");
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  // init
  onClickRedo = () => {
    console.log("onClickRedo");
    this.setState({
      winNumbers: getNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    console.log("render");
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;
