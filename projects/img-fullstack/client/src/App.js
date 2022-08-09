import React from "react";
import UploadForm from "./components/UploadForm";
import ImageList from "./components/ImageList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <h1>이미지 모음</h1>
      <UploadForm />
      <ImageList />
    </div>
  );
}

export default App;
