import Nav from "./Nav";
import "./Home.css";
import Swipe from "./swipe";
import profile from "../assets/profile.png";
import { useCookies } from "react-cookie";
import logo from "../assets/black_jobhak_full.svg";
import { useEffect, useState } from "react";
import job from "../assets/공고.png";
import axios from "axios";
import { Link } from "react-router-dom";
import svg from "../assets/black_jobhak_full.svg";
import no1 from "../assets/카드뉴스_취업사진.svg";
import no2 from "../assets/카드뉴스_작성.svg";
import no3 from "../assets/카드뉴스_자소서.svg";
import instance from "../axiosConfig";
import GAN_icon from "../assets/GAN_icon.png";
import learning_icon from "../assets/learning_icon.png";
import deep_icon from "../assets/deep_icon.png";

const Home = () => {
  const [cookie, setCookie] = useCookies();
  const [userProfile, setUserProfile] = useState("");
  const image = [no1, no2, no3];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const changeImage = setInterval(() => {
      setIndex((i) => (i === image.length - 1 ? 0 : i + 1));
    }, 3500);
    return () => {
      clearInterval(changeImage);
    };
  }, [index]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await instance.get("http://localhost:3000/home");
        setUserProfile(res.data.result.nickname);
        setCookie("nickname", decodeURIComponent(res.data.result.nickname));
        setCookie("user_id", res.data.result.id);
      } catch (err) {
        console.error("프로필을 가져오는 도중 에러 발생:", err);
        //window.location.reload();
      }
    };
    getUserInfo();
  }, []);

  const goBottom = () => {
    if (document.getElementById("home_content")) {
      document
        .getElementById("home_content")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openPopup = () => {
    const url = "http://speller.cs.pusan.ac.kr/";
    window.open(url, "_blank", "width=650,height=500");
  };

  return (
    <>
      <Nav />
      <div className="home">
        <div className="home_head">
          <div className="home_headTitle">
            가장 혁신적인 <br />
            취업툴
            <br />
            {/* <img src={GAN_icon} alt="GAN_icon" width={"10%"} />
            <br />
            <img src={deep_icon} alt="deep_icon" />
            <br />
            <img src={learning_icon} alt="learning_icon" /> */}
            <img src={svg} alt="logo"></img>
            <button onClick={goBottom}>시작하기</button>
          </div>
          <div className="home_web_swipe">
            <img src={image[index]} alt="swipe" />
          </div>
        </div>
        <div className="home_content" id="home_content">
          <div className="home_swipe">
            <Swipe />
            <div className="home_profile">
              <img src={profile} alt="프로필" />
              <br />
              <b>{userProfile}</b> 님
            </div>
          </div>
          <div className="home_title">
            <h3>취업정보</h3>
          </div>
          <div className="home_sidebar">
            <div className="home_plus">
              <h4>Job학다식 +</h4>

              <button onClick={openPopup}>맞춤법 검사기</button>

              <Link to="/countchar">
                <button>글자 수 세기</button>
              </Link>
              <Link t0="">
                <button>😆Fun한다식😆</button>
              </Link>
            </div>
            <div className="home_hot">
              <h4>인기있는 공고</h4>
              <ul>
                <li>공고</li>
                <li>공고</li>
                <li>공고</li>
                <li>공고</li>
                <li>공고</li>
                <li>공고</li>
                <li>공고</li>
                <li>공고</li>
              </ul>
            </div>
          </div>
          <div className="home_jobcontainer">
            <img src={job} alt="공고" />
            <img src={job} alt="공고" />
            <img src={job} alt="공고" />
            <img src={job} alt="공고" />
            <img src={job} alt="공고" />
            <img src={job} alt="공고" />
            <img src={job} alt="공고" />
            <img src={job} alt="공고" />
            <img src={job} alt="공고" />
            <img src={job} alt="공고" />
            <img src={job} alt="공고" />
            <img src={job} alt="공고" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
