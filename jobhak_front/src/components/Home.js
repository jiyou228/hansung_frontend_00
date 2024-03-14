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
import building from "../assets/building.png";
const Home = () => {
  const [cookie, setCookie] = useCookies();
  const [userProfile, setUserProfile] = useState("");
  const image = [no1, no2, no3];
  const [index, setIndex] = useState(0);
  const [jobList, setJobList] = useState([]);
  const defaultImage = building;
  const [imageList, setImageList] = useState([defaultImage]);

  useEffect(() => {
    const changeImage = setInterval(() => {
      setIndex((i) => (i === image.length - 1 ? 0 : i + 1));
    }, 3500);
    return () => {
      clearInterval(changeImage);
    };
  }, [index]);

  useEffect(() => {
    axios
      .all([
        instance.get("/home"),
        instance.get("/home/saramin"),
        instance.get("/home/saramin/href"),
      ])
      .then(
        axios.spread((profile, saramin, image) => {
          //console.log(JSON.stringify(image));
          setUserProfile(profile.data.result.nickname);
          setCookie(
            "nickname",
            decodeURIComponent(profile.data.result.nickname)
          );
          setCookie("user_id", profile.data.result.id);
          setJobList(saramin.data);
          //setImageList(image.data);
        })
      )
      .catch((err) => {
        console.error("프로필을 가져오는 도중 에러 발생:", err);
      });
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
          <div className="home_left">
            <Swipe />
            <div className="job_section">
              <h3 className="title">취업정보</h3>
              <h4>
                Powered by{" "}
                <a href="http://www.saramin.co.kr" target="_blank">
                  취업 사람인
                </a>
              </h4>
              <br />
              <div className="home_jobcontainer">
                {jobList.length > 0 &&
                  jobList.map((job, index) => (
                    <Link to={job.url} key={index}>
                      <div className="home_job" key={index}>
                        <div className="job_title">
                          <h3>{job.company.detail.name}</h3>
                          <h2>{job.position.title}</h2>
                        </div>
                        <div className="job_detail">
                          <div>{job.position["experience-level"].name}</div>
                          <div>
                            {job.position["required-education-level"].name}
                          </div>
                          {/* 데이터에서 "job-type", "experience-level"과 같이 (-)이 포함된 키를 사용할 때는 대괄호 표기법을 사용하여 접근*/}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="home_right">
            <div className="home_profile">
              <img src={profile} alt="프로필" />
              <br />
              <b>{userProfile}</b> 님
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
                <h4>
                  곧 마감되는 <br />
                  공고
                </h4>
                <ul>
                  <li>
                    {imageList.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl || defaultImage}
                        alt={`Image ${index}`}
                      />
                    ))}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
