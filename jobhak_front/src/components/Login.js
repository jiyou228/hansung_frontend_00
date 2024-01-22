import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import full_logo from "../assets/jobhak_full.png";
import naver from "../assets/naver.png";
import kakao from "../assets/kakao.png";
import view from "../assets/view_pw.png";
import hide from "../assets/hide_pw.png";
import '../components/Login.css';
import { useContext } from 'react';
import { LoginContext } from './LoginContext';
const Login = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [showPw, setShowPw] = useState(false);
    const {loggedIn} = useContext(LoginContext);
    const navigate = useNavigate();

    const submitLogin = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/login', {
                loginId: id,
                password: pw,
            });
            if(response.status === 200){
                alert("로그인 성공!");
                loggedIn();
                navigate('/');
            }
        } catch (error) {
            console.error('로그인 에러 발생: ', error);

            if (error.response && error.response.status === 400) {
                alert("아이디와 비밀번호가 맞지 않습니다.");
            } else {
                alert("로그인 중 에러가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };
    
    const pwVisible = () => {
        setShowPw(!showPw);
    }
    
    return (
        <div className='login'>
        <div className='login_app'>
        <img src = {full_logo} className='logo_full' alt='logo_full'/>
            <form onSubmit={submitLogin} className='login_form'>
                <div>
                    <input type ='text' required className = "login_input" value = {id} placeholder="아이디" onChange={(e) => setId(e.target.value)} />
                </div>
                <div className='login_pw_container'>
                    <input type={showPw ? 'text' : 'password'} required className = "login_input" value={pw} placeholder="비밀번호" onChange={(e) => setPw(e.target.value)}/>
                    <div className='pw_visible' onClick={pwVisible}>
                        <img src = {showPw ? hide : view} alt='보이기' className='pw_icon'/>
                    </div>
                </div>
                <button type = "submit" className='login_submit'>로그인</button>
            </form>
            <ul className='login_ul'>
                <Link to ="/joincheck" className='login_link'>
                <li className='login_li_join'>회원가입</li></Link>
                
                <li className='login_li_id'><Link to ="/find/id" className='login_link'>아이디</Link></li>
                <li style={{paddingLeft: '1rem'}}>•</li>
                <Link to ="/find/pw" className='login_link'>
                <li className='login_li_pw'>비밀번호 찾기</li>
                </Link>
            </ul>
            <div className='login_line_container'>
                <div className='login_line'></div>
                <div className='login_or'>또는</div>
                <div className='login_line'></div>
            </div>
            <Link to ='/login/naver'>
            <div className='login_naver_container'>
                <img src = {naver} className='login_naver' alt='naver_login'/>
            </div>
            </Link>
            <Link to ='/login/kakao'>
            <div className='login_kakao_container'>
            <img src = {kakao} className='login_kakao' alt='kakao_login'/>
            </div>
            </Link>
    </div>
    </div>
  );
};
export default Login;
