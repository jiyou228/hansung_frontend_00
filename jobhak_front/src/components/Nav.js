import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import logo from "../assets/white_logo.png";
import burger from "../assets/햄버거.png";
import close from "../assets/close.png";
import login from "../assets/login_icon.png";
import mobile from '../assets/mobile_logo.png';

const Nav = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const openNav = () => {
    setNavOpen(!isNavOpen);
  };

  const profileClick = () => {
    setIsProfile(!isProfile);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isProfile &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfile(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfile]);
  const goHome = () => {
    navigate('/home');
  }

  return (
    <header className="navbar_app">
      <img
        src={isNavOpen ? close : burger}
        alt="메뉴버튼"
        className="burger"
        onClick={openNav}
      />
      <img src={mobile} className="mobile_logo" alt="모바일 로고" onClick={goHome}/>

      <Link to="/home" className="navbar_link">
        <img src={logo} alt="jobhakdasik_logo" className="logo_half" />
      </Link>
      <ul className={`nav_mobile ${isNavOpen ? "open" : ""}`}>
        <li
          className="navbar_profile_name"
          onClick={profileClick}
          ref={profileRef}
        >
          취업사진
          <ul className={`navbar_profile ${isProfile ? "clicked" : ""}`}>
            <Link to="/profile/female" className="navbar_link">
              <li>여성</li>
            </Link>
            <Link to="/profile/male" className="navbar_link">
              <li>남성</li>
            </Link>
            <Link to ='/aboutGAN' className="navbar_link">
              <li>GAN</li>
            </Link>
            <Link to ='/aboutStarGAN' className="navbar_link">
              <li>StarGAN</li>
            </Link>
          </ul>
        </li>

        <Link to="/resume/write" className="navbar_link">
          <li>자기소개서</li>
        </Link>
        <Link to="/boardlist" className="navbar_link">
          <li>취업게시판</li>
        </Link>
        <Link to="/user/myInfo" className="navbar_link">
          <li className="navbar_mypage">마이페이지</li>
        </Link>
        <Link to="/logout" className="navbar_link">
          <li className="navbar_logout">로그아웃</li>
        </Link>
      </ul>
      
    </header>
  );
};

export default Nav;
