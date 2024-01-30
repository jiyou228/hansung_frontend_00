import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import full_logo from "../assets/jobhak_full.png";
import "../components/FindPW.css";
const FindPW = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const findPWSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/find/pw", {
        loginId: id,
        name: name,
        email: email,
      })
      .then((res) => {
        if (res.status === 200) {
          alert(`비밀번호: ${res.data.result}`);

        } else {
          alert("비밀번호를 찾을 수 없습니다. ");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        alert("비밀번호 찾기 중 서버 오류가 발생했습니다. 다시 시도해주세요.");
        window.location.reload();
      });
  };

  return (
    <div className="findPW_app">
      <img src={full_logo} className="logo_full" alt="jobhak_full" />
      <p className="findPW_p">비밀번호 찾기</p>
      <form onSubmit={findPWSubmit} className="findPW_form">
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
        <button type="submit" className="findPW_submit">
          확인
        </button>
      </form>
      <Link to="/login" className="findPW_link">
        <p className="findPW_login">로그인 바로가기</p>
      </Link>
    </div>
  );
};

export default FindPW;
