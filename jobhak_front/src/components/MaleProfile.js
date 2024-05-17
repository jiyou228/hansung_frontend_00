import Nav from "./Nav";
import "../components/MaleProfile.css";
import suit1 from "../assets/suit1.PNG";
import suit2 from "../assets/suit2.PNG";
import downhair from "../assets/male_downhair.png";
import uphair from "../assets/male_uphair.png";
import Slide1 from "../assets/slide1.png";
import Slide2 from "../assets/slide2.png";
import Slide3 from "../assets/slide3.png";
import background0 from "../assets/background.png";
import background1 from "../assets/background1.png";
import background2 from "../assets/background2.png";
import background3 from "../assets/background3.png";
import background4 from "../assets/background4.png";
import background5 from "../assets/background5.png";
import background6 from "../assets/background6.png";
import defaultimg from "../assets/profileExample.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Slider from "react-slick";
import MemoryGame from "./MemoryGame";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MaleProfile = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [selectedSuit, setSelectedSuit] = useState(null);
  const [selectedHair, setSelectedHair] = useState(null);
  const [selectedBackGround, setSelectedBackGround] = useState(null);
  const [selectedBlur, setSelectedBlur] = useState(50);
  const [lipOption, setLipOption] = useState(false);
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const showGuide = () => {
    setIsOpen(true);
  };

  const closeGuide = () => {
    setIsOpen(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [],
  };

  const handleOptionSuit = (option) => {
    if (option === selectedSuit) {
      setSelectedSuit(null);
    } else {
      setSelectedSuit(option);
    }
  };

  const handleOptionHair = (option) => {
    if (option === selectedSuit) {
      setSelectedHair(null);
    } else {
      setSelectedHair(option);
    }
  };

  const handleOptionBackGround = (option) => {
    if (option === selectedBackGround) {
      setSelectedBackGround(null);
    } else {
      setSelectedBackGround(option);
    }
  };

  const handleOptionBlur = (e) => {
    console.log(e.target.value);
    setSelectedBlur(e.target.value);
  };

  const handleLipOptionChange = (e) => {
    setLipOption(e.target.checked); // 입술 생기 옵션 상태 업데이트
  };

  const GanPicture = () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const selectedSuitStyle = selectedSuit;
    const selectedHairstyle = selectedHair;
    const selectedBackGroundstyle = selectedBackGround || "none";

    const currentPath = window.location.pathname;
    const sex = currentPath.split("/").pop();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("brightness", 1.8);
    formData.append("saturation", 0.3);
    formData.append("conversion", true);
    formData.append("sex", sex);
    formData.append("suitstyle", selectedSuitStyle);
    formData.append("hairstyle", selectedHairstyle);
    formData.append("background", selectedBackGroundstyle);
    formData.append("blurstyle", selectedBlur);
    formData.append("lipoption", lipOption);
    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    axios
      .post("http://localhost:12300/profile/edit", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data[0].UploadedFilePath);
        localStorage.setItem("uploadFile", res.data[0].UploadedFilePath);
        navigate("/profile/save");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const MAX_IMAGE_SIZE = 100 * 1024 * 1024;

  const encodeFileToBase64 = (file) => {
    const reader = new FileReader();
    const formData = new FormData();
    formData.append("file", file);
    setFile(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      // Check if file is not undefined
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    console.log("File change event:", e.target.files);
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile); // 파일 상태 업데이트
      encodeFileToBase64(selectedFile); // 파일 처리
    }
  };

  const customStyles = {
    content: {
      position: "fixed",
      top: "20vh",
      left: "25vw",
      width: "50vw",
      height: "50vh",
      overflow: "hidden",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <div className="profile_container">
      <Nav />
      <div className="female_container">
        <div className="female_guide_container">
          {imageSrc ? (
            <img src={imageSrc} alt="preview-img" className="img_preview" />
          ) : (
            <img src={defaultimg} alt="default-img" className="img_preview" />
          )}
          <label htmlFor="file" className="img_choice_btn">
            파일에서 이미지 선택
          </label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
          />

          <button className="img_guide_btn" onClick={showGuide}>
            이미지 가이드 보기
          </button>
          <div className="modal_div">
            <Modal
              isOpen={isOpen}
              onRequestClose={closeGuide}
              style={customStyles}
            >
              <Slider {...settings}>
                <div>
                  <h2>정면을 보는 사진</h2>
                  <div className="modal_content">
                    <img src={Slide1} alt="Slide 1" className="Slide1" />
                  </div>
                </div>
                <div>
                  <h2>큰 액서사리 금지</h2>
                  <div className="modal_content">
                    <img src={Slide2} alt="Slide 2" className="Slide2" />
                  </div>
                </div>
                <div>
                  <h2>상체가 다 나온 사진으로 PICK 해주세요!</h2>
                  <div className="modal_content">
                    <img src={Slide3} alt="Slide 3" className="Slide3" />
                  </div>
                </div>
              </Slider>
            </Modal>
          </div>
          <button className="img_gan_btn" onClick={(e) => GanPicture(e)}>
            사진 합성하기
          </button>
        </div>

        <div className="female_choose_option">
          <label className="choose_option_lb">정장 스타일</label>

          <div className="choose_option_div">
            <button
              type="button"
              className={`female_suit_btn ${
                selectedSuit === "suit1" ? "selected" : ""
              }`}
              onClick={() => handleOptionSuit("suit1")}
            >
              <img src={suit1} className="female_suit" alt="Suit 9" />
            </button>
            <button
              type="button"
              className={`female_suit_btn ${
                selectedSuit === "suit2" ? "selected" : ""
              }`}
              onClick={() => handleOptionSuit("suit2")}
            >
              <img src={suit2} className="female_suit" alt="Suit 10" />
            </button>
          </div>
          <hr style={{ marginBottom: "1rem" }} />
          <label className="choose_option_lb">머리 스타일</label>
          <div className="choose_option_div">
            <button
              type="button"
              className={`female_hair_btn ${
                selectedHair === "uphair" ? "selected" : ""
              }`}
              onClick={() => handleOptionHair("uphair")}
            >
              <img src={uphair} className="female_hair" alt="올림머리" />
            </button>
            <button
              type="button"
              className={`female_hair_btn ${
                selectedHair === "downhair" ? "selected" : ""
              }`}
              onClick={() => handleOptionHair("downhair")}
            >
              <img src={downhair} className="female_hair" alt="내림머리" />
            </button>
          </div>
          <hr style={{ marginBottom: "1rem" }} />
          <label className="choose_option_lb">얼굴 효과</label>
          <div className="choose_option_div">
            <label className="blur_option_lb">블러 효과</label>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={selectedBlur}
              className="blur_bar"
              onChange={handleOptionBlur}
            />

            <br />
            <label className="lip_option_lb">입술 생기</label>

            <input
              style={{ zoom: "1.5" }}
              type="checkbox"
              className="lip_check"
              onChange={handleLipOptionChange}
            />
          </div>
          <hr />
          <label className="choose_option_lb">배경 색상</label>
          <div className="choose_option_div">
            <button
              type="button"
              className={`background_btn ${
                selectedBackGround === "background0" ? "selected" : ""
              }`}
              onClick={() => handleOptionBackGround("background0")}
            >
              <img
                src={background0}
                className="background_color"
                alt="background0"
              />
            </button>
            <button
              type="button"
              className={`background_btn ${
                selectedBackGround === "background1" ? "selected" : ""
              }`}
              onClick={() => handleOptionBackGround("background1")}
            >
              <img
                src={background1}
                className="background_color"
                alt="background1"
              />
            </button>
            <button
              type="button"
              className={`background_btn ${
                selectedBackGround === "background2" ? "selected" : ""
              }`}
              onClick={() => handleOptionBackGround("background2")}
            >
              <img
                src={background2}
                className="background_color"
                alt="background2"
              />
            </button>
            <button
              type="button"
              className={`background_btn ${
                selectedBackGround === "background3" ? "selected" : ""
              }`}
              onClick={() => handleOptionBackGround("background3")}
            >
              <img
                src={background3}
                className="background_color"
                alt="background3"
              />
            </button>
            <button
              type="button"
              className={`background_btn ${
                selectedBackGround === "background4" ? "selected" : ""
              }`}
              onClick={() => handleOptionBackGround("background4")}
            >
              <img
                src={background4}
                className="background_color"
                alt="background4"
              />
            </button>
            <button
              type="button"
              className={`background_btn ${
                selectedBackGround === "background5" ? "selected" : ""
              }`}
              onClick={() => handleOptionBackGround("background5")}
            >
              <img
                src={background5}
                className="background_color"
                alt="background5"
              />
            </button>
            <button
              type="button"
              className={`background_btn ${
                selectedBackGround === "background6" ? "selected" : ""
              }`}
              onClick={() => handleOptionBackGround("background6")}
            >
              <img
                src={background6}
                className="background_color"
                alt="background6"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MaleProfile;
