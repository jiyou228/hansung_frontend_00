/*
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';
import { useCookies } from 'react-cookie';
import Swal from "sweetalert2";

const NaverLogin = () => {
  const { naver } = window;
  const [, setCookie] = useCookies();
  const NAVER_CLIENT_ID = 'JpTJiIlCSBmFu0fI3oft';
  const NAVER_CALLBACK_URL = 'https://api.jobhakdasik.site/login/naver';
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");


  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      responseType: 'Code',
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: true,
      loginButton: { color: "white" },
      callbackHandle: true,
    });

    naverLogin.init();

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        setEmail(naverLogin.user.getEmail());
        setName(naverLogin.user.getName());
        setId(naverLogin.user.getId());
        setNickname(naverLogin.user.getNickName());
      }
      else {
        naverLogin.authorize();
      }
    });
  };
  const userAccessToken = () =>{
    window.location.href.includes('access_token') && getToken();
  }
  const getToken = () =>{
    const token = window.location.href.split('=')[1].split('&')[0];
    localStorage.setItem("naverToken", token);
    instance.post('https://api.jobhakdasik.site/login/naver',{
      loginId: id,
      name: name,
      nickname: nickname,
      email: email,
    })
    .then((res) =>{
      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "성공",
          text: `네이버 계정으로 회원가입에 성공했습니다!`,
          showCancelButton: false,
          confirmButtonText: "확인",
          width: 800,
          height: 100,
        });
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        setCookie("refreshToken", refreshToken, { path: "/" });
      }
      setCookie("loggedIn", true);
      navigate("/home");
    })
    .catch((err) =>{
      console.error('에러 발생', err);
      Swal.fire({
        icon: "warning",
        title: "오류",
        text: "네이버 계정으로 회원가입 하던 중 오류가 발생했습니다.",
        showCancelButton: false,
        confirmButtonText: "확인",
        width: 800,
        height: 100,
      });
    })
  }

  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
  });

  return (
    <>
      <div id="naverIdLogin" />
    </>
  );
};

export default NaverLogin;

*/

const { useEffect } = require("react");

// import React, { useEffect } from "react";
// import { useCookies } from "react-cookie";
// import { useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import instance from "../axiosConfig";
// const NaverLogin = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [,setCookie] = useCookies();

//   useEffect(() => {
//     if (!location.search.includes("code=")) {
//       window.location.href = "https://nid.naver.com/oauth2.0/authorize?client_id=JpTJiIlCSBmFu0fI3oft&response_type=code&redirect_uri=https://api.jobhakdasik.site/login/naver";
//     } else {
//       const urlParams = new URLSearchParams(location.search);
//       const code = urlParams.get("code");
//       instance.post('https://api.jobhakdasik.site/login/naver',{
//         accessCode: code
//     })
//     .then((res) =>{
//       if (res.data) {
//         Swal.fire({
//           icon: "success",
//           title: "성공",
//           text: `네이버 계정으로 회원가입에 성공했습니다!`,
//           showCancelButton: false,
//           confirmButtonText: "확인",
//           width: 800,
//           height: 100,
//         });
//         const { accessToken, refreshToken, naverToken } = res.data;
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("naverToken", naverToken);
//         setCookie("refreshToken", refreshToken, { path: "/" });
//       }
//       setCookie("loggedIn", true);
//       navigate("/home");
//     })
//     .catch((err) =>{
//       console.error('에러 발생', err);
//       Swal.fire({
//         icon: "warning",
//         title: "오류",
//         text: "네이버 계정으로 회원가입 하던 중 오류가 발생했습니다.",
//         showCancelButton: false,
//         confirmButtonText: "확인",
//         width: 800,
//         height: 100,
//       });
//     })
//     }
//   }, [location.search]);
// };

// export default NaverLogin;

const NaverLogin = () => {
  useEffect(() => {
    const STATE_STRING = "jobhak_naverLogin";
    window.location.href = `https://api.jobhakdasik.site/oauth2/authorization/naver?redirect_uri=https://jobhakdasik.site/redirectNaver&mode=login`;
  }, []);
};
export default NaverLogin;
