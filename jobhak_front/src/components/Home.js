import Nav from "./Nav";
import "./Home.css";
import Swipe from "./swipe";
import ModalSuccess from "./Modal_Success";
import profile from "../assets/profile.png";
import { useCookies } from "react-cookie";
import logo from "../assets/black_jobhak_full.svg";
import { useEffect, useState } from "react";
import job from "../assets/공고.png";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [cookie, setCookie] = useCookies();
  const [modalVisible, setModalVisible] = useState(true);
  const [userProfile, setUserProfile] = useState("");
  const checkCookie = () => {
    if (cookie.loginModal) {
      setModalVisible(false);
    } else {
      setCookie("loginModal", true);
    }
  };

  useEffect(() => {
    checkCookie();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/home")
      .then((res) => {
        setUserProfile(res.data);
      })

      .catch((err) => {
        console.error("프로필을 가져오는 도중 에러 발생:", err);
      });
  }, []);

  return (
    <>
      <Nav />
      <div className="home">
        <div className="home_content">
          <Swipe />
          <div className="home_title">
            <h3>취업정보</h3>
          </div>
          {modalVisible && (
            <ModalSuccess message={`안녕하세요, ${userProfile}님!`} />
          )}
          <div className="home_profile">
            <img src={profile} alt="프로필" />
            <br />
            <b>{userProfile}</b> 님
          </div>
          <div className="home_sidebar">
            <div className="home_plus">
              <h4>Job학다식 +</h4>
              <Link to="">
                <button>맞춤법 검사기</button>
              </Link>
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
