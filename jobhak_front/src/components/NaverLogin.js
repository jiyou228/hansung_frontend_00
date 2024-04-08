import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";
import { useCookies } from "react-cookie";

const NaverLogin = () => {
  const { naver } = window;
  const [, setCookie] = useCookies();
  const NAVER_CLIENT_ID = "JpTJiIlCSBmFu0fI3oft";
  const NAVER_CALLBACK_URL = "https://localhost:3000/login/naver";
  const navigate = useNavigate();

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: true,
      loginButton: { color: "white" },
      callbackHandle: true,
    });

    naverLogin.init();

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        const email = naverLogin.user.getEmail();
        const name = naverLogin.user.getName();
        const id = naverLogin.user.getId();
        const nickname = naverLogin.user.getNickName();

        instance
          .post("https://localhost:3000/login/naver", {
            loginId: id,
            name: name,
            nickname: nickname,
            email: email,
          })
          .then((res) => {
            if (res.data) {
              const { accessToken, refreshToken } = res.data;
              localStorage.setItem("accessToken", accessToken);
              setCookie("refreshToken", refreshToken, { path: "/" });
            }
            setCookie("loggedIn", true);
            navigate("/home");
          })
          .catch((err) => {
            console.error("에러 발생", err);
          });
      } else {
        naverLogin.authorize();
      }
    });
  };

  useEffect(() => {
    initializeNaverLogin();
  });

  return (
    <>
      <div id="naverIdLogin" />
    </>
  );
};

export default NaverLogin;
