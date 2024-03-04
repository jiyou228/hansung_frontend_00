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
import svg from "../assets/black_jobhak_full.svg";
import no1 from "../assets/카드뉴스_취업사진.svg";
import no2 from "../assets/카드뉴스_작성.svg";
import no3 from "../assets/카드뉴스_자소서.svg";

const Home = () => {
  const [cookie, setCookie] = useCookies();
  const [modalVisible, setModalVisible] = useState(true);
  const [userProfile, setUserProfile] = useState("");
  const image = [no1, no2, no3];
  const [index, setIndex] = useState(0);

  // const checkCookie = () => {
  //   if (cookie.loginModal) {
  //     setModalVisible(false);
  //   } else {
  //     setCookie("loginModal", true);
  //   }
  // };

  // useEffect(() => {
  //   checkCookie();
  // },[]);

  useEffect(() => {
    const changeImage = setInterval(() => {
      setIndex((i) => (i === image.length - 1 ? 0 : i + 1));
    }, 3500);
    return () => {
      clearInterval(changeImage);
    };
  }, [index]);

  useEffect(() => {
    //checkCookie();
    const getUserInfo = async () => {
      try {
        const res = await axios.get("http://localhost:3000/home");
        setUserProfile(res.data);
      } catch (err) {
        console.error("프로필을 가져오는 도중 에러 발생:", err);
        //window.location.reload();
      }
    };
    getUserInfo();
    axios
      .get(
        "	https://oapi.saramin.co.kr/job-search?access-key=pEyjyJB3XnowAZP5ImZUuNbcGwGGDbUGQXQfdDZqhSFgPkBXKWq&keywords=웹+퍼블리셔",
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const goBottom = () => {
    if (document.getElementById("home_content")) {
      document
        .getElementById("home_content")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
          {modalVisible && (
            <ModalSuccess message={`안녕하세요, ${userProfile}님!`} />
          )}

          <div className="home_sidebar">
            <div className="home_plus">
              <h4>Job학다식 +</h4>
              <Link to="/grammar">
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

// import Nav from './Nav';
// import './Home.css';
// import Swipe from './swipe';
// import ModalSuccess from './Modal_Success';
// import profile from '../assets/profile.png';
// import { useCookies } from 'react-cookie';
// import logo from '../assets/black_jobhak_full.svg';
// import { useEffect, useState } from 'react';
// import job from '../assets/공고.png';
// import axios from 'axios';

// const Home = () => {
//   const [cookie, setCookie] = useCookies();
//   const [modalVisible, setModalVisible] = useState(true);
//   const [userProfile, setUserProfile] = useState('');
//   const checkCookie = () => {
//     if (cookie.loginModal) {
//       setModalVisible(false);
//     }
//     else{
//       setCookie('loginModal', true);
//     }
//   };

//   useEffect(() => {
//     checkCookie();
//   });

//   // useEffect(() => {
//   //   const getUserInfo = async() =>{
//   //     try{
//   //       const res = await axios.get('http://localhost:3000/home');
//   //       setUserProfile(res.data);
//   //     }
//   //     catch(err){
//   //       console.error('프로필을 가져오는 도중 에러 발생:', err);
//   //       window.location.reload();
//   //     }
//   //   };
//   //   getUserInfo();
//   // });

//   return (
//     <>
//       <Nav />
//       <div className='home'>
//         <div className='home_content'>
//           <Swipe />
//           <div className='home_title'>
//             <h3>취업정보</h3>
//           </div>
//           {modalVisible &&
//           <ModalSuccess message={`로그인 성공! (아이디: ${cookie.loginId})`} />}
//           <div className='home_profile'>
//             <img src = {profile} alt='프로필'/>
//             <br/>
//             <b>닉네임</b> 님
//           </div>
//           <div className='home_sidebar'>
//           <div className='home_plus'>
//             <h4>Job학다식 +</h4>
//             <button>맞춤법 검사기</button>
//             <button>글자 수 세기</button>
//             <button>😆Fun한다식😆</button>
//           </div>
//           <div className='home_hot'>
//             <h4>인기있는 공고</h4>
//             <ul>
//               <li>공고</li>
//               <li>공고</li>
//               <li>공고</li>
//               <li>공고</li>
//               <li>공고</li>
//               <li>공고</li>
//               <li>공고</li>
//               <li>공고</li>
//             </ul>
//           </div>
//           </div>
//           <div className='home_jobcontainer'>
//             <img src ={job} alt='공고'/>
//             <img src ={job} alt='공고'/>
//             <img src ={job} alt='공고'/>
//             <img src ={job} alt='공고'/>
//             <img src ={job} alt='공고'/>
//             <img src ={job} alt='공고'/>
//             <img src ={job} alt='공고'/>
//             <img src ={job} alt='공고'/>
//             <img src ={job} alt='공고'/>
//             <img src ={job} alt='공고'/>
//             <img src ={job} alt='공고'/>
//             <img src ={job} alt='공고'/>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
