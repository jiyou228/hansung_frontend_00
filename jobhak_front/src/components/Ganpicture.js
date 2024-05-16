import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Ganpicture.css";
import download from "../assets/download.gif";

function Ganpicture() {
  const [imageLink, setImageLink] = useState(""); // 이미지 링크 상태

  useEffect(() => {
    // 이미지 링크를 설정하는 함수
    setImageLink(
      "https://jobhakdasik2000-bucket.s3.ap-northeast-2.amazonaws.com/profile/e6247512-357a-4437-bf7f-aa06dc964c10crop.png"
    );
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // 이미지 다운로드 함수
  const handleDownload = () => {
    fetch(imageLink)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.jpg");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };

  return (
    <div>
      <Nav />
      <div className="GAN_container">
        <h1 className="picture_h2">사진 합성 완료!</h1>
        {imageLink && (
          <img src={imageLink} alt="사진 미리보기" className="ganimg_preview" />
        )}
        {imageLink && (
          <img
            src={download}
            alt="사진 다운로드"
            style={{ cursor: "pointer" }}
            onClick={handleDownload}
            className="ganimg_download"
          />
        )}
      </div>
    </div>
  );
}
export default Ganpicture;
