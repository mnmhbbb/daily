import React, { useContext } from "react";
import { ImgContext } from "../context/ImgContext";

const ImageList = () => {
  const [imgs] = useContext(ImgContext);
  const imgList = imgs.map((img) => (
    <img
      key={img.key}
      alt={img._id}
      style={{ width: "100%" }}
      src={`http://localhost:5000/uploads/${img.key}`}
    />
  ));
  return (
    <>
      <h1>images</h1>
      {imgList}
    </>
  );
};

export default ImageList;
