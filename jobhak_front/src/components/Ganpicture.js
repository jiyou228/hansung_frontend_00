import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Ganpicture.css";
import download from "../assets/download.gif";

function Ganpicture() {
  const [imageLink, setImageLink] = useState(""); // 이미지 링크 상태

  useEffect(() => {
    // localStorage에서 uploadFile 값을 가져오는 함수
    const uploadFile = localStorage.getItem("uploadFile");
    if (uploadFile) {
      // 가져온 uploadFile 값으로 이미지 경로를 설정합니다.
      setImageLink(uploadFile);
    }
  }, []);

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
        <label className="download_lb">
          버튼을 누르면 사진을 저장할 수 있습니다.
        </label>
      </div>
    </div>
  );
}

export default Ganpicture;
