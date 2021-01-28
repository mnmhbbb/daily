import React, { Component } from "react";
// const React = require("react");
// const { Component } = React;
import Try from "./Try";

//숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumber() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseBall extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumber(),
    tries: [],
  };

  onSubmitForm = (e) => {
    //구조분해할당
    const { value, tries, answer } = this.state;

    e.preventDefault();
    if (value === answer.join("")) {
      this.setState((prevState) => {
        return {
          result: "홈런",
          tries: [...prevState.tries, { try: value, result: "홈런!" }],
        };
      });
      alert("게임을 다시 시작합니다");
      this.setState({
        value: "",
        answer: getNumber(),
        tries: [],
      });
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다.`,
        });
        alert("게임을 다시 시작합니다");
        this.setState({
          value: "",
          answer: getNumber(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              {
                try: value,
                result: `${strike} 스트라이크, ${ball} 볼 입니다.`,
              },
            ],
            value: "",
          };
        });
      }
    }
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도: `} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

// module.exports = NumberBaseBall;
export default NumberBaseBall;
