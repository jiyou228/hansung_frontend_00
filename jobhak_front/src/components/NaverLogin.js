import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverLogin = () => {
  const { naver } = window;
  const NAVER_CLIENT_ID = 'JpTJiIlCSBmFu0fI3oft';
  const NAVER_CALLBACK_URL = 'http://localhost:3000/login/naver';
  const navigate = useNavigate();


  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: true,
      loginButton: { color: 'white'},
      callbackHandle: true,
    });

    naverLogin.init();

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        const email = naverLogin.user.getEmail();
        const name = naverLogin.user.getName();
        const id = naverLogin.user.getId();
        const nickname = naverLogin.user.getNickName();
        const image = naverLogin.user.getProfileImage();
        
        alert(`이름: ${name}, 닉네임: ${nickname}\n아이디: ${id}\n이메일: ${email}\n프로필사진URL: ${image}`);
        navigate('/');
      }
      else {
        naverLogin.authorize();
      }
    });
  };

  useEffect(() => {
    initializeNaverLogin();
  });

  return (
    <>
      <div id="naverIdLogin"/> 
    </>
  );
};

export default NaverLogin;
