const path = require("path");

module.exports = {
  name: "wordrelay-setting",
  mode: "development", //실서비스에선 production
  devtool: "eval",

  resolve: {
    //확장자
    extensions: [".js", ".jsx"],
  },

  //입력
  entry: {
    app: ["./client"],
  },

  //babel
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        // query: { compact: false },
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    ],
  },

  //출력
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  },
};
