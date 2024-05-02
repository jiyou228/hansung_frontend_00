import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import full_logo from "../assets/jobhak_full.png";
import "../components/ResetPW.css";
import Swal from "sweetalert2";
import instance from "../axiosConfig";
const ResetPW = () => {
  const [tempPw, setTempPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [checkPw, setCheckPw] = useState("");

  // const resetPWSubmit = (e) => {
  //   e.preventDefault();
  //   instance
  //     .patch("http://43.200.36.126:8080/user/edit/pw", {
  //       password: checkPw
  //     })
  //     .then((res) => {
  //       Swal.fire({
  //         icon: "success",
  //         title: "비밀번호 재설정",
  //         text: `성공!`,
  //         showCancelButton: false,
  //         confirmButtonText: "확인",
  //         width: 800,
  //         height: 100,
  //       });
  //       window.location.href = '/';
  //     })
  //     .catch((err) => {
  //       console.log("Error: ", err);

  //       Swal.fire({
  //         icon: "warning",
  //         title: "경고",
  //         text: "비밀번호 재설정 중 오류가 발생했습니다.",
  //         showCancelButton: false,
  //         confirmButtonText: "확인",
  //         width: 800,
  //         height: 100,
  //       });
  //       window.location.reload();
  //     });
  // };
  const resetPWSubmit = (e) => {
    // 기존 비밀번호 확인하는 로직 필요
    e.preventDefault();
    const DoubleCheckPW =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,}$/;
    if (newPw !== checkPw) {
      alert("변경할 비밀번호가 맞지 않습니다.");
    }
    
    else if (!DoubleCheckPW.test(checkPw)) {
      Swal.fire({
        icon: "warning",
        title: "경고",
        text: "대소문자, 숫자, 특수문자 포함 10자 이상입니다. 다시 입력해주세요.",
        showCancelButton: false,
        confirmButtonText: "확인",
        width: 800,
        height: 100,
      });
    }
    
    else {
      instance
        .patch(`http://43.200.36.126:8080/reset/pw`, {
          password: checkPw,
          tempPW: tempPw
        })
        .then((res) => {
          console.log("비밀번호 재설정 성공:", res);
          Swal.fire({
            icon: "success",
            title: "성공",
            text: "비밀번호를 재설정하였습니다!",
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
            height: 100,
          });
        })
        .catch((err) => {
          console.error("비밀번호 재설정 실패:", err);
          Swal.fire({
            icon: "warning",
            title: "실패",
            text: "비밀번호를 재설정하지 못했습니다. 다시 시도해주세요.",
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
            height: 100,
          });
        });
    }
  };

  return (
    <div className="resetPW_app">
      <img src={full_logo} className="logo_full" alt="jobhak_full" />
      <p className="resetPW_p">비밀번호 재설정</p>
      <form onSubmit={resetPWSubmit} className="resetPW_form">
        <div>
          <input
            type="text"
            required
            className="resetPW_input"
            value={tempPw}
            placeholder="임시 비밀번호"
            onChange={(e) => setTempPw(e.target.value)}
          />
        </div>
        <div className="resetPW_input_container">
          <input
            type="text"
            required
            className="resetPW_input"
            value={newPw}
            placeholder="새로운 비밀번호"
            onChange={(e) => setNewPw(e.target.value)}
          />
        </div>
        <div className="resetPW_input_container">
          <input
            type="email"
            required
            className="resetPW_input"
            value={checkPw}
            placeholder="새로운 비밀번호 재입력"
            onChange={(e) => setCheckPw(e.target.value)}
          />
        </div>
        <button type="submit" className="resetPW_submit">
          확인
        </button>
      </form>
      <Link to="/login" className="resetPW_link">
        <p className="resetPW_login">로그인 바로가기</p>
      </Link>
    </div>
  );
};

export default ResetPW;
