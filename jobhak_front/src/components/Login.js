<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        id: id,
        pw: pw,
      });
      if (response.data.success) {
        console.log("로그인 성공!");
        navigate("/");
      } else {
        alert("아이디와 비밀번호를 확인해주세요.");
        window.location.reload();
      }
    } catch (error) {
      console.error("로그인 에러 발생: ", error);
      alert("로그인 중 에러가 발생했습니다. 다시 시도해주세요.");
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "NanumSquare",
        fontWeight: "800",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <img
        src="img/jobhak_full.png"
        style={{ width: "25rem" }}
        alt="jobhak_full"
      />
      <form onSubmit={submitLogin} style={{ marginTop: "2rem" }}>
        <div>
          <input
            type="text"
            required
            id="id"
            style={{
              paddingLeft: "1rem",
              backgroundColor: "#FCEDE8",
              width: "29.5rem",
              height: "3.5rem",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1.2rem",
              fontWeight: "700",
            }}
            value={id}
            placeholder="아이디"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <input
            type="password"
            required
            id="pw"
            style={{
              paddingLeft: "1rem",
              backgroundColor: "#FCEDE8",
              width: "29.5rem",
              height: "3.5rem",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1.2rem",
              fontWeight: "800",
            }}
            value={pw}
            placeholder="비밀번호"
            onChange={(e) => setPw(e.target.value)}
          />
        </div>
        <button
          type="submit"
          style={{
            fontWeight: "800",
            fontSize: "1.3rem",
            width: "30.5rem",
            height: "3rem",
            marginTop: "2.5rem",
            backgroundColor: "#FFD3B6",
            border: "none",
            borderRadius: "1rem",
          }}
        >
          로그인
        </button>
      </form>
      <ul style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        <Link to="/signup" style={{ textDecoration: "none", color: "black" }}>
          <li style={{ display: "inline-block", paddingLeft: "-2rem" }}>
            회원가입
          </li>
        </Link>
        <Link to="/find/id" style={{ textDecoration: "none", color: "black" }}>
          <li style={{ display: "inline-block", paddingLeft: "12rem" }}>
            아이디 ·{" "}
          </li>
        </Link>
        <Link to="/find/pw" style={{ textDecoration: "none", color: "black" }}>
          <li style={{ paddingLeft: "0.5rem", display: "inline-block" }}>
            비밀번호 찾기
          </li>
        </Link>
      </ul>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "0" }}
      >
        <div
          style={{
            marginTop: "0.7rem",
            borderTop: "0.1rem solid black",
            width: "13rem",
          }}
        ></div>
        <div
          style={{ margin: "0 1rem", fontSize: "1.2rem", fontWeight: "700" }}
        >
          또는
        </div>
        <div
          style={{
            marginTop: "0.7rem",
            borderTop: "0.1rem solid black",
            width: "13rem",
          }}
        ></div>
      </div>
      <Link to="/login/naver">
        <div style={{ marginTop: "2rem" }}>
          <img
            src="img/naver.png"
            style={{ width: "30rem" }}
            alt="naver_login"
          />
        </div>
      </Link>
      <Link to="/login/kakao">
        <div style={{ marginTop: "0.5rem" }}>
          <img
            src="img/kakao.png"
            style={{ width: "30rem" }}
            alt="kakao_login"
          />
        </div>
      </Link>
    </div>
  );
=======
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div style={{ textAlign: 'center', fontFamily: 'NanumSquare', fontWeight: '800', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <img src = 'img/jobhak_full.png' style={{width: '25rem'}} alt='jobhak_full'/>
            <form onSubmit={submitLogin} style={{marginTop: '2rem'}}>
                <div>
                    <input type ='text' required id = "id" style={{paddingLeft: '1rem', backgroundColor: '#FCEDE8', width: '29.5rem', height: '3.5rem', border: 'none', borderRadius: '0.5rem', fontSize: '1.2rem', fontWeight: '700'}} value = {id} placeholder="아이디" onChange={(e) => setId(e.target.value)} />
                </div>
                <div style={{marginTop: '1.5rem'}}>
                    <input type ='password' required id = "pw"style={{paddingLeft: '1rem', backgroundColor: '#FCEDE8', width: '29.5rem', height: '3.5rem', border: 'none', borderRadius: '0.5rem', fontSize: '1.2rem', fontWeight: '800'}} value={pw} placeholder="비밀번호" onChange={(e) => setPw(e.target.value)}/>
                </div>
                <button type = "submit" style={{fontWeight: '800', fontSize: '1.3rem',width: '30.5rem', height: '3rem', marginTop: '2.5rem', backgroundColor:'#FFD3B6', border: 'none', borderRadius: '1rem'}}>로그인</button>
            </form>
            <ul style={{marginTop: '1rem', fontSize: '1.2rem' }}>
                <li style={{display: 'inline-block', paddingLeft:'-2rem'}}>회원가입</li>
                <Link to ="/find/id" style={{ textDecoration: 'none', color: 'black'}}>
                <li style={{display: 'inline-block', paddingLeft: '12rem'}}>아이디 · </li>
                </Link>
                <Link to ="/find/pw" style={{textDecoration: 'none', color:'black'}}>
                <li style={{paddingLeft: '0.5rem', display: 'inline-block'}}>비밀번호 찾기</li>
                </Link>
            </ul>
            <div style={{display:'flex', justifyContent:'center', marginTop: '0'}}>
                <div style={{marginTop: '0.7rem', borderTop:'0.1rem solid black', width: '13rem'}}></div>
                <div style = {{margin: '0 1rem', fontSize: '1.2rem', fontWeight: '700'}}>또는</div>
                <div style={{marginTop: '0.7rem', borderTop:'0.1rem solid black', width: '13rem'}}></div>
            </div>
            <Link to ='/login/naver'>
            <div style={{marginTop: '2rem'}}>
                <img src = 'img/naver.png' style={{width:'30rem'}} alt='naver_login'/>
            </div>
            </Link>
            <Link to ='/login/kakao'>
            <div style={{marginTop: '0.5rem'}}>
            <img src = 'img/kakao.png' style={{width:'30rem'}} alt='kakao_login'/>
            </div>
            </Link>
        </div>
    );
>>>>>>> 107ed2795400f86fa2ecbdc3ddc9889c96da5df0
};
export default Login;
