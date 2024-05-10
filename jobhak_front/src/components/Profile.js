import Nav from "./Nav";
import "../components/Profile.css";
import suit9 from "../assets/suit9.png";
import suit10 from "../assets/suit10.png";
import suit11 from "../assets/suit11.png";
import femalehair12 from "../assets/femalehair12.png";
import femalehair13 from "../assets/femalehair13.png";
import femalehair14 from "../assets/femalehair14.png";
import Slide1 from "../assets/slide1.png";
import leftarrow from "../assets/left-arrow.png";
import defaultimg from "../assets/취뽀윙크.png";
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Profile = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [selectedSuit, setSelectedSuit] = useState(null);
  const [selectedHair, setSelectedHair] = useState(null);
  const [selectedBulr, setSelectedBulr] = useState("");
  const [lipOption, setLipOption] = useState(false);
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleOptionBulr = (e) => {
    console.log(e.target.value);
    setSelectedBulr(e.target.value);
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
    formData.append("blurstyle", selectedBulr);
    formData.append("lipoption", lipOption);
    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    axios
      .post("http://localhost:12300/profile/edit", formData)
      .then((res) => {})
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
      width: "50vw", // 모달의 너비를 조정할 수 있습니다.
      height: "50vh", // 모달의 높이를 조정할 수 있습니다.
      overflow: "hidden",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경 오버레이 색상을 조정할 수 있습니다.
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
              <div className="modal_content">
                <Slider {...settings}>
                  <div>
                    <h2>정면을 보는 사진</h2>
                    <img src={Slide1} alt="Slide 1" className="Slide1" />
                  </div>
                  <div>
                    <h2>슬라이드 2</h2>
                    <img src="slide2.jpg" alt="Slide 2" />
                  </div>
                  <div>
                    <h2>슬라이드 3</h2>
                    <img src="slide3.jpg" alt="Slide 3" />
                  </div>
                </Slider>
              </div>
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
              <img src={suit9} className="female_suit" alt="Suit 9" />
            </button>
            <button
              type="button"
              className={`female_suit_btn ${
                selectedSuit === "suit2" ? "selected" : ""
              }`}
              onClick={() => handleOptionSuit("suit2")}
            >
              <img src={suit10} className="female_suit" alt="Suit 10" />
            </button>
            <button
              type="button"
              className={`female_suit_btn ${
                selectedSuit === "suit3" ? "selected" : ""
              }`}
              onClick={() => handleOptionSuit("suit3")}
            >
              <img src={suit11} className="female_suit" alt="Suit 11" />
            </button>
          </div>
          <hr style={{ marginBottom: "1rem" }} />
          <label className="choose_option_lb">머리 스타일</label>
          <div className="choose_option_div">
            <button
              type="button"
              className={`female_hair_btn ${
                selectedHair === "femalehair1" ? "selected" : ""
              }`}
              onClick={() => handleOptionHair("femalehair1")}
            >
              <img src={femalehair12} className="female_hair" alt="Hair12" />
            </button>
            <button
              type="button"
              className={`female_hair_btn ${
                selectedHair === "femalehair2" ? "selected" : ""
              }`}
              onClick={() => handleOptionHair("femalehair2")}
            >
              <img src={femalehair13} className="female_hair" alt="Hair12" />
            </button>
            <button
              type="button"
              className={`female_hair_btn ${
                selectedHair === "femalehair3" ? "selected" : ""
              }`}
              onClick={() => handleOptionHair("femalehair3")}
            >
              <img src={femalehair14} className="female_hair" alt="Hair12" />
            </button>
          </div>
          <hr style={{ marginBottom: "1rem" }} />
          <label className="choose_option_lb">얼굴 효과</label>
          <div className="choose_option_div">
            <label className="blur_option_lb">블러 효과</label>

            <label className="blur_option_lb">
              <input
                type="radio"
                name="blurStatus"
                value="weak"
                onClick={handleOptionBulr}
              />
              약
            </label>
            <label className="blur_option_lb">
              <input
                type="radio"
                name="blurStatus"
                value="mid"
                onClick={handleOptionBulr}
              />
              중
            </label>
            <label className="blur_option_lb">
              <input
                type="radio"
                name="blurStatus"
                value="strong"
                onClick={handleOptionBulr}
              />
              강
            </label>
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
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
