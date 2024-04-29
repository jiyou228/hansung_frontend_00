import "match-media";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";

function Guide() {
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="arrow next" onClick={onClick}>
        <img src={rightArrow} alt="Next" width={50} />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="arrow prev" onClick={onClick}>
        <img src={leftArrow} alt="Prev" width={50} />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="slide_div">
      <Slider {...settings}>
        <div>
          <h3 className="guide_h3">
            1. 합성하려고 하는 사진에 큰 악세사리는 없어야 합니다.
          </h3>
        </div>
        <div>
          <h3 className="guide_h3">2. 정면을 바라보는 사진이어야 합니다.</h3>
        </div>
        <div>
          <h3 className="guide_h3">
            3. 앞머리가 눈을 가리지 않는 사진으로 선택해주세요.
          </h3>
        </div>
      </Slider>
    </div>
  );
}

export default Guide;
