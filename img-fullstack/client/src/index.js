import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ImgProvider } from "./context/ImgContext";

ReactDOM.render(
  <React.StrictMode>
    <ImgProvider>
      <App />
    </ImgProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
