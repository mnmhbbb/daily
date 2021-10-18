import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./UploadForm.css";
import Progressbar from "./Progressbar";

const UploadForm = () => {
  const defaultName = "이미지 첨부하기";
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [fileName, setFileName] = useState(defaultName);
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
      setTimeout(() => {
        setPercent(0);
        setFileName(defaultName);
        setImgSrc(null);
      }, 2000);
    } catch (err) {
      toast.error("이미지 업로드 실패!");
      setImgSrc(null);
    }
  };

  const imgSelectHandler = (e) => {
    const imgFile = e.target.files[0];
    setFileName(imgFile.name);
    setFile(imgFile);

    // 이미지 파일 읽어오기
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imgFile);
    fileReader.onload = (e) => setImgSrc(e.target.result);
  };
  return (
    <div>
      <Progressbar percent={percent} />
      <img
        className={`img_preview ${imgSrc && "img_preview_show"}`}
        src={imgSrc}
        alt="이미지 미리보기"
      />
      <form onSubmit={onSubmit}>
        <div className="file-dropper">
          {fileName}
          <input id="img" type="file" onChange={imgSelectHandler} />
        </div>
        <button style={{ marginTop: "20px", width: "100%" }}>제출</button>
      </form>
    </div>
  );
};

export default UploadForm;
