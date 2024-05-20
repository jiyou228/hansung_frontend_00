import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import full_logo from "../assets/jobhak_full.png";
import "../components/FindID.css";
import Swal from "sweetalert2";

const FindID = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const findIDSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://api.jobhakdasik.site/find/id", {
        name: name,
        email: email,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "아이디 찾기 성공",
          text: `아이디: ${res.data.result}`,
          showCancelButton: false,
          confirmButtonText: "확인",
          width: 800,
          height: 100,
        });
      })
      .catch((err) => {
        console.log("Error: ", err);

        Swal.fire({
          icon: "warning",
          title: "경고",
          text: "아이디 찾기 중 오류가 발생했습니다.",
          showCancelButton: false,
          confirmButtonText: "확인",
          width: 800,
          height: 100,
        });
      });
  };

  return (
    <div className="findID_app">
      <img src={full_logo} className="logo_full" alt="jobhak_full" />
      <p className="findID_p">아이디 찾기</p>
      <form onSubmit={findIDSubmit} className="findID_form">
        <div>
          <input
            type="text"
            required
            className="findID_input"
            value={name}
            placeholder="이름"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="findID_email_container">
          <input
            type="email"
            required
            className="findID_input"
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="findID_submit">
          확인
        </button>
      </form>
      <div className="finID_pw_container">
        <p>비밀번호도 찾으시겠습니까?</p>
        <Link to="/find/pw" className="findID_link">
          <p className="findID_underline">비밀번호 찾기</p>
        </Link>
      </div>
    </div>
  );
};
export default FindID;
