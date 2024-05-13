import Nav from "./Nav"
import './AboutUs.css';
import kim from '../assets/kim.png';
import yim from '../assets/yim.png';
import jung from '../assets/jung.png';
import park from '../assets/park.png';
import jobhak from '../assets/취뽀웃음.png';
const AboutUs = () =>{
    return(
        <>
        <Nav/>
        <div className="aboutUs_app">
            <div>
                <h2 className="aboutUs_title">팀 소개</h2>
                <h3 className="aboutUs_name">밀레니엄</h3>
                <div className="aboutUs_team">
                <div className="aboutUs_section">
                    <img src = {kim} alt="김지유"/>
                    <h4>김지유</h4>
                    <p>팀장
                        <br/>
                        FRONT END
                    </p>
                    <label>특징: 2000년 출생</label>
                </div>
                <div className="aboutUs_section">
                    <img src = {yim} alt="임지우"/>
                    <h4>임지우</h4>
                    <p>팀원
                        <br/>
                        FRONT END
                    </p>
                    <label>특징: 2000년 출생</label>
                </div>
                <div className="aboutUs_section">
                    <img src = {jung} alt="정용욱"/>
                    <h4>정용욱</h4>
                    <p>팀원
                        <br/>
                        BACK END
                    </p>
                    <label>특징: 2000년 출생</label>
                </div>
                <div className="aboutUs_section">
                    <img src = {park} alt="박지은"/>
                    <h4>박지은</h4>
                    <p>팀원
                        <br/>
                        BACK END
                    </p>
                    <label>
                        특징: 2000년 출생</label>
                </div>
                <div className="aboutUs_section">
                <img src = {jobhak} alt="잡학"/>
                    <h4>잡학이</h4>
                    <p>팀원
                        <br/>
                        마스코트
                    </p>
                    <label>
                        특징: 늘 웃고있음</label>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default AboutUs