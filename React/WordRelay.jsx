const React = require("react");
const { Component } = React;
const { Module } = require("webpack");
//React.Component -> Component

class WordRelay extends Component {
  state = {
    text: "Hello, webpack",
  };

  render() {
    return <h1>{this.state.text}</h1>;
  }
}

Module.exports = WordRelay;
