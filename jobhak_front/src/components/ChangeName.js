import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import full_logo from "../assets/jobhak_full.png";
import "../components/ChangeName.css";
import Swal from "sweetalert2";
import instance from "../axiosConfig";
import { useCookies } from "react-cookie";

const ChangeName = () => { 
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const changeNameSubmit = (e) => {
    e.preventDefault();
    instance
      .post("https://localhost:3000/login/kakao/changeName", { 
        name: name,
      })
      .then((res) =>{
        if (res){
          Swal.fire({
            icon: "success",
            title: "성공",
            text: `카카오 계정으로 회원가입에 성공했습니다!`,
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
            height: 100,
          });
          navigate('/home');
        }
      })
      .catch((err) =>{
        console.error('에러 발생', err);
        Swal.fire({
          icon: "warning",
          title: "오류",
          text: "카카오 계정으로 회원가입 하던 중 오류가 발생했습니다.",
          showCancelButton: false,
          confirmButtonText: "확인",
          width: 800,
          height: 100,
        });
      });
  };

  return (
    <div className="changeName_app">
      <img src={full_logo} className="logo_full" alt="jobhak_full" />
      <p className="changeName_p">이름만 입력하면 회원가입이 완료됩니다.</p>
      <form onSubmit={changeNameSubmit} className="changeName_form">
        <div>
          <input
            type="text"
            required
            className="changeName_input"
            value={name}
            placeholder="이름"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit" className="changeName_submit">
          확인
        </button>
      </form>
    </div>
  );
};

export default ChangeName;
