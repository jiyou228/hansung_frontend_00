import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Ganpicture.css";
import download from "../assets/download.gif";

function Ganpicture() {
  const [imageLink, setImageLink] = useState(""); // 이미지 링크 상태

  useEffect(() => {
    // 서버에서 이미지 경로를 가져오는 함수
    fetchImageData();
  }, []);

  // 서버에서 이미지 경로를 가져오는 함수
  const fetchImageData = () => {
    axios
      .get("API에서 이미지 경로를 가져오는 엔드포인트")
      .then((response) => {
        // 서버 응답에서 이미지 경로를 추출하여 이미지 링크 상태를 설정합니다.
        setImageLink(response.data[0].UploadedFilePath);
      })
      .catch((error) => {
        console.error("Error fetching image data: ", error);
      });
  };

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
