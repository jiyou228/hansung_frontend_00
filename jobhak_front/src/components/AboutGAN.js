import Nav from "./Nav";
import SwiperCore, {Navigation } from 'swiper';
import gan1 from '../assets/gan1.png';
import gan2 from '../assets/gan2.png';
import gan3 from '../assets/gan3.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import './AboutGAN.css';
import 'swiper/swiper-bundle.css';
import { useNavigate } from "react-router-dom";
SwiperCore.use([Navigation]);
const AboutGAN = () =>{
    const navigate = useNavigate();
    return(
        <>
            <Nav/>
            <div className="aboutGAN_app">
                <h2>GAN이란?</h2>
                <div className="aboutGAN_link" onClick={() => navigate('/aboutStarGAN')}>StarGAN으로 이동</div>
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

