import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FindPW = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

<<<<<<< HEAD
  const findPWSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/find/pw", {
        id: id,
        name: name,
        email: email,
      });
      if (response.data.success) {
        alert(`${email}로 비밀번호 재설정 링크를 전송했습니다.`);
      } else {
        alert("일치하는 회원 정보가 없습니다.");
      }
    } catch (error) {
=======
  const findPWSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/find/pw',{
        id: id,
        name: name,
        email: email
      });
      if(response.data.success){
        alert(`${user.email}로 비밀번호 재설정 링크를 전송했습니다.`);
      }
      else{
        alert("일치하는 회원 정보가 없습니다.");
      }
    }catch(error){
>>>>>>> 107ed2795400f86fa2ecbdc3ddc9889c96da5df0
      console.error("Error: ", error);
      alert("비밀번호 찾기 중 서버 오류가 발생했습니다. 다시 시도해주세요.");
      window.location.reload();
    }
  };

  return (
<<<<<<< HEAD
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
    <div style={{ textAlign: "center", fontFamily: "NanumSquare", fontWeight: "800", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <img src = '../img/jobhak_full.png' style={{width: '25rem'}} alt='jobhak_full'/>
        <p style={{fontWeight: '800', fontSize: '2rem', marginTop: '3rem'}}>비밀번호 찾기</p>
        <form onSubmit={findPWSubmit} style={{ marginTop: "1rem" }}>
>>>>>>> 107ed2795400f86fa2ecbdc3ddc9889c96da5df0
        <div>
          <input
            type="text"
            required
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
            type="text"
            required
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
            value={name}
            placeholder="이름"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <input
            type="email"
            required
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
            value={email}
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
<<<<<<< HEAD
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
        <button type="submit" style={{ fontWeight: "800", fontSize: "1.3rem", width: "30.5rem", height: "3rem", marginTop: "2.5rem", backgroundColor: "#FFD3B6", border: "none", borderRadius: "1rem" }}>
          확인
        </button>
      </form>
      <Link to ='/login' style={{textDecoration: 'none', color: 'black'}}>
        <p style={{textDecoration: 'underline', fontSize: '1.2rem', marginTop: '2rem'}}>로그인 바로가기</p>
>>>>>>> 107ed2795400f86fa2ecbdc3ddc9889c96da5df0
      </Link>
    </div>
  );
};

export default FindPW;
