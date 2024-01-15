import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import full_logo from "../assets/jobhak_full.png";
import '../components/FindPW.css';
const FindPW = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const findPWSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/find/pw", {
        id: id,
        name: name,
        email: email,
      });
<<<<<<< Updated upstream
      if (response.data.success) {
        alert(`${email}로 비밀번호 재설정 링크를 전송했습니다.`);
      } else {
=======
      if(response.data.success){
        alert(`${email}로 비밀번호 재설정 링크를 전송했습니다.`);
      }
      else{
>>>>>>> Stashed changes
        alert("일치하는 회원 정보가 없습니다.");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("비밀번호 찾기 중 서버 오류가 발생했습니다. 다시 시도해주세요.");
      window.location.reload();
    }
  };

  return (
<<<<<<< Updated upstream
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
        src="../img/jobhak_full.png"
        style={{ width: "25rem" }}
        alt="jobhak_full"
      />
      <p style={{ fontWeight: "800", fontSize: "2rem", marginTop: "3rem" }}>
        비밀번호 찾기
      </p>
      <form onSubmit={findPWSubmit} style={{ marginTop: "1rem" }}>
=======
    <div className="findPW_app">
        <img src = {full_logo} className="logo_full" alt='jobhak_full'/>
        <p className="findPW_p">비밀번호 찾기</p>
        <form onSubmit={findPWSubmit} className="findPW_form">
>>>>>>> Stashed changes
        <div>
          <input
            type="text"
            required
            className="findPW_input"
            value={id}
            placeholder="아이디"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="findPW_input_container">
          <input
            type="text"
            required
            className="findPW_input"
            value={name}
            placeholder="이름"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="findPW_input_container">
          <input
            type="email"
            required
            className="findPW_input"
            value={email}
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
<<<<<<< Updated upstream
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
          확인
        </button>
      </form>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <p
          style={{
            textDecoration: "underline",
            fontSize: "1.2rem",
            marginTop: "2rem",
          }}
        >
          로그인 바로가기
        </p>
=======
        <button type="submit" className="findPW_submit">확인</button>
      </form>
      <Link to ='/login' className="findPW_link">
        <p className="findPW_login">로그인 바로가기</p>
>>>>>>> Stashed changes
      </Link>
    </div>
  );
};

export default FindPW;
