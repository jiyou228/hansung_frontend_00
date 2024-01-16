import { Link } from "react-router-dom";
import './Nav.css';
import logo from '../assets/jobhak_logo.png';
import burger from '../assets/햄버거.png';
import mypage from '../assets/마이페이지.png';
const Nav = () =>{
    return(
        <header className="navbar_app">
            <Link to ="/" className="navbar_link">
            <img src ={logo} alt="jobhakdasik_logo" className="logo_half"/>
            </Link>
            <div className="navbar_container">
                <ul>
                <Link to ='/profile/female' className="navbar_link">
                    <li style={{marginLeft:'8.5vw'}}>
                    취업사진
                    </li>
                </Link>
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
                    <li>
                    마이페이지
                    </li>
                </Link>
                </ul>
            </div>
            <img src = {burger} alt="메뉴버튼" className="burger"/>
            <img src = {mypage} alt="마이페이지버튼" className="mypage"/>
        </header>
    );
};
export default Nav;