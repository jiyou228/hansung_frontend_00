import { Link } from "react-router-dom";
import './Nav.css';
const Nav = () =>{
    return(
        <header className="navbar_app">
            <div className="navbar_container">
                <Link to ='/profile/female' className="navbar_link">
                    취업사진
                </Link>
                <Link to ='/resume' className="navbar_link">
                    자기소개서
                </Link>
                <Link to = '/boardlist' className="navbar_link">
                    취업게시판
                </Link>
                <Link to ='/user/myInfo' className="navbar_link">
                    마이페이지
                </Link>
            </div>
        </header>
    );
};
export default Nav;