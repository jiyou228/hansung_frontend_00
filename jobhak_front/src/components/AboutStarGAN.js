import Nav from "./Nav"
import image from '../assets/stargan.png';
import './AboutStarGAN.css';
const AboutStarGAN = () =>{
    return(
        <>
        <Nav/>
        <div className="stargan_app">
            <h1>StarGAN이란?</h1>
            <div className="stargan_img"><img src = {image}/></div>
        </div>
        </>
    )
}
export default AboutStarGAN