import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import './Nav.css';
import logo from '../assets/white_logo.png';
import burger from '../assets/햄버거.png';
import close from '../assets/close.png';
import login from '../assets/login_icon.png';
import logout from '../assets/logout_icon.png';
import { LoginContext } from "./LoginContext.js";

const Nav = () => {
    const { isLogin } = useContext(LoginContext);
    const [isNavOpen, setNavOpen] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const profileRef = useRef(null);

    const openNav = () => {
        setNavOpen(!isNavOpen);
    };

    const profileClick = () => {
        setIsProfile(!isProfile);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfile && profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfile(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isProfile]);

    return (
        <header className="navbar_app">
            <Link to ="/" className="navbar_link">
                <img src ={logo} alt="jobhakdasik_logo" className="logo_half"/>
            </Link>
            <ul className={`nav_mobile ${isNavOpen ? 'open' : ''}`}>
                <li className="navbar_profile_name" onClick={profileClick} ref={profileRef}>
                    취업사진
                    <ul className={`navbar_profile ${isProfile ? 'clicked' : ''}`}>
                        <Link to ='/profile/female' className="navbar_link">
                            <li>
                                여성
                            </li>
                        </Link>
                        <Link to = '/profile/male' className="navbar_link">
                            <li>
                                남성
                            </li>
                        </Link>
                    </ul>
                </li>

                <Link to ='/resume' className="navbar_link">
                    <li>
                        자기소개서
                    </li>
                </Link>
                <Link to = '/boardlist' className="navbar_link">
                    <li>
                        취업게시판
                    </li>
                </Link>
                <Link to ='/user/myInfo' className="navbar_link">
                    <li className="navbar_mypage">
                        마이페이지
                    </li>
                </Link>
                <Link to ={isLogin ? '/logout' : '/login'} className="navbar_link">
                    <li className="navbar_login">
                        {isLogin ? '로그아웃' : '로그인'}
                    </li>
                </Link>
            </ul>
            <img src={isNavOpen ? close : burger} alt="메뉴버튼" className="burger" onClick={openNav}/>
            <Link to ='/user/myInfo'>
                <img src={isLogin ? login : logout} alt="마이페이지버튼" className="mypage" title="마이페이지"/>
            </Link>
        </header>
    );
};

export default Nav;
