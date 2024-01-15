import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import full_logo from "../assets/jobhak_full.png";
import naver from "../assets/naver.png";
import kakao from "../assets/kakao.png";
import '../components/Login.css';
const Login = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();
    const submitLogin = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/login', {
                id: id,
                pw: pw,
            });
            if(response.data.success){
                console.log("로그인 성공!");
                navigate('/');
            } else{
                alert("아이디와 비밀번호를 확인해주세요.");
                window.location.reload();
            }
        } catch(error){
            console.error('로그인 에러 발생: ', error);
            alert("로그인 중 에러가 발생했습니다. 다시 시도해주세요.");
            window.location.reload();
        }
    };
    
    return (
        <div className='login_app'>
        <img src = {full_logo} className='logo_full'/>
            <form onSubmit={submitLogin} className='login_form'>
                <div>
                    <input type ='text' required className = "login_input" value = {id} placeholder="아이디" onChange={(e) => setId(e.target.value)} />
                </div>
                <div className='login_pw_container'>
                    <input type ='password' required className = "login_input" value={pw} placeholder="비밀번호" onChange={(e) => setPw(e.target.value)}/>
                </div>
                <button type = "submit" className='login_submit'>로그인</button>
            </form>
            <ul className='login_ul'>
                <Link to ="/joincheck" className='login_link'>
                <li className='login_li_join'>회원가입</li></Link>
                <Link to ="/find/id" className='login_link'>
                <li className='login_li_id'>아이디 · </li>
                </Link>
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
  );
};
export default Login;
