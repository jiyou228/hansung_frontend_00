import Nav from "./Nav";
import SwiperCore, {Navigation } from 'swiper';
import gan1 from '../assets/gan1.png';
import gan2 from '../assets/gan2.png';
import gan3 from '../assets/gan3.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import './AboutGAN.css';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Navigation]);
const AboutGAN = () =>{
    return(
        <>
            <Nav/>
            <div className="aboutGAN_app">
            <Swiper
                navigation ={true}
                slidesPerView={1}
                loop={true}
                className="ganSwipe-container">
            <SwiperSlide>
                <img src = {gan1}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src = {gan2}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src = {gan3}/>
            </SwiperSlide>
            </Swiper>
            </div>
        </>
    )
}
export default AboutGAN

