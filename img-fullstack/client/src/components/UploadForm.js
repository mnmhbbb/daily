import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./UploadForm.css";
import Progressbar from "./Progressbar";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileText, setFileText] = useState("이미지 첨부하기");
  const [percent, setPercent] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgTest", file);
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          setPercent(Math.round((e.loaded / e.total) * 100));
        },
      });
      toast.success("이미지 업로드 성공!");
      setInterval(() => {
        setPercent(0);
        setFileText("이미지 첨부하기");
      }, 2000);
    } catch (err) {
      toast.error("이미지 업로드 실패!");
    }
  };

  const imgSelectHandler = (e) => {
    const imgFile = e.target.files[0];
    setFileText(imgFile.name);
    setFile(imgFile);
  };

  return (
    <div>
      <Progressbar percent={percent} />
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
