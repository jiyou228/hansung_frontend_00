import Nav from "./Nav"
import image from '../assets/stargan.png';
import './AboutStarGAN.css';
import { useNavigate } from "react-router-dom";
const AboutStarGAN = () =>{
    const navigate = useNavigate();
    return(
        <>
        <Nav/>
        <div className="stargan_app">
            <h1>StarGAN이란?</h1>
            <div className="aboutGAN_link" onClick={() => navigate('/aboutGAN')}>GAN으로 이동</div>
            <div className="stargan_img"><img src = {image}/></div>
        </div>
        </>
    )
}
export default AboutStarGAN