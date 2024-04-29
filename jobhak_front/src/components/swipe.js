// import Swiper core and required modules
import { Link } from "react-router-dom";
import no1 from "../assets/카드뉴스_취업사진.svg";
import no2 from "../assets/카드뉴스_작성.svg";
import no3 from "../assets/카드뉴스_자소서.svg";
import 'swiper/swiper.min.css'
import { Autoplay, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const Swipe = () => {
    return (
        <>
          <Swiper
          slidesPerView={'3'}
            scrollbar
            autoplay = {
                {
                    delay: 3000,
                }
            }
            loop = {true}
            spaceBetween={10}
            centeredSlides={true}
            modules={[Scrollbar, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide><Link to = '/profile/female'><img src={no1} id= 'png' alt='png'/></Link></SwiperSlide>
            <SwiperSlide><Link to = '/resume/write'><img src={no2} id= 'png' alt='png'/></Link></SwiperSlide>
            <SwiperSlide><Link to = '/resume/revise'><img src={no3} id= 'png' alt='png'/></Link></SwiperSlide>
            <SwiperSlide><Link to = '/profile/female'><img src={no1} id= 'png' alt='png'/></Link></SwiperSlide>
            <SwiperSlide><Link to = '/resume/write'><img src={no2} id= 'png' alt='png'/></Link></SwiperSlide>
            <SwiperSlide><Link to = '/resume/revise'><img src={no3} id= 'png' alt='png'/></Link></SwiperSlide>
          </Swiper>
        </>
      );
};
export default Swipe;

// import Swiper core and required modules
// import {Autoplay, Scrollbar } from 'swiper/modules';
// import { Link } from 'react-router-dom';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import no1 from '../assets/카드뉴스_취업사진.png';
// import no2 from '../assets/카드뉴스_작성.png';
// import no3 from '../assets/카드뉴스_자소서.png';

// import './swipe.css';
// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/autoplay';
// import 'swiper/css/scrollbar';

// const Swipe = () => {
//     return (
//         <>
//           <Swiper
//           slidesPerView={'3'}
//             scrollbar
//             autoplay = {
//                 {
//                     delay: 3000,
//                 }
//             }
//             loop = {true}
//             spaceBetween={10}
//             centeredSlides={true}
//             modules={[Scrollbar, Autoplay]}
//             className="mySwiper"
//           >
//             <SwiperSlide><Link to = '/profile/female'><img src={no1} id= 'png' alt='png'/></Link></SwiperSlide>
//             <SwiperSlide><Link to = '/resume/write'><img src={no2} id= 'png' alt='png'/></Link></SwiperSlide>
//             <SwiperSlide><Link to = '/resume/revise'><img src={no3} id= 'png' alt='png'/></Link></SwiperSlide>
//             <SwiperSlide><Link to = '/profile/female'><img src={no1} id= 'png' alt='png'/></Link></SwiperSlide>
//             <SwiperSlide><Link to = '/resume/write'><img src={no2} id= 'png' alt='png'/></Link></SwiperSlide>
//             <SwiperSlide><Link to = '/resume/revise'><img src={no3} id= 'png' alt='png'/></Link></SwiperSlide>
//           </Swiper>
//         </>
//       );
// };
// export default Swipe;