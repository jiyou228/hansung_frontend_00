import Nav from "./Nav";
import "./Home.css";
import Swipe from "./swipe";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import svg from "../assets/black_jobhak_full.svg";
import no1 from "../assets/카드뉴스_취업사진.png";
import no2 from "../assets/카드뉴스_작성.png";
import no3 from "../assets/카드뉴스_자소서.png";
import instance from "../axiosConfig";
import building from "../assets/building.png";
import aboutus from '../assets/aboutus.png';
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [, setCookie] = useCookies();
  const [userProfile, setUserProfile] = useState("");
  const image = [no1, no2, no3];
  const [index, setIndex] = useState(0);
  const [jobList, setJobList] = useState([]);
  const defaultImage = building;
  const [imageList, setImageList] = useState([]);
  const navgigate = useNavigate();
  const [imageURL, setImageUrl] = useState(null);


  // useEffect(() => {
  //   const changeImage = setInterval(() => {
  //     setIndex((i) => (i === image.length - 1 ? 0 : i + 1));
  //   }, 3500);
  //   return () => {
  //     clearInterval(changeImage);
  //   };
  // }, [index]);

  useEffect(() => {
    instance
      .get("https://api.jobhakdasik.site/user/image/show")
      .then((res) => {
        if (res.data.result) {
          const imageUrl = res.data.result; // 이미지 URL 가져오기
          setImageUrl(imageUrl);
          setCookie("MyIMG", imageUrl);
        } else {
          console.error("No image URL found.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    instance
      .get("https://api.jobhakdasik.site/home")
      .then((profile) => {
        setUserProfile(profile.data.result.nickname);
        //console.log(JSON.stringify(profile.data));
        setCookie("provider", decodeURIComponent(profile.data.result.provider));
        setCookie("nickname", decodeURIComponent(profile.data.result.nickname));
        setCookie("user_id", profile.data.result.id);
        if (!profile.data.result.name) {
          navgigate("/login/kakao/changeName");
        }
      })

      .catch((err) => {
        console.error("프로필을 가져오는 도중 에러 발생:", err);
      });

    instance
      .get("https://api.jobhakdasik.site/home/saramin")
      .then((saramin) => {
        setJobList(saramin.data);
      })
      .catch((err) => {
        console.error("에러 발생:", err);
      });

    instance
      .get("https://api.jobhakdasik.site/home/saramin/href")
      .then((image) => {
        setImageList(image.data);
      })
      .catch((err) => {
        console.error("에러 발생!", err);
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
            <div className="home_mobile">
              <button onClick={openPopup}>맞춤법 검사기</button>
              <Link to="/countchar">
                <button>글자 수 세기</button>
              </Link>
            </div>
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
                {jobList.map((job, index) => (
                  <Link to={job.url} key={index}>
                    <div className="home_job" key={index}>
                      <div className="job_title">
                        {/* 이미지 리스트가 로드되지 않았을 때 */}
                        {!imageList.length || !imageList[index] ? (
                          <h3>{job.company.detail.name}</h3>
                        ) : (
                          <img
                            src={imageList[index]}
                            className="image"
                            alt={`Image ${index}`}
                          />
                        )}
                        <h2>{job.position.title}</h2>
                      </div>
                      <div className="job_detail">
                        <div>{job.position["experience-level"].name}</div>
                        <div>
                          {job.position["required-education-level"].name}
                        </div>
                        <div className="dday">
                          D-{job.dday === 0 ? "DAY" : job.dday + 1}
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
              <img src={imageURL} alt="프로필" />
              <br />
              <label style={{ fontWeight: "800" }}>{userProfile}</label> 님
            </div>
            <div className="home_sidebar">
              <div className="home_plus">
                <h4>Job학다식 +</h4>
                <button onClick={openPopup}>맞춤법 검사기</button>
                <Link to="/countchar">
                  <button>글자 수 세기</button>
                </Link>
              </div>
              <div className="home_hot">
                <h4>곧 마감되는 공고</h4>
                {jobList
                  .filter((i) => parseFloat(i.dday) <= 3.0)
                  .map((item, index) => (
                    <Link to={item.url} key={index}>
                      <div key={index} className="job_expire">
                        <div className="job_expire2">
                          <h3>{item.company.detail.name}</h3>
                          <p>{item.position.title}</p>
                          <div className="dday">
                            D-{item.dday === 0 ? "DAY" : item.dday + 1}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="aboutUs">
        <Link to = '/aboutUs'>
          <img src = {aboutus} alt="aboutUs"/>
        </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
