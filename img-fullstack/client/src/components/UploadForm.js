import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./UploadForm.css";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileText, setFileText] = useState("이미지를 추가하세요.");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgTest", file);
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("성공");
      console.log(res);
    } catch (err) {
      toast.error("실패");
      console.log(err);
    }
  };

  const imgSelectHandler = (e) => {
    const imgFile = e.target.files[0];
    setFileText(imgFile.name);
    setFile(imgFile);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="file-dropper">
          {fileText}
          <input id="img" type="file" onChange={imgSelectHandler} />
        </div>
        <button style={{ marginTop: "20px", width: "100%" }}>제출</button>
      </form>
    </div>
  );
};

export default UploadForm;
