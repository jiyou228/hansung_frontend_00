import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Ganpicture.css";
import download from "../assets/download.gif";

function Ganpicture() {
  const [imageLinks, setImageLinks] = useState([]); // 이미지 링크 배열 상태
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 uploadFile 값들을 가져오는 함수
    const imageLinksFromLocalStorage = [];
    for (let i = 0; i < 2; i++) {
      const uploadFile = localStorage.getItem(`uploadFile${i}`);
      if (uploadFile) {
        imageLinksFromLocalStorage.push(uploadFile);
      }
    }
    // // 가져온 uploadFile 값들로 이미지 경로 배열을 설정합니다.
    setImageLinks(imageLinksFromLocalStorage);
  }, []);

  const deleteItems = () => {
    // localStorage에서 uploadFile 값들을 삭제하는 함수
    for (let i = 0; i < 2; i++) {
      localStorage.removeItem(`uploadFile${i}`);
    }
    navigate("/profile/male");
  };

  // 이미지 다운로드 함수
  const handleDownload = (imageLinks) => {
    fetch(imageLinks)
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
      <div className="GAN">
        <h1 className="picture_h2">사진 합성 완료!</h1>
        <div className="GAN_container">
          {imageLinks.map((link, index) => (
            <div className="image_container" key={index}>
              <img
                src={link}
                alt={`사진 미리보기 ${index}`}
                className="ganimg_preview"
              />
              <div className="download_container">
                <img
                  src={download}
                  alt={`사진 다운로드 ${index}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDownload(link)}
                  className="ganimg_download"
                />
              </div>
            </div>
          ))}
        </div>
        <label className="download_lb">
          버튼을 누르면 사진을 저장할 수 있습니다.
        </label>
        <button className="back_btn" onClick={deleteItems}>
          돌아가기
        </button>
      </div>
    </div>
  );
}

export default Ganpicture;
