import { Link } from "react-router-dom";
import no1 from "../assets/카드뉴스_취업사진.png";
import no2 from "../assets/카드뉴스_작성.png";
import no3 from "../assets/카드뉴스_자소서.png";
import './swipe.css';
import SwiperCore, { Autoplay, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Swiper core 사용을 위해 Autoplay와 Scrollbar를 활성화합니다.
SwiperCore.use([Autoplay, Scrollbar]);

const Swipe = () => {
  return (
    <Swiper
      slidesPerView={3}
      autoplay={{ delay: 3000 }}
      loop={true}
      spaceBetween={10}
      centeredSlides={true}
      scrollbar={{ draggable: true }}
      className="swiper-container"
    >
      <SwiperSlide>
        <Link to="/profile/female">
          <img src={no1} className="swiper-slide-img" alt="카드뉴스_취업사진" />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="/resume/write">
          <img src={no2} className="swiper-slide-img" alt="카드뉴스_작성" />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to="/resume/revise">
          <img src={no3} className="swiper-slide-img" alt="카드뉴스_자소서" />
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};

export default Swipe;
