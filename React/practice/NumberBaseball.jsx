import React, { Component } from "react";

//숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumber() {}

(onChangeInput = (e) => {}),
  (onSubmitForm = () => {}),
  class NumberBaseBall extends Component {
    state = {
      result: "",
      value: "",
      answer: getNumber(),
      tries: [],
    };

    render() {
      return (
        <>
          <h1>{this.state.result}</h1>
          <form onSubmit={this.onSubmitForm}>
            <input
              mexLength={4}
              value={this.state.value}
              onChange={this.onChangeInput}
            />
          </form>
          <div>시도: {this.state.tries.length}</div>
          <ul>
            {["사과", "바나나", "포도", "체리", "귤", "감"].map((v) => {
              return <li>{v}</li>;
            })}
          </ul>
        </>
      );
    }
  };
