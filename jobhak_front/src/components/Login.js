import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import full_logo from "../assets/jobhak_full.png";
import naver from "../assets/naver.png";
import kakao from "../assets/kakao.png";
import view from "../assets/view_pw.png";
import hide from "../assets/hide_pw.png";
import "../components/Login.css";
import Swal from "sweetalert2";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  const submitLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/", {
        loginId: id,
        password: pw,
      })
      .then((res) => {
        if (res) {
          Swal.fire({
            icon: "success",
            title: "성공",
            text: "로그인을 성공하였습니다.",
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
            height: 100,
          });

          setCookie("loggedIn", true);
          setCookie("loginId", id);
          navigate("/home");
        }
      })

      .catch((err) => {
        console.log("로그인 에러 발생: ", err);
        Swal.fire({
          icon: "warning",
          title: "실패",
          text: "아이디와 비밀번호가 맞지 않습니다.",
          showCancelButton: false,
          confirmButtonText: "확인",
          width: 800,
          height: 100,
        });
      });
  };

  const pwVisible = () => {
    setShowPw(!showPw);
  };

  useEffect(() => {
    if (cookie.loggedIn === true) {
      navigate("/home");
    }
  });

  return (
    <div className="login">
      <div className="login_app">
        <img src={full_logo} className="logo_full" alt="logo_full" />
        <form onSubmit={submitLogin} className="login_form">
          <div>
            <input
              type="text"
              required
              className="login_input"
              value={id}
              placeholder="아이디"
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="login_pw_container">
            <input
              type={showPw ? "text" : "password"}
              required
              className="login_input"
              value={pw}
              placeholder="비밀번호"
              onChange={(e) => setPw(e.target.value)}
            />
            <div className="pw_visible" onClick={pwVisible}>
              <img
                src={showPw ? hide : view}
                alt="보이기"
                className="pw_icon"
              />
            </div>
          </div>
          <button type="submit" className="login_submit">
            로그인
          </button>
        </form>
        <ul className="login_ul">
          <Link to="/joincheck" className="login_link">
            <li className="login_li_join">회원가입</li>
          </Link>

          <li className="login_li_id">
            <Link to="/find/id" className="login_link">
              아이디
            </Link>
          </li>
          <li style={{ paddingLeft: "1rem" }}>•</li>
          <Link to="/find/pw" className="login_link">
            <li className="login_li_pw">비밀번호 찾기</li>
          </Link>
        </ul>
        <div className="login_line_container">
          <div className="login_line"></div>
          <div className="login_or">또는</div>
          <div className="login_line"></div>
        </div>
        <Link to="/login/naver">
          <div className="login_naver_container">
            <img src={naver} className="login_naver" alt="naver_login" />
          </div>
        </Link>
        <Link to="/login/kakao">
          <div className="login_kakao_container">
            <img src={kakao} className="login_kakao" alt="kakao_login" />
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Login;
